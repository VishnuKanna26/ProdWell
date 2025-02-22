import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';
import AuthForm from '../components/AuthForm';

const Register = () => {
  console.log('Register component rendered');
  const { handleAuth, error, loading } = useAuth();

  const onSubmit = (data) => {
    handleAuth(
      (credentials) => api.post('/users/auth/register', credentials),
      data,
      '/dashboard'
    );
  };

  return (
    <AuthForm
      title="Create Account"
      subtitle="Start your productivity journey"
      onSubmit={onSubmit}
      error={error}
      loading={loading}
      isLogin={false}
    />
  );
};

export default Register;
