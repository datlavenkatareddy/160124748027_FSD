import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [taskName, setTaskName] = useState("");
  const [module, setModule] = useState("Frontend");
  const [priority, setPriority] = useState("Medium");
  const [hours, setHours] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("taskpilot-tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("taskpilot-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const createTask = () => {
    if (!taskName.trim()) return;

    const task = {
      id: Date.now(),
      name: taskName.trim(),
      module,
      priority,
      hours: hours || 0,
      completed: false
    };

    setTasks((currentTasks) => [...currentTasks, task]);
    setTaskName("");
    setHours("");
  };

  const toggleTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const removeTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
  };

  const completedCount = tasks.filter((task) => task.completed).length;
  const activeCount = tasks.length - completedCount;

  return (
    <main className="page">
      <section className="app-shell">
        <header className="hero">
          <div>
            <p className="eyebrow">FULL STACK LAB • EXPERIMENT 6A</p>
            <h1>TaskPilot</h1>
            <p className="subtitle">
              Organize development work and keep your progress saved.
            </p>
          </div>
          <div className="hero-badge">React + localStorage</div>
        </header>

        <section className="stats">
          <article>
            <span>Total Tasks</span>
            <strong>{tasks.length}</strong>
          </article>
          <article>
            <span>In Progress</span>
            <strong>{activeCount}</strong>
          </article>
          <article>
            <span>Completed</span>
            <strong>{completedCount}</strong>
          </article>
        </section>

        <section className="task-form">
          <input
            type="text"
            placeholder="Enter a development task"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />

          <select value={module} onChange={(e) => setModule(e.target.value)}>
            <option>Frontend</option>
            <option>Backend</option>
            <option>Database</option>
            <option>Testing</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <input
            type="number"
            min="0"
            placeholder="Hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />

          <button className="primary-btn" onClick={createTask}>
            Add Task
          </button>
        </section>

        <section className="task-list">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">✓</div>
              <h3>No tasks yet</h3>
              <p>Add your first development task above.</p>
            </div>
          ) : (
            tasks.map((task) => (
              <article
                className={`task-card ${task.completed ? "completed" : ""}`}
                key={task.id}
              >
                <div className="task-info">
                  <div className="task-title-row">
                    <h3>{task.name}</h3>
                    <span className={`priority ${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                  </div>
                  <p>
                    {task.module} <span>•</span> {task.hours} hrs
                  </p>
                </div>

                <div className="actions">
                  <button onClick={() => toggleTask(task.id)}>
                    {task.completed ? "Reopen" : "Complete"}
                  </button>
                  <button
                    className="danger-btn"
                    onClick={() => removeTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      </section>
    </main>
  );
}

export default App;
