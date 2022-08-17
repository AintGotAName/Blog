import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

import styles from "../styling/Information.module.css";

const Information = ({ username, user, joinedAt }) => {
    const joined = (joinedAt ? new Date(joinedAt) : new Date())
        .toUTCString()
        .split(" ");
    return (
        <div className={`flex--down center pd16 border mg16`}>
            <div className={`${styles.username} flex--right center mg16`}>
                <h1>{username}</h1>
            </div>
            <div className={`flex--right center mg16`}>
                <h2>
                    {user.fields.map(
                        (field, index) => `
                    ${index ? `, ` : ``}
                    ${field}
                    `
                    )}
                </h2>
            </div>
            <div
                className={`flex--right center mg16`}
                style={{ width: "100%", justifyContent: "space-evenly" }}
            >
                <div className={`flex--right center`}>
                    <CakeOutlinedIcon />
                    <h3> {`${joined[2]} ${joined[1]}, ${joined[3]}`}</h3>
                </div>
                <div className={`flex--right center`}>
                    <LocationOnOutlinedIcon />
                    <h3>{user.location}</h3>
                </div>
                <div className={`flex--right center`}>
                    <EmailOutlinedIcon />
                    <h3>{user.email}</h3>
                </div>
            </div>
        </div>
    );
};
export default Information;
