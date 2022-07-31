import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

import { connectDatabase } from "./config/index.js";

const app = express();
const port = process.env.PORT || 8000;

dotenv.config();
connectDatabase(mongoose, process.env.DATABASE_CONNECTION);

app.listen(port, () => {
    console.log(`App listening or port ${port}`);
});
