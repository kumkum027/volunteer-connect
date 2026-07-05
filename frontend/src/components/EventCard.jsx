import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaTools } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100 group">
      <div className="h-48 bg-gray-200 relative overflow-hidden">
        <img 
          src={event.image === 'default-event.jpg' ? 'https://images.unsplash.com/photo-1593113563332-e147ce3f7e4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' : event.image} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-emerald-600 shadow-sm">
          {event.category}
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{event.title}</h3>
        </div>
        
        <p className="text-gray-500 text-sm mb-4">by <span className="font-semibold text-gray-700">{event.organizationName}</span></p>
        
        <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">{event.description}</p>
        
        <div className="space-y-2 mb-6 text-sm text-gray-600">
          <div className="flex items-center">
            <FaCalendarAlt className="text-emerald-500 mr-3 w-4" />
            <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-emerald-500 mr-3 w-4" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center">
            <FaUsers className="text-emerald-500 mr-3 w-4" />
            <span>{event.requiredVolunteers} volunteers needed</span>
          </div>
          <div className="flex items-start mt-2 pt-2 border-t border-gray-100">
            <FaTools className="text-emerald-500 mr-3 w-4 mt-1" />
            <div className="flex flex-wrap gap-1">
              {event.requiredSkills.map((skill, index) => (
                <span key={index} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <Link 
          to={`/events/${event._id}`}
          className="w-full block text-center bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white font-medium py-2.5 rounded-lg transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
