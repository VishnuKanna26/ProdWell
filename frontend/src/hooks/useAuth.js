import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export const useAuth = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (authFn, data, redirectPath, onSuccess) => {
    setLoading(true);
    try {
      const response = await authFn(data);
      if (onSuccess) onSuccess(response);
      navigate(redirectPath);
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return { handleAuth, error, loading };
};

