import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Home = () => (
  <>
    <Helmet>
      <title>ProdWell - Productivity & Wellness</title>
      <meta name="description" content="Boost your productivity and wellness with AI insights." />
    </Helmet>
    <div className="container text-center py-5">
      <h1 className="display-3 fw-bold gradient-text mb-4">ProdWell</h1>
      <p className="lead text-light mb-5">Your AI-powered companion for productivity and wellness.</p>
      <div className="d-flex justify-content-center gap-3">
        <Link to="/register" className="btn btn-primary btn-lg">Start Now</Link>
        <Link to="/login" className="btn btn-outline-light btn-lg">Login</Link>
      </div>
      <div className="mt-5 text-muted">Seamless integration with Google Fit & Fitbit coming soon.</div>
    </div>
  </>
);

export default Home;
