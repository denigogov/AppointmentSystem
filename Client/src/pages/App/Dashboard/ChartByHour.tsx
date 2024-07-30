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
import { FetchAppointmentsByHourRangeTypes } from "../../../types/tableApiTypes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartByHour = ({
  appointmentsByHourRange,
}: {
  appointmentsByHourRange: FetchAppointmentsByHourRangeTypes[];
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options: any = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    backgroundColor: ["rgba(245, 92, 132)"],
    borderColor: ["rgba(255, 99, 132, 0.6)"],
    borderWidth: 1,
    tension: 0.1,
    plugins: {
      tooltip: {
        callbacks: {
          // no idea what type is context !

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

  const labels = appointmentsByHourRange.map((test) => test.hour_of_day);

  const data = {
    labels,
    datasets: [
      {
        data: appointmentsByHourRange.map((test) => test.total_appointments),
        label: "Appointments by Hour",
      },
    ],
  };

  return (
    <div className="chartHour-Wraper">
      <Line className="chartLineHours" options={options} data={data} />
    </div>
  );
};

export default ChartByHour;
