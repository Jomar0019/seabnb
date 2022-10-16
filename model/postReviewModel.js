const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    postId: {
        type: String
    },
    fullname: {
        type: String
    },
    review: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model("Review", reviewSchema);