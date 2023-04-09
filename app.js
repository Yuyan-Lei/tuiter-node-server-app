// connect to the tuiter database
import mongoose from "mongoose";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
    || 'mongodb://127.0.0.1:27017/tuiter';
mongoose.connect(
    CONNECTION_STRING
);

import express from 'express';
import cors from 'cors'

import HelloController from "./controllers/hello-controller.js";
import UserController from "./controllers/users/users-controller.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";

const app = express();

// configure cors right after instantiating express
app.use(cors())

// parse JSON from HTTP request body
app.use(express.json());

TuitsController(app);
HelloController(app);
UserController(app);

app.listen(process.env.PORT || 4000);