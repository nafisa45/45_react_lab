import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
   
    setTasks([
      { task: 'React', description: 'React is a JavaScript library developed by Facebook' },
      { task: 'Task', description: 'Default Description' }
    ]);
  }, []); 

  const addTask = () => {
    setTasks([...tasks, { task: 'React', description: 'React is a JavaScript library developed by Facebook' }]);
  };

  const editTask = (index) => {
    const updatedTasks = [...tasks];
    const updatedTask = { ...updatedTasks[index], editing: true };
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
  };

  const updateTask = (index, newTask, newDescription) => {
    const updatedTasks = [...tasks];
    const updatedTask = { ...updatedTasks[index], task: newTask, description: newDescription, editing: false };
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div className="container mt-3">
      <button className="btn btn-primary position-fixed top-0 end-0 mt-3 me-4" onClick={addTask}>
        Add New Task
      </button>
      {tasks.map((task, index) => (
        <div key={index} className="card mt-3">
          <div className="card-body">
            {task.editing ? (
              <div>
                <input
                  type="text"
                  className="form-control mb-2"
                  value={task.task}
                  onChange={(e) => {
                    const updatedTasks = [...tasks];
                    updatedTasks[index].task = e.target.value;
                    setTasks(updatedTasks);
                  }}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  value={task.description}
                  onChange={(e) => {
                    const updatedTasks = [...tasks];
                    updatedTasks[index].description = e.target.value;
                    setTasks(updatedTasks);
                  }}
                />
                <button className="btn btn-primary me-2" onClick={() => updateTask(index, task.task, task.description)}>
                  OK
                </button>
              </div>
            ) : (
              <div>
                <h5 className="card-title">{task.task}</h5>
                <p className="card-text">{task.description}</p>
              </div>
            )}
            <div className="float-right">
              <button className="btn btn-primary mr-2" onClick={() => editTask(index)}>
                Edit
              </button>
              <button className="btn btn-danger" onClick={() => deleteTask(index)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
