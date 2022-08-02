import { User } from "../models/index.js";
import {
    generatePassword,
    issueJWT,
    validatePassword,
} from "../../config/index.js";

class UserController {
    // login
    // [POST]
    async login(req, res) {
        console.log(`Authenticating user!\n`);
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user)
                res.status(401).json({
                    success: false,
                    msg: `There is no user with the given username!`,
                });
            else {
                if (!validatePassword(req.body.password, user.hash, user.salt))
                    res.status(403).json({
                        success: false,
                        msg: `Your password is incorrect, please try again!`,
                    });
                else {
                    const jwt = issueJWT(user);
                    res.status(200).json({
                        success: true,
                        msg: `You are authenticated!`,
                        token: jwt,
                    });
                }
            }
        } catch (err) {
            res.status(401).json({
                success: false,
                msg: `Something happend while identifying you!`,
            });
            console.log(`Error detected while authenticating user!\n`);
        }
    }
}

export default UserController;
