import { addNewUser, deleteUser, getUserData, updateUserCredentials } from "../controllers/userControllers";

const userRoutes = app => {
    app.route('/login')
        .post(getUserData)
    
    app.route('/signup')
        .post(addNewUser);
    
    app.route('/update')
        .post(updateUserCredentials);
    
    app.route('/delete')
        .delete(deleteUser);
};

export default userRoutes;