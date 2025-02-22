import { useEffect, useState } from 'react';
import api from '../utils/api';
import { TrophyIcon } from '@heroicons/react/24/solid';
import Loader from '../components/Loader';

const Leaderboard = () => {
  const [leaderData, setLeaderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const { data } = await api.get('/users/leaderboard');
        setLeaderData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLeaders();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Leaderboard</h1>
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="divide-y">
          {leaderData.map((user, idx) => (
            <div key={user.id} className="p-6 flex items-center space-x-6 hover:bg-gray-50">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                {idx === 0 ? <TrophyIcon className="w-6 h-6" /> : idx + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-gray-600">{user.score} Points</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;