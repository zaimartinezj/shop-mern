const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }


}) 

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;