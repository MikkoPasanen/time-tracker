import "../styles/navbar.css"
import { NavLink } from "react-router-dom";


export default function Navbar() {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <NavLink
                        to="/"
                        style={({ isActive }) => ({
                            textDecoration: isActive ? "underline" : "none"})}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/about"
                        style={({ isActive }) => ({
                            textDecoration: isActive ? "underline" : "none"})}>
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/settings"
                        style={({ isActive }) => ({
                            textDecoration: isActive ? "underline" : "none"})}>
                        Settings
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}