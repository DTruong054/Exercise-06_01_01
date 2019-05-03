//todo FIX THIS THERE IS AN ERROR IN THIS
var jwt = require('jwt-simple');
var moment = require('moment');


module.export = function checkAuth(req, res, next) {
    //Setting up as middleware function
    //All middleware needs at least a request and a response
    if (!req.header('Authorization')) { //If there is no auth, we will return without doing a next call. We are shutting the route down
        return res.status(401).send({ message: "Please make sure the request has a authorization header."});
    }
    //A .splits breaks a string into componate parts
    var token = req.header('Authorization').split(" ")[1]
    console.log(token);
    
    //going to decode the token
    var payload = jwt.decode(token, 'secret');
    console.log(payload);

    //Testing to see if the token has expired
    if (payload.exp <= moment().unix()) {
        //if the token as expired, the user will now be unauthorized again
        return res.status(401).send({ message: "Token has expired"})
    }

    //Will be putting the user id inside
    req.user = payload.sub;
    //To stop an infinate loop, we need to go to the next function
    next();
}