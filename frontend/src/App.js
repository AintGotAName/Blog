import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import User from "./pages/user";
import Blog from "./pages/blog";
import "./App.css";
import { UrlContext } from "./Contexts.js";

const App = () => {
    return (
        <UrlContext.Provider value="http://localhost:5000">
            <Routes>
                <Route path="/" element={<User />} />
                <Route path="/login" element={<Login />} />
                <Route path="/blog/:id" element={<Blog />} />
            </Routes>
        </UrlContext.Provider>
    );
};
export default App;
