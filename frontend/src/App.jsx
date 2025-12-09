import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import PortfolioManager from './pages/PortfolioManager';
import Editor from './pages/Editor';
import Landing from "./pages/Landing";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  if (!token) return <Navigate to="/login" />;

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* Public Landing Page */}
          <Route path="/" element={<Landing />} />

          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected Portfolio Manager */}
          <Route
            path="/portfolio-manager"
            element={
              <ProtectedRoute>
                <PortfolioManager />
              </ProtectedRoute>
            }
          />

          {/* Public Portfolio */}
          <Route path="/p/:id" element={<Portfolio />} />

          {/* Protected Editor */}
          <Route
            path="/editor/:id"
            element={
              <ProtectedRoute>
                <Editor />
              </ProtectedRoute>
            }
          />

          {/* Payment Routes */}
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/payment-success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
          <Route path="/payment-cancel" element={<ProtectedRoute><PaymentCancel /></ProtectedRoute>} />

          {/* Catch-All Redirect */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;


