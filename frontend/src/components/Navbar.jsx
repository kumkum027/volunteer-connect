import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FaHandsHelping } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <FaHandsHelping className="h-8 w-8 text-emerald-500 mr-2" />
              <span className="font-bold text-xl text-gray-900 tracking-tight">Volunteer<span className="text-emerald-500">Connect</span></span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-emerald-500 px-3 py-2 rounded-md font-medium transition-colors">Home</Link>
            <Link to="/events" className="text-gray-600 hover:text-emerald-500 px-3 py-2 rounded-md font-medium transition-colors">Events</Link>
            
            {!user ? (
              <>
                <Link to="/login" className="text-gray-600 hover:text-emerald-500 px-3 py-2 rounded-md font-medium transition-colors">Login</Link>
                <Link to="/register" className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md font-medium transition-colors shadow-sm">Join as Volunteer</Link>
              </>
            ) : (
              <>
                <Link 
                  to={user.role === 'organization' ? '/dashboard/org' : '/dashboard/volunteer'} 
                  className="text-gray-600 hover:text-emerald-500 px-3 py-2 rounded-md font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/profile" 
                  className="text-gray-600 hover:text-emerald-500 px-3 py-2 rounded-md font-medium transition-colors"
                >
                  Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-medium transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
