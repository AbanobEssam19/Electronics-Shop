const mongoose = require('mongoose');

const Orders = mongoose.model('Orders', 
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
        products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
        date: Date,
        total: Number,
        shipping: Boolean,
        address: String
    }
)

module.exports = Orders