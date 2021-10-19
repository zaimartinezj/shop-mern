const express = require('express');
const { newProduct, getAllProducts, getProductsPagination } = require('../controllers/products');
const validateJWT = require('../middlewares/validate-jwt');
const validateFields = require('../middlewares/validateFields');
const router = express.Router();
const {check} = require('express-validator');

// router.use( validateJWT );

router.post('/newProduct', [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('price', 'Description is required').not().isEmpty(),
    check('brand', 'brand is required').not().isEmpty(),
    check('type', 'type is required').not().isEmpty(),
    check('img', 'img is required').not().isEmpty(),
    validateFields
], newProduct);

router.get('/', getProductsPagination);


router.get('/all', getAllProducts);


module.exports = router;