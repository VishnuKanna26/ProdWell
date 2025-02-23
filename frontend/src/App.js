import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DailyLogs from './pages/DailyLogs';
import WeeklyReports from './pages/WeeklyReports';
import Leaderboard from './pages/Leaderboard';
import Insights from './pages/Insights';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
      <Route path="/logs" element={<Layout><DailyLogs /></Layout>} />
      <Route path="/reports" element={<Layout><WeeklyReports /></Layout>} />
      <Route path="/leaderboard" element={<Layout><Leaderboard /></Layout>} />
      <Route path="/insights" element={<Layout><Insights /></Layout>} />
    </Routes>
    <ToastContainer />
  </BrowserRouter>
);

export default App;
