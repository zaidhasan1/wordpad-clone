import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import featureList from "../feature/list/featureList";
import { changeFeatureData } from "../redux/reducers/featureData";
import { useDispatch, useSelector } from "react-redux";
import { ListSubheader } from "@mui/material";
import "../css/editor.css";
import { changeFontData } from "../redux/reducers/fontData";
import TextColorMenu from "./TextColorMenu";
import TextBackgroundColorMenu from "./TextBackgroundColorMenu";
import { changeTextAlign, currentTextAlign } from "../redux/reducers/textAlign";
import {
  changeFontFamilyData,
} from "../redux/reducers/fontFamilyData";
import FontFamily from "../feature/FontFamily";
import FontSize from "../feature/FontSize";

const Features = () => {
  const [checkBoxList, setCheckBoxList] = useState([]);

  const dispatch = useDispatch();

  const alignment = [
    {
      name: "Left Align",
      value: "left",
    },
    {
      name: "Right Align",
      value: "right",
    },
    {
      name: "Center Align",
      value: "center",
    },
    {
      name: "Justify Align",
      value: "justify",
    },
  ];
  const fontAlign = useSelector(currentTextAlign);

  const checkBoxAction = (e, obj) => {
    if (e.target.checked) {
      setCheckBoxList((checkBoxList) => [
        ...checkBoxList,
        { value: obj.value },
      ]);
    } else {
      let filter = checkBoxList.filter((a) => a.value != obj.value);
      setCheckBoxList(filter);
    }
  };

  useEffect(() => {
    dispatch(changeFeatureData(checkBoxList));
  }, [checkBoxList]);

  const changeFontAlignValue = (e, value) => {
    dispatch(changeTextAlign(value));
  };

  return (
    <div style={{ overflowX: "hidden", overflowY: "scroll", height: "100%" }}>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {/* feature loop */}
        {featureList.map((value) => {
          let findCheck = checkBoxList.find((a) => a.value == value.value);

          const labelId = `checkbox-list-label-${value.id}`;
          return (
            <ListItem
              key={value.name}
              secondaryAction={
                <IconButton edge="end" aria-label={value.name}>
                  {<value.icon />}
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton role={undefined} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={findCheck}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                    onClick={(e) => checkBoxAction(e, value)}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
        {/* feature loop end  */}
      </List>

      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: "auto",
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        <li key={`section-1`}>
          <ul>
            <ListItem key={`item-1-1`}>
              <FontSize 
               callbackValue={(value) => {
                dispatch(changeFontData(value));
              }}
              />
            </ListItem>
          </ul>
        </li>
        <li key={`section-5`}>
          <ul>
            <ListItem key={`item-1-1`}>
              <FontFamily
                callbackValue={(value) => {
                  dispatch(changeFontFamilyData(value));
                }}
              />
            </ListItem>
          </ul>
        </li>
        <li key={`section-2`}>
          <ul>
            <ListSubheader>{`Color`}</ListSubheader>
            <ListItem key={`item-1-2`}>
              <ul className={"colorLi"}>
                <li className="cursor-point">
                  <TextColorMenu />
                </li>
                <li className="cursor-point">
                  <TextBackgroundColorMenu />
                </li>
              </ul>
            </ListItem>
          </ul>
        </li>

        <li key={`section-3`}>
          <ul>
            <ListSubheader>{`Margin`}</ListSubheader>
            <ListItem key={`item-1-2`}>
              <ul style={{ listStyleType: "none" }}>
                {alignment.map((obj, index) => {
                  let find = obj.value == fontAlign;
                  return (
                    <li key={index}>
                      <Checkbox
                        edge="start"
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": `align${index}` }}
                        checked={find}
                        onChange={(e) => changeFontAlignValue(e, obj.value)}
                      />
                      {obj.name}
                    </li>
                  );
                })}
              </ul>
            </ListItem>
          </ul>
        </li>
      </List>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Features;
