import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js/auto';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  chartData: {
    key: string
    total: number | null
  }[]
}

export default function Chart({ chartData }: ChartProps) {
  const data = {
    labels: chartData.map(i => i.key),
    datasets: [
      {
        label: 'Gols',
        data: chartData.map(i => i.total === null ? 0 : i.total),
        backgroundColor: '#3A5A40',
      }
    ],
  };

  const options = {
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Gols por tempo',
      },
    },
  };

  return <Bar options={options} data={data} />;
}
