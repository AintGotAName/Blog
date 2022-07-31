import { Schema, Types, model } from "mongoose";

const BlogSchema = new Schema(
    {
        name: { type: String, required: true },
        author: { type: Types.ObjectId, required: true },
        saved: { type: Number, required: true },
        liked: { type: Number, required: true },
        comments: { type: [Array], required: true },
    },
    { timestamps: true }
);

export default model("Blog", BlogSchema);
