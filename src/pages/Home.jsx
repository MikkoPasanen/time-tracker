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
    const [createTaskPopup, setCreateTaskPopup] = useState(false);
    // Manage if data should be fetched again from db.json or not
    const [fetchData, setFetchData] = useState(false);
    // Holds all tags
    const [allTags, setAllTags] = useState([]);

    // Holds the filtering options
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
        const uniqueTags = tagsToDelete.filter(
            (tag) => !remainingTags.includes(tag)
        );

        // If there are unique tags
        if (uniqueTags.length > 0) {
            // Filter out the deleted tags and update
            // the allTags state with remaining tags
            const updatedTags = allTags.filter(
                (tag) => !uniqueTags.includes(tag)
            );

            await handleUpdateAllTags(updatedTags);
        }

        await fetch(url, {
            method: "DELETE",
        });

        setFetchData(!fetchData);
    };

    // When tags get removed from a single task, call this
    const handleTaskTagsDelete = async (
        taskId,
        tagToDeleteName,
        updateTaskTags
    ) => {
        let url = `http://localhost:3010/tasks/${taskId}`;

        // Find the right task
        const task = tasks.find((task) => task.id === taskId);

        // Tasks tags
        let taskTags = task.tags;

        // Check if the tag that is being deleted
        // is unique
        const isUnique = !tasks.some(
            (task) => task.id !== taskId && task.tags.includes(tagToDeleteName)
        );

        // If it is unique
        if (isUnique) {
            // New all tags array where the unique tag is gone
            const updatedTags = allTags.filter(
                (tag) => tag !== tagToDeleteName
            );

            await handleUpdateAllTags(updatedTags);
        }

        // New task tags array where the deleted tag is gone
        taskTags = taskTags.filter((tag) => tag !== tagToDeleteName);
        updateTaskTags(taskTags);

        // Update the tasks tags
        await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ tags: taskTags }),
        });

        setFetchData(!fetchData);
    };

    // When called, sends PATCH request to db.json to update allTags
    const handleUpdateAllTags = async (newTags) => {
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

    // Holds either filtered tasks or all tasks and these will be rendered on the screen
    const filteredTasks =
        // If there are selected tag filters
        filterTags.length > 0
            ? // Filter only tasks that matches by
              // having the same amount of tags as
              // in the filter options
              // and each filter tag existst in this task
              tasks.filter((task) => {
                  if (filterTags.length !== task.tags.length) {
                      // If tag lengths don't match, then skip this task
                      return false;
                  }
                  // Check if all the filter tags match
                  // this tasks tags
                  // and returns true if they match
                  return filterTags.every((tag) =>
                      task.tags.includes(tag.value)
                  );
              })
            : // In other case, show all tasks
              tasks;

    return (
        <div theme={darkMode ? "dark-theme" : "light-theme"}>
            <h1>Home</h1>
            <p>Create tasks and keep track of time for spesific tasks</p>
            <div className="headers">
                <Select
                    options={allTags.map((tag) => ({
                        value: tag,
                        label: tag,
                    }))}
                    isMulti
                    value={filterTags}
                    onChange={(selected) => setFilterTags(selected)}
                    placeholder="Filter by tags"
                    styles={darkMode ? darkThemeStyle : lightThemeStyle}
                ></Select>
                <button
                    className="create-task"
                    onClick={() => setCreateTaskPopup(true)}
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
                        allTags={allTags}
                        active={task.active}
                        time={task.time}
                        startedTrackingTime={task.startedTrackingAt}
                        onDelete={() => handleTaskDelete(task.id)}
                        tasks={tasks}
                        updateTasks={setTasks}
                        removeTag={handleTaskTagsDelete}
                        updateAllTags={handleUpdateAllTags}
                    />
                ))}
            </div>

            {createTaskPopup && (
                <AddTask
                    onClose={() => setCreateTaskPopup(false)}
                    onTaskAdd={handleTaskAdd}
                    allTags={allTags}
                    updateAllTags={handleUpdateAllTags}
                />
            )}
        </div>
    );
}
