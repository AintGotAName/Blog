import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        hash: { type: String, required: true },
        salt: { type: String, required: true },
        information: { type: Object, required: true },
        blogsList: { type: [{ _id: ObjectId, name: String }], required: true },
        followers: {
            type: [{ _id: ObjectId, username: String }],
            required: true,
        },
        following: {
            type: [{ _id: ObjectId, username: String }],
            required: true,
        },
        saved: { type: [{ _id: ObjectId, name: String }], required: true },
        liked: { type: [{ _id: ObjectId, name: String }], required: true },
    },
    { versionKey: false, timestamps: true }
);

export default mongoose.model("User", UserSchema);
