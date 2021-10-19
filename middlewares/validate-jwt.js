const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
    const token = req.header('x-token');
    try {
        
    
        if (!token){
            res.status(400).json({
                success: false,
                msg: 'Token is required'
            })
        }

        const payload = jwt.verify(token, process.env.SECRET_JWT_SEED)

        req.uid = payload.uid;
        req.name = payload.name;

        if (!payload){
            res.status(400).json({
                success: false,
                msg: "Invalid token"
            })
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            msg: 'Error'
        })
    }

    
}

module.exports = validateJWT;