const express = require("express");
const next = require("next");
const app = next({ dev: true });
const handle = app.getRequestHandler();

const server = express();

server.use(express.json());

const users = require("./models/users");
const products = require("./models/products");
const carts = require("./models/carts");
const orders = require("./models/orders");
const coupons = require("./models/coupons");
const printingOrders = require("./models/printingOrders");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "projectImages");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const multerMiddelware = multer({ storage: storage });

require("./mongodb");

const authenticateToken = (req, res, next) => {
  const token = req.headers["token"];

  if (!token) {
    return res.json({ success: false });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.json({ success: false });
    }
    req.user = user;
    next();
  });
};

app.prepare().then(() => {
  server.post("/register", async (req, res) => {
    let exist = await users.findOne({ username: req.body.username });

    if (exist) {
      res.json({ success: false });
      return;
    }

    let hashedPassword = await bcrypt.hash(req.body.password, 10);

    const data = {
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      phone: req.body.phone,
    };

    await users.insertMany([data]);

    let userID = (await users.findOne({ username: req.body.username })).id;
    const token = jwt.sign({ id: userID }, process.env.JWT_SECRET, {
      expiresIn: "14d",
    });
    res.json({ success: true, token });
  });

  server.post("/login", async (req, res) => {
    let targetUser = await users.findOne({ username: req.body.username });

    if (!targetUser) {
      res.json({ success: false });
      return;
    }

    const checkPass = await bcrypt.compare(
      req.body.password,
      targetUser.password
    );

    if (checkPass) {
      const token = jwt.sign({ id: targetUser._id }, process.env.JWT_SECRET, {
        expiresIn: "14d",
      });
      res.json({ success: true, token });
    } else {
      res.json({ success: false });
    }
  });

  server.post(
    "/api/uploadproduct",
    multerMiddelware.array("photos"),
    async (req, res) => {
      const {
        name,
        categories,
        price,
        discount,
        quantity,
        description,
        specifications,
      } = req.body;

      const uploadPhotos = req.files.map(async (file) => {
        const photo = await cloudinary.uploader.upload(file.path, {
          folder: "products",
        });
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
        popularity: 0,
      };

      await products.insertMany([data]);
    }
  );

  server.get("/api/products", async (req, res) => {
    const product = await products.find();
    return res.json({ products: product });
  });

  server.get("/api/user", authenticateToken, async (req, res) => {
    const user = await users.findById(req.user.id);
    return res.json({ user: user });
  });

  server.get("/api/orders", async (req, res) => {
    const order = await orders.find();
    return res.json({ orders: order });
  });

  server.get("/api/carts", async (req, res) => {
    const cart = await carts.find();
    return res.json({ carts: cart });
  });

  server.get("/api/coupons", async (req, res) => {
    const coupon = await coupons.find();
    return res.json({ coupons: coupon });
  });

  server.get("/api/printingorders", async (req, res) => {
    const order = await printingOrders.find();
    return res.json({ orders: order });
  })

  server.post(
    "/api/cartitem/:id/:quantity",
    authenticateToken,
    async (req, res) => {
      const userID = req.user.id;
      const productID = req.params.id;
      const quantity = req.params.quantity;

      const data = {
        product: productID,
        quantity: quantity,
      };

      const cart = await carts.insertMany([data]);

      const user = await users.findById(userID);
      let newCart = [...user.cart];

      newCart.push(cart[0].id);

      const product = await products.findById(productID);

      await users.updateOne({ _id: userID }, { $set: { cart: newCart, total: user.total + (product.price * quantity) } });

      const newUser = await users.findById(userID);

      await products.findByIdAndUpdate(productID, { $set: { popularity: product.popularity + 1 } });

      const newProducts = await products.find();

      const newCarts = await carts.find();

      return res.json({ success: true, user: newUser, carts: newCarts, products: newProducts });
    });

  server.delete("/api/cartitem/:id", authenticateToken, async (req, res) => {
    const userID = req.user.id;
    const cartID = req.params.id;

    const user = await users.findById(userID);

    let newCart = [];

    let productID;

    let productQuantity;

    for (const item of user.cart) {
      if (item == cartID) {
        const cart = await carts.findById(cartID);
        productID = cart.product;
        productQuantity = cart.quantity;
        await carts.findByIdAndDelete(item);
      }
      else {
        newCart.push(item);
      }
    }
    
    const product = await products.findById(productID);
    
    await users.findByIdAndUpdate(userID, { $set: { cart: newCart, total: user.total - (product.price * productQuantity) } });
    
    const newUser = await users.findById(userID);

    await products.findByIdAndUpdate(productID, { $set: { popularity: product.popularity - 1 } });

    const newProducts = await products.find();

    const newCarts = await carts.find();

    return res.json({ success: true, user: newUser, carts: newCarts, products: newProducts });
  });

  server.put(
    "/api/cartitem/:id/:quantity",
    authenticateToken,
    async (req, res) => {
      const userID = req.user.id;
      const cartID = req.params.id;
      const quantity = req.params.quantity;

      const cart = await carts.findById(cartID);

      const product = await products.findById(cart.product);

      const def = quantity - cart.quantity;

      const user = await users.findById(userID);

      await users.findByIdAndUpdate(userID, { $set: { total: user.total + (product.price * def) } });

      await carts.findByIdAndUpdate(cartID, { $set: { quantity: quantity } });

      const allCarts = await carts.find();

      const newUser = await users.findById(userID);

      return res.json({ success: true, carts: allCarts, user: newUser });
    }
  );

  server.post("/api/order/:id/:coupon", async (req, res) => {
    const { firstName, lastName, address, city, region, notes, shipping } = req.body;
    const userID = req.params.id;
    const couponID = req.params.coupon;

    const user = await users.findById(userID);

    let productsArr = [];

    for (const id of user.cart) {
      const cart = await carts.findById(id);
      const product = await products.findById(cart.product);
      if (cart.quantity > product.quantity) {
        return res.json({ success: false, error: `Not enough stock for product ${product.name}` });
      }
    }

    for (const id of user.cart) {
      const cart = await carts.findById(id);
      productsArr.push(cart.product);
      const product = await products.findById(cart.product);
      await products.findByIdAndUpdate(cart.product, { $set: { popularity: product.popularity - 1, quantity: product.quantity - cart.quantity } });
      await carts.findByIdAndDelete(id);
    }

    const coupon = couponID != "none" ? await coupons.findById(couponID) : null;

    let total = shipping + user.total -  (coupon ? coupon.discount : 0);

    const ordersArr = await orders.find();

    const number = ordersArr.length;

    const order = await orders.insertMany([{
      orderID: number + 42100,
      products: productsArr,
      date: new Date(),
      total: total,
      shipping: shipping ? true : false,
      city: city,
      region: region,
      address: address,
      notes: notes
    }]);

    const orderID = order[0]._id;

    let userOrders = user.orders;

    userOrders.push(orderID);

    let usedCoupons = user.usedCoupons;

    if (coupon) {
      usedCoupons.push(couponID);
    }

    await users.updateOne({ _id: userID }, { $set: { cart: [], firstname: firstName, lastname: lastName, address: address, city: city, region: region, orders: userOrders, usedCoupons: usedCoupons, total: 0 } });

    const newUser = await users.findById(userID);

    return res.json({ success: true, user: newUser });
  });

  server.post("/api/addtowishlist/:id", async (req, res) => {
    const userID = req.body._id;
    const productID = req.params.id;

    const user = await users.findById(userID);

    let wishlistArr = user.wishlist;
    const item = wishlistArr.find((el) => el._id == productID);
    if (!item) {
      wishlistArr.push(productID);
    } else {
      wishlistArr = wishlistArr.filter((el) => el._id != productID);
    }
    await users.findByIdAndUpdate(userID, {
      $set: { wishlist: wishlistArr },
    });

    const newUser = await users.findById(userID);

    return res.json({ success: true, user: newUser });
  });

  server.post("/api/wishlist", async (req, res) => {
    let user = req.body;
    let wishlist = user.wishlist;
    let cart100 = [...user.cart];
    let total = user.total;
    for (const id of wishlist) {
      const cart = await carts.insertMany([
        {
          product: id,
          quantity: 1,
        }
      ]);
      cart100.push(cart[0]._id);
      const product = await products.findById(id);
      total += product.price;
      await products.findByIdAndUpdate(id, { $set: { popularity: product.popularity + 1 } });
    }
    await users.updateOne(
      { _id: user._id },
      { $set: { wishlist: [], cart: cart100, total: total } }
    );
    const newUser = await users.findById(user._id);
    const newCarts = await carts.find();
    return res.json({ success: true, user: newUser, carts: newCarts });
  });

  server.post("/api/printingorder/:id", async (req, res) => {
    const userid = req.params.id;
    const orderData = {
      ...req.body,
      orderID: printingOrders.length + 38100,
      date: new Date()
    }
    const neworder = await printingOrders.insertMany([orderData]);
    const user = await users.findById(userid);
    let ordersarr = user.printingOrders;
    ordersarr.push(neworder[0]._id);
    const updateuser = await users.findByIdAndUpdate(userid, {
      $set: { printingOrders: ordersarr },
    });
    
    return res.json({ success: true, user: updateuser });
  });

  server.post("/api/coupon", async (req, res) => {
    const { code, expiryDate, discount, newUser } = req.body;
    await coupons.insertMany([{
      code: code,
      expiryDate: expiryDate,
      discount: discount,
      newUser: newUser
    }]);
  });

  server.delete("/api/wishlist", async (req, res) => {
    let user = req.body;
    await users.findByIdAndUpdate(user._id, {
      $set: { wishlist: [] },
    });
    return res.json({
      success: true,
    });
  });

  server.post("/api/wishlistsome", async (req, res) => {
    const { user, selectedItems } = req.body;
    for (const item of selectedItems) {
      const cartItem = { product: item._id, quantity: 1 };
      const product = await products.findById(item._id);
      await products.findByIdAndUpdate(item._id, { $set: { popularity: product.popularity + 1 } });
      /* improve */
      const cartId = await carts.insertMany([cartItem]);
      user.cart.push(cartId[0]._id);
      user.wishlist = user.wishlist.filter((id) => id != item._id);
    }
    const finalUser = await users.findByIdAndUpdate(
      user._id,
      {
        $set: {
          cart: user.cart,
          wishlist: user.wishlist,
        },
      },
      { new: true }
    );
    const newCarts = await carts.find();
    return res.json({
      success: true,
      modifiedUser: finalUser,
      carts: newCarts,
    });
  });

  server.delete("/api/wishlistsome", async (req, res) => {
    let { user, selectedItems } = req.body;
    for (const item of selectedItems) {
      /* improve */
      let newWishlist = user.wishlist;
      newWishlist = newWishlist.filter((id) => id != item._id);
      user.wishlist = newWishlist;
    }
    console.log("user is: ", user);
    const userID = await user._id;
    const wishList100 = await user.wishlist;
    const finalUser = await users.findByIdAndUpdate(
      userID,
      {
        $set: { wishlist: wishList100 },
      },
      { new: true }
    );
    console.log("wishlist100 is:", wishList100);
    console.log("final User is: ", finalUser);
    return res.json({
      success: true,
      modifiedUser: finalUser,
    });
  });

  server.put("/api/edituserdata", authenticateToken, async (req, res) => {
    const userId = req.user.id;
    console.log("User ID:", userId);
    let user = await users.findById(userId);
    console.log("User: ", user);
    const userData = req.body;
    console.log("userData from front: ", userData);

    const checkPass = await bcrypt.compare(userData.curPass, user.password);
    if (!checkPass) {
      return res.json({
        success: false,
        message: "Incorrect current password",
      });
    }

    let hashedPassword = user.password;
    if (userData.newPass) {
      hashedPassword = await bcrypt.hash(userData.newPass, 10);
    }

    const newUser = {
      ...user.toObject(),
      ...userData,
      password: hashedPassword,
    };

    const updatedUser = await users.findByIdAndUpdate(
      userId,
      { $set: { ...newUser } },
      { new: true }
    );

    return res.json({ success: true, user: updatedUser });
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, () => {
    console.log("port running http://localhost:3000");
  });
});
