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

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-blue-100 p-4 rounded-full mr-6 text-blue-600">
            <FaUsers className="text-4xl" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Event Participants</h1>
            <p className="text-gray-600 mt-1">Review the volunteers who joined your event</p>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-3 rounded-lg border border-gray-100 text-center">
          <p className="text-sm text-gray-500 mb-1">Total Registered</p>
          <p className="text-2xl font-bold text-blue-600">{participants.length}</p>
        </div>
      </div>

      {participants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {participants.map((participant, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mr-4 shrink-0 overflow-hidden">
                    {participant.profileImage && participant.profileImage !== 'no-photo.jpg' ? (
                      <img src={participant.profileImage} alt={participant.name} className="h-full w-full object-cover" />
                    ) : (
                      <FaUser className="text-3xl" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{participant.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <FaCalendarAlt className="mr-1 text-gray-400" /> 
                      Joined: {new Date(participant.joinedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3 pt-4 border-t border-gray-50">
                  <div className="flex items-center text-gray-600">
                    <FaEnvelope className="w-5 text-blue-400 mr-3" />
                    <span className="truncate">{participant.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaPhone className="w-5 text-blue-400 mr-3" />
                    <span>{participant.phone || 'Not provided'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-16 rounded-2xl border border-gray-100 text-center">
          <div className="w-20 h-20 bg-blue-50 text-blue-300 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaUsers size={32} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">👥 No volunteers have joined this event yet.</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Check back later once the event gains more visibility!
          </p>
        </div>
      )}
    </div>
  );
};

export default Participants;
