import mongoose from 'mongoose';
import { ItemSchema } from "../models/itemModel";
import { UserSchema } from "../models/userModel";

const Item = mongoose.model('Item', ItemSchema);
const User = mongoose.model('User', UserSchema);


export const addNewItem = async (req, res) => {
    // Get user for later use
    let currentUser;
    await User.findById(req.body.userID, (err, user) => {
        if (err) {
            res.send(err);
        }

        currentUser = user;
    });

    // Check if Item has already been added to DB
    Item.findOne({ tmdbID: req.body.tmdbID }, (err, item) => {
        if (err) res.send(err);

        // If item doesn't already exist, add to DB
        if (!item) {
            const newItem = new Item(req.body);

            newItem.save((err, item) => {
                if (err) res.send(err);
            });

            //Since the item wasn't in the DB, user couldn't already own. Add to user
            currentUser.ownedItems.push({
                format: newItem.format,
                itemID: newItem._id
            });
            currentUser.save((err, user) => {
                res.send(err ? err : { message: 'Item added to your library!' });
            });
        // Else check if user already owns item and add if not
        } else {
            const userOwned = currentUser.ownedItems.some(e => e.item === item.itemID);

            if (!userOwned) {
                currentUser.ownedItems.push({
                    format: req.body.format,
                    itemID: item._id
                });
                currentUser.save((err, user) => {
                    res.send(err ? err : { message: 'Item added to your library!' });
                });
            } else {
                res.send({ message: 'This item is already in your library' })
            }
        }
    });   
};

// Populate allows for referencing of nested item subdocuments. Can then reference properties of each item.
export const getAllUserItems = (req, res) => {
    User.findById(req.body.userID)
        .populate({
            path: 'ownedItems',
            populate: {
                path: 'itemID'
            }
        })
        .exec((err, user) => {
        res.json(user.ownedItems);
    });
};

export const getSingleUserItem = (req, res) => {
    Item.findById(req.params._id, (err, item) => {
        if (err) {
            res.send(err);
        }
        res.json(item);
    });
};