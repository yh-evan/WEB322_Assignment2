// require mongoose and setup the Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// use bluebird promise library with mongoose
mongoose.Promise = require("bluebird");

// define the photo schema
const photoSchema = new Schema({
  "filename": {
    type: String,
    unique: true
  },
  "username": String,
  "email": String,
  "caption": String,
  "createdOn": {
    type: Number,
    default: Date.now,
  }
});

module.exports = mongoose.model("web322_assignment_photos", photoSchema);