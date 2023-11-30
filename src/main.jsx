/* eslint-disable react-refresh/only-export-components */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import { ThemeProvider } from "./components/ThemeContext.jsx";
import "./styles/styles.css";

const Main = () => {
    return (
        <React.StrictMode>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </React.StrictMode>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
