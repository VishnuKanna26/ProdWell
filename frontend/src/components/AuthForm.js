import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const AuthForm = ({ title, subtitle, onSubmit, error, loading, isLogin }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
          <p className="mt-2 text-gray-600">{subtitle}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              {...register('email', { required: 'Email is required' })}
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              {...register('password', { 
                required: 'Password is required',
                minLength: { value: 6, message: 'Minimum 6 characters' }
              })}
              type="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {error && <p className="text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? <Loader size="small" /> : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          {isLogin ? (
            <>
              New user? <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">Create account</Link>
            </>
          ) : (
            <>
              Existing user? <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">Login here</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;