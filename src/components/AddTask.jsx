/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import { BiX } from "react-icons/bi";
import { useSettings } from "../components/SettingsContext";

export default function AddTask({
    onClose,
    onTaskAdd,
    allTags,
    updateAllTags,
}) {
    const { darkMode } = useSettings();
    const [taskName, setTaskName] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [tagOptions, setTagOptions] = useState([]);

    useEffect(() => {
        generateOptions(allTags);
    }, [allTags]);

    const handleTaskNameChange = (e) => {
        setTaskName(e.target.value);
    };

    const handleTagsChange = (selectedTags) => {
        const tagsArr = selectedTags.map((option) => option.value);
        setSelectedTags(tagsArr);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTask = {
            id: generateId(),
            name: taskName,
            tags: selectedTags,
            startedTrackingAt: null,
            time: 0,
            active: false,
        };

        console.log(newTask);

        let tagsToUpdate = [];
        for (let tag of selectedTags) {
            if (!allTags.includes(tag)) {
                tagsToUpdate.push(tag);
            }
        }

        if (tagsToUpdate.length > 0) {
            const newTags = [...allTags, ...tagsToUpdate];
            updateAllTags(newTags);
        }

        onTaskAdd(newTask);
        onClose();
    };

    const generateOptions = (allTags) => {
        let options = [];

        for (let tag of allTags) {
            options.push({ value: tag, label: tag });
        }
        setTagOptions(options);
    };

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
                        placeholder="Eg: Feed the dog"
                    />
                </label>
                <label className="create-task-tags">
                    <p>Tags</p>
                    <CreatableSelect
                        isMulti
                        placeholder="hello"
                        options={tagOptions}
                        onChange={handleTagsChange}
                    />
                </label>
                <button type="submit" className="create-task-button">
                    Create task
                </button>
            </form>
        </div>
    );
}
