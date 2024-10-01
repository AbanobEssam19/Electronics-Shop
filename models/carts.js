const mongoose = require('mongoose');

const Carts = mongoose.model('Carts', 
    {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
        quantity: Number
    }
)

module.exports = Carts;