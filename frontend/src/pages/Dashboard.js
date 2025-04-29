import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Pending');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from backend when component mounts
    axios.get('http://localhost:8080/api/tasks/user/1')  // 🔥 Replace 1 with dynamic userId later
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = { title, description, dueDate, status, user: { id: 1 } };
    console.log(task);

    // Later send to backend

    setShowModal(false);  // Close modal
    // Optionally reset form
    setTitle('');
    setDescription('');
    setDueDate('');
    setStatus('Pending');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard Page</h1>

      <button onClick={() => setShowModal(true)} style={buttonStyle}>+ Create Task</button>
      <br /><br />
      <a href="/">
        <button style={buttonStyle}>Logout</button>
      </a>

            {/* List of Tasks */}
            <div>
        <h2>Your Tasks:</h2>
        {tasks.length === 0 ? (
          <p>No tasks found!</p>
        ) : (
          <ul>
            {tasks.map(task => (
              <li key={task.id}>
                <strong>{task.title}</strong> - {task.status} (Due: {task.dueDate})
              </li>
            ))}
          </ul>
        )}
      </div>


      {/* Modal */}
      {showModal && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h2>Create Task</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea 
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
              <input 
                type="date" 
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowModal(false)} style={cancelButtonStyle}>Cancel</button>
                <button type="submit" style={buttonStyle}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Styles
const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const cancelButtonStyle = {
  ...buttonStyle,
  backgroundColor: 'grey'
};

const overlayStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const modalStyle = {
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '8px',
  width: '400px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
};

export default Dashboard;
