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
      <div className="bg-gradient-to-r from-emerald-600 to-teal-800 rounded-3xl shadow-xl p-8 md:p-10 mb-10 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-20 w-32 h-32 bg-teal-400 opacity-20 rounded-full blur-xl"></div>
        
        <div className="flex items-center mb-6 md:mb-0 relative z-10">
          <div className="bg-white/20 backdrop-blur-sm p-5 rounded-2xl mr-6 border border-white/30 shadow-sm">
            <FaUser className="text-4xl text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Welcome back, {user?.name}!</h1>
            <p className="text-emerald-50 mt-2 text-lg">Ready to make a difference today?</p>
          </div>
        </div>
        
        <div className="flex gap-4 relative z-10 w-full md:w-auto">
          <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 text-center flex-1 md:flex-none shadow-sm">
            <p className="text-sm text-emerald-50 mb-1 font-medium tracking-wide uppercase">Joined Events</p>
            <p className="text-3xl font-extrabold text-white">{myEvents.length}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 text-center flex-1 md:flex-none shadow-sm">
            <p className="text-sm text-emerald-50 mb-1 font-medium tracking-wide uppercase">Impact Hours</p>
            <p className="text-3xl font-extrabold text-white">{myEvents.length * 4}</p>
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
              <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center shadow-sm flex flex-col items-center justify-center h-64">
                <div className="bg-yellow-50 p-4 rounded-full mb-4">
                  <FaStar className="text-3xl text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">No Recommendations Yet</h3>
                <p className="text-slate-500 max-w-sm mx-auto">Add more interests to your profile so we can find the perfect events for you.</p>
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
              <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center shadow-sm flex flex-col items-center justify-center h-64">
                <div className="bg-emerald-50 p-4 rounded-full mb-4">
                  <FaCalendarCheck className="text-3xl text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">No Joined Events Yet</h3>
                <p className="text-slate-500 max-w-sm mx-auto">You haven't joined any events. Explore the recommendations above to get started!</p>
              </div>
            )}
          </section>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <FaChartPie className="text-blue-500 mr-3 text-2xl" /> 📊 My Participation
            </h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="font-medium">Joined Events:</span>
                <span className="font-bold text-lg text-slate-900 bg-white px-3 py-1 rounded-lg shadow-sm">{myEvents.length}</span>
              </div>
              <div className="flex justify-between items-center text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="font-medium">Upcoming Events:</span>
                <span className="font-bold text-lg text-slate-900 bg-white px-3 py-1 rounded-lg shadow-sm">{upcomingEvents}</span>
              </div>
              <div className="flex justify-between items-center text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="font-medium">Completed Events:</span>
                <span className="font-bold text-lg text-slate-900 bg-white px-3 py-1 rounded-lg shadow-sm">{completedEvents}</span>
              </div>
              <div className="flex justify-between items-center text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="font-medium">Recommended:</span>
                <span className="font-bold text-lg text-slate-900 bg-white px-3 py-1 rounded-lg shadow-sm">{recommendedEvents.length}</span>
              </div>
            </div>

            {myEvents.length > 0 && (
              <>
                <h4 className="text-sm uppercase tracking-wider font-bold text-slate-500 mb-4 pt-6 border-t border-slate-100">Category Breakdown</h4>
                <div className="space-y-3">
                  {Object.entries(categoryCounts).map(([category, count]) => (
                    <div key={category} className="flex justify-between items-center text-sm text-slate-700">
                      <span className="font-medium">{category}</span>
                      <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">{count}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <FaHeart className="text-red-500 mr-3 text-2xl" /> ⭐ My Interests
            </h3>
            {user?.interests && user.interests.length > 0 ? (
              <ul className="space-y-3">
                {user.interests.map(interest => (
                  <li key={interest} className="flex items-center text-slate-700 bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 font-medium">
                    <FaCheckCircle className="text-emerald-500 mr-3 text-lg" /> {interest}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-6">
                <p className="text-slate-500">No interests added yet.</p>
              </div>
            )}
          </div>
          
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl shadow-lg p-8 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <h3 className="text-xl font-bold mb-3 text-white">Update Profile</h3>
            <p className="text-emerald-50 text-sm mb-6 leading-relaxed">Keep your interests up to date to get better recommendations.</p>
            <Link to="/profile" className="inline-block w-full bg-white text-emerald-600 font-bold py-3.5 rounded-xl hover:bg-slate-50 transition-all duration-300 shadow-sm hover:shadow-lg transform group-hover:-translate-y-1">
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardVolunteer;
