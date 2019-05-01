var User = require('../Models/user');


module.exports = {
    register: (req, res) => {
    console.log(req.body);
    
    var user = new  User(req.body);
    //Lets the user object save itself
    user.save((err, result) =>{
        //If the database can't save a record
        if (err) {
            return res.status(500).send({message: err.message})
        } else {
            //If there is no error, set status to 200
            res.status(200);
        }
    });
    }
}