import { useState } from "react";

const useFetch = (url, headers, body) => {
    const [res, setRes] = useState();
    fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
    })
        .then((res) => res.json())
        .then((res) => {
            setRes(res);
        });
    return res;
};

export default useFetch;
