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

//   const fetchMyEvents = async () => {
//     try {
//       const res = await api.get('/events');
//       console.log("USER:", user);
//     console.log("EVENTS:", res.data.data);
//       // const myEvents = res.data.data.filter(e => e.organizationId === user.id);
//       const myEvents = res.data.data.filter(
//   e => e.organizationId?._id === user.id
// );
//       setEvents(myEvents);
//     } catch (error) {
//       console.error('Error fetching org events:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

const fetchMyEvents = async () => {
  try {
    const res = await api.get('/events');

    console.log("USER _ID:", user._id);
    console.log("EVENT ORGANIZATION ID:", res.data.data[0].organizationId);

    const myEvents = res.data.data.filter(
  e => e.organizationId?.toString() === user._id
);

    setEvents(myEvents);
  } catch (error) {
    console.error("Error fetching org events:", error);
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
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl shadow-xl p-8 md:p-10 mb-10 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-20 w-32 h-32 bg-indigo-400 opacity-20 rounded-full blur-xl"></div>
        
        <div className="flex items-center mb-6 md:mb-0 relative z-10">
          <div className="bg-white/20 backdrop-blur-sm p-5 rounded-2xl mr-6 border border-white/30 shadow-sm">
            <FaBuilding className="text-4xl text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Welcome, {user?.organizationName || 'Organization'}!</h1>
            <p className="text-blue-100 mt-2 text-lg">Manage your events and volunteers</p>
          </div>
        </div>
        
        <div className="flex gap-4 relative z-10 w-full md:w-auto">
          <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 text-center flex-1 md:flex-none shadow-sm">
            <p className="text-sm text-blue-100 mb-1 font-medium tracking-wide uppercase">Total Events</p>
            <p className="text-3xl font-extrabold text-white">{events.length}</p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <FaPlus className="mr-2" /> Create Event
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-slate-100 mb-10 transform transition-all duration-500">
          <div className="flex items-center mb-8 border-b border-slate-100 pb-4">
            <div className="bg-blue-50 p-3 rounded-xl mr-4">
              <FaPlus className="text-xl text-blue-600" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">Create New Event</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Event Title</label>
                <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                <input type="text" name="category" required value={formData.category} onChange={handleChange} placeholder="e.g. Health, Environment" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                <textarea name="description" required rows="3" value={formData.description} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Location</label>
                <input type="text" name="location" required value={formData.location} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Required Volunteers</label>
                <input type="number" name="requiredVolunteers" required value={formData.requiredVolunteers} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Date</label>
                <input type="date" name="date" required value={formData.date} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Time</label>
                <input type="time" name="time" required value={formData.time} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Required Skills (Comma separated)</label>
                <input type="text" name="requiredSkills" required value={formData.requiredSkills} onChange={handleChange} placeholder="e.g. Plantation, Teaching, Environment" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none" />
              </div>
            </div>
            <div className="flex justify-end gap-4 pt-4 border-t border-slate-100">
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 border border-slate-300 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer">Cancel</button>
              <button type="submit" className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer">Publish Event</button>
            </div>
          </form>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-8 flex items-center"><FaCalendarAlt className="mr-3 text-blue-500" /> My Created Events</h2>
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map(event => (
              <div key={event._id} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="p-8 flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-extrabold text-xl text-slate-900 line-clamp-2 leading-tight">{event.title}</h3>
                  </div>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">{event.description}</p>
                  
                  <div className="text-sm text-slate-600 space-y-3 mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-500">Date:</span> 
                      <span className="font-bold text-slate-900">{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-500">Needed:</span> 
                      <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded shadow-sm">{event.requiredVolunteers}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-auto">
                    <button 
                      onClick={() => navigate(`/participants/${event._id}`)}
                      className="bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center transition-colors cursor-pointer"
                    >
                      <FaUsers className="mr-2" /> Participants
                    </button>
                    <button onClick={() => handleDelete(event._id)} className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-xl text-sm font-bold transition-colors cursor-pointer">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-16 rounded-3xl border border-slate-100 text-center shadow-sm flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <FaCalendarAlt size={32} />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-3">No events created yet</h3>
            <p className="text-slate-500 mb-8 max-w-md mx-auto text-lg">Create your first event to start engaging volunteers and making a difference.</p>
            <button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 cursor-pointer">
              <FaPlus className="inline mr-2" /> Create Event
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardOrg;
