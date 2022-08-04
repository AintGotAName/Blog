import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import { connectDatabase, useMiddlewares } from "./config/index.js";

const app = express();
dotenv.config();

const port = process.env.PORT || 8000;

connectDatabase(mongoose, process.env.DATABASE_CONNECTION);
useMiddlewares(app, [
    cors(),
    express.json(),
    express.urlencoded({ extended: false }),
]);
app.get("/", (req, res) => {
    res.json({ status: "haiz" });
});

app.listen(port, () => {
    console.log(`App listening or port ${port}\n`);
});
