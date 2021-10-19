const express = require('express');
const { check } = require('express-validator');
const { newOrder, getOrders, deleteOrder, editOrder } = require('../controllers/orders');
const validateJWT = require('../middlewares/validate-jwt');
const router = express.Router();

router.use( validateJWT );

router.post('/new', [
    check('products', 'At least one product').isLength({min: 1})
], newOrder)

router.get('/', getOrders);

router.delete('/', 
    check('id', 'Id is required').not().isEmpty(),
    deleteOrder
)

router.put('/',
    check('id', 'Id is required').not().isEmpty(),
    editOrder
)

module.exports = router;