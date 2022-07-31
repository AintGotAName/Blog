import { generateKeyPairSync } from "crypto";

const generateKeyPair = () => {
    const keyPair = generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: "pkcs1",
            format: "pem",
        },
        privateKeyEncoding: {
            type: "pkcs1",
            format: "pem",
        },
    });
    return { publicKey: keyPair.publicKey, privateKey: keyPair.privateKey };
};

export default generateKeyPair;
