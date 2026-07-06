import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import EventCard from '../components/EventCard';
import { Link } from 'react-router-dom';
import { FaUser, FaStar, FaCalendarCheck, FaChartPie, FaCheckCircle, FaHeart } from 'react-icons/fa';

const DashboardVolunteer = () => {
  const { user } = useContext(AuthContext);
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const now = new Date();
  const upcomingEvents = myEvents.filter(e => new Date(e.date) >= now).length;
  const completedEvents = myEvents.filter(e => new Date(e.date) < now).length;
  
  const categoryCounts = myEvents.reduce((acc, event) => {
    acc[event.category] = (acc[event.category] || 0) + 1;
    return acc;
  }, {});

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [recRes, myRes] = await Promise.all([
          api.get('/volunteer/recommendations'),
          api.get('/volunteer/my-events')
        ]);
        setRecommendedEvents(recRes.data.data);
        setMyEvents(myRes.data.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div></div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-emerald-100 p-4 rounded-full mr-6">
            <FaUser className="text-4xl text-emerald-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
            <p className="text-gray-600 mt-1">Ready to make a difference today?</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-gray-50 px-6 py-3 rounded-lg border border-gray-100 text-center">
            <p className="text-sm text-gray-500 mb-1">Joined Events</p>
            <p className="text-2xl font-bold text-emerald-600">{myEvents.length}</p>
          </div>
          <div className="bg-gray-50 px-6 py-3 rounded-lg border border-gray-100 text-center">
            <p className="text-sm text-gray-500 mb-1">Impact Hours</p>
            <p className="text-2xl font-bold text-emerald-600">{myEvents.length * 4}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Recommended Events */}
          <section>
            <div className="flex items-center mb-6">
              <FaStar className="text-yellow-400 text-2xl mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">⭐ Recommended For You</h2>
            </div>
            
            {recommendedEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendedEvents.map(event => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-xl border border-gray-100 text-center">
                <p className="text-gray-500">No recommendations available.</p>
              </div>
            )}
          </section>

          {/* My Joined Events */}
          <section>
            <div className="flex items-center mb-6">
              <FaCalendarCheck className="text-emerald-500 text-2xl mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">My Joined Events</h2>
            </div>
            
            {myEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myEvents.map(event => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-xl border border-gray-100 text-center">
                <p className="text-gray-500">No joined events yet.</p>
              </div>
            )}
          </section>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <FaChartPie className="text-blue-500 mr-2" /> 📊 My Participation Summary
            </h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-gray-700">
                <span>Joined Events:</span>
                <span className="font-bold text-gray-900">{myEvents.length}</span>
              </div>
              <div className="flex justify-between items-center text-gray-700">
                <span>Upcoming Events:</span>
                <span className="font-bold text-gray-900">{upcomingEvents}</span>
              </div>
              <div className="flex justify-between items-center text-gray-700">
                <span>Completed Events:</span>
                <span className="font-bold text-gray-900">{completedEvents}</span>
              </div>
              <div className="flex justify-between items-center text-gray-700">
                <span>Recommended Events:</span>
                <span className="font-bold text-gray-900">{recommendedEvents.length}</span>
              </div>
            </div>

            {myEvents.length > 0 && (
              <>
                <h4 className="text-md font-bold text-gray-900 mb-3 border-t border-gray-100 pt-4">Category-wise</h4>
                <div className="space-y-2">
                  {Object.entries(categoryCounts).map(([category, count]) => (
                    <div key={category} className="flex justify-between items-center text-sm text-gray-700">
                      <span>{category} :</span>
                      <span className="font-medium text-gray-900">{count}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <FaHeart className="text-red-500 mr-2" /> ⭐ My Interests
            </h3>
            {user?.interests && user.interests.length > 0 ? (
              <ul className="space-y-2">
                {user.interests.map(interest => (
                  <li key={interest} className="flex items-center text-gray-700">
                    <FaCheckCircle className="text-emerald-500 mr-2 text-sm" /> {interest}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No interests added yet.</p>
            )}
          </div>
          
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-sm text-white p-6">
            <h3 className="text-lg font-bold mb-2">Update Profile</h3>
            <p className="text-emerald-100 text-sm mb-4">Keep your interests up to date to get better recommendations.</p>
            <Link to="/profile" className="block text-center w-full bg-white text-emerald-600 font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardVolunteer;
