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
      <h1 className="display-5 fw-bold gradient-text mb-5">Leaderboard</h1>
      <div className="card shadow-lg">
        <div className="card-body">
          <ul className="list-group list-group-flush">
            {data.map((user, idx) => (
              <li key={user.id} className="list-group-item bg-dark text-light d-flex justify-content-between align-items-center">
                <span>{idx + 1}. {user.name}</span>
                <span className="badge bg-primary rounded-pill">{user.score} points</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;