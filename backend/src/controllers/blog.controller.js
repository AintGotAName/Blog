import { Blog } from "../models/index.js";

class BlogController {
    // [GET]
    async getBlog(req, res) {
        try {
            const blog = await Blog.findById(req.params._id);
            if (blog) {
                res.status(200).json({
                    success: true,
                    msg: `Get the blog successfully!`,
                    data: blog,
                });
                console.log(`Get the blog successfully!\n`);
            } else {
                res.status(404).json({
                    success: false,
                    msg: `Cannot find the blog, maybe it hasn't been created yet!`,
                });
                console.log(`There is no blog with the given _id!\n`);
            }
        } catch (err) {
            console.log(`Error detected while getting the blog!\n`);
            res.status(404).json({
                success: false,
                msg: `Something happened while getting the blog, please try again!`,
            });
        }
    }
}
