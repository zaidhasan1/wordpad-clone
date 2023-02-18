import { configureStore } from "@reduxjs/toolkit";
import colorData from "./reducers/colorData";
import featureData from "./reducers/featureData";
import fontData from "./reducers/fontData";
import fontFamilyData from "./reducers/fontFamilyData";
import getLocalData from "./reducers/getLocalData";
import loader from "./reducers/loader";
import localString from "./reducers/localString";
import snackbar from "./reducers/snackbar";
import textAlign from "./reducers/textAlign";

export default configureStore({
  reducer: {
    snackbar: snackbar,
    localString: localString,
    loader: loader,
    getLocalData: getLocalData,
    featureData: featureData,
    fontData: fontData,
    colorData: colorData,
    textAlign : textAlign,
    fontFamilyData : fontFamilyData
  },
});
