import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';
import AuthForm from '../components/AuthForm';

const Login = () => {
  console.log('Login component rendered');
  const { handleAuth, error, loading } = useAuth();

  const onSubmit = (data) => {
    handleAuth(
         (credentials) => api.post('/users/auth/login', credentials),
      data,
      '/dashboard', 
      (response) => Login(response.data) // Pass login function
    );
  };

  return (
    <AuthForm 
      title="Welcome Back"
      subtitle="Track your productivity journey"
      onSubmit={onSubmit}
      error={error}
      loading={loading}
      isLogin={true}
    />
  );
};

export default Login;

