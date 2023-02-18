const setCursorPosition = (index, parent) => {
  
  let ind = index;

  try {
    let range = document.createRange();
    let sel = document.getSelection();
    range.setStart(parent, ind);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    parent.focus();
  } catch (e) {}
};

export default setCursorPosition;
