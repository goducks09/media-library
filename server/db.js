import express from 'express';
import mongoose from 'mongoose';
import routes from "./routes/itemRoutes";
require('dotenv').config();
    
const app = express();
const port = 3000;

//if there are cors errors, npm i cors
//app.use(cors());

//mongoDB connection
mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//express setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
routes(app);

// app.use((req, res, next) => {
//     res.header(
//       "Access-Control-Allow-Origin",
//       "http://localhost:3000/"
//     );
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     res.header(
//       "Access-Control-Allow-Methods",
//       "GET,PUT,DELETE"
//     );
//     res.header(
//       "Access-Control-Allow-Credentials",
//       "true"
//     );
	  
//     next();
// });
  
// app.get('/', (req, res) => {
//     res.json({ message: 'Hello World!' });
// });

app.listen(port, () => {
    console.log(`Server started on port ${port}!`);
});