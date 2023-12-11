/* eslint-disable react-refresh/only-export-components */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import { SettingsProvider } from "./components/SettingsContext.jsx";
import "./styles/styles.css";

const Main = () => {
    return (
        <SettingsProvider>
            <App />
        </SettingsProvider>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
