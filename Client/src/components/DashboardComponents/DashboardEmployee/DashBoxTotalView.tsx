interface DashBoxTotalViewProps {
  title: string;
  subTitle: string;
  count: number;
  totalTime?: number;
}

const DashBoxTotalView = ({
  title,
  subTitle,
  count,
  totalTime,
}: DashBoxTotalViewProps) => {
  return (
    <div className="dashBoxTotalView__container">
      <p className="dashbox-TotalView--title">{title}</p>
      <p className="dashbox-TotalView--subTitle">{subTitle}</p>

      <p className="dashbox-TotalView--count">{count}</p>

      {totalTime && (
        <p
          className="dashbox-TotalView--subTitle"
          style={{ fontWeight: "500" }}
        >
          Total Time Appointments
        </p>
      )}
      <p className="dashbox-TotalView--count">{totalTime}</p>
    </div>
  );
};

export default DashBoxTotalView;
