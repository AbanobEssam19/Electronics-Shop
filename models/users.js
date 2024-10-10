const mongoose = require('mongoose');

const Users = mongoose.model('Users', 
    {
        username: String,
        password: String,
        name: String,
        email: String,
        cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Carts' , default: []}],
        wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' , default: []}],
        firstname: {type: String, default: ""},
        lastname: {type: String, default: ""},
        address: {type: String, default: ""},
        phone: {type: String, default: ""},
        city: {type: String, default: ""},
        state: {type: String, default: ""},
        orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Orders' , default: []}]
    }
)

module.exports = Users;