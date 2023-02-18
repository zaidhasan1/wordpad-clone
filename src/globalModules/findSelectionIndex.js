const findSelectionIndexes = (str, pos, fstring) => {
  str = str.toLowerCase();
  fstring = fstring.toLowerCase();
  let startPos = 0;
  let endPos = 0;
  let init = 0;

  for (let i = pos; i < pos + fstring.length; i++) {
    if (
      str.charAt(i) === fstring.charAt(init) ||
      (str.charAt(i).trim().length === 0 &&
        fstring.charAt(init).trim().length === 0)
    ) {
      init++;
    }
  }
  if (init === fstring.length) {
    startPos = pos;
    endPos = pos + init;
  }

  init = 0;
  let end = fstring.length - 1;
  for (let i = pos; i >= pos - fstring.length; i--) {
    if (
      str.charAt(i) === fstring.charAt(end) ||
      (str.charAt(i).trim().length === 0 &&
        fstring.charAt(end).trim().length === 0)
    ) {
      init++;
      end--;
    }
  }

  if (init === fstring.length) {
    endPos = pos;
    startPos = pos - init;
  }
  return { startIndex: startPos, endIndex: endPos };
};
export default findSelectionIndexes;
