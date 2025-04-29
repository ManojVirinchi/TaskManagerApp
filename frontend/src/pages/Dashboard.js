import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard Page</h1>
      <Link to="/createtask">
        <button>Create Task</button>
      </Link>
      <br /><br />
      <Link to="/">
        <button>Logout</button>
      </Link>
    </div>
  );
}

export default Dashboard;
