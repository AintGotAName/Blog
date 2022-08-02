import { User } from "../models/index.js";
import {
    generatePassword,
    issueJWT,
    validatePassword,
} from "../../config/index.js";

// login
// [POST]
const login = async (req, res) => {
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
};

// register
// [POST]
const register = async (req, res) => {
    console.log("Registering new user!\n");
    try {
        const username = req.body.username;
        const user = await User.findOne({ username: username });
        if (user)
            res.status(409).json({
                success: false,
                msg: `There is a user with the given username, please try another username!`,
            });
        else {
            const password = generatePassword(req.body.password);
            const newUser = new User({
                username: username,
                hash: password.hash,
                salt: password.salt,
                information: {},
                blogsList: [],
                followers: [],
                following: [],
                saved: [],
            });
            newUser.save();
            const jwt = issueJWT(newUser);
            res.status(201).json({
                success: true,
                msg: `New user created successfully!`,
                token: jwt,
            });
        }
    } catch (err) {
        console.log(`Error detected while creating new user!\n`);
        res.status(401).json({
            success: false,
            msg: `Something happend while registering new user!`,
        });
    }
};

export { login, register };
