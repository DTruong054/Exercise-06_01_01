var express = require('express');
var app = express();
var port = 8080;
var bodyParser = require('body-parser');
//Not grabbing all of mongodb, just grabbing one class of it
// var mongo = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var DBName = "test";
var url = "mongodb://localhost:27017/" + DBName;

//Calling a method of mongoose to instantiate an object
var Message = mongoose.model('Message', {
    msg: String
});


//mounting as middleware
app.use(bodyParser.json())


//building more middleware to fix cross origin error
app.use((req, res, next) => {
    //CorS error is a http violation error.
    //We aare responding to our browsers with permissions.
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    //Tells it to go on and finish
    next();
});


app.get('/api/message', GetMessages);

//creating an Endpoint
app.post('/api/message', (req, res) => {
    console.log(req.body);
    var message = new Message(req.body);
    message.save();

    //Must formulate a response or infinite loop
    res.status(200);
});

//Starting to build Crud objects
function GetMessages(req, res) {
    //Grabbing all data from database
    //Chained into an exec (Execute) call
    Message.find({}).exec((err, result) =>{
        res.send(result);
    });
}

//Creates a connection to a MongoDB instance and returns the reference to the database. However, in most cases, use the Mongo() object and its getDB() method instead.
mongoose.connect(url, (err, databaseEngine) => {
    //Error trapping
    if (err) {
        return console.log("Error: " + err);
    }

    console.log("Connected to Database: " + DBName);
    //let us pick the document collection tha2t we want (MONGODB)
    // database.collection('messages').insertOne({'msg:': 'test'});

    //Returning a JSON array of raw data
    // GetMessages();
})

//Can bring in the server in one line instead of a whole file
var server = app.listen(port, () => {
    console.log("Server is listening on %s", port);
});