import { addNewUser, getUserData } from "../controllers/userControllers";

const userRoutes = app => {
    app.route('/login')
        .post(getUserData)
    
    app.route('/signup')
        .post(addNewUser);
};

export default userRoutes;