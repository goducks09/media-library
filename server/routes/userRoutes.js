import { addNewUser, deleteUser, getUserData } from "../controllers/userControllers";

const userRoutes = app => {
    app.route('/login')
        .post(getUserData)
    
    app.route('/signup')
        .post(addNewUser);
    
    app.route('/delete')
        .delete(deleteUser);
};

export default userRoutes;