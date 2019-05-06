var jwt = require('jwt-simple');
var moment = require('moment');


module.exports = function checkAuthenticated(req,res, next){
    //Setting up as middleware function
    //All middleware needs at least a request and a response
    if (!req.header('Authorization')) { //If there is no auth, we will return without doing a next call. We are shutting the route down
        return res.status(401).send({ message: 'please make sure your request has an authorization header.' });
    }
    //A .splits breaks a string into componate parts
    var token = req.header('Authorization').split(' ')[1];
    console.log(token);
    
    //going to decode the token
    var payload = jwt.decode(token, 'secret');
    console.log(payload);

    //Testing to see if the token has expired
    if (payload.exp <= moment().unix()) {
        //if the token as expired, the user will now be unauthorized again
        return res.status(401).send({ message: "Token has expired." });
    }

    //Will be putting the user id inside
    req.user = payload.sub;
    //To stop an infinate loop, we need to go to the next function
    next();
}
