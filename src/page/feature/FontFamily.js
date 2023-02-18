import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  currentFontFamilyData,
} from "../redux/reducers/fontFamilyData";
import fontFamilyList from "./list/fontFamilyList";

const FontFamily = ({
  callbackValue, //callback
}) => {
  const fontFamily = useSelector(currentFontFamilyData);
  const fontFamilyArray = fontFamilyList;

  const fontFamilyChange = (e) => {
    let value = e.target.value;
    callbackValue(value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="font-family-label">Font Family</InputLabel>
      <Select
        labelId={`font-family-label`}
        id={`font`}
        value={fontFamily}
        label="font Family"
        onChange={fontFamilyChange}
      >
        {fontFamilyArray.map((v, index) => {
          return (
            <MenuItem value={v.name}>
              <span style={{ fontFamily: v.name }}>{v.name}</span>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default FontFamily;
