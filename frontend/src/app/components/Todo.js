'use client';
import React, { useState } from 'react';

export default function Todo() { // Accept onLogout as a prop
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  function onChangeEvent(event) {
    setTask(event.target.value); // Update the task state with the input value
  }

  function addTask() {
    if (task.trim() !== '') {
      // Check if the input is not empty
      setTasks((tasks) => [...tasks, task]); // Add the task to the tasks array
      setTask(''); // Reset the input field by clearing the task state
    }
  }

  function deleteTask(index) {
    setTasks((tasks) => tasks.filter((_, i) => i !== index)); // Remove the task at the specified index
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Todo App</h1>
        </div>
        <div className="flex gap-2 mb-6">
          <input
            value={task}
            placeholder="Enter a task"
            onChange={onChangeEvent}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
        </div>
        <div>
          <ol className="space-y-2">
            {tasks.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm"
              >
                <span className="text-gray-700">{item}</span>
                <button
                  onClick={() => deleteTask(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  Delete
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}