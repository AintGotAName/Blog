import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

import BlogsList from "./components/BlogsList.js";
import Followers from "./components/Followers.js";
import Following from "./components/Following.js";
import Information from "./components/Information.js";

import styles from "./styling/index.module.css";

const User = ({ url }) => {
    const [user, setUser] = useState({
        information: { name: "", fields: [], location: "", email: "" },
    });
    const [blogs, setBlogs] = useState([]);
    const [cookies] = useCookies(["token"]);
    const navigate = useNavigate();

    useEffect(() => {
        if (cookies.token) {
            fetch(url, { headers: { authorization: cookies.token } })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res.user);
                    setUser(res.user);
                    setBlogs(res.user.blogsList);
                });
        } else {
            navigate("/login", { replace: true });
        }
    }, []);
    return (
        <div className={`${styles.page} flex--down center`}>
            <Information
                username={user.username}
                user={user.information}
                joinedAt={user.joinedAt}
            />
            <BlogsList blogs={blogs} />
            <Followers />
            <Following />
        </div>
    );
};

export default User;
