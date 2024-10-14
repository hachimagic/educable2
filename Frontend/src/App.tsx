import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // Ensure useAuth is imported

import Dashboard from './assets/pages/Dashboard';
import Contribute from './assets/pages/Contribute';
import SubjectDetail from './assets/pages/SubjectDetail';
import ExerciseDetail from './assets/pages/ExerciseDetail';
import Quiz from './assets/pages/Quiz';
import NotFound from './assets/pages/NotFound';
import Login from './assets/pages/Login';
import Register from './assets/pages/Register';
import Profile from './assets/pages/Profile';
import Header from './components/Header';
import LandingP from './assets/pages/LandingP';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth(); // Use the useAuth hook here
  return isAuthenticated ? children : <Navigate to="/landing" />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/contribute" element={<ProtectedRoute><Contribute /></ProtectedRoute>} />
          <Route path="/subject/:subject/:subsubject" element={<ProtectedRoute><SubjectDetail /></ProtectedRoute>} />
          <Route path="/subject/:subject/:subsubject/:id" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
          <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
          <Route path="landing" element={<LandingP />} />
          <Route path="headerTest" element={<Header onRefresh={function (): void {
            console.log("Navigate to LandingPage!")
          } } />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;