import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaTools, FaBuilding, FaArrowLeft } from 'react-icons/fa';
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

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <div className="h-64 md:h-80 relative">
          <img 
            src={event.image === 'default-event.jpg' ? 'https://images.unsplash.com/photo-1593113563332-e147ce3f7e4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' : event.image} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-emerald-600 shadow-sm">
            {event.category}
          </div>
        </div>

        <div className="p-8 md:p-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{event.title}</h1>
          
          <div className="flex items-center text-gray-600 mb-8 border-b border-gray-100 pb-8">
            <div className="bg-gray-100 p-3 rounded-full mr-4">
              <FaBuilding className="text-xl text-gray-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Organized by</p>
              <p className="font-semibold text-lg text-gray-900">{event.organizationName}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">About This Event</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Event Details</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FaCalendarAlt className="text-emerald-500 mt-1 mr-4 text-lg" />
                  <div>
                    <p className="font-semibold text-gray-900">Date & Time</p>
                    <p className="text-gray-600">{new Date(event.date).toLocaleDateString()} at {event.time}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-emerald-500 mt-1 mr-4 text-lg" />
                  <div>
                    <p className="font-semibold text-gray-900">Location</p>
                    <p className="text-gray-600">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaUsers className="text-emerald-500 mt-1 mr-4 text-lg" />
                  <div>
                    <p className="font-semibold text-gray-900">Volunteers Needed</p>
                    <p className="text-gray-600">{event.requiredVolunteers} volunteers</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaTools className="text-emerald-500 mt-1 mr-4 text-lg" />
                  <div>
                    <p className="font-semibold text-gray-900">Required Skills</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {event.requiredSkills.map((skill, i) => (
                        <span key={i} className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded border border-emerald-200">
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
                  className="w-full mt-8 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-colors cursor-pointer"
                >
                  Join Event
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
