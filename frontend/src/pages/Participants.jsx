import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Participants = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const res = await api.get(`/events/${id}/participants`);
        setParticipants(res.data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error fetching participants');
        navigate('/dashboard/org');
      } finally {
        setLoading(false);
      }
    };
    fetchParticipants();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full">
      <button 
        onClick={() => navigate('/dashboard/org')} 
        className="flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors cursor-pointer"
      >
        <FaArrowLeft className="mr-2" /> Back to Dashboard
      </button>

      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl shadow-xl p-8 md:p-10 mb-10 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-20 w-32 h-32 bg-indigo-400 opacity-20 rounded-full blur-xl"></div>
        
        <div className="flex items-center mb-6 md:mb-0 relative z-10">
          <div className="bg-white/20 backdrop-blur-sm p-5 rounded-2xl mr-6 border border-white/30 shadow-sm">
            <FaUsers className="text-4xl text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Event Participants</h1>
            <p className="text-blue-100 mt-2 text-lg">Review the volunteers who joined your event</p>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 text-center relative z-10 shadow-sm">
          <p className="text-sm text-blue-100 mb-1 font-medium tracking-wide uppercase">Total Registered</p>
          <p className="text-3xl font-extrabold text-white">{participants.length}</p>
        </div>
      </div>

      {participants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {participants.map((participant, index) => (
            <div key={index} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="h-16 w-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mr-5 shrink-0 overflow-hidden shadow-inner border border-blue-100">
                    {participant.profileImage && participant.profileImage !== 'no-photo.jpg' ? (
                      <img src={participant.profileImage} alt={participant.name} className="h-full w-full object-cover" />
                    ) : (
                      <FaUser className="text-3xl" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900">{participant.name}</h3>
                    <p className="text-sm text-slate-500 flex items-center mt-1.5 font-medium">
                      <FaCalendarAlt className="mr-1.5 text-slate-400" /> 
                      Joined: {new Date(participant.joinedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <div className="flex items-center text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <FaEnvelope className="w-5 text-blue-500 mr-3" />
                    <span className="truncate font-medium">{participant.email}</span>
                  </div>
                  <div className="flex items-center text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <FaPhone className="w-5 text-blue-500 mr-3" />
                    <span className="font-medium">{participant.phone || 'Not provided'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-16 rounded-3xl border border-slate-100 text-center shadow-sm flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <FaUsers size={32} />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 mb-3">👥 No volunteers have joined this event yet.</h3>
          <p className="text-slate-500 mb-8 max-w-md mx-auto text-lg">
            Check back later once the event gains more visibility!
          </p>
        </div>
      )}
    </div>
  );
};

export default Participants;
