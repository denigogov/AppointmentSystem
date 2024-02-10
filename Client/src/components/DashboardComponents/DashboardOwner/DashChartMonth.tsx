import { FetchServiceByMonthProps } from "../../../types/tableApiTypes";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

// styling for this component can be found in _dashboardOwner.scss

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DashChartMonthProps {
  filterDataByYear?: FetchServiceByMonthProps[];
}

const DashChartMonth: React.FC<DashChartMonthProps> = ({
  filterDataByYear,
}) => {
  const screenSize: number = window.innerWidth;

  const options: any = {
    maintainAspectRatio: false,
    indexAxis: `${screenSize <= 640 ? "y" : "x"}`,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,

    borderWidth: 1,
    tension: 0.4,
    plugins: {
      tooltip: {
        callbacks: {
          // no idea what type is context !
          label: function (context: any) {
            let label = context?.dataset.label || "";
            label ? (label += ` Total : ${context?.parsed?.y} €`) : "";
            return label;
          },
        },
      },
    },
  };

  const labels = filterDataByYear?.map((arr) => arr?.month ?? "empty");
  const montlyData = filterDataByYear?.map((arr) => arr.totalMoney);

  console.log(montlyData);

  const data = {
    labels,
    datasets: [
      {
        data: montlyData,
        label: "Total Revenue - Monthly",
        backgroundColor: ["#c9dfff"],
        borderColor: ["#3586ff"],
      },
    ],
  };

  return (
    <div className="dashLine__chart">
      <Line options={options} data={data} />
    </div>
  );
};

export default DashChartMonth;
