import { useState, useEffect } from 'react';
import api from '../utils/api';

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/users/leaderboard')
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load leaderboard');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-5 text-light">Loading...</div>;
  if (error) return <div className="text-danger text-center py-5">{error}</div>;

  return (
    <div className="container py-5">
      <h1 className="display-5 fw-bold text-info mb-5">Leaderboard</h1>
      <div className="list-group">
        {data.map((user, idx) => (
          <div key={user.id} className={`list-group-item bg-dark text-light d-flex justify-content-between align-items-center ${idx < 3 ? 'border-info' : ''}`}>
            <span>{idx + 1}. {user.name}</span>
            <span className="badge bg-info rounded-pill">{user.score} points</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;