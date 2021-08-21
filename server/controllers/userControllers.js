import mongoose from 'mongoose';
import { UserSchema } from "../models/userModel";

const User = mongoose.model('User', UserSchema);

// Add a new user
export const addNewUser = (req, res) => {
    User.findOne({ username: req.body.userName }, async (err, user) => {
        if (err) {
            res.send({ message: `Sorry, there was an error. Error: ${err}` });
        } else if (user) {
            res.send({ message: 'Sorry, that email is already in use. Try logging in instead.' });
        } else {
            const newUser = await User.create({ username: req.body.userName });
            newUser ? res.send({ message: 'User added!', userID: newUser._id }) : res.send({ message: 'There was an error creating your account. Please try again.' });
        }
    });
};

// On login, get user data and store in context
export const getUserData = (req, res) => {
    User.findOne({ username: req.body.userName })
    .populate({
        path: 'ownedItems',
        populate: {
            path: 'itemID'
        }
    })
    .exec((err, user) => {
        if (err) {
            res.send({message: err});
        } else if (user === null || user === undefined) {
            res.send({ message: 'User not found. Please create an account' });
        } else {
            const userData = {
                userID: user._id,
                userItems: user.ownedItems
            }
            res.json({ message: 'Logged In', userData });
        }
    });
};

// Delete a user
export const deleteUser = (req, res) => {
    console.log('request');
    User.deleteOne({ _id: req.body.id }, err => {
        if (err) {
            res.status(500).send({ message: `Sorry, there was a server error. Please try again.` });
        } else {
            res.status(200).send({ message: 'Account deleted!' });
        }
    });
};