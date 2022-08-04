import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import App from "./App.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
        <CookiesProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </CookiesProvider>
    </StrictMode>
);
