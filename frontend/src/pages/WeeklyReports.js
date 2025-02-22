import { useState, useEffect } from 'react';
import { Radar } from 'react-chartjs-2';
import api from '../utils/api';
import { Chart, RadialLinearScale, PointElement, LineElement, Filler } from 'chart.js';
import Loader from '../components/Loader';

Chart.register(RadialLinearScale, PointElement, LineElement, Filler);

const WeeklyReports = () => {
  const [radarData, setRadarData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        const { data } = await api.get('/users/reports/weekly');
        const avgSleep = data.weeklyLogs.reduce((sum, log) => sum + log.sleep, 0) / (data.weeklyLogs.length || 1);
        const avgExercise = data.weeklyLogs.reduce((sum, log) => sum + log.exercise, 0) / (data.weeklyLogs.length || 1);
        const avgStress = data.weeklyLogs.reduce((sum, log) => sum + log.stress, 0) / (data.weeklyLogs.length || 1);
        
        setRadarData({
          labels: ['Sleep', 'Exercise', 'Stress', 'Productivity', 'Wellness'],
          datasets: [{
            label: 'Weekly Performance',
            data: [
              avgSleep,
              avgExercise,
              avgStress,
              data.productivity.slice(-1)[0] || 0,
              data.wellness.slice(-1)[0] || 0
            ],
            backgroundColor: 'rgba(99, 102, 241, 0.2)',
            borderColor: '#6366f1',
            pointBackgroundColor: '#6366f1',
            pointBorderColor: '#fff',
          }]
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWeeklyData();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Weekly Insights</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-2xl">
          {radarData && (
            <Radar
              data={radarData}
              options={{
                responsive: true,
                scales: { r: { beginAtZero: true, max: 100 } }
              }}
            />
          )}
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
          <h2 className="text-2xl font-bold mb-4">Insights</h2>
          <p>Log more data for personalized tips!</p>
        </div>
      </div>
    </div>
  );
};

export default WeeklyReports;