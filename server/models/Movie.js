const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    movieDBId: {
        type: String,
        required: true,
        unique: true
    },
    posterPath:{
        type: String,
        require: true,
        unique: true
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type:Number,
        default: 0
    },
    reviews: {
        type: [Schema.Types.ObjectId],
        refs: 'Review',
        default: []
    },
})

module.exports = mongoose.model('Movie', MovieSchema);