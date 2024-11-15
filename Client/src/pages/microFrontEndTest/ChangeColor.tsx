import { useState } from "react";

const ChangeColor: React.FC = () => {
  const [color, setColor] = useState<string>("");
  const [toHexCode, setToHexCode] = useState<string>("");

  return (
    <div>
      <h5>Theme Color Code: {color} </h5>

      <input type="color" onChange={(e) => setColor(e.target.value)} />

      <hr />
      <br />

      <h5>From RGB TO HEX CODE </h5>

      <input type="text" onChange={(e) => setToHexCode(e.target.value)} />

      <input type="color" value={toHexCode} />
    </div>
  );
};

export default ChangeColor;
