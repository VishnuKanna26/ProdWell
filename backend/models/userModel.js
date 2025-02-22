import mongoose from 'mongoose';

const DailyLogSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  sleep: { type: Number, min: 0, max: 24 },
  exercise: { type: Number, min: 0 },
  diet: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fats: Number
  },
  stress: { type: Number, min: 0, max: 10 }
});

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dailyLogs: [DailyLogSchema],
  productivityScore: { type: Number, default: 0 },
  wellnessIndex: { type: Number, default: 0 }
});

export default mongoose.model('User', UserSchema);