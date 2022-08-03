import { User, Blog } from "../models/index.js";
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
            await newUser.save();
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

// get another user's information
// [GET]
const getInfo = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        res.status(200).json({
            success: true,
            msg: `Get user's information successfully!`,
            user: {
                username: user.username,
                _id: user._id,
                blogsList: user.blogsList,
                followers: user.followers,
                following: user.following,
            },
        });
    } catch (err) {
        console.log(`Error detected while getting user's information!\n`);
        res.status(404).json({ success: false, msg: `Cannot found the user!` });
    }
};

// get user's information
// [GET]
const myInfo = async (req, res) => {
    console.log(`Getting my information!\n`);
    if (req.user)
        res.status(200).json({
            success: true,
            msg: `Get my information successfully`,
            user: req.user,
        });
    res.status(404).json({
        success: false,
        msg: `Something happend while getting your information!`,
    });
};

// change user's information
// [PUT]
const updateInfo = async (req, res) => {
    console.log(`Changing user's information!\n`);
    try {
        const user = req.user;
        const newPassword = generatePassword(req.body.password);
        user.hash = newPassword.hash;
        user.salt = newPassword.salt;
        user.information = req.body.information;
        await user.save();
        res.status(200).json({
            success: true,
            msg: `Your information is updated successfully!`,
        });
    } catch (err) {
        console.log(`Error detected while updating user!\n`);
        res.status(409).json({
            success: false,
            msg: `Something happend while updating your information!`,
        });
    }
};

// follow another user
// [PUT]
const follow = async (req, res) => {
    console.log(`You will following a user!\n`);
    try {
        const toFollow = await User.findById(req.params._id);
        req.user.following.push(toFollow._id);
        toFollow.followers.push(req.user._id);
        await req.user.save();
        await toFollow.save();
        res.status(200).json({
            success: true,
            msg: `You have followed a user!`,
        });
    } catch (err) {
        console.log(`Error detected while following a user!\n`);
        res.status(409).json({
            success: false,
            msg: `Something happened while following another user!`,
        });
    }
};

// save a post
// [PUT]
const save = async (req, res) => {
    console.log(`Saving a post!\n`);
    try {
        const post = await Blog.findById(req.params.id);
        req.user.saved.push(post._id);
        post.saved += 1;
        await req.user.save();
        await post.save();
        res.status(200).json({
            success: true,
            msg: `Save a post successfully!`,
        });
    } catch (err) {
        console.log(`Erroe detected while saving a post!\n`);
        res.status(409).json({
            success: false,
            msg: `Something happend while saving a post!`,
        });
    }
};

export { login, register, getInfo, myInfo, updateInfo, follow, save };
