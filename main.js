var express = require("express");
var app = express();
var path = require("path");
var multer = require("multer");
var nodemailer = require("nodemailer");

const hbs = require("express-handlebars");

var HTTP_PORT = process.env.PORT || 8080;

app.engine('.hbs', hbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

const STORAGE = multer.diskStorage({
    destination: "./public/photos",
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const UPLOAD = multer({
    storage: STORAGE
});

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "web322evan@gmail.com",
        pass: 'zzyyhhh1991'
    }
})



function onHttpStartup() {
    console.log("Express Server running on port " + HTTP_PORT);
}

app.get("/", function (req, res) {
    res.render('index', {layout: false})
});

app.get("/index.html", function (req, res) {
    res.render('index', {
        data: user,
        layout: false})
});

app.get("/list.html", function (req, res) {
    res.render('list', {layout: false})
});

app.get("/detail.html", function (req, res) {
    res.render('detail', {layout: false})
});

app.get("/payment.html", function (req, res) {
    res.render('payment', {layout: false})
});

app.get("/register.html", function (req, res) {
    res.render('register', {layout: false})
});

app.get("/register_user.html", function (req, res) {
    res.render('register_user', {layout: false})
});

var user;
var loginUser;
app.post("/register-for-process", UPLOAD.single("upload"), function (req, res) {
    const FORM_DATA = req.body;
    const FILE_DATA = req.file;
    user = req.body;
    res.render('dashboard', {
        data: FORM_DATA,FILE_DATA,
        layout: false
    })

    var emailOptions = {
        from: 'web322evan@gmail.com',
        to: FORM_DATA.email,
        subject: 'Welcome to C&C!',
        html: '<p>Hello ' + FORM_DATA.fname + '</p><p>Thank-you for to be a member of our big family!</p>'
        
    }

    transporter.sendMail(emailOptions, (error, info) => {
        if (error) {
            console.log("ERROR: " + error);
        } else {
            console.log("SUCCESS: " + info.response);
        }
    })
});

app.post("/login-Home", UPLOAD.single("upload"),function (req, res) {
    loginUser = req.body;
    res.render('indexlogin', {
        data: loginUser,
        layout: false
    })
});

app.get("/dashboard.html", function (req, res) {

    res.render('dashboard', {
        data: loginUser,
        layout: false
    })
})

app.get("/index-login.html", function (req, res) {

    res.render('indexlogin', {
        data: user,
        layout: false
    })
})

app.use('/css', express.static('views/css'));
app.use('/img', express.static('views/img'));
app.use('/js', express.static('views/js'));
app.use(express.static("public"));

app.listen(HTTP_PORT, onHttpStartup);