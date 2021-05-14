import mongoose from 'mongoose';
import { ItemSchema } from "../models/itemModel";
import { UserSchema } from "../models/userModel";

const Item = mongoose.model('Item', ItemSchema);
const User = mongoose.model('User', UserSchema);

export const addNewItem = async (req, res) => {
    let item = await findItem(req);
    // If item doesn't already exist, add to DB
    if (!item) {
        item = await Item.create(req.body.item);
    }
    
    // format item to match MongoDB model
    const itemToAdd = {
        format: req.body.format,
        pictureQuality: req.body.pictureQuality,
        itemID: item._id
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
            res.send({ message: 'Item added successfully!', userItems: saveResult.ownedItems })
            : res.send({ message: 'There was an error. Please try again' });
    } else {
        res.send({ message: 'This item is already in your library' })
    }
};

const findItem = async (req) => {
    // Check if Item has already been added to DB
    const search = Item.findOne({ tmdbID: req.body.item.tmdbID });
    return await search.exec();
};


// Populate allows for referencing of nested item subdocuments. This references each user item to access title, actors, etc.
export const getAllUserItems = async (req, res) => {
    const getItems = await User.findById(req.body.userID);
    
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

//     if (req.body.item) {
//         await get();
//        return populate.ownedItems;
//     } else {
//         res.json(populate.ownedItems);
//     }
    
};

export const getSingleUserItem = (req, res) => {
    Item.findById(req.params._id, (err, item) => {
        if (err) {
            res.send(err);
        }
        res.json(item);
    });
};