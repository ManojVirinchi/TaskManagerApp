import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SignupPage from './pages/SignupPage';
import CreateTaskPage from './pages/CreateTaskPage';
import EditTaskPage from './pages/EditTaskPage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/createtask" element={<CreateTaskPage/>}/>
      <Route path='/edittask' element={<EditTaskPage/>}/>
    </Routes>
  );
}

export default App;
