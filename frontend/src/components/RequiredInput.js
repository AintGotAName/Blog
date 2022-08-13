import { useState } from "react";

const RequiredInput = ({ validateMessage, inputType, placeholder }) => {
    const [text, setText] = useState("");
    return (
        <input
            required
            type={inputType || "text"}
            value={text}
            placeholder={placeholder}
            onInvalid={(e) => {
                e.target.setCustomValidity(validateMessage);
            }}
            onInput={(e) => {
                e.target.setCustomValidity("");
            }}
            onChange={(e) => {
                setText(e.target.value);
            }}
        />
    );
};

export default RequiredInput;
