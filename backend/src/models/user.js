import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    hash: { type: String, required: true },
    salt: { type: String, required: true },
    information: { type: Object, required: true },
    blogsList: { type: [ObjectId], required: true },
    followers: { type: [ObjectId], required: true },
    following: { type: [ObjectId], required: true },
    saved: { type: [ObjectId], required: true },
});

export default mongoose.model("User", UserSchema);
