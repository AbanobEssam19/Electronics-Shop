const mongoose = require('mongoose');

const Users = mongoose.model('Users', 
    {
        username: String,
        password: String,
        name: String,
        email: String,
        cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
        whislist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
        address: [String],
        phone: String
    }
)

module.exports = Users;