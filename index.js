const express = require('express');
const next = require('next');
const app = next({dev: true});
const handle = app.getRequestHandler();

const server = express();

server.use(express.json());

const users = require('./models/users');
const products = require('./models/products');
const carts = require('./models/carts');
const orders = require('./models/orders');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'projectImages');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const multerMiddelware = multer({storage: storage});

require("./mongodb");

const authenticateToken = (req, res, next) => {
    const token = req.headers['token'];

    if (!token) {
        return res.json({success: false});
    }

    jwt.verify(token,process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.json({success: false});
        }
        req.user = user;
        next();
    })
}

app.prepare().then(() => {

    server.post("/register", async (req, res) => {
        let exist = await users.findOne({username: req.body.username});

        if (exist) {
            res.json({success: false});
            return;
        }

        let hashedPassword = await bcrypt.hash(req.body.password, 10);

        const data = {
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            phone: req.body.phone
        }


        await users.insertMany([data]);

        let userID = (await users.findOne({username: req.body.username})).id;
        const token = jwt.sign(
            {id: userID}, 
            process.env.JWT_SECRET,
            {expiresIn: '14d'}
        )
        res.json({success: true, token});

    });

    server.post("/login", async (req, res) => {
        let targetUser = await users.findOne({username: req.body.username});

        if (!targetUser) {
            res.json({success: false});
            return;
        }

        const checkPass = await bcrypt.compare(req.body.password, targetUser.password);

        if (checkPass) {
            const token = jwt.sign(
                {id: targetUser._id}, 
                process.env.JWT_SECRET,
                {expiresIn: '14d'}
            );
            res.json({success: true, token});
        }
        else {
            res.json({success: false});
        }

    });

    server.post("/api/uploadproduct", multerMiddelware.array('photos'), async (req, res) => {

        const {name, categories, price, discount, quantity, description, specifications} = req.body;

        const uploadPhotos = req.files.map(async (file) => {
            const photo = await cloudinary.uploader.upload(file.path, {folder: 'products'});
            return cloudinary.url(photo.public_id);
        });

        const photos = await Promise.all(uploadPhotos);

        const date = new Date();

        const data = {
            name: name,
            categories: categories,
            price: price,
            discount: discount,
            date: date,
            photo: photos,
            quantity: quantity,
            description: description,
            specifications: specifications,
            popularity: 0
        }


        await products.insertMany([data]);
    })

    server.get("/api/products", async (req, res) => {
        const product = await products.find();
        return res.json({ products: product });
    });

    server.get("/api/user", authenticateToken, async (req, res) => {
        const user = await users.findById(req.user.id);
        return res.json({ user: user });
    });

    server.get("/api/orders", authenticateToken, async (req, res) => {
        const order = await orders.find();
        return res.json({ orders: order });
    });

    server.get("/api/carts", async (req, res) => {
        const cart = await carts.find();
        return res.json({ carts: cart });
    });

    server.post("/api/cartitem/:id/:quantity", authenticateToken, async (req, res) => {
        const userID = req.user.id;
        const productID = req.params.id;
        const quantity = req.params.quantity;

        const data = {
            product: productID,
            quantity: quantity
        };

        const cart = await carts.insertMany([data]);
        
        const user = await users.findById(userID);
        let newCart = [...user.cart];

        newCart.push(cart[0].id);
        
        await users.updateOne({_id: userID}, {$set: {cart: newCart}})
        
        const newUser = await users.findById(userID);

        const newCarts = await carts.find();

        return res.json({success: true, user: newUser, carts: newCarts});
    });

    server.delete("/api/cartitem/:id", authenticateToken, async (req, res) => {
        const userID = req.user.id;
        const cartID = req.params.id;

        const user = await users.findById(userID);

        let newCart = [];

        for (const item of user.cart) {
            if (item == cartID) {
                await carts.findByIdAndDelete(item);
            } 
            else {
                newCart.push(item);
            }
        }

        await users.findByIdAndUpdate(userID, { $set: { cart: newCart } });

        const newUser = await users.findById(userID);

        return res.json({success: true, user: newUser});
    });

    server.put("/api/cartitem/:id/:quantity", authenticateToken, async (req, res) => {
        const userID = req.user.id;
        const cartID = req.params.id;
        const quantity = req.params.quantity;

        await carts.findByIdAndUpdate(cartID, {$set: {quantity: quantity}});

        const cart = await carts.find();

        const newUser = await users.findById(userID);

        return res.json({success: true, carts: cart, user: newUser});
    });

    server.post("/api/order/:id", async (req, res) => {
        const {firstName, lastName, address, city, state, notes, shipping} = req.body;
        const userID = req.params.id;

        const user = await users.findById(userID);

        let total = shipping && 50;

        let productsArr = [];

        for (const id of user.cart) {
            const cart = await carts.findById(id);
            productsArr.push(cart.product);
            const product = await products.findById(cart.product);
            total += product.price * cart.quantity;

            await carts.findByIdAndDelete(id);
        }

        const ordersArr = await orders.find();

        const number = ordersArr.length;
        
        const order = await orders.insertMany([{
            orderID: number + 42100,
            products: productsArr,
            date: new Date(),
            total: total,
            shipping: shipping,
            address: address,
            notes: notes
        }]);
        
        const orderID = order[0]._id

        let userOrders = user.orders;

        userOrders.push(orderID);

        await users.updateOne({_id: userID}, {$set: {cart: [], firstname: firstName, lastname: lastName, address: address, city: city, state: state, orders: userOrders}});

        const newUser = await users.findById(userID);

        return res.json({success: true, user: newUser});
        
    });

    server.post("/api/addtowishlist/:id", authenticateToken, (req, res) => {
        const userID = req.user.id;
        const productID = req.params.id;

        const user = users.findById(userID);

        let wishlistArr = user.wishlist;

        wishlistArr.push(productID);

        users.findByIdAndUpdate(userID, {$set: {wishlist: wishlistArr}});

        const newUser = users.findById(userID);

        return res.json({success: true, user: newUser});
    })

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(3000, () => {
        console.log('port running http://localhost:3000');
    });
});