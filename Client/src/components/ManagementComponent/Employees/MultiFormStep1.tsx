import MultiFormWraper from "./MultiFormWraper";

type UserData = {
  firstName: string;
  lastName: string;
  age: string;
};

// Partial is makeing the userDataProps optional!!
type MultiFormStep1Props = UserData & {
  updateFileds: (fileds: Partial<UserData>) => void;
};

const MultiFormStep1: React.FC<MultiFormStep1Props> = ({
  firstName,
  lastName,
  age,
  updateFileds,
}) => {
  return (
    <MultiFormWraper title="Step 1">
      <label>First Name</label>
      <input
        type="text"
        required
        autoFocus
        value={firstName}
        onChange={(e) => updateFileds({ firstName: e.target.value })}
      />
      <label>Last Name</label>
      <input
        type="text"
        value={lastName}
        onChange={(e) => updateFileds({ lastName: e.target.value })}
      />
      <label>Age</label>
      <input
        type="text"
        value={age}
        onChange={(e) => updateFileds({ age: e.target.value })}
      />
    </MultiFormWraper>
  );
};

export default MultiFormStep1;
