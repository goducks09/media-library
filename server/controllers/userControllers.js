import mongoose from 'mongoose';
import { UserSchema } from "../models/userModel";

const User = mongoose.model('User', UserSchema);

// Add a new user
export const addNewUser = (req, res) => {
    const newUser = { username: req.body.username };
};

// On login, get user data and store in context
export const getUserData = (req, res) => {
    User.findOne({ username: req.body.userID }, (err, user) => {
        if (err) {
            res.send(err);
        } else if (user === null || user === undefined) {
            res.send({ message: 'User not found' });
        } else {
            res.json(user);
        }
    });
};

// Delete a user