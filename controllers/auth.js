const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const generateJWT = require("../helpers/generateJWT");
const {OAuth2Client} = require('google-auth-library');


const loginGoogle = async (req, res) => {

    try {
        const {googleToken} = req.body;
        if(!googleToken){
            return res.status(400).json({
                success: false,
                msg: 'Error sign in google'
            })
        }

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({idToken: googleToken, audience: process.env.GOOGLE_CLIENT_ID})
    const { name, email } = ticket.getPayload();
        
    if (!email){
        return res.status(400).json({
            success: false,
            msg: 'Error sign in google'
        })
    }

    let user = await User.findOne({email});
    
    if(!user){

        user = new User ( {name, email} );
        
        const salt = bcrypt.genSaltSync();
        const password = Math.random().toString(36).slice(-8);
        user.password = bcrypt.hashSync(password, salt);
        user.save();
    }else{
        
        user = await User.findOneAndUpdate(({email}, {name}, {
            new: true,
            upsert: true // Make this update into an upsert
          }))
    }

    const token = generateJWT(user.id, name);
    
    return res.status(200).json({
        success: true,
        uid: user.id,
        name: user.name,
        token
    })

    } catch (error) {
        return res.status(500).json({
            success:false,
            msg: 'Error'
        })
      
    }

}

const registerUser = async (req, res) => {

    try {
        const {email, password} = req.body;
        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({
                success:false,
                msg: 'The email is already used'
            })
        }

        user = new User ( req.body );

        //bcrypt
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = generateJWT(user.id, user.name);

        res.status(201).json({
            success:true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
            return res.status(500).json({
                success:false,
                msg: 'Error'
            })
        }   
}

const loginUser = async (req,res) => {

    try {
        const {email, password} = req.body;

    const user = await User.findOne({ email })
    if(!user){
        return res.status(400).json({
            success:false,
            msg: 'Invalid credentials'
        })
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if(!validPassword){
        return res.status(400).json({
            success:false,
            msg: 'Invalid credentials'
        })
    }

    const token = generateJWT(user.id, user.name);

    return res.status(200).json({
        success:true,
        uid: user.id,
        name: user.name,
        token
    })
    
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            msg: 'error'
        })
    }
}

const renewToken = (req, res) => {

try {
    const newToken = generateJWT(req.uid, req.name);

    return res.status(200).json({
        success: true,
        uid: req.uid,
        name: req.name,
        token: newToken
    })

} catch (error) {
    console.log(error);
    return res.status(400).json({
        success:false,
        msg: 'error'
    })
}

    

}

module.exports = {
    registerUser,
    loginUser,
    renewToken,
    loginGoogle
}