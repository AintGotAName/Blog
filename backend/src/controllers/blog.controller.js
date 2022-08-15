import { Blog } from "../models/index.js";

// get a specific blog
// [GET]
const getBlog = async (req, res) => {
    console.log(`--- getBlog ---\nGetting blog!\n`);
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog) {
            res.status(200).json({
                success: true,
                msg: `Get the blog successfully!`,
                data: blog,
            });
            console.log(`--- getBlog ---\nGot the blog!\n`);
        } else {
            res.status(404).json({
                success: false,
                msg: `Cannot find the blog, maybe it hasn't been created yet!`,
            });
            console.log(`--- getBlog ---\nBlog not found!\n`);
        }
    } catch (err) {
        res.status(404).json({
            success: false,
            msg: `Something happened while getting the blog, please try again!`,
        });
        console.log(`--- getBlog ---\nError!\n`);
    }
};

export { getBlog };
