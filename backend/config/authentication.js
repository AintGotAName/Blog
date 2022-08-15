import { pbkdf2Sync, randomBytes } from "crypto";
import jwt from "jsonwebtoken";

import { User } from "../src/models/index.js";

const validatePassword = (password, hash, salt) => {
    console.log(`--- validatePassword ---\nCheking password!\n`);
    const res =
        hash ===
        pbkdf2Sync(password, salt, 10000, 64, "sha256").toString("hex");
    console.log(`--- validatePassword ---\nPassword checked!\n`);
    return res;
};
const generatePassword = (password) => {
    console.log(`--- generatePassword ---\nGenerating hash!\n`);
    const salt = randomBytes(32).toString("hex");
    const hash = pbkdf2Sync(password, salt, 10000, 64, "sha256").toString(
        "hex"
    );
    console.log(`--- generatePassword ---\nNew hash generated!\n`);
    return { salt, hash };
};

const authenticationMiddleware = async (req, res, next) => {
    console.log(
        `--- authenticationMiddleware ---\nAuthentication middleware running\n`
    );
    const token = req.headers.authorization;
    if (token !== "undefined" && token.split(" ")[1].match(/\S+.\S+.\S/)) {
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
                    `--- authenticationMiddleware ---\nUser is authenticated!\n`
                );
                next();
            } else {
                res.status(403).json({
                    success: false,
                    msg: "You have no permission to view this resource!",
                });
                console.log(
                    `--- authenticationMiddleware ---\nUser is not authorized!\n`
                );
            }
        } catch (err) {
            res.status(403).json({
                success: false,
                msg: "You have no permission to view this resource!",
            });
            console.log(`--- authenticationMiddleware ---\nError!\n`);
        }
    } else {
        res.status(401).json({
            success: false,
            msg: "You are not authenticated!",
        });
        console.log(`--- authenticationMiddleware ---\nNo token were sent!\n`);
    }
};

const issueJWT = (user) => {
    console.log(`--- issueJWT ---\nIssuing new JWT token!\n`);
    const payload = { _id: user._id, iat: Date.now() };
    const singedToken = jwt.sign(payload, process.env.PRIVATE_KEY, {
        expiresIn: "30d",
        algorithm: "RS256",
    });
    console.log(`--- issueJWT ---\nNew JWT issued!\n`);
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
