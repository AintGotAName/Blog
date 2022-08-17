import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";

import styles from "../styling/BlogsList.module.css";

const BlogsList = ({ blogs }) => {
    const [newBlogs, setNewBlogs] = useState([]);
    const navigate = useNavigate();
    const handler = async (id) => {
        navigate(`/blog/${id}`);
    };

    useEffect(() => {
        blogs.forEach(async (blog) => {
            const res = await fetch(`http://localhost:5000/blog/${blog._id}`);
            const data = (await res.json()).data;
            setNewBlogs((prev) =>
                prev.concat({
                    id: data._id,
                    name: data.name,
                    saved: data.saved,
                    liked: data.liked,
                    preview: data.content.slice(0, 50),
                })
            );
        });
    }, [blogs]);

    return (
        <>
            {newBlogs.map((blog) => (
                <div
                    className={`${styles.blog} pd16 border mg8 flex--down`}
                    onClick={() => handler(blog.id)}
                    key={blog.id}
                >
                    <Link to={`/blog/${blog.id}`}>{blog.name}</Link>

                    <p>{blog.preview}...</p>
                    <div className={`flex--right`}>
                        <div>
                            <ThumbUpOutlinedIcon></ThumbUpOutlinedIcon>

                            {blog.liked}
                        </div>
                        <div>
                            <SaveAltOutlinedIcon></SaveAltOutlinedIcon>
                            {blog.saved}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};
export default BlogsList;
