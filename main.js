var express = require("express");
var app = express();
var path = require("path");

var HTTP_PORT = process.env.PORT || 8080;

function onHttpStartup() {
    console.log("Express Server running on port " + HTTP_PORT);
}

app.get("/", function(req, res){
    // res.send("Hello World<br/><a href='/about'>Go to the about page</a>");
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/index.html", function(req, res){
    // res.send("Hello World<br/><a href='/about'>Go to the about page</a>");
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/list.html", function(req,res){
    // res.send("<h2>About Page</h2><p><a href = '/'>Return to homepage</a>");
    res.sendFile(path.join(__dirname, "/list.html"));
});

app.get("/detail.html", function(req,res){
    res.sendFile(path.join(__dirname, "/detail.html"));
});

app.get("/payment.html", function(req,res){
    res.sendFile(path.join(__dirname, "/payment.html"));
});

app.get("/register.html", function(req,res){
    res.sendFile(path.join(__dirname, "/register.html"));
});

app.get("/register_user.html", function(req,res){
    res.sendFile(path.join(__dirname, "/register_user.html"));
});


app.use('/css', express.static('css'));
app.use('/img', express.static('img'));
app.use('/js', express.static('js'));

app.listen(HTTP_PORT, onHttpStartup);