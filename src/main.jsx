/* eslint-disable react-refresh/only-export-components */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import { SettingsProvider } from "./components/SettingsContext.jsx";
import "./styles/styles.css";

const Main = () => {
    return (
        <React.StrictMode>
            <SettingsProvider>
                <App />
            </SettingsProvider>
        </React.StrictMode>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
