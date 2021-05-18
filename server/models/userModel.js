import mongoose from 'mongoose';
const { Schema } = mongoose;

export const UserSchema = new Schema({
  ownedItems: [{
    dateAdded: { type: Date, default: Date.now },
    itemID: {type: mongoose.ObjectId, ref: "Item"},
    format: [String],
    userTag: [String]
  }],
  password: String,
  username: {
    type: String,
    unique: true
  }
});