const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");


const newOrder = async (req, res) => {

    const {products, additionalComment} = req.body;
    try {
        const productsfetch = await Product.find({ '_id' : {$in : products}});

        const dateCreated = new Date();
        const order = new Order({user: req.uid, name: req.name, products: productsfetch, additionalComment: additionalComment || '', dateCreated})

        await order.save();

        res.status(201).json({
            success: true,
            id: order._id,
            user: req.uid,
            name: req.name,
            products: productsfetch,
            additionalComment,
            dateCreated

    })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            msg: 'Error'
        })
    }   

}

const getOrders = async (req, res) => {
    try {
        //cambiar user to uid arriba
        const ordersUser = await Order.find({'user': mongoose.Types.ObjectId(`${req.uid}`)}).populate('user', 'name').populate('products', 'name description url').sort('-dateCreated');
        const mapOrders = ordersUser.map(({__v, user, products, _id, additionalComment, dateCreated}) => ({user, products, _id, additionalComment, dateCreated}));

        res.status(201).json({
            success: true,
            uid: req.uid,
            orders: mapOrders
         })
         
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            msg: 'Error'
        })
    }
}

const deleteOrder = async (req, res) => {

    const idOrder = req.query.id;
    //podria poner en el routes '/:id y recibirla como req.params.id
    try {
        const order = await Order.findById(idOrder);

        if (!order){
            return res.status(400).json({
                success: false,
                msg: "Order Id invalid"
            })
        }
        
        if(order.user.toString() !== req.uid){
            return res.status(400).json({
                success: false,
                msg: "Unauthorized"
            })
        }
        await Order.deleteOne(order);

        return res.status(202).json({
            success:true,
            msg: "Order deleted"
        })
    } catch (error) {

        console.log(error);
        res.status(400).json({
            success: false,
            msg: 'Error'
        }) 
    }
}

const editOrder = async (req, res) => {

    try {
        const idOrder = req.query.id;
        const newOrder = req.body;
        const order = await Order.findById(idOrder);
       

    if(!order){
        return res.status(400).json({
            success: false,
            msg: "Invalid order"
        })
    }
    // const {dateCreated, ...rest} = order;

    const orderToSent = {
        ...newOrder,
        dateModified: new Date()
    }

    if(order.user.toString() !== req.uid){
        return res.status(400).json({
            success: false,
            msg: "Unauthorized"
        })
    }

        const orderUpdated = await Order.findByIdAndUpdate(order._id, orderToSent, {useFindAndModify:false, new:true});

        return res.status(200).json({
            success: true,
            order: orderUpdated._doc
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            msg: 'Error'
        }) 
    }




}

module.exports = {
    newOrder,
    getOrders,
    deleteOrder,
    editOrder
}