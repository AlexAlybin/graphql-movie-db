const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    name: String,
    genre: String,
    authorId: String
})

module.exports = mongoose.model("Movie", movieSchema)