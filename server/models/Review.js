const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    review: {
        type: String,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Review', ReviewSchema);