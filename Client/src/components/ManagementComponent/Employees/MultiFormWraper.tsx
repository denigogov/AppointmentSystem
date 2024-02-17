import { ReactNode } from "react";

interface MultiFormWraperProps {
  children: ReactNode;
  title: string;
}

const MultiFormWraper: React.FC<MultiFormWraperProps> = ({
  title,
  children,
}) => {
  return (
    <>
      <h3 style={{ color: "blue", marginBottom: "2rem" }}>{title}</h3>
      <div
        style={{
          display: "grid",
          gap: "1rem .5rem",
          justifyContent: "flex-start",
          gridTemplateColumns: "auto minmax(auto,400px)",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default MultiFormWraper;
