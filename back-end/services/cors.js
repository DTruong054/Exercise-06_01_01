module.exports = (req, res, next) => {
    //CorS error is a http violation error.
    //We are responding to our browsers with permissions.
    //Going to mount all the middleware after the root since there is no specifed position
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    //Tells it to go on and finish
    next();
}