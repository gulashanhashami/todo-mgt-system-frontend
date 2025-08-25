import React, { useState, useEffect } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

// code for to-do list 
export const TodoList=({ token })=> {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    getTaskList();
  }, [token]);

// code for fetching tasks
  const getTaskList = async () => {
    axios
      .get(`http://localhost:9000/todos/list`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };


  // function for adding task
  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      const res = await axios.post(
        `http://localhost:9000/todos/create`,
        { task: newTask },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks([...tasks, res.data]);
      setNewTask("");
    } catch (err) {
      console.error(err);
    }
  };

  // function for deleting task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/todos/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-8 border-blue-600">
      <h2 className="text-xl font-semibold mb-4">My Tasks</h2>
      <p className="text-sl mb-10">Manage your personel to-do list</p>

      {/* code for adding task input */}
      <div className="flex mb-4 border-blue-600">
        <input
          type="text"
          placeholder="Add new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none"
        />
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      <ul>
        {tasks.map((task) => (
          <li
            key={task._id}
            className="flex items-center justify-between border-b py-2"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
              />
              <span
                className={`${
                  task.status === "completed"
                    ? "line-through text-gray-500"
                    : ""
                }`}
              >
                {task.task}
              </span>
            </div>
            <IconButton
              onClick={() => deleteTask(task._id)}
              className="text-red-500 hover:text-red-700"
            >
               <DeleteIcon />
            </IconButton>
          </li>
        ))}
      </ul>

      <div className="text-sm text-gray-500 mt-3">
        {tasks.filter((t) => t.status === "completed").length} completed •{" "}
        {tasks.filter((t) => t.status !== "completed").length} remaining
      </div>
    </div>
  );
}