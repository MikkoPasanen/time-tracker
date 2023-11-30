import "../styles/slider.css"
import "../styles/settings.css"
import { BiSolidMoon } from "react-icons/bi";
import { BiSolidSun } from "react-icons/bi";
import { useTheme } from "../components/ThemeContext";

export default function Settings() {
    const { darkMode, toggleTheme} = useTheme();
    return (
        <>
            <h1>Settings</h1>
            <div className="settings-container" theme={darkMode ? "dark-theme" : "light-theme"}>
                <div className="toggle-theme-container">
                    <h3>Toggle theme</h3>
                    <p>Toggle between light / dark theme</p>
                    <div className="toggle-theme-content">
                        <BiSolidMoon className="theme-icon"/>
                        <label className="switch">
                            <input type="checkbox" onChange={() => toggleTheme()} checked={darkMode}/>
                            <span className="slider"></span>
                        </label>
                        <BiSolidSun className="theme-icon"/>
                    </div>
                </div>
            </div>
        </>
    );
}