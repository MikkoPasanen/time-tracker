/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { BiX } from "react-icons/bi";
import { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import { useSettings } from "../components/SettingsContext";
import { darkThemeStyle, lightThemeStyle } from "../styles/multiselectstyles";

export default function AddTask({
    onClose,
    onTaskAdd,
    allTags,
    updateAllTags,
}) {
    // Custom hook from SettingsContext for mananing dark / light theme
    const { darkMode } = useSettings();
    // Holds the new tasks name
    const [taskName, setTaskName] = useState("");
    // Holds the tags for the new task
    const [selectedTags, setSelectedTags] = useState([]);
    // Holds all unique tags that are displayed on the tags dropdown menu
    const [tagOptions, setTagOptions] = useState([]);

    // On initial render, generate the tag options
    useEffect(() => {
        generateOptions(allTags);
    }, [allTags]);

    const handleTaskNameChange = (e) => {
        setTaskName(e.target.value);
    };

    // Gets an array of tag option objects as a parameter
    // map them trough and store the selected tag values into new array and
    // then store it into a state
    const handleTagsChange = (selectedTags) => {
        const tagsArr = selectedTags.map((option) => option.value);
        setSelectedTags(tagsArr);
    };

    // This gets called when "Create task" button is pressed
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check that task doesn't have more than 3 tags
        if (selectedTags.length > 3) {
            console.log("Max 3 tags allowed / task");
            return;
        }

        // Create new task object
        const newTask = {
            id: generateId(),
            name: taskName,
            tags: selectedTags,
            startedTrackingAt: null,
            time: 0,
            active: false,
        };

        console.log(newTask);

        // Check if there are any new tags
        let tagsToUpdate = [];
        for (let tag of selectedTags) {
            if (!allTags.includes(tag)) {
                tagsToUpdate.push(tag);
            }
        }

        // If there are new tags, then update the allTags array in db.json
        if (tagsToUpdate.length > 0) {
            const newTags = [...allTags, ...tagsToUpdate];
            updateAllTags(newTags);
        }

        // Call function that will create the task
        onTaskAdd(newTask);

        // Close the create task popup
        onClose();
    };

    // Generates the tag options for the dropdown menu
    const generateOptions = (allTags) => {
        let options = [];

        for (let tag of allTags) {
            options.push({ value: tag, label: tag });
        }
        setTagOptions(options);
    };

    // Generates random ID
    const generateId = () => {
        return Date.now() + Math.floor(Math.random() * 10);
    };

    return (
        <div
            className="create-task-popup"
            theme={darkMode ? "dark-theme" : "light-theme"}
        >
            <div className="create-task-header">
                <h3>Create new task</h3>
                <button onClick={onClose} className="close-popup">
                    <BiX />
                </button>
            </div>
            <form onSubmit={handleSubmit} className="create-task-form">
                <label className="create-task-name">
                    <p>Task name</p>
                    <input
                        className="create-task-name-input"
                        type="text"
                        value={taskName}
                        onChange={handleTaskNameChange}
                        required
                        placeholder="Enter task name"
                    />
                </label>
                <label className="create-task-tags">
                    <p>Tags</p>
                    {/* TODO: Style the tags selection menu*/}
                    <CreatableSelect
                        isMulti
                        placeholder="Enter tags"
                        options={tagOptions}
                        onChange={handleTagsChange}
                        styles={darkMode ? darkThemeStyle : lightThemeStyle}
                    />
                </label>
                <button type="submit" className="create-task-button">
                    Create task
                </button>
            </form>
        </div>
    );
}
