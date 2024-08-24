import React, { useState } from "react";

const TaskForm = ({ onAdd, adding }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onAdd(content);
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="What needs to be done?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="task-input"
        disabled={adding}
      />
      <button type="submit" className="task-button" disabled={adding}>
        {adding ? 'Adding...' : 'Add Task'}
        </button>
    </form>
  );
};

export default TaskForm;
