import getCaretPosition from "./getCaretPosition";

const cursorPosition = () => {
  let sel = document.getSelection();
//   console.log(sel);
  sel.modify("extend", "backward", "paragraphboundary","granularity");
  let pos = sel.toString().length;
  if (sel.anchorNode != undefined) sel.collapseToEnd();
  return pos;
};

export default cursorPosition;
