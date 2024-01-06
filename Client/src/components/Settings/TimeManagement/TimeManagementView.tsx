import "../../../styling/Components/SettingsComponents/TimeManagementComponent/_timeManagementView.scss";
import { TimeManagmentTypes } from "../../../types/tableApiTypes";

interface TimeManagementViewProps {
  timeManagment: TimeManagmentTypes;
}

const TimeManagementView = ({ timeManagment }: TimeManagementViewProps) => {
  return <div style={{ border: "1px solid red" }}>Work Time Tracker</div>;
};
export default TimeManagementView;
