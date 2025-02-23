import { useState, useEffect } from 'react';
import api from '../utils/api';

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

  if (loading) return <div className="text-center py-5 text-light">Loading...</div>;
  if (error) return <div className="text-danger text-center py-5">{error}</div>;

  return (
    <div className="container py-5">
      <h1 className="display-5 fw-bold text-info mb-5">Weekly Reports</h1>
      <div className="row">
        {data.map((log, idx) => (
          <div key={idx} className="col-md-4 mb-3">
            <div className="card bg-dark text-light shadow border-0">
              <div className="card-body">
                <p>Sleep: <span className="fw-bold text-info">{log.sleep}</span> hrs</p>
                <p>Exercise: <span className="fw-bold text-info">{log.exercise}</span> mins</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyReports;