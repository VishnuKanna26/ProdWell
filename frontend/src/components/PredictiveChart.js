import { Line } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, LineElement, PointElement } from 'chart.js';

Chart.register(LinearScale, CategoryScale, LineElement, PointElement);

const PredictiveChart = ({ data }) => {
  const chartData = {
    labels: data.map(d => `Day ${d.day}`),
    datasets: [{
      label: 'Predicted Score',
      data: data.map(d => d.score),
      borderColor: '#6366f1',
      borderWidth: 3,
      tension: 0.4,
      pointRadius: 0,
    }]
  };

  return (
    <Line 
      data={chartData}
      options={{
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: { color: 'rgba(0,0,0,0.05)' }
          },
          x: {
            grid: { display: false }
          }
        },
        plugins: { legend: { display: false } }
      }}
    />
  );
};

export default PredictiveChart;