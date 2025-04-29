import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateTaskPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Pending');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const task = {
      title,
      description,
      dueDate,
      status,
      user: { id: 1 }  // replace with logged-in user ID
    };

    // send to backend (to be implemented)
    console.log(task);

    // Redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2>Create Task</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={inputStyle}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          style={{ ...inputStyle, resize: 'none' }}
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          style={inputStyle}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)} style={inputStyle}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button type="submit" style={buttonStyle}>Create Task</button>
      </form>
    </div>
  );
}

const containerStyle = {
  display: 'flex',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f9f9f9'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  width: '300px',
  padding: '30px',
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
};

const inputStyle = {
  padding: '10px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '5px'
};

const buttonStyle = {
  padding: '10px',
  fontSize: '16px',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#007bff',
  color: 'white',
  cursor: 'pointer'
};

export default CreateTaskPage;
