var express = require('express');
var app = express();
var Busboy = require('busboy');

var validate = require('express-jsonschema').validate;
var mongo_express = require('mongo-express/lib/middleware');
// Import the default Mongo Express configuration
var mongo_express_config = require('mongo-express/config.default.js');
var ResetDatabase = require('./resetdatabase');
var bodyParser = require('body-parser');

app.use('/mongo_express', mongo_express(mongo_express_config));
app.use(express.static('../client/build'));
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var url = 'mongodb://localhost:27017/MatchUp';

MongoClient.connect(url, function(err, db) {

/**
 * Get the user ID from a token. Returns -1 (an invalid ID) if it fails.
 */
function getUserIdFromToken(authorizationLine) {
  try {
    // Cut off "Bearer " from the header value.
    var token = authorizationLine.slice(7);
    // Convert the base64 string to a UTF-8 string.
    var regularString = new Buffer(token, 'base64').toString('utf8');
    // Convert the UTF-8 string into a JavaScript object.
    var tokenObj = JSON.parse(regularString);
    var id = tokenObj['id'];
      if (typeof id === 'string') {
        return id;
      } else {
        // Not a number. Return "", an invalid ID.
        return "";
      }
  } catch (e) {
    // Return an invalid ID.
    return -1;
  }
}

function getCardArray(sid, callback){
  console.log(sid);
  if(sid == 1){
    db.collection('cards').find().toArray(function(err, cardlist){
      if(err) callback(err);
      else callback(null, {cards: cardlist});
    });
  } else db.collection('cards').find({season: sid}).toArray(function(err, cardlist){
      if(err) callback(err);
      else callback(null, {cards: cardlist});
    });
}


app.get ('/card/:sid', function(req, res){
  var sid = req.params.sid;
  getCardArray(sid, function(err, cards){
      if (err) {
        // A database error happened.
        // Internal Error: 500.
        res.status(500).send("Database error: " + err);
      } else if (cards === null) {
        // Couldn't find the feed in the database.
        res.status(400).send("Could not look up cards");
      } else {
        // Send data.
        res.send(cards);
      }
    });
})

app.post('/image', function(req, res) {
  console.log("photo rec");
  var busboy = new Busboy({})
  //var body = req.formData.get("img");
  console.log(req.body);
})


app.post('/postcard', function(req, res) {
  console.log("card rec");
  var body = req.body;
  db.collection('cards').insert(body);
});


app.use(function(err, req, res, next) {
if (err.name === 'JsonSchemaValidation') {
// Set a bad request http response status
res.status(400).end();
} else {
// It's some other sort of error; pass it to next error middleware handler
next(err);
}
});


/// Reset the database.
app.post('/resetdb', function(req, res) {
  console.log("Resetting database...");
  ResetDatabase(db, function() {
    res.send();
  });
});



// Starts the server on port 3000!
app.listen(3000, function () {
console.log('Example app listening on port 3000!');
});

});
