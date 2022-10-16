const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img1: {
        type: String
    },
    img2: {
        type: String
    },
    img3: {
        type: String
    },
    img4: {
        type: String
    },
    img5: {
        type: String
    },
    host: {
        type: String
    },
    lat: {
        type: Number
    },
    lng: {
        type: Number
    }
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);