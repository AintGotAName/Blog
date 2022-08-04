import { pbkdf2Sync, randomBytes } from "crypto";
import jwt from "jsonwebtoken";

import { User } from "../src/models/index.js";

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const validatePassword = (password, hash, salt) => {
    console.log(`Password checked!\n`);
    return (
        hash === pbkdf2Sync(password, salt, 10000, 64, "sha256").toString("hex")
    );
};
const generatePassword = (password) => {
    const salt = randomBytes(32).toString("hex");
    const hash = pbkdf2Sync(password, salt, 10000, 64, "sha256").toString(
        "hex"
    );
    console.log(`New password with hash and salt generated!\n`);
    return { salt, hash };
};

const authenticationMiddleware = async (req, res, next) => {
    console.log(`Authentication middleware running\n`);
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
            if (user) next(user);
        } catch (err) {
            res.status(403).json({
                success: false,
                msg: "You have no permission to view this resource!",
            });
        }
    } else {
        res.status(401).json({
            success: false,
            msg: "You are not authenticated!",
        });
    }
    next();
};

const issueJWT = (user) => {
    const payload = { _id: user._id, iat: Date.now() };
    const singedToken = jwt.sign(payload, process.env.PRIVATE_KEY, {
        expiresIn: "30d",
        algorithm: "RS256",
    });
    console.log(`New JWT issued!\n`);
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
