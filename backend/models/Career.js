const mongoose = require("mongoose");

const CareerSchema = new mongoose.Schema({
    title: String,
    skills: [String],
    resources: [
        {
            subject: String,
            youtube: [String],
            pdfs: [String]
        }
    ]
});

module.exports = mongoose.model("Career", CareerSchema);