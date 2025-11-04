import { FormControlLabel, Switch } from "@mui/material";
import { useState } from "react";

const SettingItem = ({ label }) => {
  const [checked, setChecked] = useState(false);

  return (
    <FormControlLabel
      control={<Switch checked={checked} onChange={() => setChecked(!checked)} />}
      label={label}
    />
  );
};

export default SettingItem;
