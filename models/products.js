const mongoose = require('mongoose');

const Products = mongoose.model('Products', 
    {
        name: String, 
        categories: [String],
        price: Number,
        discount: Number,
        date: Date,
        photo: [Buffer],
        quantity: Number,
        description: [String],
        specifications: [String],
        popularity: Number
    }
)

module.exports = Products;