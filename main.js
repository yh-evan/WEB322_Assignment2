//#region REQUIRES --------------------------------------------------------------------------
var express = require("express");
var app = express();
var path = require("path");
var multer = require("multer");
var nodemailer = require("nodemailer");
var bodyParser = require("body-parser");
const bcryptjs = require("bcryptjs");
const clientSessions = require("client-sessions");
const _ = require("underscore");
const fs = require("fs");
const mongoose = require("mongoose");
const PhotoModel = require("./models/photoModel");
const UserModel = require('./models/userModel');
const RoomModel = require('./models/roomModel');
const BookModel = require('./models/bookModel')
const PHOTODIRECTORY = "./public/photos/";
const hbs = require("express-handlebars");
const config = require("./views/js/config.js");
const {
    replaceOne
} = require("./models/photoModel");
const connectionString = config.database_connection_string;
const HTTP_PORT = process.env.PORT || 8080;

// use bluebird promise library with mongoose
mongoose.Promise = require("bluebird");

//#endregion

//#region CONFIGURATIONS --------------------------------------------------------------------
// call this function after the http server starts listening for requests
function onHttpStartup() {
    console.log("Express Server running on port " + HTTP_PORT);
}

//establish session
app.use(clientSessions({
    cookieName: "session",
    secret: "web322_assignment",
    // duration: 5 * 60 * 1000,
    // activeDuration: 2 * 60 * 1000
}))

app.use(bodyParser.urlencoded({
    extended: false
}));


// setup the static folder that static resources can load from
app.use('/css', express.static('views/css'));
app.use('/img', express.static('views/img'));
app.use('/js', express.static('views/js'));
app.use(express.static("./public"));



// make sure the photos folder exists
// if not create it
if (!fs.existsSync(PHOTODIRECTORY)) {
    fs.mkdirSync(PHOTODIRECTORY);
}

