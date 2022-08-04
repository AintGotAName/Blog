import { pbkdf2Sync, randomBytes } from "crypto";
import jwt from "jsonwebtoken";

import { User } from "../src/models/index.js";

const validatePassword = (password, hash, salt) => {
    console.log(`validatePassword(password, hash, salt): Cheking password!\n`);
    const res =
        hash ===
        pbkdf2Sync(password, salt, 10000, 64, "sha256").toString("hex");
    console.log(`validatePassword(password, hash, salt): Password checked!\n`);
    return res;
};
const generatePassword = (password) => {
    console.log(
        `generatePassword(password): Generating hash and salt for password!\n`
    );
    const salt = randomBytes(32).toString("hex");
    const hash = pbkdf2Sync(password, salt, 10000, 64, "sha256").toString(
        "hex"
    );
    console.log(`New password with hash and salt generated!\n`);
    console.log(
        `generatePassword(password): New hash and salt for password generated!\n`
    );
    return { salt, hash };
};

const authenticationMiddleware = async (req, res, next) => {
    console.log(
        `authenticationMiddleware: Authentication middleware running\n`
    );
    const token = req.headers.authorization;
    if (token && token.split(" ")[1].match(/\S+.\S+.\S/)) {
        try {
            const payload = jwt.verify(
                token.split(" ")[1],
                process.env.PUBLIC_KEY,
                {
                    algorithms: "RS256",
                }
            );
            const user = await User.findById(payload._id);
            if (user) {
                req.user = user;
                console.log(
                    `authenticationMiddleware: User is authenticated!\n`
                );
                next();
            } else {
                res.status(403).json({
                    success: false,
                    msg: "You have no permission to view this resource!",
                });
                console.log(
                    `authenticationMiddleware: User is not authorized!\n`
                );
            }
        } catch (err) {
            res.status(403).json({
                success: false,
                msg: "You have no permission to view this resource!",
            });
            console.log(
                `authenticationMiddleware: Error detected while authenticating user!\n`
            );
        }
    } else {
        res.status(401).json({
            success: false,
            msg: "You are not authenticated!",
        });
        console.log(`authenticationMiddleware: No token were sent!\n`);
    }
};

const issueJWT = (user) => {
    console.log(`issueJWT(user): Issuing new JWT token!\n`);
    const payload = { _id: user._id, iat: Date.now() };
    const singedToken = jwt.sign(payload, process.env.PRIVATE_KEY, {
        expiresIn: "30d",
        algorithm: "RS256",
    });
    console.log(`issueJWT(user): New JWT issued!\n`);
    return {
        token: `Bearer ${singedToken}`,
        expires: "30d",
    };
};

export {
    validatePassword,
    generatePassword,
    authenticationMiddleware,
    issueJWT,
};
