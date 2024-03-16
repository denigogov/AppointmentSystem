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
import LoadingRing from "../../loadingRing";

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
  serviceByMonthError: Error;
  serviceByMonthLoading: Boolean;
}

const DashChartMonth: React.FC<DashChartMonthProps> = ({
  filterDataByYear,
  serviceByMonthError,
  serviceByMonthLoading,
}) => {
  const screenSize: number = window.innerWidth;
  // need to add  the type temporary problem !
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
      {serviceByMonthError && (
        <p className="globalTextError">{serviceByMonthError?.message}</p>
      )}
      {serviceByMonthLoading ? (
        <LoadingRing />
      ) : (
        <Line options={options} data={data} />
      )}
    </div>
  );
};

export default DashChartMonth;
