import { createContext, useState, useContext, useEffect } from "react";

// Create new context
const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    // This holds the theme of the app
    const [darkMode, setDarkMode] = useState(true);
    // This holds the tracking mode of the app
    const [multipleTrack, setMultipleTrack] = useState(true);

    // On initial render, fetch the stored settings from the database
    useEffect(() => {
        fetchTheme();
        fetchTrackingMode();
    }, []);

    // When called, change the theme of the app and store the setting
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

    // When called, change the tracking mode of the app and store the setting
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

    // Fetches the theme from database
    const fetchTheme = async () => {
        const res = await fetch("http://localhost:3010/settings");
        const data = await res.json();
        setDarkMode(data.darktheme);
    };

    // Fetches the tracking mode from database
    const fetchTrackingMode = async () => {
        const res = await fetch("http://localhost:3010/settings");
        const data = await res.json();
        setMultipleTrack(data.multipletrack);
    };

    // Set the body theme based on selected theme
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
