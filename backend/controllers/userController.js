import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { calculateProductivity, calculateWellness } from '../utils/analytics.js';
import bcrypt from 'bcryptjs';

// @desc    Authenticate user
export const loginUser = async (req, res) => {
  console.log('Login attempt with body:', req.body);

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    console.log('Checking user for email:', email);

    const user = await User.findOne({ email });
    console.log('Found user:', user);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    console.log('Comparing password...');
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    console.log('Generating token with JWT_SECRET:', process.env.JWT_SECRET);
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.json({
      _id: user._id,
      email: user.email,
      token
    });
  } catch (error) {
    console.error('Login error:', error.stack); // Full stack trace
    res.status(500).json({ message: error.message });
  }
};

// @desc    Register user (with password hashing)

export const registerUser = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email });
    console.log('Existing user:', existingUser);
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      password: hashedPassword
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      _id: user._id,
      email: user.email,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get dashboard data
export const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const todayLog = user.dailyLogs.slice(-1)[0] || { sleep: 0, exercise: 0, diet: {}, stress: 0 };
    const productivity = calculateProductivity(todayLog);
    const wellness = calculateWellness(todayLog);

    res.json({
      productivity,
      wellness,
      dailyLogs: user.dailyLogs
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addDailyLog = async (req, res) => {
  const { sleep, exercise, diet, stress } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const newLog = { sleep, exercise, diet: diet || {}, stress };
    user.dailyLogs.push(newLog);
    await user.save();

    res.status(201).json(newLog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWeeklyReport = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const weeklyLogs = user.dailyLogs.slice(-7);
    const productivity = weeklyLogs.map(log => calculateProductivity(log));
    const wellness = weeklyLogs.map(log => calculateWellness(log));

    res.json({
      weeklyLogs,
      productivity,
      wellness
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
  
// export { registerUser, loginUser, getDashboard, addDailyLog, getWeeklyReport };


