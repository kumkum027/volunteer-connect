import { useState, useEffect } from 'react';
import api from '../services/api';
import EventCard from '../components/EventCard';
import { FaSearch } from 'react-icons/fa';

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get('/events');
        setEvents(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const categories = [...new Set(events.map(e => e.category))];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === '' || event.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div></div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-32 bg-emerald-100 blur-3xl opacity-50 -z-10 rounded-full pointer-events-none"></div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Events</span></h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">Find community service opportunities that match your passion and skills.</p>
      </div>

      <div className="bg-white p-4 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 mb-12 flex flex-col md:flex-row gap-4 relative z-10">
        <div className="flex-grow relative">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <FaSearch className="text-emerald-500 text-lg" />
          </div>
          <input 
            type="text" 
            placeholder="Search events by title or description..." 
            className="w-full pl-14 pr-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none font-medium text-slate-700 placeholder-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="md:w-72">
          <select 
            className="w-full py-4 px-6 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none font-medium text-slate-700 cursor-pointer appearance-none"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center">
          <div className="bg-slate-50 p-6 rounded-full mb-6">
            <FaSearch className="text-4xl text-slate-300" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 mb-3">No events found</h3>
          <p className="text-slate-500 text-lg max-w-sm mx-auto">Try adjusting your search or category filters to find what you're looking for.</p>
          {(searchTerm || filterCategory) && (
            <button 
              onClick={() => { setSearchTerm(''); setFilterCategory(''); }}
              className="mt-6 text-emerald-600 font-bold hover:text-emerald-700 hover:underline transition-all cursor-pointer"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EventsList;
