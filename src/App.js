import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css'

const App = () => {
  console.log(process.env.REACT_APP_DEMO);
  
  const [tasks, setTasks] = useState([]);

// Implementing Loading states
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);  
  const [adding, setAdding] = useState(false);  
  const [updating, setUpdating] = useState(false); 
  const [deleting, setDeleting] = useState(false);


  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      setError('Error while fetching tasks');
      console.error(error);
    }finally{
      setLoading(false);
    }
  };

  const addTask = async (content) => {
    setAdding(true);
    setError(null);
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/tasks`, { content });
      setTasks([...tasks, response.data]);
    } catch (error) {
      setError('Error while adding task');
      console.error(error);
    } finally {
      setAdding(false); 
    }
  };

  const updateTask = async (id, updatedTask) => {
    setUpdating(true);
    setError(null);
    try {
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/tasks/${id}`, updatedTask);
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
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      setError('Error while deleting task');
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
