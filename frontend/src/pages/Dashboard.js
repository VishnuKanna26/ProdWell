import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Bar, XAxis, YAxis, Tooltip, Legend } from 'react-chartjs-2'; // Update import
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const [data, setData] = useState({ productivity: 0, wellness: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/users/dashboard')
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load dashboard');
        setLoading(false);
      });
  }, []);

  const chartData = {
    labels: ['Productivity', 'Wellness'],
    datasets: [{
      label: 'Score',
      data: [data.productivity, data.wellness],
      backgroundColor: ['#3b82f6', '#9333ea'],
      borderColor: ['#2563eb', '#7e22ce'],
      borderWidth: 1,
    }],
  };

  if (loading) return <div className="text-center py-5 text-light">Loading...</div>;
  if (error) return <div className="text-danger text-center py-5">{error}</div>;

  return (
    <div className="container py-5">
      <h1 className="display-5 fw-bold gradient-text mb-5">Dashboard</h1>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-lg">
            <div className="card-body text-center">
              <h2 className="card-title fw-bold text-light">Your Metrics</h2>
              <Bar data={chartData} options={{ maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 100 } } }} height={300} /> {/* Update to Bar */}
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card shadow-lg">
            <div className="card-body text-center">
              <h2 className="card-title fw-bold text-light">Quick Stats</h2>
              <p className="display-6 gradient-text">{data.productivity}</p>
              <p className="text-muted">Productivity Score</p>
              <p className="display-6 gradient-text mt-4">{data.wellness}</p>
              <p className="text-muted">Wellness Index</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;