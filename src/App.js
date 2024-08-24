import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css'

const App = () => {
  const [tasks, setTasks] = useState([]);

  //loading states...
  const [loading, setLoading] = useState(false);  // Loading state
  const [error, setError] = useState(null);       // Error state
  const [adding, setAdding] = useState(false);    // Adding task state
  const [updating, setUpdating] = useState(false);  // Updating task state
  const [deleting, setDeleting] = useState(false);  // Deleting task state
  //end


  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      setTasks(response.data);
    } catch (error) {
      setError('Error fetching tasks');
      console.error(error);
    }finally{
      setLoading(false);
    }
  };

  const addTask = async (content) => {
    setAdding(true); //loading
    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/tasks', { content });
      setTasks([...tasks, response.data]);
    } catch (error) {
      setError('Error adding task');
      console.error(error);
    } finally {
      setAdding(false); //loading
    }
  };

  const updateTask = async (id, updatedTask) => {
    setUpdating(true);
    setError(null);
    try {
      const response = await axios.put(`http://localhost:5000/tasks/${id}`, updatedTask);
      setTasks(tasks.map(task => (task.id === id ? response.data : task)));
    } catch (error) {
      setError('Error while updating task');
      console.error(error);
    }finally{
      setUpdating(false);
    }
  };

  const deleteTask = async (id) => {
    setDeleting(true);
    setError(null);
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      setError('Error deleting task');
      console.error(error);
    }finally{
      setDeleting(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className='app-title'>To-Do Application</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <>
          <TaskForm onAdd={addTask} adding={adding}/>
          <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} updating={updating} deleting={deleting}/>
        </>
      )}
    </div>
  );
};

export default App;
