import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaTools, FaBuilding, FaArrowLeft } from 'react-icons/fa';
import { getImageForCategory, DEFAULT_EVENT_IMAGE } from '../utils/getImageForCategory';
import toast from 'react-hot-toast';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        setEvent(res.data.data);
      } catch (error) {
        toast.error('Error fetching event details');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id, navigate]);

  const handleJoin = async () => {
    if (!user) {
      toast.error('Please login to join this event');
      navigate('/login');
      return;
    }
    
    if (user.role !== 'volunteer') {
      toast.error('Only volunteers can join events');
      return;
    }

    try {
      await api.post(`/events/${id}/join`);
      toast.success('Successfully joined the event!');
      navigate('/dashboard/volunteer');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error joining event');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div></div>;
  }

  if (!event) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-gray-500 hover:text-gray-900 mb-6 transition-colors cursor-pointer"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="h-72 md:h-96 relative bg-slate-900">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent z-10"></div>
          <img 
            src={event.image === 'default-event.jpg' || !event.image ? getImageForCategory(event.category) : event.image} 
            alt={event.title} 
            onError={(e) => { e.target.src = DEFAULT_EVENT_IMAGE; e.target.onerror = null; }}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute top-6 right-6 z-20 bg-white/95 backdrop-blur-md px-5 py-2 rounded-full font-bold tracking-wide text-emerald-700 shadow-lg border border-white/20">
            {event.category}
          </div>
          <div className="absolute bottom-6 left-8 z-20">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 leading-tight drop-shadow-lg">{event.title}</h1>
          </div>
        </div>

        <div className="p-8 md:p-10">
          <div className="flex items-center text-slate-600 mb-8 border-b border-slate-100 pb-8">
            <div className="bg-emerald-50 p-4 rounded-2xl mr-5 shadow-sm border border-emerald-100">
              <FaBuilding className="text-2xl text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-1">Organized by</p>
              <p className="font-bold text-xl text-slate-900">{event.organizationName}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-6">
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-slate-900 mb-5">About This Event</h2>
              <div className="prose prose-emerald max-w-none">
                <p className="text-slate-600 leading-loose whitespace-pre-line text-lg">
                  {event.description}
                </p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-sm sticky top-24">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Event Details</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-white p-2.5 rounded-xl shadow-sm mr-4 mt-0.5">
                      <FaCalendarAlt className="text-emerald-500 text-lg" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Date & Time</p>
                      <p className="text-slate-600 mt-1">{new Date(event.date).toLocaleDateString()} at {event.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-white p-2.5 rounded-xl shadow-sm mr-4 mt-0.5">
                      <FaMapMarkerAlt className="text-emerald-500 text-lg" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Location</p>
                      <p className="text-slate-600 mt-1">{event.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white p-2.5 rounded-xl shadow-sm mr-4 mt-0.5">
                      <FaUsers className="text-emerald-500 text-lg" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Volunteers Needed</p>
                      <p className="text-slate-600 mt-1">{event.requiredVolunteers} volunteers</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white p-2.5 rounded-xl shadow-sm mr-4 mt-0.5">
                      <FaTools className="text-emerald-500 text-lg" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 mb-2">Required Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {event.requiredSkills.map((skill, i) => (
                          <span key={i} className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {(!user || user.role === 'volunteer') && (
                  <button 
                    onClick={handleJoin}
                    className="w-full mt-8 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer text-lg"
                  >
                    Join Event
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
