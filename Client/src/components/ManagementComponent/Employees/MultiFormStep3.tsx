import { RestDataProsp } from "../../../pages/App/Management/Employees/EmployeesCreate";
import MultiFormWraper from "./MultiFormWraper";

// Partial is makeing the userDataProps optional!!
type MultiFormStep3Props = RestDataProsp & {
  updateFileds: (fileds: Partial<RestDataProsp>) => void;
};

const MultiFormStep3: React.FC<MultiFormStep3Props> = ({
  updateFileds,
  startHour,
  endHour,
  startMinute,
  endMinute,
}) => {
  return (
    <MultiFormWraper title="Step 3">
      <label>Start Hour</label>
      <input
        type="number"
        placeholder="Start hour (e.g., 9)"
        min="1"
        max="24"
        autoFocus
        value={startHour}
        onChange={(e) => updateFileds({ startHour: +e.target.value })}
      />
      <label>End Hour</label>
      <input
        type="number"
        placeholder="End hour (e.g, 17)"
        min="1"
        max="24"
        value={endHour}
        onChange={(e) => updateFileds({ endHour: +e.target.value })}
      />
      <label>Start Minute</label>
      <input
        type="number"
        placeholder="Start minute (e.g., 00)"
        min="0"
        max="60"
        value={startMinute}
        onChange={(e) => updateFileds({ startMinute: +e.target.value })}
      />

      <label>End Minute</label>
      <input
        type="number"
        placeholder="End minute (e.g., 30)"
        min="0"
        max="60"
        value={endMinute}
        onChange={(e) => updateFileds({ endMinute: +e.target.value })}
      />
    </MultiFormWraper>
  );
};

export default MultiFormStep3;
