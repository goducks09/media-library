import { addNewItem, getAllUserItems, getSingleUserItem } from "../controllers/userControllers";

const routes = app => {
    app.route('/items')
        .get(getAllUserItems)
        .post(addNewItem);
    
    app.route('/items/:_id')
        .get(getSingleUserItem);
};

export default routes;