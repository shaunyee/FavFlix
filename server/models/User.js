const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
    favorites: {
        type: [Schema.Types.ObjectId],
        refs: 'Movie'
    },
    reviews: {
        type: [Schema.Types.ObjectId],
        refs: 'Review',
        default: []
    },
    moviesSeen: {
        type: [Schema.Types.ObjectId],
        refs: 'Movie',
        default: []
    }
});

module.exports = mongoose.model('User', UserSchema);