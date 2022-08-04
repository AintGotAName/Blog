import { User, Blog } from "../models/index.js";
import {
    generatePassword,
    issueJWT,
    validatePassword,
} from "../../config/index.js";

// login
// [POST]
const login = async (req, res) => {
    console.log(`--- login ---\nLogging in!\n`);
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            res.status(401).json({
                success: false,
                msg: `There is no user with the given username!`,
            });
            console.log(`--- login ---\nWrong username!\n`);
        } else {
            if (!validatePassword(req.body.password, user.hash, user.salt)) {
                res.status(403).json({
                    success: false,
                    msg: `Your password is incorrect, please try again!`,
                });
                console.log(`--- login ---\nWrong password!\n`);
            } else {
                const jwt = issueJWT(user);
                res.status(200).json({
                    success: true,
                    msg: `You are authenticated!`,
                    token: jwt,
                });
                console.log(`--- login ---\nLogged in!\n`);
            }
        }
    } catch (err) {
        res.status(401).json({
            success: false,
            msg: `Something happend while identifying you!`,
        });
        console.log(`--- login ---\nError\n`);
    }
};

// register
// [POST]
const register = async (req, res) => {
    console.log("--- register ---\nRegistering!\n");
    try {
        const username = req.body.username;
        const user = await User.findOne({ username: username });
        if (user) {
            res.status(409).json({
                success: false,
                msg: `There is a user with the given username, please try another username!`,
            });
            console.log(`--- register ---\nUser found!\n`);
        } else {
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
            console.log(`--- register ---\nRegistered!\n`);
        }
    } catch (err) {
        res.status(401).json({
            success: false,
            msg: `Something happend while registering new user!`,
        });
        console.log(`--- register ---\nError!\n`);
    }
};

// get another user's information
// [GET]
const getInfo = async (req, res) => {
    console.log(
        `--- getInfo ---\nGetting user with username: ${req.params.username}\n`
    );
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
                information: user.information,
            },
        });
        console.log(`--- getInfo ---\nUser found!\n`);
    } catch (err) {
        res.status(404).json({ success: false, msg: `Cannot found the user!` });
        console.log(`--- getInfo ---\nError!\n`);
    }
};

// get user's information
// [GET]
const myInfo = async (req, res) => {
    console.log(`--- myInfo ---\nGetting my information!\n`);
    if (req.user) {
        res.status(200).json({
            success: true,
            msg: `Get my information successfully`,
            user: {
                username: req.user.username,
                _id: req.user._id,
                blogsList: req.user.blogsList,
                followers: req.user.followers,
                following: req.user.following,
                information: req.user.information,
            },
        });
        console.log(`--- myInfo ---\nFound my information!\n`);
    } else {
        res.status(404).json({
            success: false,
            msg: `Something happend while getting your information!`,
        });
        console.log(`--- myInfo ---\nError!\n`);
    }
};

// change user's information
// [PUT]
const updateInfo = async (req, res) => {
    console.log(`--- updateInfo ---\nChanging my information!\n`);
    try {
        const user = req.user;
        if (validatePassword(req.body.currentPassword, user.hash, user.salt)) {
            const newPassword = generatePassword(req.body.newPassword);
            user.hash = newPassword.hash;
            user.salt = newPassword.salt;
            user.information = req.body.information;
            await user.save();
            res.status(200).json({
                success: true,
                msg: `Your information is updated successfully!`,
            });
            console.log(`--- updateInfo ---\nInformation updated!\n`);
        } else {
            res.status(409).json({
                success: false,
                msg: `Your password is incorrect!`,
            });
            console.log(`--- updateInfo ---\nWrong password!\n`);
        }
    } catch (err) {
        res.status(409).json({
            success: false,
            msg: `Something happend while updating your information!`,
        });
        console.log(`--- updateInfo ---\nError!\n`);
    }
};

// follow another user
// [PUT]
const follow = async (req, res) => {
    console.log(`--- follow ---\nYou will following a user!\n`);
    try {
        const toFollow = await User.findOne({ username: req.params.username });
        if (
            req.user.following.some(
                (user) => user.username === toFollow.username
            )
        ) {
            res.status(409).json({
                success: false,
                msg: `You have already followed this user!`,
            });
            console.log(`--- follow ---\nAlready followed!\n`);
        } else {
            req.user.following.push({
                _id: toFollow._id,
                username: toFollow.username,
            });
            toFollow.followers.push({
                _id: req.user._id,
                username: req.user.username,
            });
            await req.user.save();
            await toFollow.save();
            res.status(200).json({
                success: true,
                msg: `You have followed a user!`,
            });
            console.log(`--- follow ---\nFollowed a user!\n`);
        }
    } catch (err) {
        res.status(409).json({
            success: false,
            msg: `Something happened while following another user!`,
        });
        console.log(`--- follow ---\nError!\n`);
    }
};

