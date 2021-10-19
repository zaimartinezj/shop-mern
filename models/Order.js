const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({

    additionalComment: {
        type: String
    },
    dateCreated: {
        type: Date,
        required: true
    },
    dateModified: {
        type: Date
    },
    user: {
        type: mongoose.Types.ObjectId, ref: 'User', //lo obtengo del token jeje
    },
    products: [{
        type: mongoose.Types.ObjectId, ref: 'Product',
        required: true
    }]


})

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;