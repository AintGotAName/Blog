import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { RequiredInput } from "../../components/index.js";

const Login = ({ url }) => {
    const [seePassword, setSeePassword] = useState("password");
    const [message, setMessage] = useState("");
    const [cookies, setCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(e.target[0].value);

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "content-type": "application/json; charset=utf-8" },
                body: JSON.stringify({
                    username: e.target[0].value,
                    password: e.target[1].value,
                }),
            }).then((res) => res.json());
            if (res.success) {
                setCookie("token", res.token.token, {
                    maxAge: 60,
                    path: "/",
                });
                navigate("/", { replace: true });
            } else {
                setMessage(res.msg);
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Check if the user should be auto-logged in
    useEffect(() => {
        fetch("http://localhost:5000/user", {
            headers: { authorization: cookies.token },
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                if (res.success) {
                    setCookie("token", cookies.token, {
                        maxAge: 60,
                        path: "/",
                    });
                    navigate("/", { replace: true });
                }
            });
    }, []);

    return (
        <>
            <form onSubmit={submitHandler}>
                <label>{message}</label>
                <label>
                    Username:
                    <RequiredInput validateMessage="Please provide username!" />
                </label>
                <label>
                    Password:
                    <RequiredInput
                        validateMessage="Please provide password"
                        inputType={seePassword}
                    />
                </label>
                <button
                    type="button"
                    onClick={() => {
                        setSeePassword(
                            seePassword === "password" ? "text" : "password"
                        );
                    }}
                >
                    {seePassword === "password" ? (
                        <VisibilityIcon />
                    ) : (
                        <VisibilityOffIcon />
                    )}
                </button>
                <button type="submit">Log in</button>
            </form>
        </>
    );
};

export default Login;
