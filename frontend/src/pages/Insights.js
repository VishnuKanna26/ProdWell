import { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import * as Slider from '@radix-ui/react-slider';
import api from '../utils/api';
import PredictiveChart from '../components/PredictiveChart';

const Insights = () => {
  const [sleepHours, setSleepHours] = useState(7);
  const [enableAI, setEnableAI] = useState(true);
  const [predictedData, setPredictedData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const { data } = await api.get('/users/insights', { params: { sleep: sleepHours, ai: enableAI } });
        setPredictedData(data);
      } catch (error) {
        // Fallback to mock data
        const mockData = Array.from({ length: 7 }, (_, i) => ({
          day: i + 1,
          score: enableAI ? Math.min(sleepHours * 12 + i * 2.5, 100) : Math.min(sleepHours * 10 + i * 1.8, 100)
        }));
        setPredictedData(mockData);
      }
    };
    fetchPrediction();
  }, [sleepHours, enableAI]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Insights</h1>
      <div className="bg-white p-8 rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold">Productivity Simulator</h2>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">AI Mode</span>
            <Switch
              checked={enableAI}
              onChange={setEnableAI}
              className={`${enableAI ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className={`${enableAI ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white`} />
            </Switch>
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium">Sleep Hours: {sleepHours}h</label>
          <Slider.Root
            value={[sleepHours]}
            onValueChange={([val]) => setSleepHours(val)}
            min={4}
            max={12}
            step={0.5}
            className="relative flex items-center w-full h-5"
          >
            <Slider.Track className="bg-gray-200 relative grow rounded-full h-1">
              <Slider.Range className="absolute bg-blue-600 rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg focus:ring-2 focus:ring-blue-500" />
          </Slider.Root>
        </div>
        <div className="mt-6">
          <PredictiveChart data={predictedData} />
        </div>
      </div>
    </div>
  );
};

export default Insights;

