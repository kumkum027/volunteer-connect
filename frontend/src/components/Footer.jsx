import { FaHandsHelping, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <FaHandsHelping className="h-8 w-8 text-emerald-500 mr-2" />
              <span className="font-bold text-2xl tracking-tight">Volunteer<span className="text-emerald-500">Connect</span></span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Connecting passionate volunteers with meaningful community service events. 
              Making a difference together, one event at a time.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaFacebook size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaTwitter size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaInstagram size={24} /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/events" className="text-gray-400 hover:text-white transition-colors">Browse Events</Link></li>
              <li><Link to="/register" className="text-gray-400 hover:text-white transition-colors">Join as Volunteer</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors">Organization Login</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>123 Community St.</li>
              <li>Kindness City, KC 12345</li>
              <li>support@volunteerconnect.com</li>
              <li>(555) 123-4567</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} VolunteerConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
