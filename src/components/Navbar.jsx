/* eslint-disable react/no-unknown-property */
import "../styles/navbar.css";
import { NavLink } from "react-router-dom";
import { useSettings } from "../components/SettingsContext";

export default function Navbar() {
    const { darkMode } = useSettings();
    return (
        <nav className="navbar" theme={darkMode ? "dark-theme" : "light-theme"}>
            <ul>
                <li>
                    <NavLink
                        to="/"
                        style={({ isActive }) => ({
                            textDecoration: isActive ? "underline" : "none",
                        })}
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/about"
                        style={({ isActive }) => ({
                            textDecoration: isActive ? "underline" : "none",
                        })}
                    >
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/settings"
                        style={({ isActive }) => ({
                            textDecoration: isActive ? "underline" : "none",
                        })}
                    >
                        Settings
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
