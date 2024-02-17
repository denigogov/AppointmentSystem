import MultiFormWraper from "./MultiFormWraper";

type UserData = {
  phone: string;
  blabla: string;
  blabla2: string;
};

// Partial is makeing the userDataProps optional!!
type MultiFormStep2Props = UserData & {
  updateFileds: (fileds: Partial<UserData>) => void;
};

const MultiFormStep2: React.FC<MultiFormStep2Props> = ({
  updateFileds,
  phone,
  blabla,
  blabla2,
}) => {
  return (
    <MultiFormWraper title="Step 2">
      <label>Phone</label>
      <input
        type="text"
        required
        autoFocus
        value={phone}
        onChange={(e) => updateFileds({ phone: e.target.value })}
      />
      <label>Blabla1</label>
      <input
        type="text"
        required
        value={blabla}
        onChange={(e) => updateFileds({ blabla: e.target.value })}
      />

      <label>Number</label>
      <input
        type="tel"
        maxLength={15}
        value={blabla2}
        onChange={(e) => updateFileds({ blabla2: e.target.value })}
      />
    </MultiFormWraper>
  );
};

export default MultiFormStep2;
