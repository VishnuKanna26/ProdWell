import { useForm } from 'react-hook-form';

const AuthForm = ({ onSubmit, isLogin, error, loading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow-lg border-0" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body p-5">
          <h2 className="card-title text-center mb-4 fw-bold gradient-text">{isLogin ? 'Welcome Back' : 'Join ProdWell'}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="form-label text-light">Email</label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="form-control bg-dark text-light border-0"
              />
              {errors.email && <small className="text-danger">{errors.email.message}</small>}
            </div>
            <div className="mb-4">
              <label className="form-label text-light">Password</label>
              <input
                type="password"
                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
                className="form-control bg-dark text-light border-0"
              />
              {errors.password && <small className="text-danger">{errors.password.message}</small>}
            </div>
            {error && <p className="text-danger text-center mb-4">{error}</p>}
            <button type="submit" disabled={loading} className="btn btn-primary w-100">
              {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;