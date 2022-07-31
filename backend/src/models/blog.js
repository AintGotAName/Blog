import { Schema, Types, model } from "mongoose";

const blogSchema = new Schema(
    {
        name: { type: String, required: true },
        author: { type: Types.ObjectId, required: true },
        saved: { type: Number, required: true },
        liked: { type: Number, required: true },
        comments: { type: [Array], required: true },
    },
    { timestamps: true }
);

export default model("blog", blogSchema);
