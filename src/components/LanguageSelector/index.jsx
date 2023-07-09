import React, { useContext } from "react";
import { LangContext } from "utils/LangContext";
import { GB, NO } from "country-flag-icons/react/3x2";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const LanguageSelector = (props) => {
  const [lang, setLang] = useContext(LangContext);

  let handleChangeSelect = (event) => {
    setLang(event.target.value);
    localStorage.setItem("lang", event.target.value);
    document.documentElement.setAttribute("lang", event.target.value);
  };

  return (
    <Box sx={{ minWidth: 48 }} className="language-selector">
      <FormControl variant="standard" fullWidth>
        <Select
          labelId="language-select-label"
          id="language-select"
          value={lang}
          label="Language"
          onChange={handleChangeSelect}
          IconComponent={() => null} // Remove the arrow icon
          sx={{
            ":after": { borderBottomColor: "#54d4c6" },
          }}
        >
          <MenuItem value="no">
            <NO />
          </MenuItem>
          <MenuItem value="en">
            <GB />
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
export default LanguageSelector;
