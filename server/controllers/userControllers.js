import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
const fetch = require('node-fetch');
import { UserSchema } from "../models/userModel";

const User = mongoose.model('User', UserSchema);

// Add a new user
export const addNewUser = async (req, res) => {
    const username = req.body.username;
    const key = await bcrypt.hash(req.body.key, 10);
    User.findOne({ username }, async (err, user) => {
        if (err) {
            res.send({ message: `Sorry, there was an error. Error: ${err}` });
        } else if (user) {
            res.send({ message: 'That email is in use. Try logging in instead.' });
        } else {
            const newUser = await User.create({ username, key });
            newUser ? res.send({ message: 'User added!', userID: newUser._id }) : res.send({ message: 'There was an error creating your account. Please try again.' });
        }
    });
};

// On login, get user data and store in context
export const getUserData = (req, res) => {
    User.findOne({ username: req.body.username })
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
            const verifyKey = bcrypt.compare(req.body.key, user.key);
            if (verifyKey) {
                const userData = {
                    userID: user._id,
                    userItems: user.ownedItems
                }
                res.json({ message: 'Logged In', userData });
            } else {
                res.send({ message: 'Incorrect password. Please try again' });
            }
        }
    });
};

// On login with missing key, verify key with Google, update key for user and login
export const updateUserCredentials = (req, res) => {
    User.findOne({ username: req.body.username })
    .populate({
        path: 'ownedItems',
        populate: {
            path: 'itemID'
        }
    })
    .exec(async (err, user) => {
        if (err) {
            res.status(500).send({ message: `Sorry, there was an error. Error: ${err}` });
        } else if (!user) {
            res.status(404).send({ message: "Sorry, that account doesn't exist. Please try a different one or create one." });
        } else {
            let googleResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
                headers: {
                    Authorization: `Bearer ${req.body.key}`
                },
            });
            if (!googleResponse.ok) {
                res.status(401).send({ message: `Invalid Google credentials. Please try again.` });
            } else {
                user.key = await bcrypt.hash(req.body.key, 10);
                await user.save();
                const userData = {
                    userID: user._id,
                    userItems: user.ownedItems
                }
                res.json({ message: 'Logged In', userData });
            }
        }
    });
};

// Delete a user
export const deleteUser = (req, res) => {
    User.deleteOne({ _id: req.body.id }, err => {
        if (err) {
            res.status(500).send({ message: `Sorry, there was a server error. Please try again.` });
        } else {
            res.status(200).send({ message: 'Account deleted!' });
        }
    });
};