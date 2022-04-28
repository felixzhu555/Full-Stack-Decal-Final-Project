import './App.css';
import React from "react";
import Homepage from './pages/Homepage';
import Register from './pages/Register';
import Login from './pages/Login';
import BrowseClasses from './pages/BrowseClasses';
import BrowseGroups from './pages/BrowseGroups';
import UserGroups from './pages/UserGroups';
import CreateGroup from './pages/CreateGroup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetClassName from './pages/GetClassName';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/"
          element={<Homepage />} 
        />
        <Route 
          path="/register" 
          element={<Register />} 
        />
        <Route 
          path="/login" 
          element={<Login />} 
        />
        <Route 
          path="/browse" 
          element={<BrowseClasses />} 
        />
        <Route 
          path="/browse/:id" 
          element={<GetClassName />} 
        />
        <Route 
          path="/mygroups" 
          element={<UserGroups />} 
        />
        <Route 
          path="/creategroup" 
          element={<CreateGroup />} 
        />
        <Route 
          path="*" 
          element={<h2>Path does not exist.</h2>} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
