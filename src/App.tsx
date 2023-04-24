import React, { useContext } from 'react';
import './style.scss'
import Register from './pages/registerPage';
import Login from './pages/loginPage';
import Home from './pages/home'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext'

function App() {
  const { currentUser } = useContext(AuthContext)
  console.log(currentUser)

  const ProtectedRoute = ({ children }: any) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" />
        <Route index element={
  <ProtectedRoute>
    <Home/>
  </ProtectedRoute>
}/>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
