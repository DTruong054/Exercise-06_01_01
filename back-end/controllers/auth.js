var User = require('../Models/user');
var jwt = require('jwt-simple');
var moment = require('moment');


module.exports = {
    register: (req, res) => {
    console.log(req.body);
    //A method that user owns. This can be used by just calling it's class. Classes are blurprints that can be instaniated
    //findOne: Returns one document that satisfies the specified query criteria on the collection or view.
    //Matching the emaill to see if the email already exists within the database
    User.findOne({email: req.body.email},(err, existingUser) => {
        if (existingUser) {
            return res.status(409).send({message: "Email is already in use"});
        }
        var user = new  User(req.body);
        //Lets the user object save itself
        user.save((err, result) =>{
            //If the database can't save a record
            if (err) {
                return res.status(500).send({message: err.message})
            } else {
                //If there is no error, set status to 200
                res.status(200).send({token: createToken(user)});
            }
        });
    })
    },
    login: (req, res) => {
        User.findOne({email: req.body.email }, (err ,user) => {
            if (!user) {
                //Not finding a ussr is not an error
                return res.status(401).send({message: "Email or password is incorrect"})
            }
            if (req.body.pwd == user.pwd) {
                console.log(req.body, user.pwd);
                res.status(200).send({token: createToken(user)})
            } else {
                return res.status(401).send({message: "The email you have entered is incorrect, or could it be your password???"})
            }
        })
    }
}

//Building a function that will create a token
function createToken(user) {
    //Creating a payload 
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        expire: moment().add(14, 'days').unix
    }
    return jwt.encode(payload, 'secret');
}