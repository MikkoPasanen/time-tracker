import { createContext, useState, useContext, useEffect} from "react";

const ThemeContext = createContext();


export const ThemeProvider = ({children}) => {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        const fetchTheme = async () => {
            const res = await fetch("http://localhost:3010/settings");
            const data = await res.json();
            console.log(data.darktheme);
            setDarkMode(data.darktheme);
        }

        fetchTheme();
    }, []);

    const toggleTheme = async () => {
        setDarkMode((prev) => !prev);
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

    useEffect(() => {
        document.body.setAttribute('theme', darkMode ? "dark-theme" : "light-theme");
    }, [darkMode])

    return (
        <ThemeContext.Provider value={{darkMode, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);