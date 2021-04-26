import { addNewItem, getAllUserItems, getSingleUserItem } from "../controllers/itemControllers";

const itemRoutes = app => {
    app.route('/items')
        .get(getAllUserItems)
        .post(addNewItem);
    
    app.route('/items/:_id')
        .get(getSingleUserItem);
};

export default itemRoutes;