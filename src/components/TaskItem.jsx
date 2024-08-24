import React, { useState } from "react";

const TaskItem = ({ task, onUpdate, onDelete, updating, deleting }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(task.content);

  const handleUpdate = () => {
    onUpdate(task.id, { content: updatedContent, completed: task.completed });
    setIsEditing(false);
  };

  const handleToggleComplete = () => {
    onUpdate(task.id, { ...task, completed: !task.completed });
  };

  return (
    <li className="task-item">
      {isEditing ? (
        <input
          type="text"
          value={updatedContent}
          onChange={(e) => setUpdatedContent(e.target.value)}
          disabled={updating}
          className="update-input"
        />
      ) : (
        <span
          style={{ textDecoration: task.completed ? "line-through" : "none" }}
          className="task-content"
        >
          {task.content}
        </span>
      )}

      <button onClick={handleToggleComplete} className="complete-button" disabled={updating}>
        {task.completed ? "Undo" : "Complete"}
      </button>

      {isEditing ? (
        <button onClick={handleUpdate} className="edit-button" disabled={updating}>
          {updating ? 'Saving...' : 'Save'}
        </button>
      ) : (
        <button onClick={() => setIsEditing(true)} className="edit-button" disabled={updating}>
          {updating ? 'Saving...' : 'Edit'}
        </button>
      )}

      <button onClick={() => onDelete(task.id)} className="delete-button" disabled={deleting}>
      {deleting ? 'Deleting...' : 'Delete'}
      </button>
    </li>
  );
};

export default TaskItem;
