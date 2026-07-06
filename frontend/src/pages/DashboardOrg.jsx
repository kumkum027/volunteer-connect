import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { FaBuilding, FaPlus, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import toast from 'react-hot-toast';

const DashboardOrg = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    date: '',
    time: '',
    requiredVolunteers: '',
    requiredSkills: ''
  });

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const fetchMyEvents = async () => {
    try {
      const res = await api.get('/events');
      const myEvents = res.data.data.filter(e => e.organizationId === user.id);
      setEvents(myEvents);
    } catch (error) {
      console.error('Error fetching org events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        requiredSkills: formData.requiredSkills.split(',').map(s => s.trim())
      };
      await api.post('/events', payload);
      toast.success('Event created successfully!');
      setShowForm(false);
      fetchMyEvents();
      setFormData({ title: '', description: '', category: '', location: '', date: '', time: '', requiredVolunteers: '', requiredSkills: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating event');
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this event?')) {
      try {
        await api.delete(`/events/${id}`);
        toast.success('Event deleted');
        fetchMyEvents();
      } catch (error) {
        toast.error('Error deleting event');
      }
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-blue-100 p-4 rounded-full mr-6">
            <FaBuilding className="text-4xl text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.organizationName || 'Organization'}!</h1>
            <p className="text-gray-600 mt-1">Manage your events and volunteers</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-gray-50 px-6 py-3 rounded-lg border border-gray-100 text-center">
            <p className="text-sm text-gray-500 mb-1">Total Events</p>
            <p className="text-2xl font-bold text-blue-600">{events.length}</p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center cursor-pointer"
          >
            <FaPlus className="mr-2" /> Create Event
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold mb-6">Create New Event</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input type="text" name="category" required value={formData.category} onChange={handleChange} placeholder="e.g. Health, Environment" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" required rows="3" value={formData.description} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input type="text" name="location" required value={formData.location} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Required Volunteers</label>
                <input type="number" name="requiredVolunteers" required value={formData.requiredVolunteers} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input type="date" name="date" required value={formData.date} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input type="time" name="time" required value={formData.time} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills (Comma separated)</label>
                <input type="text" name="requiredSkills" required value={formData.requiredSkills} onChange={handleChange} placeholder="e.g. Plantation, Teaching, Environment" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer">Cancel</button>
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">Publish Event</button>
            </div>
          </form>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center"><FaCalendarAlt className="mr-3 text-blue-500" /> My Created Events</h2>
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <div key={event._id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 line-clamp-1">{event.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{event.description}</p>
                  
                  <div className="text-sm text-gray-600 space-y-2 mb-6">
                    <div className="flex justify-between">
                      <span>Date:</span> <span className="font-medium text-gray-900">{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Volunteers Needed:</span> <span className="font-medium text-gray-900">{event.requiredVolunteers}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                    <button 
                      onClick={() => navigate(`/participants/${event._id}`)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center cursor-pointer"
                    >
                      <FaUsers className="mr-1" /> View Participants
                    </button>
                    <button onClick={() => handleDelete(event._id)} className="text-red-500 hover:text-red-700 text-sm font-medium cursor-pointer">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-xl border border-gray-100 text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCalendarAlt size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No events created yet</h3>
            <p className="text-gray-500 mb-6">Create your first event to start engaging volunteers.</p>
            <button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer">
              Create Event
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardOrg;
