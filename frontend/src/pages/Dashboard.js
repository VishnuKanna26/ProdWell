import { useState, useEffect } from 'react';
import RadialGauge from '../components/RadialGauge';
import api from '../utils/api';
import Loader from '../components/Loader';

const Dashboard = () => {
  const [productivity, setProductivity] = useState(0);
  const [wellness, setWellness] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/users/dashboard')
      .then(({ data }) => {
        setProductivity(data.productivity);
        setWellness(data.wellness);
        setIsLoading(false);
      })
      .catch(err => {
        setError('Failed to load dashboard data');
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Loader />;
  if (error) return <div className="text-red-600 text-center p-6">{error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <RadialGauge value={productivity} label="Productivity Score" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <RadialGauge value={wellness} label="Wellness Index" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;