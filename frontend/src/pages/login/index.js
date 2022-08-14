import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { RequiredInput } from "../../components/index.js";
import styles from "./style.module.css";

const Login = ({ url }) => {
    const [seePassword, setSeePassword] = useState("password");
    const [message, setMessage] = useState("");
    const [keepLogIn, setKeepLogIn] = useState(false);
    const [cookies, setCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

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
                    maxAge: keepLogIn ? 60 : undefined,
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
        // ---------- Login page ----------
        <div className={`${styles.page}`}>
            {/* ---------- container ---------- */}
            <div className={`${styles.container} pd16`}>
                {/* ---------- login form ---------- */}
                <form
                    onSubmit={submitHandler}
                    className={`${styles.container__form}`}
                >
                    {/* ---------- username input ---------- */}
                    <div className={`pd8 mg8 ${styles.container__form_border}`}>
                        <RequiredInput
                            validateMessage="Please provide username!"
                            placeholder="Username"
                        />
                    </div>

                    {/* ---------- password input ---------- */}
                    <div className={`pd8 mg8 ${styles.container__form_border}`}>
                        <RequiredInput
                            validateMessage="Please provide password"
                            placeholder="Password"
                            inputType={seePassword}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setSeePassword(
                                    seePassword === "password"
                                        ? "text"
                                        : "password"
                                );
                            }}
                        >
                            {seePassword === "password" ? (
                                <VisibilityOffIcon />
                            ) : (
                                <VisibilityIcon />
                            )}
                        </button>
                    </div>

                    {/* ---------- error message ---------- */}
                    {message && (
                        <label className={`${styles.error}`}>{message}</label>
                    )}

                    {/* ---------- remember login checkbox ---------- */}
                    <div className={`pd8`}>
                        <input
                            type="checkbox"
                            name="temp"
                            className={`${styles.checkbox}`}
                            checked={keepLogIn}
                            onChange={() => {
                                setKeepLogIn((prev) => !prev);
                            }}
                        />
                        <label htmlFor="temp" className={`pd8`}>
                            Remember me?
                        </label>
                    </div>

                    {/* ---------- login button ---------- */}
                    <button
                        type="submit"
                        className={`pd8 mg8 ${styles.container__form_border}`}
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
