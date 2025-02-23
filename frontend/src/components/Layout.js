import { Link, useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold text-info" to="/">ProdWell</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {userInfo.token ? (
                <>
                  <li className="nav-item"><Link className="nav-link text-light" to="/dashboard">Dashboard</Link></li>
                  <li className="nav-item"><Link className="nav-link text-light" to="/logs">Logs</Link></li>
                  <li className="nav-item"><Link className="nav-link text-light" to="/reports">Reports</Link></li>
                  <li className="nav-item"><Link className="nav-link text-light" to="/leaderboard">Leaderboard</Link></li>
                  <li className="nav-item"><Link className="nav-link text-light" to="/insights">Insights</Link></li>
                  <li className="nav-item"><button className="btn btn-danger" onClick={handleLogout}>Logout</button></li>
                </>
              ) : (
                <>
                  <li className="nav-item"><Link className="nav-link text-light" to="/login">Login</Link></li>
                  <li className="nav-item"><Link className="btn btn-primary" to="/register">Sign Up</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <main className="flex-grow-1">{children}</main>
      <footer className="bg-dark text-center py-3 text-light">
        <p>© 2025 ProdWell - AI-Driven Wellness</p>
      </footer>
    </div>
  );
};

export default Layout;