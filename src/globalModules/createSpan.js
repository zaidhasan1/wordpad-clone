const createSpan = (str) => {
  let strArr = [...str];
  let length = strArr.length;
  let html = "";

  if (length) {
    strArr.forEach((char) => {
      if (char == " ") {
        html += `<span contentEditable="true">&nbsp;</span>`;
      } else {
        html += `<span contentEditable="true">${char}</span>`;
      }
    });
  }
  return html;
};

export default createSpan;
