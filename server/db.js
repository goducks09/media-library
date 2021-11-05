import express from 'express';
import mongoose from 'mongoose';
import apiRoutes from "./routes/apiRoutes";
import itemRoutes from "./routes/itemRoutes";
import userRoutes from "./routes/userRoutes";
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

//if there are cors errors, npm i cors
// app.use(cors());

//mongoDB connection
mongoose.connect(process.env.ATLAS_URI);

//express setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
apiRoutes(app);
itemRoutes(app);
userRoutes(app);

app.listen(port, () => {
    console.log(`Server started on port ${port}!`);
});