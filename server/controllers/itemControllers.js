import mongoose from 'mongoose';
import { ItemSchema } from "../models/itemModel";
import { UserSchema } from "../models/userModel";

const Item = mongoose.model('Item', ItemSchema);
const User = mongoose.model('User', UserSchema);

// POST route for adding a new item to user
export const addNewItem = async (req, res) => {
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
    const search = Item.findOne({ tmdbID: req.body.item.tmdbID });
    return await search.exec();
};

// GET route for retrieving all user items
export const getAllUserItems = async (req, res) => {
    const getItems = await User.findById(req.body.userID);
    
    // Populate allows for referencing of nested item subdocuments. This references each user item to access title, actors, etc.
    if (req.body.item) {
       return getItems.execPopulate({
            path: 'ownedItems',
            populate: {
                path: 'itemID'
            }
        });
    } else {
        res.json(getItems.populate({
            path: 'ownedItems',
            populate: {
                path: 'itemID'
            }
        }));
    }    
};

// GET route for retrieving information of a single item
export const getSingleUserItem = (req, res) => {
    Item.findById(req.params._id, (err, item) => {
        if (err) {
            res.send(err);
        }
        res.json(item);
    });
};

// PUT route for editing a single user item
export const editUserItem = (req, res) => {
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
                res.send(err);
            }
            const item = user.ownedItems.id(req.params._id);
            item.mediaType = media;
            item.pictureQuality = quality;
            user.save().then(result => {
                result ? res.send({ message: 'Item updated!', updatedItem: item }) : res.send({ message: 'Database Error. Please try again.' });
        });
    });
    // const saveResult = await User.findOneAndUpdate({ _id: req.body.userID }, { $push: { ownedItems: itemToAdd } }, { new: true })
    //         .populate({
    //             path: 'ownedItems',
    //             populate: {
    //                 path: 'itemID'
    //             }
    //         });
    //     saveResult ?
    //         res.send({ message: 'Item added successfully!', userItems: saveResult.ownedItems })
    // User.findByIdAndUpdate(
    //     req.params._id,
    //     // { information to change },
    //     (err, item) => {
    //         if (err) {
    //             res.send({ message: 'Server error. Please try again.' });
    //         } else {
    //             res.send({ message: 'Item updated!' });
    //         }
    //     }
    // );
};

// DELTE route for removing item from user
export const deleteUserItem = async (req, res) => {
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