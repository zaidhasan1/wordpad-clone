const removeNode = (startIndex, endIndex, id) => {
  let node = id.childNodes;
  for (let i = endIndex; i > startIndex; i--) {
    try {
      node[i].remove();
    } catch (e) {}
  }
};

export default removeNode;
