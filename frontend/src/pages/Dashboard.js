import { useState, useEffect } from 'react';
import api from '../utils/api';

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

  if (loading) return <div className="text-center py-5 text-light">Loading...</div>;
  if (error) return <div className="text-danger text-center py-5">{error}</div>;

  return (
    <div className="container py-5">
      <h1 className="display-5 fw-bold text-info mb-5">Dashboard</h1>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card bg-dark text-light shadow-lg border-0">
            <div className="card-body text-center">
              <h2 className="card-title fw-bold">Productivity</h2>
              <p className="display-4 text-info">{data.productivity}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card bg-dark text-light shadow-lg border-0">
            <div className="card-body text-center">
              <h2 className="card-title fw-bold">Wellness</h2>
              <p className="display-4 text-info">{data.wellness}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;