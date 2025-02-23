import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DailyLogs from './pages/DailyLogs';
import WeeklyReports from './pages/WeeklyReports';
import Leaderboard from './pages/Leaderboard';
import Insights from './pages/Insights';

const PrivateRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  return userInfo.token ? children : <Navigate to="/login" />;
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
      <Route path="/logs" element={<PrivateRoute><Layout><DailyLogs /></Layout></PrivateRoute>} />
      <Route path="/reports" element={<PrivateRoute><Layout><WeeklyReports /></Layout></PrivateRoute>} />
      <Route path="/leaderboard" element={<PrivateRoute><Layout><Leaderboard /></Layout></PrivateRoute>} />
      <Route path="/insights" element={<PrivateRoute><Layout><Insights /></Layout></PrivateRoute>} /> <Route
          path="*"
          element={
            <div className="text-center py-5">
              <h1 className="display-5 text-danger">404 - Page Not Found</h1>
            </div>
          }
        />

    </Routes>
  </BrowserRouter>
);

export default App;