/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(true);
    const [multipleTrack, setMultipleTrack] = useState(true);

    useEffect(() => {
        fetchTheme();
        fetchTrackingMode();
    }, []);

    const toggleTheme = async () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        await fetch("http://localhost:3010/settings", {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                darktheme: !darkMode,
            }),
        });
    };

    const toggleTrackingMode = async () => {
        const newMode = !multipleTrack;
        setMultipleTrack(newMode);
        await fetch("http://localhost:3010/settings", {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                multipletrack: !multipleTrack,
            }),
        });
    };

    const fetchTheme = async () => {
        const res = await fetch("http://localhost:3010/settings");
        const data = await res.json();
        setDarkMode(data.darktheme);
    };

    const fetchTrackingMode = async () => {
        const res = await fetch("http://localhost:3010/settings");
        const data = await res.json();
        setMultipleTrack(data.multipletrack);
    };

    useEffect(() => {
        document.body.setAttribute(
            "theme",
            darkMode ? "dark-theme" : "light-theme"
        );
    }, [darkMode]);

    return (
        <SettingsContext.Provider
            value={{ darkMode, toggleTheme, multipleTrack, toggleTrackingMode }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);
