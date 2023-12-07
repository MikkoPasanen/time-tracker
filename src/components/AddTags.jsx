/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { BiX } from "react-icons/bi";
import CreatableSelect from "react-select/creatable";
import { useSettings } from "../components/SettingsContext";
import { useState } from "react";
import { darkThemeStyle, lightThemeStyle } from "../styles/multiselectstyles";
import "../styles/addtags.css";

export default function AddTags({ onClose, tags, allTags, taskName }) {
    // Custom hook from SettingsContext for mananing dark / light theme
    const { darkMode } = useSettings();

    // This holds the selected tag options
    const [selectedTags, setSelectedTags] = useState();

    const handleTagsChange = (selectedTags) => {
        if (selectedTags.length > 3) {
            console.log("Task can have max 3 tags!");
            return;
        }
        const tagsArr = selectedTags.map((option) => option.value);
        setSelectedTags(tagsArr);
    };

    // These are the preplaced values for the CreatableSelect
    const defaultTags = tags.map((tag) => ({
        value: tag,
        label: tag,
    }));

    return (
        <div
            className="add-tags-popup"
            theme={darkMode ? "dark-theme" : "light-theme"}
        >
            <div className="add-tags-header">
                <h3>
                    <i>{taskName}</i> tags
                </h3>
                <button
                    onClick={() => onClose(selectedTags)}
                    className="close-popup"
                >
                    <BiX />
                </button>
            </div>
            <div className="add-tags-content">
                <h3>Tags</h3>
                <CreatableSelect
                    options={allTags.map((tag) => ({
                        value: tag,
                        label: tag,
                    }))}
                    isMulti
                    onChange={handleTagsChange}
                    defaultValue={defaultTags}
                    styles={darkMode ? darkThemeStyle : lightThemeStyle}
                />
            </div>
        </div>
    );
}
