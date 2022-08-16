import { Link, useNavigate } from "react-router-dom";

import styles from "../styling/BlogsList.module.css";

const BlogsList = ({ blogs }) => {
    const navigate = useNavigate();
    const handler = async (id) => {
        navigate(`/blog/${id}`);
    };
    return (
        <div
            className={`${styles.container} flex--down center mg16 pd16 border`}
        >
            {blogs.map((blog) => (
                <div
                    className={`${styles.blog} pd8 border`}
                    onClick={() => handler(blog._id)}
                    key={blog._id}
                >
                    {blog.name}
                </div>
            ))}
        </div>
    );
};
export default BlogsList;
