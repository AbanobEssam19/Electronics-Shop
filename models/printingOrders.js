const mongoose = require('mongoose');

const Orders = mongoose.model('Orders', 
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
        date: Date,
        total: Number,
        address: String,
        phone: Number
    }
)

module.exports = Orders