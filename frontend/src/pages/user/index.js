import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

import BlogsList from "./components/BlogsList.js";
import Followers from "./components/Followers.js";
import Following from "./components/Following.js";
import Information from "./components/Information.js";

const User = ({ url }) => {
    const [user, setUser] = useState({
        information: {
            fields: [],
            location: "",
            email: "",
        },
    });
    const [cookies] = useCookies(["token"]);
    const navigate = useNavigate();

    useEffect(() => {
        if (cookies.token) {
            fetch(url, { headers: { authorization: cookies.token } })
                .then((res) => res.json())
                .then((res) => {
                    setUser(res.user);
                });
        } else {
            navigate("/login", { replace: true });
        }
    }, []);
    return (
        <>
            <Information
                username={user.username}
                user={user.information}
                joinedAt={user.joinedAt}
            />
            <BlogsList />
            <Followers />
            <Following />
        </>
    );
};

export default User;
