import express from "express";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`App listening or port ${port}`);
});