// multer requires a few options to be setup to store files with file extensions
const STORAGE = multer.diskStorage({
    destination: PHOTODIRECTORY,
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

// Register handlerbars as the rendering engine for views
app.engine('.hbs', hbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.get("/", function (req, res) {
    res.render('index', {
        layout: false
    })
});


// connect to your mongoDB database
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// log when the DB is connected
mongoose.connection.on("open", () => {
    console.log("Database connection open.");
});

//#endregion

//#region ROUTES ----------------------------------------------------------------------------
app.get("/index.html", function (req, res) {
    res.render('index', {
        user: req.session.user,
        layout: false
    })
});

app.get("/list.html", function (req, res) {
    RoomModel.find()
        .lean()
        .exec()
        .then((room) => {
            res.render('list', {
                rooms: room,
                user: req.session.user,
                layout: false
            })
        })
});

app.get("/detail.html", function (req, res) {
    res.render('detail', {
        user: req.session.user,
        layout: false
    })
});

app.get("/detail:roomId", function (req, res) {
    const roomID = req.params.roomId;

    RoomModel.findOne({
            _id: roomID
        })
        .lean()
        .exec()
        .then((room) => {
            res.render('detail-variable', {
                user: req.session.user,
                room: room,
                layout: false
            })
        })
        .catch((err) => {
            console.log("not found", err)
        })
});

app.get("/payment.html", function (req, res) {
    res.render('payment', {
        user: req.session.user,
        layout: false
    })
});

app.get("/upload.html", function (req, res) {
    res.render('upload', {
        user: req.session.user,
        layout: false
    })
});

app.get("/register_user.html", function (req, res) {
    res.render('register_user', {
        layout: false
    })
});

app.get("/logout", function (req, res) {
    req.session.reset();
    res.render('index', {
        user: req.session.user,
        layout: false
    });
})

app.get("/dashboard.html", checkLogin, checkAdmin, function (req, res) {
    BookModel.find({username: req.session.user.username})
    .lean()
    .then((booking => {
        res.render('dashboard', {
            user: req.session.user,
            booking: booking,
            layout: false
        })
        console.log(booking);
    }))
})

app.get("/upload", checkLogin, Admin, function (req, res) {
    res.render('upload', {
        user: req.session.user,
        layout: false
    })
})

//#endregion

//#region SECURITY --------------------------------------------------------------------------
function checkLogin(req, res, next) {
    if (!req.session.user) {
        res.render('index', {
            errorMsg: "Please login here.",
            layout: false
        });
    } else {
        next();
    }
}

function checkAdmin(req, res, next) {
    if (req.session.user.isAdmin) {
        UserModel.find({})
            .lean()
            .exec()
            .then((members => {
                RoomModel.find()
                    .lean()
                    .exec()
                    .then((room) => {
                        res.render("dashboard-admin", {
                            user: req.session.user,
                            members: members,
                            rooms: room,
                            layout: false
                        })
                    })
            }));
    } else {
        next();
    }
}

function Admin(req, res, next) {
    if (!req.session.user.isAdmin) {
        res.render('index', {
            errorMsg: "Please login here.",
            layout: false
        });
    } else {
        next();
    }
}

app.post("/booking:roomId", UPLOAD.single("upload"), function (req, res) {
    if (!req.session.user) {
        res.render('index', {
            errorMsg: "Please login here.",
            layout: false
        });
    } else {
        const roomID = req.params.roomId;
        RoomModel.findOne({_id: roomID})
            .lean()
            .exec()
            .then((room) => {
                const bookMetadata = new BookModel({
                    username: req.session.user.username,
                    checkin: req.body.checkin,
                    checkout: req.body.checkout,
                    postal: room.postal,
                    address: room.address,
                    price: room.price,

                })
                bookMetadata.save((err) => {
                    if (err) {
                        console.log("Error!", err);
                    } else {
                        res.render('payment', {
                            user: req.session.user,
                            layout: false
                        })
                    }
                })
            })
    }

})

//Photo uploading
app.post("/addRoom", UPLOAD.single("thumbnail"), function (req, res) {
    const fileData = req.file;

    const roomMetadata = new RoomModel({
        _id: req.body._id,
        title: req.body.title,
        price: req.body.price,
        bedroom: req.body.bedroom,
        sleeps: req.body.sleeps,
        bathroom: req.body.bathroom,
        email: req.body.email,
        phone: req.body.phone,
        postal: req.body.postal,
        address: req.body.address,
        thumbnail: req.file.filename,
        moreComment: req.body.moreComment,
        type: req.body.type,
        createOn: req.body.createOn
    })
    roomMetadata.save((err) => {
        if (err) {
            console.log("Error!", err);
        } else {
            console.log("Room was created successfully!")
            UserModel.find()
                .lean()
                .exec()
                .then((members) => {
                    RoomModel.find()
                        .lean()
                        .exec()
                        .then((room) => {
                            res.render("dashboard-admin", {
                                user: req.session.user,
                                members: members,
                                rooms: room,
                                layout: false
                            })
                        })
                });
        }
    })
});



//User registration
app.post("/user-register", UPLOAD.single("upload"), function (req, res) {

    UserModel.findOne({
            username: req.body.username
        })
        .exec()
        .then((usr) => {
            if (usr) {
                res.render("register_user", {
                    errorMsg: "User name has been taken, try other.",
                    fname: req.body.fname,
                    lname: req.body.lname,
                    email: req.body.email,
                    phone: req.body.phone,
                    postal: req.body.postal,
                    address: req.body.address,

                    layout: false
                })
            } else {
                const userData = new UserModel({
                    username: req.body.username,
                    password: bcryptjs.hashSync(req.body.password),
                    fname: req.body.fname,
                    lname: req.body.lname,
                    email: req.body.email,
                    phone: req.body.phone,
                    postal: req.body.postal,
                    address: req.body.address
                })

                userData.save((err) => {
                    if (err) {
                        console.log("Error!", err);
                    } else {
                        console.log("User was saved successfully!")
                    }
                })

                req.session.user = {
                    username: req.body.username,
                    password: bcryptjs.hashSync(req.body.password),
                    fname: req.body.fname,
                    lname: req.body.lname,
                    email: req.body.email,
                    phone: req.body.phone,
                    postal: req.body.postal,
                    address: req.body.address
                }


                var emailOptions = {
                    from: 'web322evan@gmail.com',
                    to: req.body.email,
                    subject: 'Welcome to C&C!',
                    html: '<p>Hello ' + req.body.fname + '</p><p>Thank-you for to be a member of our big family!</p>'

                }

                transporter.sendMail(emailOptions, (error, info) => {
                    if (error) {
                        console.log("ERROR: " + error);
                    } else {
                        console.log("SUCCESS: " + info.response);
                    }
                })

                res.render('dashboard', {
                    user: req.session.user,
                    layout: false
                })
            }
        })

});


app.post("/login-Home", UPLOAD.single("upload"), function (req, res) {
    const username = req.body.uname;
    const password = req.body.pword;

    if (username === "" || password === "") {
        return res.render("index", {
            errorMsg: "Missing Credentials.",
            layout: false
        })
    };

    UserModel.findOne({
            username: username
        })
        .exec()
        .then((usr) => {
            if (!usr) {
                res.render("index", {
                    errorMsg: "Account does not exist!",
                    layout: false
                })
            } else {
                if (username === usr.username && bcryptjs.compareSync(password, usr.password)) {
                    req.session.user = {
                        username: usr.username,
                        password: usr.password,
                        fname: usr.fname,
                        lname: usr.lname,
                        email: usr.email,
                        phone: usr.phone,
                        postal: usr.postal,
                        address: usr.address,
                        isAdmin: usr.isAdmin
                    }
                    if (usr.isAdmin) {
                        UserModel.find({})
                            .lean()
                            .then((members => {
                                RoomModel.find()
                                    .lean()
                                    .then(room => {
                                        res.render('dashboard-admin', {
                                            user: req.session.user,
                                            rooms: room,
                                            members: members,
                                            layout: false
                                        })
                                    })
                                console.log(members);
                            }))
                        console.log("Hello administrator!");
                    } else {
                        res.render("index", {
                            user: req.session.user,
                            layout: false
                        })
                    }
                } else {
                    res.render("index", {
                        errorMsg: "Login and password does not match!",
                        layout: false
                    })
                };
            };
        });
});



//#endregion


app.listen(HTTP_PORT, onHttpStartup);