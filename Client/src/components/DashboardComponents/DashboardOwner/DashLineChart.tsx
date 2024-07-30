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
import { FetchAppointmentsByDayAndTotalTypes } from "../../../types/tableApiTypes";
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

interface DashLineChartProps {
  allAppointmentsByDay?: FetchAppointmentsByDayAndTotalTypes[];
  allAppointmentsByDayLoading: boolean;
  allAppointmentsByDayError: Error;
}

const DashLineChart: React.FC<DashLineChartProps> = ({
  allAppointmentsByDay,
  allAppointmentsByDayLoading,
  allAppointmentsByDayError,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options: any = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },

    borderWidth: 1,
    tension: 0.4,
    plugins: {
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: function (context: any) {
            let label = context?.dataset.label || "";
            label ? (label += ` Total: ${context?.parsed?.y}`) : "";
            return label;
          },
        },
      },
    },
  };

  const labels = allAppointmentsByDay?.map((arr) => arr?.weekDay ?? "empty");
  const currentMonth = allAppointmentsByDay?.map(
    (arr) => arr.currentMonthOrders
  );
  const totalYear = allAppointmentsByDay?.map(
    (arr) => arr?.totalOrders ?? "no data"
  );

  const data = {
    labels,
    datasets: [
      {
        data: currentMonth,
        label: "Daily Appointment Count - Monthly",
        backgroundColor: ["rgba(245, 92, 132)"],
        borderColor: ["rgba(255, 99, 132, 0.6)"],
      },
      {
        data: totalYear,
        label: "Daily Appointment Count - Yearly",
        borderColor: ["#ffca3a"],
        backgroundColor: ["#ffca6a"],
      },
    ],
  };

  return (
    <div className="dashLine__chart">
      {allAppointmentsByDayError && (
        <p className="globalTextError">{allAppointmentsByDayError?.message}</p>
      )}
      {allAppointmentsByDayLoading ? (
        <LoadingRing />
      ) : (
        <Line options={options} data={data} />
      )}
    </div>
  );
};

export default DashLineChart;
