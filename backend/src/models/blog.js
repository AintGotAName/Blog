import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: mongoose.Types.ObjectId, required: true },
        saved: { type: Number, required: true },
        liked: { type: Number, required: true },
        comments: { type: [Array], required: true },
    },
    { timestamps: true }
);

export default mongoose.model("Blog", BlogSchema);
