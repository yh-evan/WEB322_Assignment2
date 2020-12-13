// require mongoose and setup the Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// use bluebird promise library with mongoose
mongoose.Promise = require("bluebird");

// define the photo schema
const userSchema = new Schema({
  "username": {
    type: String,
    unique: true
  },
  "password": String,
  "fname": String,
  "lname": String,
  "email": String,
  "phone": String,
  "postal": String,
  "address": String,
  "createdOn": {
    type: Date,
    default: Date.now,
  },
  "isAdmin": {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("web322_assignment_user", userSchema);