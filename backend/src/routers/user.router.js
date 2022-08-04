import { Router } from "express";
import { authenticationMiddleware } from "../../config/authentication.js";

import {
    getInfo,
    login,
    register,
    myInfo,
    updateInfo,
    follow,
    unfollow,
    save,
    unsave,
    likePost,
    create,
} from "../controllers/user.controller.js";

const UserRouter = Router();

UserRouter.post("/login", login)
    .post("/register", register)
    .get("/:username", getInfo)
    .use("/", authenticationMiddleware)
    .get("/", myInfo)
    .put("/", updateInfo)
    .put("/follow/:username", follow)
    .put("/unfollow/:username", unfollow)
    .put("/save/:id", save)
    .put("unsave/:id", unsave)
    .put("/like/:id", likePost)
    .post("/create", create);

export default UserRouter;
