import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="py-16">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl font-bold mb-6">
          Optimize Your Productivity & Wellness
          <span className="block text-blue-600 mt-2 text-3xl">Smart Analytics for Peak Performance</span>
        </h1>
        
        <div className="flex justify-center space-x-4 mt-8">
          <Link 
            to="/register" 
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg"
          >
            Get Started
          </Link>
          <Link 
            to="/login" 
            className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-lg"
          >
            Existing User? Login
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mt-20 max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {['Predictive Insights', 'Daily Logs', 'Weekly Reports', 'Personalized Recommendations'].map((feature) => (
          <div 
            key={feature}
            className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-3">{feature}</h3>
            <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;