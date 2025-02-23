import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from '../utils/api';

const DailyLogs = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/users/logs/history')
      .then((res) => {
        setLogs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load logs');
        setLoading(false);
      });
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await api.post('/users/logs', data);
      setLogs([...logs, res.data]);
      reset();
    } catch (err) {
      setError('Failed to add log');
    }
  };

  if (loading) return <div className="text-center py-5 text-light">Loading...</div>;
  if (error) return <div className="text-danger text-center py-5">{error}</div>;

  return (
    <div className="container py-5">
      <h1 className="display-5 fw-bold gradient-text mb-5">Daily Logs</h1>
      <div className="card shadow-lg mb-5">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label text-light">Sleep (hours)</label>
                <input type="number" {...register('sleep', { required: true, min: 0 })} className="form-control bg-dark text-light border-0" />
                {errors.sleep && <small className="text-danger">Sleep is required and must be positive</small>}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label text-light">Exercise (minutes)</label>
                <input type="number" {...register('exercise', { required: true, min: 0 })} className="form-control bg-dark text-light border-0" />
                {errors.exercise && <small className="text-danger">Exercise is required and must be positive</small>}
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100">Add Log</button>
          </form>
        </div>
      </div>
      <div className="row">
        {logs.map((log, idx) => (
          <div key={idx} className="col-md-4 mb-3">
            <div className="card shadow-lg">
              <div className="card-body">
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

export default DailyLogs;