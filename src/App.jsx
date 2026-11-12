
import { useState } from 'react';
import './App.css';

function App() {

  // Store the list of tasks
  const [tasks, setTasks] = useState([]);

  // Store the text entered by the user
  const [taskInput, setTaskInput] = useState('');

  // Add a new task
  function addTask() {

    // Prevent adding an empty task
    if (taskInput.trim() === '') {
      return;
    }

    // Create a new task object
    const newTask = {
      id: Date.now(),
      title: taskInput,
      completed: false
    };

    // Add the new task to the existing task list
    setTasks([...tasks, newTask]);

    // Clear the input field
    setTaskInput('');
  }

  // Mark a task as completed or pending
  function toggleTask(taskId) {

    const updatedTasks = tasks.map((task) => {

      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  }

  // Delete a task
  function deleteTask(taskId) {

    const updatedTasks = tasks.filter((task) => {
      return task.id !== taskId;
    });

    setTasks(updatedTasks);
  }

  // Calculate dashboard statistics
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="app-container">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">TaskFlow</h2>

        <nav>
          <a href="#" className="nav-link active">
            Dashboard
          </a>

          <a href="#tasks" className="nav-link">
            My Tasks
          </a>

          <a href="#tasks" className="nav-link">
            Completed
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">

        <header className="header">
          <div>
            <h1>My Dashboard</h1>
            <p>Welcome! Here's an overview of your tasks.</p>
          </div>
        </header>

        {/* Statistics */}
        <section className="stats-container">

          <div className="stat-card">
            <h3>Total Tasks</h3>
            <p>{totalTasks}</p>
          </div>

          <div className="stat-card">
            <h3>Pending Tasks</h3>
            <p>{pendingTasks}</p>
          </div>

          <div className="stat-card">
            <h3>Completed Tasks</h3>
            <p>{completedTasks}</p>
          </div>

        </section>

        {/* Task Section */}
        <section className="tasks-section" id="tasks">

          <h2>My Tasks</h2>

          {/* Add Task Form */}
          <div className="task-input-container">

            <input
              type="text"
              placeholder="Enter a new task..."
              value={taskInput}
              onChange={(event) => {
                setTaskInput(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  addTask();
                }
              }}
            />

            <button onClick={addTask}>
              Add Task
            </button>

          </div>

          {/* Display Tasks */}
          <div className="task-list">

            {tasks.length === 0 ? (

              <div className="empty-state">
                <p>No tasks available yet.</p>
                <p>Add your first task above!</p>
              </div>

            ) : (

              tasks.map((task) => (

                <div className="task-item" key={task.id}>

                  <div className="task-details">

                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                    />

                    <span
                      className={
                        task.completed
                          ? 'completed-task'
                          : ''
                      }
                    >
                      {task.title}
                    </span>

                  </div>

                  <button
                    className="delete-button"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>

                </div>

              ))

            )}

          </div>

        </section>

      </main>
    </div>
  );
}

export default App;
