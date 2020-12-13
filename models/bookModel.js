// require mongoose and setup the Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// use bluebird promise library with mongoose
mongoose.Promise = require("bluebird");

// define the photo schema
const bookSchema = new Schema({
  "username": String,
  "checkin": Date,
  "checkout": Date,
  "postal": String,
  "address": String,
  "price": Number,
  "createdOn": {
    type: Date,
    default: Date.now,
  },
  
});

module.exports = mongoose.model("web322_assignment_book", bookSchema);