import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import EventCard from '../components/EventCard';
import { Link } from 'react-router-dom';
import { FaUser, FaStar, FaCalendarCheck, FaChartPie } from 'react-icons/fa';

const DashboardVolunteer = () => {
  const { user } = useContext(AuthContext);
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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
                <p className="text-gray-500">No recommendations right now. Try updating your interests!</p>
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
                <p className="text-gray-500">You haven't joined any events yet.</p>
              </div>
            )}
          </section>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <FaChartPie className="text-blue-500 mr-2" /> Participation Summary
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Environmental</span>
                  <span className="font-medium text-gray-900">40%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Education</span>
                  <span className="font-medium text-gray-900">35%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Healthcare</span>
                  <span className="font-medium text-gray-900">25%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-400 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
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
