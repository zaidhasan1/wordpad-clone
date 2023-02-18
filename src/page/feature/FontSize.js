import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeFontData, currentFontData } from "../redux/reducers/fontData";

const FontSize = () => {
  const dispatch = useDispatch();
  const fontSize = useSelector(currentFontData);
  const font = [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72];

  const fontChange = (e) => {
    let value = e.target.value;
    dispatch(changeFontData(value));
  };
  return (
    <FormControl fullWidth>
      <InputLabel id="font-label">Font Size</InputLabel>
      <Select
        labelId={`font-label`}
        id={`font`}
        value={fontSize}
        label="font size"
        onChange={fontChange}
      >
        {font.map((v, index) => {
          return <MenuItem value={v}>{v}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
};

export default FontSize;
