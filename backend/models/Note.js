const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  content: String
});

module.exports = mongoose.model("Note", noteSchema);
