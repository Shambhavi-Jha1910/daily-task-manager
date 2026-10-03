import { useState } from "react";

function TaskItem({ task, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  function handleSave() {
    if (editText.trim() === "") return; // validation: don't save empty
    onEdit(task.id, editText.trim());
    setIsEditing(false);
  }

  return (
    <li className={`task-item ${task.done ? "done" : ""}`}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />

      {isEditing ? (
        <>
          <input
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <span className="task-text">
            {task.text}
            <span className={`badge ${task.priority.toLowerCase()}`}>
              {task.priority}
            </span>
          </span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}

      <button className="delete" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </li>
  );
}

export default TaskItem;