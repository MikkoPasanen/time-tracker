/* eslint-disable react/no-unknown-property */
import "../styles/slider.css";
import "../styles/settings.css";
import { BiSolidMoon } from "react-icons/bi";
import { BiSolidSun } from "react-icons/bi";
import { BiDice1 } from "react-icons/bi";
import { BiDice5 } from "react-icons/bi";
import { useSettings } from "../components/SettingsContext";

export default function Settings() {
    const { darkMode, toggleTheme, multipleTrack, toggleTrackingMode } =
        useSettings();

    return (
        <>
            <h1>Settings</h1>
            <div
                className="settings-container"
                theme={darkMode ? "dark-theme" : "light-theme"}
            >
                <div className="toggle-theme-container">
                    <h3>Toggle theme</h3>
                    <p>Toggle between light / dark theme</p>
                    <div className="toggle-theme-content">
                        <BiSolidMoon className="settings-icon" />
                        <label className="switch">
                            <button onClick={() => toggleTheme()} />
                            <span
                                className={
                                    darkMode ? "dark-slider" : "light-slider"
                                }
                            ></span>
                        </label>
                        <BiSolidSun className="settings-icon" />
                    </div>
                </div>
                <div className="toggle-tracking-mode-container">
                    <h3>Toggle tracking mode</h3>
                    <p>
                        Toggle between tracking either only 1 task or multiple
                    </p>
                    <div className="toggle-tracking-mode-content">
                        <BiDice5 className="settings-icon" />
                        <label className="switch">
                            <button onClick={() => toggleTrackingMode()} />
                            <span
                                className={
                                    multipleTrack
                                        ? "single-slider"
                                        : "multi-slider"
                                }
                            ></span>
                        </label>
                        <BiDice1 className="settings-icon" />
                    </div>
                </div>
            </div>
        </>
    );
}