// unfollow another user
// [PUT]
const unfollow = async (req, res) => {
    console.log(`--- unfollow ---\nYou will unfollow a user!\n`);
    try {
        const toUnfollow = await User.findOne({
            username: req.params.username,
        });
        if (
            !req.user.following.some(
                (user) => user.username === toUnfollow.username
            )
        ) {
            res.status(409).json({
                success: false,
                msg: `You haven't followed this user!`,
            });
            console.log(`--- unfollow ---\nHaven't followed!\n`);
        } else {
            req.user.following = req.user.following.filter(
                (following) => following.username !== toUnfollow.username
            );
            toUnfollow.followers = toUnfollow.followers.filter(
                (follower) => follower.username !== req.user.username
            );
            await req.user.save();
            await toUnfollow.save();
            res.status(200).json({
                success: true.valueOf,
                msg: `You have unfollowed a user successfully!`,
            });
            console.log(`--- unfollow ---\nUnfollowed\n`);
        }
    } catch (err) {
        res.status(409).json({
            success: false,
            msg: `Something happened while unfollowing a user!`,
        });
        console.log(`--- unfollow ---\nError!\n`);
    }
};

// save a post
// [PUT]
const save = async (req, res) => {
    console.log(`--- save ---\nSaving a post!\n`);
    try {
        const post = await Blog.findById(req.params.id);
        if (
            req.user.saved.some(
                (savedPost) => savedPost._id.toString() === post._id.toString()
            )
        ) {
            res.status(409).json({
                success: false,
                msg: `You have already saved this post!`,
            });
            console.log(`--- save ---\nAlready saved!\n`);
        } else {
            req.user.saved.push({ _id: post._id, name: post.name });
            post.saved += 1;
            await req.user.save();
            await post.save();
            res.status(200).json({
                success: true,
                msg: `Save a post successfully!`,
            });
            console.log(`--- save ---\nSaved!\n`);
        }
    } catch (err) {
        res.status(409).json({
            success: false,
            msg: `Something happend while saving a post!`,
        });
        console.log(`--- save ---\nError!\n`);
    }
};

// unsave a post
// [PUT]
const unsave = async (req, res) => {
    console.log(`--- unsave ---\nUnsaving a post!\n`);
    try {
        const post = await Blog.findById(req.params.id);
        if (
            req.user.blogsList.some(
                (savedPost) => savedPost._id.toString() === post._id.toString()
            )
        ) {
            req.user.blogsList = req.user.blogsList.filter(
                (savedPost) => savedPost._id.toString() === post._id.toString()
            );
            post.saved -= 1;
            await req.user.save();
            await post.save();
            res.status(200).json({
                success: true,
                msg: `You have unsaved a post successfully!`,
            });
            console.log(`--- unsave ---\nUnsaved!\n`);
        } else {
            res.status(409).json({
                success: false,
                msg: `You haven't saved this post!`,
            });
            console.log(`--- unsave ---\nHaven't saved!\n`);
        }
    } catch (err) {
        res.status(409).json({
            success: false,
            msg: `Something happened while unsaving the post!`,
        });
        console.log(`--- unsave ---\nError!\n`);
    }
};

// like a post
// [PUT]
const likePost = async (req, res) => {
    console.log(`--- like ---\nLike a post!\n`);
    try {
        const post = await Blog.findById(req.params.id);
        if (
            req.user.liked.some(
                (likedPost) => likedPost._id.toString() === post._id.toString()
            )
        ) {
            res.status(409).json({
                success: false,
                msg: `You have already liked this post!`,
            });
            console.log(`--- like ---\nAlready liked!\n`);
        } else {
            req.user.liked.push({ _id: post._id, name: post.name });
            post.liked += 1;
            await req.user.save();
            await post.save();
            res.status(200).json({ success: true, msg: `You liked a post!` });
            console.log(`--- like ---\nLiked!\n`);
        }
    } catch (err) {
        res.status(409).json({
            success: false,
            msg: `Something happened while trying to like a post!`,
        });
        console.log(`--- like ---\nError!\n`);
    }
};

// create a post
// [POST]
const create = async (req, res) => {
    console.log(`--- create ---\nCreating new post!\n`);
    try {
        const newPost = new Blog();
        newPost.name = req.body.name;
        newPost.content = req.body.content;
        newPost.author = req.user.username;
        newPost.saved = 0;
        newPost.liked = 0;
        newPost.comments = [];
        await newPost.save();
        req.user.blogsList.push({ _id: newPost._id, name: newPost.name });
        await req.user.save();
        res.status(201).json({
            success: true,
            msg: `New post created successfully!`,
        });
        console.log(`--- create ---\nCreated!\n`);
    } catch (err) {
        res.status(409).json({
            success: false,
            msg: `Something happened while creating new post!`,
        });
        console.log(`--- create ---\nError!\n`);
    }
};

export {
    login,
    register,
    getInfo,
    myInfo,
    updateInfo,
    follow,
    unfollow,
    save,
    unsave,
    likePost,
    create,
};
