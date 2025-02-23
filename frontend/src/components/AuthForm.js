import { useForm } from 'react-hook-form';

const AuthForm = ({ onSubmit, isLogin, error, loading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <div className="card bg-dark text-light shadow-lg border-0" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body p-5">
          <h2 className="card-title text-center mb-4 fw-bold text-info">{isLogin ? 'Login' : 'Sign Up'}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="form-control bg-secondary text-light border-0"
              />
              {errors.email && <p className="text-danger mt-1">{errors.email.message}</p>}
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
                className="form-control bg-secondary text-light border-0"
              />
              {errors.password && <p className="text-danger mt-1">{errors.password.message}</p>}
            </div>
            {error && <p className="text-danger text-center mb-3">{error}</p>}
            <button type="submit" disabled={loading} className="btn btn-primary w-100">
              {loading ? 'Loading...' : isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;