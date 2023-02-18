const getIndicesOf = (searchStr, str, lastIndex) => {
  let startIndex = 0,
    searchStrLen = searchStr.length
  let index,
    indices = []
  str = str.toLowerCase()
  searchStr = searchStr.toLowerCase()
  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    if (
      str.charAt(index - 1).trim().length === 0 &&
      str.charAt(index + lastIndex).trim().length === 0
    ) {
      indices.push(index)
    } else if (
      str.charAt(index - 1).trim().length === 0 &&
      str.charAt(index + lastIndex).trim().length === 0
    ) {
      indices.push(index)
    } else if (
      str.charAt(index - 1) === '(' &&
      str.charAt(index + lastIndex).trim().length === 0
    ) {
      indices.push(index)
    } else if (
      str.charAt(index - 1).trim().length === 0 &&
      str.charAt(index + lastIndex) === ')'
    ) {
      indices.push(index)
    } else if (
      index === 0 &&
      str.charAt(index + lastIndex).trim().length === 0
    ) {
      indices.push(index)
    }

    startIndex = index + searchStrLen
  }
  return indices
}

export default getIndicesOf
