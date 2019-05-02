var Message = require('../Models/message')

module.exports = {
    get: //Starting to build Crud objects
        (req, res) => {
        //Grabbing all data from database
        //Chained into an exec (Execute) call
        Message.find({}).exec((err, result) =>{
            res.send(result);
        });
    },


    post: (req, res) => {
        console.log(req.body);
        var message = new Message(req.body);
        message.save();
    
        //Must formulate a response or infinite loop
        res.status(200);
    }
}