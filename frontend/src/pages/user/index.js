import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useLayoutEffect, useState } from "react";

import BlogsList from "./components/BlogsList.js";
import Followers from "./components/Followers.js";
import Following from "./components/Following.js";
import Information from "./components/Information.js";

const User = ({ url }) => {
    const [user, setUser] = useState({});
    const [cookies] = useCookies(["token"]);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        if (cookies.token) {
            fetch(url, { headers: { authorization: cookies.token } })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res.user);
                    setUser(res.user);
                });
        } else {
            navigate("/login", { replace: true });
        }
    }, []);
    return (
        <>
            <h1>{user.username}</h1>
            <Information />
            <BlogsList />
            <Followers />
            <Following />
        </>
    );
};

export default User;
