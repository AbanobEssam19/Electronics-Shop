const express = require('express');
const next = require('next');
const app = next({dev: true});
const handle = app.getRequestHandler();

const server = express();

server.use(express.json());

const users = require('./models/users');
const products = require('./models/products');

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
        let user = await users.findById(req.user.id);
        return res.json({ user: user });
    });


    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(3000, () => {
        console.log('port running http://localhost:3000');
    });
});