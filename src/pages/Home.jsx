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
import { DragDropContext, Droppable } from "react-beautiful-dnd";
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
        setTasks(tasks.tasks);
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

    // When new task is created
    const handleTaskAdd = async (newTask) => {
        let url = "http://localhost:3010/tasks";

        // Add the new task into a state so it gets updated in the UI
        setTasks([...tasks, newTask]);

        const updatedTasks = [...tasks, newTask];

        await fetch(url, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({tasks: updatedTasks}),
        });
    };

    // When called, send PUT request to db.json
    // for deletion of spesific task
    // and possible tags
    const handleTaskDelete = async (taskId) => {
        let url = `http://localhost:3010/tasks`;

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

        const updatedTasks = tasks.filter((task) => task.id !== taskId);

        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ tasks: updatedTasks }),
        });

        setFetchData(!fetchData);
    };

    // When tags get removed from a single task, call this
    const handleTaskTagsDelete = async (
        taskId,
        tagToDeleteName,
        updateTaskTags
    ) => {
        let url = `http://localhost:3010/tasks`;

        const updatedTasks = [...tasks];

        // Find the right task
        const taskIndex = updatedTasks.findIndex((task) => task.id === taskId);
        const task = updatedTasks[taskIndex];

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
        task.tags = taskTags;
        updatedTasks[taskIndex] = task;
        updateTaskTags(taskTags);

        // Update the tasks tags
        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ tasks: updatedTasks }),
        });

        setFetchData(!fetchData);
    };

    // When called, sends PATCH request to db.json to update allTags
    const handleUpdateAllTags = async (newTags) => {
        let url = "http://localhost:3010/all-tags";

        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ allTags: newTags }),
        });

        fetchTags();
    };

    const handleOnDragEnd = async (result) => {
        if (!result.destination) {
            return;
        }

        let url = "http://localhost:3010/tasks";

        const reorderTasks = Array.from(filteredTasks);
        const [removed] = reorderTasks.splice(result.source.index, 1);
        reorderTasks.splice(result.destination.index, 0, removed);

        setTasks(reorderTasks);

        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ tasks: reorderTasks }),
        });
    }

    // Shown tasks
    const filteredTasks =
        // If there are filters
        filterTags.length > 0
            ? // Take tasks that only have the selected filter tags in them
              tasks.filter((task) =>
                  filterTags.every((tag) => task.tags.includes(tag.value))
              )
            : // Otherways show all tasks (no filters)
              tasks;

    return (
        <div theme={darkMode ? "dark-theme" : "light-theme"}>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <h1>Home</h1>
                <p>Create tasks and keep track of time for spesific tasks</p>

                <div className="home-container">
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

                <Droppable droppableId="droppable-area" key="droppable-area">
                    {
                        (provided) => {
                            return (
                                <div 
                                    className="tasks-container"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    >
                                    {filteredTasks.map((task, index) => (
                                        <Task
                                            key={task.id.toString()}
                                            id={task.id}
                                            index={index}
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
                                            fetchData={() => setFetchData(!fetchData)}
                                        />
                                    ))}
                                    {provided.placeholder}
                                </div>
                            );
                        }
                    }
                    </Droppable>
                </div>
            </DragDropContext>

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
