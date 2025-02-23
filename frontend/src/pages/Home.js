import { Link } from 'react-router-dom';

const Home = () => (
  <div className="container text-center py-5">
    <h1 className="display-4 fw-bold text-info mb-4">Welcome to ProdWell</h1>
    <p className="lead text-light mb-5">Elevate your productivity and wellness with AI-powered insights.</p>
    <div className="d-flex justify-content-center gap-3">
      <Link to="/register" className="btn btn-primary btn-lg">Get Started</Link>
      <Link to="/login" className="btn btn-outline-light btn-lg">Login</Link>
    </div>
  </div>
);

export default Home;