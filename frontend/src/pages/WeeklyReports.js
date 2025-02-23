import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Line, XAxis, YAxis, Tooltip, Legend } from 'react-chartjs-2'; // Update import

const WeeklyReports = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/users/reports/weekly')
      .then((res) => {
        setData(res.data.weeklyLogs);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load reports');
        setLoading(false);
      });
  }, []);

  const chartData = {
    labels: data.map((_, idx) => `Day ${idx + 1}`),
    datasets: [
      {
        label: 'Sleep (hrs)',
        data: data.map(log => log.sleep),
        borderColor: '#3b82f6',
        fill: false,
      },
      {
        label: 'Exercise (mins)',
        data: data.map(log => log.exercise),
        borderColor: '#9333ea',
        fill: false,
      },
    ],
  };

  if (loading) return <div className="text-center py-5 text-light">Loading...</div>;
  if (error) return <div className="text-danger text-center py-5">{error}</div>;

  return (
    <div className="container py-5">
      <h1 className="display-5 fw-bold gradient-text mb-5">Weekly Reports</h1>
      <div className="card shadow-lg mb-5">
        <div className="card-body">
          <Line data={chartData} options={{ maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }} height={300} /> {/* Update to Line */}
        </div>
      </div>
      <div className="row">
        {data.map((log, idx) => (
          <div key={idx} className="col-md-4 mb-3">
            <div className="card shadow-lg">
              <div className="card-body">
                <p className="text-light">Day {idx + 1}</p>
                <p className="text-light">Sleep: <span className="fw-bold gradient-text">{log.sleep}</span> hrs</p>
                <p className="text-light">Exercise: <span className="fw-bold gradient-text">{log.exercise}</span> mins</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyReports;