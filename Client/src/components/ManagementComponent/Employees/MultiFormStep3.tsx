import MultiFormWraper from "./MultiFormWraper";

type UserData = {
  age1: string;
  mejdz: string;
  kukuraK: string;
};

// Partial is makeing the userDataProps optional!!
type MultiFormStep3Props = UserData & {
  updateFileds: (fileds: Partial<UserData>) => void;
};
const MultiFormStep3: React.FC<MultiFormStep3Props> = ({
  updateFileds,
  age1,
  mejdz,
  kukuraK,
}) => {
  return (
    <MultiFormWraper title="Step 3">
      <label>Age1</label>
      <input
        type="text"
        required
        autoFocus
        value={age1}
        onChange={(e) => updateFileds({ age1: e.target.value })}
      />
      <label>Nekaaa</label>
      <input
        type="text"
        required
        value={mejdz}
        onChange={(e) => updateFileds({ mejdz: e.target.value })}
      />
      <label>Number</label>
      <input
        type="tel"
        maxLength={15}
        value={kukuraK}
        onChange={(e) => updateFileds({ kukuraK: e.target.value })}
      />
    </MultiFormWraper>
  );
};

export default MultiFormStep3;
