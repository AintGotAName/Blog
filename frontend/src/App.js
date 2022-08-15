import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import User from "./pages/user";
import Blog from "./pages/blog";
import "./App.css";

const App = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<User url="http://localhost:5000/user" />}
            />
            <Route
                path="/login"
                element={<Login url="http://localhost:5000/user/login" />}
            />
            <Route path="/blog/:id" element={<Blog />} />
        </Routes>
    );
};
export default App;
