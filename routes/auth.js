const express = require('express');
const { check } = require('express-validator');
const { registerUser, loginUser, renewToken, loginGoogle } = require('../controllers/auth');
const validateJWT = require('../middlewares/validate-jwt');
const validateFields = require('../middlewares/validateFields');
const router = express.Router();

const User = require('../models/User');

router.post('/new', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Password is too short, 6 characters minimum').isLength({min:6}),
    validateFields
], registerUser);

router.post('/google', [
    check('googleToken').not().isEmpty(),
    validateFields
], loginGoogle);

router.post('/login', [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Passowrd is required').not().isEmpty(),
    validateFields
], loginUser);

router.get('/renew', validateJWT, renewToken);

module.exports = router;