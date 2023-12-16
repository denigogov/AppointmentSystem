import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartTest = () => {
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    backgroundColor: ["rgba(245, 92, 132)"],
    borderColor: ["rgba(255, 99, 132, 0.6)"],
    borderWidth: 1,
    tension: 0.5,
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map((test) => test),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="trojka">
      <Line options={options} data={data} />
    </div>
  );
};

export default ChartTest;
