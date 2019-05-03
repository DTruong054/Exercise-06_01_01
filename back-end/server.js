var express = require('express');
var app = express();
var port = 8080;
var bodyParser = require('body-parser');
//Not grabbing all of mongodb, just grabbing one class of it
// var mongo = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var DBName = "test";
var url = "mongodb://localhost:27017/" + DBName;

//Calling in models from another folder
var auth = require('./controllers/auth');
var message = require('./controllers/message');
//todo fix the checkauth, there is an error exporting it
var checkAuth = require('./services/checkauth');
var cors = require('./services/cors');


//mounting as middleware
app.use(bodyParser.json())


//building more middleware to fix cross origin error
app.use(cors);


app.get('/api/message', message.get);

//creating an Endpoint
//Just mounted the checkAuth middleware, and this will activate before the code after
app.post('/api/message', checkAuth, message.post);

app.post('/auth/register', auth.register);



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
});

//Can bring in the server in one line instead of a whole file
var server = app.listen(port, () => {
    console.log("Server is listening on %s", port);
});