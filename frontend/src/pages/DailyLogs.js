import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from '../utils/api';
import ActivityHeatmap from '../components/ActivityHeatmap';
import FormField from '../components/FormField';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
// Inside onSubmit


const formatHeatmapData = (logs) => {
  return logs.map(log => ({
    day: new Date(log.date).toLocaleString('en-US', { weekday: 'short' }),
    sleep: log.sleep,
    exercise: log.exercise
  }));
};

const DailyLogs = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [heatmapData, setHeatmapData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data } = await api.get('/users/logs/history');
        setHeatmapData(formatHeatmapData(data));
      } catch (error) {
        console.error('Error fetching logs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const onSubmit = async (formData) => {
    try {
      const { data } = await api.post('/users/logs', formData);
      setHeatmapData(prev => [...prev, formatHeatmapData([data])[0]]);
      reset();
      toast.success('Log added successfully!');
    } catch (error) {
      toast.error('Failed to add log');
      console.error('Submission error:', error);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Daily Logs</h1>
      <div className="grid lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField 
            label="Sleep Hours" id="sleep" type="number" step="0.1"
            register={register} error={errors.sleep}
            validation={{ required: true, min: 0, max: 24 }}
          />
          <FormField 
            label="Exercise (mins)" id="exercise" type="number"
            register={register} error={errors.exercise}
            validation={{ required: true, min: 0 }}
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl">
            Log Activities
          </button>
        </form>
        <div className="bg-white p-6 rounded-2xl shadow-2xl">
          <ActivityHeatmap data={heatmapData} />
        </div>
      </div>
    </div>
  );
};

export default DailyLogs;

