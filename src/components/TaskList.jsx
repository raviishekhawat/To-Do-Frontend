import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onUpdate, onDelete, updating, deleting }) => {
  return (
    <div>
      {tasks.length === 0 ? (
        <p className="no-task">No tasks available.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdate={onUpdate}
              onDelete={onDelete}
              updating={updating}
              deleting={deleting}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
