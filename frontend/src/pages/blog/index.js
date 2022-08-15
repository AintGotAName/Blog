import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Blog = ({}) => {
    const [blog, setBlog] = useState({
        author: "",
        comments: [],
        content: "",
        liked: 0,
        name: "",
        save: 0,
        _id: "",
    });
    let { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:5000/blog/${id}`)
            .then((res) => res.json())
            .then((res) => {
                setBlog(res.data);
            });
    }, []);
    return (
        <div>
            <h1>{blog.name}</h1>
            <p>{blog.content}</p>
        </div>
    );
};

export default Blog;
