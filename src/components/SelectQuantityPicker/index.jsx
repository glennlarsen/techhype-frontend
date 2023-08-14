import React from "react";
import SelectTheme from "components/forms/SelectTheme";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

const SelectQuantityPicker = ({ lang, content, quantity, handleChange }) => {
  return (
    <SelectTheme>
      <FormControl variant="outlined">
        <InputLabel id="quantity-label" sx={{ color: "white" }}>
          {content[lang]["quantity"]}
        </InputLabel>
        <Select
          label="Quantity"
          sx={{
            "& svg": {
              color: "white",
            },
          }}
          onChange={handleChange}
          value={quantity}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
      </FormControl>
    </SelectTheme>
  );
};

export default SelectQuantityPicker;
