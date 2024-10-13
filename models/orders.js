const mongoose = require('mongoose');

const Orders = mongoose.model('Orders', 
    {
        orderID: Number,
        products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
        date: Date,
        total: Number,
        shipping: Boolean,
        address: String,
        city: String,
        region: String,
        status: {type: String, default: "Processing"},
        notes: {type: String, default: ""}
    }
)

module.exports = Orders