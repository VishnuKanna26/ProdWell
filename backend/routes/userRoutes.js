import express from 'express';
import { 
  registerUser, 
  loginUser, 
  getDashboard, 
  addDailyLog, 
  getWeeklyReport 
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import User from '../models/userModel.js'; // Import User model for custom routes

const router = express.Router();

// Public Routes
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);

// Protected Routes
router.get('/dashboard', protect, getDashboard);
router.post('/logs', protect, addDailyLog);
router.get('/reports/weekly', protect, getWeeklyReport);

// Add missing routes
router.get('/logs/history', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('dailyLogs');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.dailyLogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/leaderboard', protect, async (req, res) => {
  try {
    const users = await User.find()
      .sort({ productivityScore: -1 })
      .limit(10)
      .select('email productivityScore');
    res.json(users.map((u, idx) => ({ 
      id: u._id, 
      name: u.email, 
      score: u.productivityScore 
    })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;