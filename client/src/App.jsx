import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { useAuth } from './context/useAuth';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import SubmissionsPage from './pages/admin/SubmissionsPage';
import TalentsPage from './pages/admin/TalentsPage';
import TalentDashboard from './pages/talent/TalentDashboard';
import NotFoundPage from './pages/NotFoundPage';

const PrivateRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute role="Admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/admin/tasks"
            element={
              <PrivateRoute role="Admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/talent/dashboard"
            element={
              <PrivateRoute role="Talent">
                <TalentDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/submissions"
            element={
              <PrivateRoute role="Admin">
                <SubmissionsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/talents"
            element={
              <PrivateRoute role="Admin">
                <TalentsPage />
              </PrivateRoute>
            }
          />
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
