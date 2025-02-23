import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import AuthForm from '../components/AuthForm';

const Register = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await api.post('/users/auth/register', data);
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return <AuthForm onSubmit={onSubmit} isLogin={false} error={error} loading={loading} />;
};

export default Register;