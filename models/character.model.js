const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    id: { type: Number },
    name: { type: String },
    status: { type: String },
    species: { type: String },
    type: { type: String },
    gender: { type: String },
    origin: {
        name: { type: String },
        url: { type: String },
    },
    location: {
        name: { type: String },
        url: { type: String },
    },
    image: { type: String },
    episode: [String],
    url: { type: String },
    created: { type: String },
    eloRating: { type: Number, default: 1000 }
});

module.exports = mongoose.model('character', CharacterSchema, 'characters');