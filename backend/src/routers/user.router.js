import { Router } from "express";
import { authenticationMiddleware } from "../../config/authentication.js";

import {
    getInfo,
    login,
    register,
    myInfo,
    updateInfo,
    follow,
    save,
} from "../controllers/user.controller.js";

const UserRouter = Router();

UserRouter.post("/login", login)
    .post("/register", register)
    .get("/:username", getInfo)
    .use("/", authenticationMiddleware)
    .get("/", myInfo)
    .put("/", updateInfo)
    .put("/:username", follow)
    .put("/:id", save);

export default UserRouter;
