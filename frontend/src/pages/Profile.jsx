import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { FaUser, FaEnvelope, FaPhone, FaSave } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ALL_INTERESTS = [
  'Plantation', 'Photography', 'Teaching', 'Environment', 
  'Healthcare', 'Blood Donation', 'Animal Welfare', 
  'Food Distribution', 'First Aid', 'Education'
];

const Profile = () => {
  const { user } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    name: user?.name || user?.organizationName || '',
    phone: user?.phone || '',
  });
  
  const [selectedInterests, setSelectedInterests] = useState(user?.interests || []);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
      };
      
      if (user.role === 'volunteer') {
        payload.interests = selectedInterests;
      }

      await api.put('/volunteer/profile', payload);
      toast.success('Profile updated successfully');
      
      // Reload page to refresh user context
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-emerald-600 px-8 py-12 text-center text-white">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg text-emerald-600">
            <FaUser size={40} />
          </div>
          <h1 className="text-3xl font-bold">{user.name || user.organizationName}</h1>
          <p className="text-emerald-100 capitalize mt-1">{user.role}</p>
        </div>
        
        <div className="p-8">
          <h2 className="text-xl font-bold mb-6 text-gray-900 border-b border-gray-100 pb-2">Edit Profile</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name / Org Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address (Cannot change)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    disabled
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    value={user.email}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="phone"
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {user.role === 'volunteer' && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">My Interests</label>
                <div className="flex flex-wrap gap-2">
                  {ALL_INTERESTS.map(interest => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors cursor-pointer ${
                        selectedInterests.includes(interest) 
                          ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm' 
                          : 'bg-white text-gray-700 border-gray-300 hover:border-emerald-500 hover:text-emerald-500'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-gray-100">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto flex justify-center items-center py-3 px-8 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 cursor-pointer"
              >
                <FaSave className="mr-2" />
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
