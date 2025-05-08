import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Dashboard.css';
import backgroundGif from '../assets/Dashboard.gif';


function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Pending');
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  
 
  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate);
    setStatus(task.status);
    setEditTaskId(task.id);
    setIsEditing(true);
    setShowModal(true);
  };
  
  const handleDelete = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      axios.delete(`http://localhost:8080/api/tasks/${taskId}`)
        .then(() => fetchTasks())
        .catch(error => console.error('Error deleting task:', error));
    }
  };
  const loggedInUsername = sessionStorage.getItem("username");
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    if (!loggedInUsername) {
      // If not logged in, redirect to login
      window.location.href = "/";
    }
    fetchTasks();
  }, []);  

  const fetchTasks = () => {
    axios.get(`http://localhost:8080/api/tasks/user/${userId}`)
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = { title, description, dueDate, status, user: { id: userId } };
  
    const request = isEditing
      ? axios.put(`http://localhost:8080/api/tasks/${editTaskId}`, task)
      : axios.post(`http://localhost:8080/api/tasks/create/${userId}`, task);
  
    request.then(() => {
      fetchTasks(); // refresh task list
      setShowModal(false);
      resetForm();
    }).catch(error => {
      console.error('Error saving task:', error);
    });
  };
  
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
    setStatus('Pending');
    setIsEditing(false);
    setEditTaskId(null);
  };
  

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard Page</h1>

      <div className="action-bar">
        <button onClick={() => setShowModal(true)} className="btn create-btn">+ Create Task</button>
        <a href="/">
          <button className="btn logout-btn">Logout</button>
        </a>
      </div>

      <div>
        <h2>Your Tasks:</h2>
        {tasks.length === 0 ? (
          <p>No tasks found!</p>
        ) : (
          <div className="card-container">
            {tasks.map(task => (
              <div key={task.id} className="card">
                <h3>{task.title}</h3>
                <p><strong>Status:</strong> {task.status}</p>
                <p><strong>Due:</strong> {task.dueDate}</p>
                <p className="card-desc">{task.description}</p>

                <div className="task-actions">
                <button className="edit-btn" onClick={() => handleEdit(task)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(task.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="overlay">
          <div className="modal">
            <h2>Create Task</h2>
            <form onSubmit={handleSubmit} className="modal-form">
              <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
              <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="btn cancel-btn">Cancel</button>
                <button type="submit" className="btn create-btn">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
