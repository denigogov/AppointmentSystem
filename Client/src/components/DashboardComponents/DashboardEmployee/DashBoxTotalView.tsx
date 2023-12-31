interface DashBoxTotalViewProps {
  title: string;
  subTitle: string;
  count: number | string;
}

const DashBoxTotalView = ({
  title,
  subTitle,
  count,
}: DashBoxTotalViewProps) => {
  return (
    <div className="dashBoxTotalView__container">
      <p className="dashbox-TotalView--title">{title}</p>
      <p className="dashbox-TotalView--subTitle">{subTitle}</p>

      <p className="dashbox-TotalView--count">{count}</p>
    </div>
  );
};

export default DashBoxTotalView;
