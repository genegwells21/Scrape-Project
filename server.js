var express = require("express");
var bodyParser = require("body-parser");
var logger  = require("morgan");
var mongoose = require("mongoose");
var Note = require("./models/Note.js");
var Article =  require(".models/Note.js");
var request = require("request");
var cheerio = require("cheerio");

mongoose.Promise = Promise;

var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false}));

app.use(express.static("public"));

mongoose.connect("mongodb://heroku_5l4zf6t0:c4s25tbp3p4j3ljnvbcul8u3go@ds157040.mlab.com:57040/heroku_5l4zf6t0");
var db = mongoose.connection;

db.on("error", function(error)  {
    console.log("Mongoose Error: ", error);
});

db.once("open", function()  {
    console.log("Mongoose connection successful.");
});

app.get("/scrape", function(req, res)   {
        request("http://www.espn.com/college-football/team/_/id/248/houston-cougars", function(error, response, html) {
var $ = cheerio.load(html);
    
$("article h1").each(function(i, element)   {

var result = [];
var entry = new Article(result);
    console.log(entry);

entry.save(function(err, doc)   {
    if (err)    {
        console.log(err);
    }

    else    {
        console.log(doc);
}
});
});
});

res.send("Scrape Complete");
});
app.get("/articles", function(res, res) {
Article.findOne({ "_id": req.params.id})
.populate("note")

.exec(function(error, doc)  {

if(error)   {
    console.log(error);
}
else{
    res.json(doc);
}
});
});

app.post("/articles/:id", function(req, res)    {
    var newNote = new Note(req.body);
newNote.save(function(error, doc)   {

if(error)   {
    console.log(error);
}

else    {
    Article.fineOneAndUpdate({ "_id": req.params.id }, {"note": doc._id})
.exec(function(err, doc)    {
if(err) {
    console.log(err);
}
else{
    res.send(doc);
}
});
}
});
});

app.listen(process.env.PORT || 3000, function() {
    console.log("App running on port 3000!");
});
