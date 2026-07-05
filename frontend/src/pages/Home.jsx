import { Link } from 'react-router-dom';
import { FaUserPlus, FaBuilding, FaHeart, FaHandsHelping, FaSearch, FaChartLine } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-emerald-50 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/50 to-teal-50/50 mix-blend-multiply"></div>
          <img 
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Volunteers" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Connecting Volunteers with <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">Meaningful Community Events</span>
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto mb-10">
            Join a community of passionate individuals and trusted organizations. Discover events that match your interests and make a real impact today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center">
              <FaUserPlus className="mr-2" /> Join as Volunteer
            </Link>
            <Link to="/login" className="bg-white hover:bg-gray-50 text-emerald-600 border border-emerald-200 font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center">
              <FaBuilding className="mr-2" /> Organization Login
            </Link>
          </div>
        </div>
      </section>

      {/* Why VolunteerConnect Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why VolunteerConnect?</h2>
            <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="bg-emerald-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300 border border-emerald-100">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <FaBuilding className="text-3xl text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Trusted Organizations</h3>
              <p className="text-gray-600">Connect with verified NGOs and community groups making real change.</p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-blue-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300 border border-blue-100">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <FaSearch className="text-3xl text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Discovery</h3>
              <p className="text-gray-600">Browse and filter events effortlessly to find the perfect fit for you.</p>
            </div>
            
            {/* Card 3 */}
            <div className="bg-purple-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300 border border-purple-100">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <FaHeart className="text-3xl text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Recommendations</h3>
              <p className="text-gray-600">Get personalized event suggestions based on your unique skills and interests.</p>
            </div>
            
            {/* Card 4 */}
            <div className="bg-orange-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300 border border-orange-100">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <FaChartLine className="text-3xl text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Track Participation</h3>
              <p className="text-gray-600">Keep a record of your community service hours and see your impact grow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-emerald-200 -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {/* Step 1 */}
              <div className="text-center">
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md border-4 border-emerald-100 relative">
                  <span className="text-2xl font-bold text-emerald-500">1</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Create Profile</h3>
                <p className="text-gray-600 text-sm">Register and select your interests</p>
              </div>
              
              {/* Step 2 */}
              <div className="text-center">
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md border-4 border-emerald-100 relative">
                  <span className="text-2xl font-bold text-emerald-500">2</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Get Recommended</h3>
                <p className="text-gray-600 text-sm">Our system matches you with events</p>
              </div>
              
              {/* Step 3 */}
              <div className="text-center">
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md border-4 border-emerald-100 relative">
                  <span className="text-2xl font-bold text-emerald-500">3</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Join Event</h3>
                <p className="text-gray-600 text-sm">Sign up with just one click</p>
              </div>
              
              {/* Step 4 */}
              <div className="text-center">
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md border-4 border-emerald-100 relative">
                  <span className="text-2xl font-bold text-emerald-500">4</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Make an Impact</h3>
                <p className="text-gray-600 text-sm">Attend and track your participation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-y border-emerald-500/50 py-10">
            <div>
              <div className="text-5xl font-extrabold mb-2">500+</div>
              <div className="text-emerald-100 text-lg uppercase tracking-wider font-semibold">Volunteers</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold mb-2">100+</div>
              <div className="text-emerald-100 text-lg uppercase tracking-wider font-semibold">Events</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold mb-2">50+</div>
              <div className="text-emerald-100 text-lg uppercase tracking-wider font-semibold">Organizations</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to make a difference?</h2>
          <p className="text-xl text-gray-600 mb-10">Join our growing community and start contributing to causes you care about today.</p>
          <Link to="/register" className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-lg">
            Become a Volunteer Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
