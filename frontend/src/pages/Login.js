import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import AuthForm from '../components/AuthForm';
import { toast } from 'react-toastify';

const Login = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await api.post('/users/auth/login', data);
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return <AuthForm onSubmit={onSubmit} isLogin={true} error={error} loading={loading} />;
};

export default Login;

