/* eslint-disable react/no-unknown-property */
import "../styles/navbar.css";
import { NavLink } from "react-router-dom";
import { useSettings } from "../components/SettingsContext";
import { useState } from "react";

export default function Navbar() {
    const { darkMode } = useSettings();
    const [activeMenu, setActiveMenu] = useState(false);
    return (
        <nav className="navbar" theme={darkMode ? "dark-theme" : "light-theme"}>
            <div className="normal-navbar">
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
            </div>

            <div className="hamburger-navbar">
                <button
                    className={activeMenu ? "menu-btn active" : "menu-btn"}
                    onClick={() => setActiveMenu(!activeMenu)}
                >
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </button>
                <div className="hamburger-content">
                    <ul>
                        <li>
                            <NavLink
                                to="/"
                                style={({ isActive }) => ({
                                    textDecoration: isActive
                                        ? "underline"
                                        : "none",
                                })}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/about"
                                style={({ isActive }) => ({
                                    textDecoration: isActive
                                        ? "underline"
                                        : "none",
                                })}
                            >
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/settings"
                                style={({ isActive }) => ({
                                    textDecoration: isActive
                                        ? "underline"
                                        : "none",
                                })}
                            >
                                Settings
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
