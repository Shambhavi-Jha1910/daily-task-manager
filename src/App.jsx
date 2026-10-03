import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterButtons from "./components/FilterButtons";

function App() {
  // 1. TASK STATE — loads saved tasks IMMEDIATELY when state is created
  //    (lazy initialization — runs once, before first render,
  //     so StrictMode's double-mount can never overwrite it)
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // 2. FILTER STATE — what the user wants to see
  const [filter, setFilter] = useState("all"); // all | pending | done

  // 3. SAVE tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // 4. ADD a new task
  function addTask(text, priority) {
    const newTask = {
      id: Date.now(),     // unique id using timestamp
      text: text,
      done: false,
      priority: priority,
    };
    setTasks([...tasks, newTask]); // ... = spread: old tasks + new one
  }

  // 5. DELETE a task
  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // 6. TOGGLE done / pending
  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  // 7. EDIT a task's text
  function editTask(id, newText) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  }

  // 8. Decide which tasks to show based on filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "done") return task.done;
    if (filter === "pending") return !task.done;
    return true; // "all"
  });

  return (
    <BrowserRouter>
      <nav className="navbar">
        <h2>✅ Task Manager</h2>
        <div>
          <Link to="/">Home</Link>
          <Link to="/stats">Stats</Link>
          <Link to="/about">About</Link>
        </div>
      </nav>

      <Routes>
        {/* PAGE 1: HOME */}
        <Route
          path="/"
          element={
            <div className="container">
              <TaskForm onAdd={addTask} />
              <FilterButtons filter={filter} setFilter={setFilter} />
              <TaskList
                tasks={filteredTasks}
                onDelete={deleteTask}
                onToggle={toggleTask}
                onEdit={editTask}
              />
            </div>
          }
        />

        {/* PAGE 2: STATS */}
        <Route
          path="/stats"
          element={
            <div className="container">
              <h2>Statistics</h2>
              <p>Total tasks: {tasks.length}</p>
              <p>Completed: {tasks.filter((t) => t.done).length}</p>
              <p>Pending: {tasks.filter((t) => !t.done).length}</p>
              <p>
                Completion:{" "}
                {tasks.length === 0
                  ? 0
                  : Math.round(
                      (tasks.filter((t) => t.done).length / tasks.length) * 100
                    )}
                %
              </p>
            </div>
          }
        />

        {/* PAGE 3: ABOUT */}
        <Route
          path="/about"
          element={
            <div className="container">
              <h2>About</h2>
              <p>
                Daily Task Manager — a ReactJS application to add, edit,
                delete, and track your daily tasks with priorities.
                Built with React components, hooks (useState, useEffect),
                form validation, and client-side routing.
              </p>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;