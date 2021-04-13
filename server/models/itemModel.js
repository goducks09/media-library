import mongoose from 'mongoose';
const { Schema } = mongoose;

export const ItemSchema = new Schema({
    actors: [{
        firstName: String,
        lastName: String,
        fullName: String
    }],
    director: [{
        firstName: String,
        lastName: String,
        fullName: String
    }],
    genre: [String],
    imageURL: String,
    releaseDate: String,
    runTime: Number,
    title: String,
    tmdbID: Number
});