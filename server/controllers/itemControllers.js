import mongoose from 'mongoose';
import { body, param } from 'express-validator';
import { ItemSchema } from "../models/itemModel";
import { UserSchema } from "../models/userModel";

const Item = mongoose.model('Item', ItemSchema);
const User = mongoose.model('User', UserSchema);

// POST route for adding a new item to user
export const addNewItem = async (req, res) => {
    await body('media').escape().run(req);
    await body('quality').escape().run(req);
    await body('userID').escape().run(req);

    let item = await findItem(req);
    // If item doesn't already exist, add to DB
    if (!item) {
        item = await Item.create(req.body.item);
    }
    
    // format item to match MongoDB model
    const itemToAdd = {
        itemID: item._id,
        mediaType: req.body.media,
        pictureQuality: req.body.quality
    };
    // Get all user's items and see if item already exists
    const userItems = await getAllUserItems(req);
    const userOwned = userItems['ownedItems'].some(e => {
        const owned = e.itemID._id.toString();
        const check = itemToAdd.itemID.toString();
        return owned == check;
    });

    // save item to user on Mongo if it's not already in collection
    if (!userOwned) {
        const saveResult = await User.findOneAndUpdate({ _id: req.body.userID }, { $push: { ownedItems: itemToAdd } }, { new: true })
            .populate({
                path: 'ownedItems',
                populate: {
                    path: 'itemID'
                }
            });
        saveResult ?
            // send over only the newly added item
            res.send({ message: 'Item added successfully!', newItem: saveResult.ownedItems[saveResult.ownedItems.length - 1] })
            : res.send({ message: 'There was an error. Please try again' });
    } else {
        res.send({ message: 'This item is already in your library' })
    }
};


// Helper function to check if Item has already been added to DB
const findItem = async (req) => {
    await body('tmdbID').escape().run(req);
    const search = Item.findOne({ tmdbID: req.body.item.tmdbID });
    return await search.exec();
};

// GET route for retrieving all user items
export const getAllUserItems = async (req, res) => {
    await body('userID').escape().run(req);
    const getItems = await User.findById(req.body.userID);
    
    // Populate allows for referencing of nested item subdocuments. This references each user item to access title, actors, etc.
    if (req.body.item) {
        const items = await getItems.populate({
            path: 'ownedItems',
            populate: {
                path: 'itemID'
            }
        });
        return items;
    } else {
        const items = await getItems.populate({
            path: 'ownedItems',
            populate: {
                path: 'itemID'
            }
        });
        res.json(items);
    }    
};

// GET route for retrieving information of a single item
export const getSingleUserItem = async (req, res) => {
    await param('_id').escape().run(req);
    Item.findById(req.params._id, (err, item) => {
        if (err) {
            res.send({ message: 'Item not found' });
        }
        res.json(item);
    });
};

// PUT route for editing a single user item
export const editUserItem = async (req, res) => {
    await body('media').escape().run(req);
    await body('quality').escape().run(req);
    await body('userID').escape().run(req);
    await param('_id').escape().run(req);
    const { media, quality, userID } = req.body;
    User.findById(userID)
        .populate({
            path: 'ownedItems',
            populate: {
                path: 'itemID'
            }
        })
        .exec((err, user) => {
            if (err) {
                res.send({ message: 'User not found'});
            }
            const item = user.ownedItems.id(req.params._id);
            item.mediaType = media;
            item.pictureQuality = quality;
            user.save().then(result => {
                result ? res.send({ message: 'Item updated!', updatedItem: item }) : res.send({ message: 'Database Error. Please try again.' });
        });
    });
};

// DELTE route for removing item from user
export const deleteUserItem = async (req, res) => {
    await body('userID').escape().run(req);
    await param('_id').escape().run(req);
    const { userID } = req.body;
    const saveResult = await User.findOneAndUpdate({ _id: userID }, { $pull: { ownedItems: { _id: req.params._id } } })
        .populate({
            path: 'ownedItems',
            populate: {
                path: 'itemID'
            }
        });
    saveResult ? res.send({ message: 'Item deleted!' }) : res.send({ message: 'Database Error. Please try again.' });
};