import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaTools } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getImageForCategory, DEFAULT_EVENT_IMAGE } from '../utils/getImageForCategory';

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full border border-slate-100 group">
      <div className="h-48 bg-slate-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10"></div>
        <img 
          src={event.image === 'default-event.jpg' || !event.image ? getImageForCategory(event.category) : event.image} 
          alt={event.title} 
          onError={(e) => { e.target.src = DEFAULT_EVENT_IMAGE; e.target.onerror = null; }}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-700 shadow-sm border border-white/20">
          {event.category}
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-slate-900 line-clamp-2 leading-tight group-hover:text-emerald-600 transition-colors duration-300">{event.title}</h3>
        </div>
        
        <p className="text-slate-500 text-sm mb-5">by <span className="font-semibold text-slate-800">{event.organizationName}</span></p>
        
        <p className="text-slate-600 mb-6 line-clamp-3 flex-grow leading-relaxed">{event.description}</p>
        
        <div className="space-y-3 mb-6 text-sm text-slate-600">
          <div className="flex items-center">
            <div className="bg-emerald-50 p-1.5 rounded-md mr-3">
              <FaCalendarAlt className="text-emerald-500 w-4" />
            </div>
            <span className="font-medium">{new Date(event.date).toLocaleDateString()} at {event.time}</span>
          </div>
          <div className="flex items-center">
            <div className="bg-emerald-50 p-1.5 rounded-md mr-3">
              <FaMapMarkerAlt className="text-emerald-500 w-4" />
            </div>
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center">
            <div className="bg-emerald-50 p-1.5 rounded-md mr-3">
              <FaUsers className="text-emerald-500 w-4" />
            </div>
            <span><strong className="text-slate-800">{event.requiredVolunteers}</strong> volunteers needed</span>
          </div>
          <div className="flex items-start mt-4 pt-4 border-t border-slate-100">
            <div className="bg-emerald-50 p-1.5 rounded-md mr-3 mt-0.5">
              <FaTools className="text-emerald-500 w-4" />
            </div>
            <div className="flex flex-wrap gap-2">
              {event.requiredSkills.map((skill, index) => (
                <span key={index} className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-xs font-medium border border-slate-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <Link 
          to={`/events/${event._id}`}
          className="w-full block text-center bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white font-bold py-2.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-emerald-500/20"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
