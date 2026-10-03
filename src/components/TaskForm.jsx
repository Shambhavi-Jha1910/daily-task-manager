import { useState } from "react";

function TaskForm({ onAdd }) {
  const [text, setText] = useState("");          // what's typed
  const [priority, setPriority] = useState("Medium");
  const [error, setError] = useState("");        // validation message

  function handleSubmit(e) {
    e.preventDefault();               // stop page reload
    if (text.trim() === "") {         // VALIDATION: no empty tasks
      setError("Task cannot be empty!");
      return;
    }
    onAdd(text.trim(), priority);     // send data up to App
    setText("");                      // clear input
    setError("");                     // clear error
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <button type="submit">Add</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default TaskForm;