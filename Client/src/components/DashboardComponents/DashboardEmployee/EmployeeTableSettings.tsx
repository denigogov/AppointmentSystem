import { useState } from "react";

const EmployeeTableSettings = () => {
  const [, setStartDate] = useState<string | null>(null);
  const [, setEndDate] = useState<string | null>(null);

  const current: string = new Date().toISOString().slice(0, 10);

  return (
    <div style={{ padding: "15px", borderBottom: "1px solid gray" }}>
      <input
        value={current}
        type="date"
        min="2023-12-12"
        max="2023-12-20"
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        value={current}
        type="date"
        min="2023-12-12"
        max="2023-12-20"
        onChange={(e) => setEndDate(e.target.value)}
      />
      <select>
        <option>select service</option>
        <option>Haircut</option>
        <option>Painting</option>
        <option>blabla</option>
      </select>
      <p>{current}</p>
    </div>
  );
};

export default EmployeeTableSettings;
