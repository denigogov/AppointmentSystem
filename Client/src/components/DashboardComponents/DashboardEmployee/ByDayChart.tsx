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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ByDayChartProps {
  allAppointmentsByDay?: FetchAppointmentsByDayAndTotalTypes[];
}

const ByDayChart: React.FC<ByDayChartProps> = ({ allAppointmentsByDay }) => {
  // interface OptionsType {
  //   maintainAspectRatio: boolean;

  //   scales: {
  //     y: {
  //       beginAtZero: boolean;
  //     };
  //   };
  //   responsive: boolean;
  //   backgroundColor: string[];
  //   borderColor: string[];
  //   borderWidth: number;
  //   tension: number;
  //   plugins: {
  //     tooltip: {};
  //   };
  // }

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
    tension: 0.4,
    plugins: {
      tooltip: {
        callbacks: {
          // no idea what type is context !
          label: function (context: any) {
            let label = context?.dataset.label || "";
            label ? (label += ` Total: ${context?.parsed?.y}`) : "";
            return label;
          },
        },
      },
    },
  };

  const labels = allAppointmentsByDay?.map((arr) => arr?.weekDay) ?? [
    "Not Found",
  ];
  const currentMonth = allAppointmentsByDay?.map(
    (arr) => arr.currentMonthOrders
  ) ?? [0, 0, 0];
  const totalYear = allAppointmentsByDay?.map((arr) => arr.totalOrders) ?? [
    0, 0, 0,
  ];

  const data = {
    labels,
    datasets: [
      {
        data: currentMonth,
        label: "Daily Appointment Count - Monthly",
      },
      {
        data: totalYear,
        label: "Daily Appointment Count - Yearly",
        borderColor: ["rgba(19, 206, 143,0.5)"],
        backgroundColor: ["rgba(19, 206, 143,0.3)"],
      },
    ],
  };

  return (
    <div className="chartDays--wrap">
      <Line options={options} data={data} className="chartLineDays" />
    </div>
  );
};

export default ByDayChart;
