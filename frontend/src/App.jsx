import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardVolunteer from './pages/DashboardVolunteer';
import DashboardOrg from './pages/DashboardOrg';
import EventsList from './pages/EventsList';
import EventDetails from './pages/EventDetails';
import Profile from './pages/Profile';
import Participants from './pages/Participants';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div></div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
          <Navbar />
          <main className="flex-grow flex flex-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<EventsList />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/dashboard/volunteer" 
                element={
                  <ProtectedRoute allowedRoles={['volunteer']}>
                    <DashboardVolunteer />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/org" 
                element={
                  <ProtectedRoute allowedRoles={['organization']}>
                    <DashboardOrg />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route
                path="/participants/:id"
                element={
                  <ProtectedRoute allowedRoles={["organization"]}>
                    <Participants />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster position="top-right" toastOptions={{
          className: '',
          style: {
            border: '1px solid #10b981',
            padding: '16px',
            color: '#1f2937',
          },
        }} />
      </Router>
    </AuthProvider>
  );
}

export default App;
