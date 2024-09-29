const mongoose = require('mongoose');

const Users = mongoose.model('Users', 
    {
        username: String,
        password: String,
        name: String,
        email: String,
        cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Carts' , default: []}],
        wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' , default: []}],
        address: [String],
        phone: String
    }
)

module.exports = Users;