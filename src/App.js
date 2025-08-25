import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Register } from './components/register/Register';
import { Login } from './components/login/Login';
import { Navbar } from './components/navbar/Navbar';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import { Dashboard } from './components/dashboard/Dashboard';
import { UserList } from './components/users/UserList';

function App() {
  return (
    <AuthProvider>
      {/* <Router> */}
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <ProtectedRoute>
                    <UserList />
                  </ProtectedRoute>
                }
              />
      </Routes>
      {/* <Register /> */}
    </div>
    {/* </Router> */}
    </AuthProvider>
  );
}

export default App;
