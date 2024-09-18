const mongoose = require('mongoose');

const Carts = mongoose.model('Carts', 
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
        quantity: Number
    }
)

module.exports = Carts;