import Navbar from "./Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import About from "../pages/About";
import ErrorPage from "../pages/ErrorPage";
import "../styles/app.css";

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
