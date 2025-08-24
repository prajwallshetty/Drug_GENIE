import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import AIAssistant from './pages/AIAssistant';
import DrugChecker from './pages/DrugChecker';
import MedicineLibrary from './pages/MedicineLibrary';
import Reminders from './pages/Reminders';
import BloodBank from './pages/BloodBank';
import SymptomChecker from './pages/SymptomChecker';
import { getCurrentUser } from './utils/storage';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const currentUser = getCurrentUser();
  return currentUser ? <>{children}</> : <Navigate to="/login" replace />;
};

// Public Route Component (redirect to dashboard if logged in)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const currentUser = getCurrentUser();
  return !currentUser ? <>{children}</> : <Navigate to="/" replace />;
};

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />
          <Route path="/signup" element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          } />
          
          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="ai-assistant" element={<AIAssistant />} />
            <Route path="drug-checker" element={<DrugChecker />} />
            <Route path="library" element={<MedicineLibrary />} />
            <Route path="reminders" element={<Reminders />} />
            <Route path="blood-bank" element={<BloodBank />} />
            <Route path="symptom-checker" element={<SymptomChecker />} />
          </Route>
        </Routes>
      </Router>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#374151',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
          },
        }}
      />
    </>
  );
}

export default App;