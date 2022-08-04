import { Router } from "express";

import { getBlog } from "../controllers/blog.controller.js";

const BlogRouter = Router();

BlogRouter.get("/:id", getBlog);

export default BlogRouter;
