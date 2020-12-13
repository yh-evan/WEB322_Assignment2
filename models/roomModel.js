// require mongoose and setup the Schema
const mongoose = require("mongoose");
const { stringify } = require("querystring");
const Schema = mongoose.Schema;

// use bluebird promise library with mongoose
mongoose.Promise = require("bluebird");

// define the photo schema
const roomSchema = new Schema({
  "_id": {
    type: Number
  },
  "title": String,
  "price": Number,
  "bedroom": Number,
  "sleeps": Number,
  "bathroom": Number,
  "email": String,
  "phone": String,
  "postal": String,
  "address": String,
  "createdOn": {
    type: Date,
    default: Date.now,
  },
  "thumbnail": {
    type: String,
    unique: true
  },
  "upload1": {
    type: String,
    unique: true
  },
  "upload2": {
    type: String,
    unique: true
  },
  "upload3": {
    type: String,
    unique: true
  },
  "upload4": {
    type: String,
    unique: true
  },
  "master": {
    type: String,
    unique: true
  },
  "second": {
    type: String,
    unique: true
  },
  "third": {
    type: String,
    unique: true
  },
  "type": String,
  "moreComment": String

});

module.exports = mongoose.model("web322_assignment_room", roomSchema);