const jwt = require('jsonwebtoken');

const secret = 'thesearenotthedroidsyouarelookingfor'

async function getToken(s) {
    return await jwt.sign(s, secret);    
}

//Verify Token
async function verifyToken(req,res,next){
    //Auth header value = > send token into header
    try {
        const bearerHeader = req.headers['authorization'];
        //check if bearer is undefined
        if(typeof bearerHeader === 'undefined'){
            throw 'undefined';
        }
        //split the space at the bearer
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        req.authdata = await jwt.verify(bearerToken, secret)
        //next middleware
        next();
    } catch(err) {
        //Fobidden
        res.sendStatus(403);
    }
}

module.exports = {getToken, verifyToken};