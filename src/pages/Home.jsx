// TODO: Make app more reposive
// TODO: Check that colors pass the constract tests
// TODO: Make sure everything is usable with keyboard only
// TODO: Comment code

/* eslint-disable react/no-unknown-property */
import { useState, useEffect } from "react";
import Task from "../components/Task";
import { useSettings } from "../components/SettingsContext";
import AddTask from "../components/AddTask";
import { BiPlusCircle } from "react-icons/bi";
import Select from "react-select";
import "../styles/home.css";
import "../styles/addtask.css";
import { darkThemeStyle, lightThemeStyle } from "../styles/multiselectstyles";


export default function Home() {
    // Holds all tasks
    const [tasks, setTasks] = useState([]);
    // Manage create task popup visibility
    const [showPopup, setShowPopup] = useState(false);
    // Manage if data should be fetched again from db.json or not
    const [fetchData, setFetchData] = useState(false);
    // Holds all tags
    const [allTags, setAllTags] = useState([]);

    const [filterTags, setFilterTags] = useState([]);

    // custom hook from SettingsContext, manages the theme of the app
    const { darkMode } = useSettings();

    // When called, fetch all tasks from db.json
    const fetchTasks = async () => {
        let url = "http://localhost:3010/tasks";

        const res = await fetch(url);
        const tasks = await res.json();
        setTasks(tasks);
    };

    // Fetches all tags from db.json
    const fetchTags = async () => {
        let url = "http://localhost:3010/all-tags";

        const res = await fetch(url);
        const tags = await res.json();
        setAllTags(tags.allTags);
    };

    // If fetchData changes, call fetchTasks and fetchTags
    useEffect(() => {
        fetchTasks();
        fetchTags();
    }, [fetchData]);

    // When new task is created, send POST request to db.json
    const handleTaskAdd = async (newTask) => {
        let url = "http://localhost:3010/tasks";

        // Add the new task into a state so it gets updated in the UI
        setTasks([...tasks, newTask]);

        await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
        });
    };

    // When called, send DELETE request to db.json
    // for deletion of spesific task
    // and possible tags
    const handleTaskDelete = async (taskId) => {
        let url = `http://localhost:3010/tasks/${taskId}`;

        // Find the task that is going to be deleted
        const taskToDelete = tasks.find((task) => task.id === taskId);

        // All tags that are on the soon to be deleted task
        const tagsToDelete = taskToDelete.tags;

        // Check if any other tasks contain the same tags as the deleted task
        const remainingTags = allTags.filter((tag) => {
            // Loop trough every task per existing tag
            for (const task of tasks) {
                // If the task is not the deleted task
                // and the task contains the current tag
                // then store it 
                if (task.id !== taskId && task.tags.includes(tag)) {
                    return true;
                }
            }
            return false;
        });

        // Tags that are unique only to the deleted task
        const uniqueTags = tagsToDelete.filter((tag) => !remainingTags.includes(tag));

        // If there are unique tags
       if (uniqueTags.length > 0) {
            // Filter out the deleted tags and update 
            // the allTags state with remaining tags
            const updatedTags = allTags.filter((tag) => (
                !uniqueTags.includes(tag)
            ));

            await handleUpdateTags(updatedTags);
       }
   
        await fetch(url, {
            method: "DELETE",
        });

        setFetchData(!fetchData);
    };

    // When called, sends PATCH request to db.json to update allTags
    const handleUpdateTags = async (newTags) => {
        let url = "http://localhost:3010/all-tags";

        await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ allTags: newTags }),
        });

        fetchTags();
    };

    const filteredTasks = filterTags.length > 0
        ?
            tasks.filter((task) => filterTags.every((tag) => task.tag.includes(tag.value)))
        :
            tasks;


    return (
        <div theme={darkMode ? "dark-theme" : "light-theme"}>
            <h1>Home</h1>
            {/* TODO: Add sorting by tags */}
            <p>Create tasks and keep track of time for spesific tasks</p>

            <div className="headers">
                <h2>All tasks</h2>
                <Select 
                    options={allTags.map((tag) => ({value: tag, label: tag}))}
                    isMulti
                    value={filterTags}
                    onChange={(selected) => setFilterTags(selected)}
                    placeholder="Filter by tags"
                    styles={darkMode ? darkThemeStyle : lightThemeStyle}
                    >

                </Select>
                <button
                    className="create-task"
                    onClick={() => setShowPopup(true)}
                >
                    <BiPlusCircle />
                    Create task
                </button>
            </div>

            <div className="tasks-container">
                {filteredTasks.map((task) => (
                    <Task
                        key={task.id.toString()}
                        id={task.id}
                        name={task.name}
                        tags={task.tags}
                        active={task.active}
                        time={task.time}
                        startedTrackingTime={task.startedTrackingAt}
                        onDelete={() => handleTaskDelete(task.id)}
                        tasks={tasks}
                        updateTasks={setTasks}
                    />
                ))}
            </div>

            {showPopup && (
                <AddTask
                    onClose={() => setShowPopup(false)}
                    onTaskAdd={handleTaskAdd}
                    allTags={allTags}
                    updateAllTags={handleUpdateTags}
                />
            )}
        </div>
    );
}
