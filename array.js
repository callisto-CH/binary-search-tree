function split(arr) {
  let splitIndex = Math.round(arr.length / 2);
  let secondHalf = arr.splice(splitIndex);
  let firstHalf = arr;
  return { firstHalf, secondHalf };
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  let splitArr = split(arr);
  let firstHalfSorted = mergeSort(splitArr.firstHalf);
  let secondHalfSorted = mergeSort(splitArr.secondHalf);
  let bothSorted = [];

  while (firstHalfSorted.length + secondHalfSorted.length > 0) {
    let x = firstHalfSorted[0];
    let y = secondHalfSorted[0];
    let lesser;
    if (x > y || firstHalfSorted.length == 0) {
      lesser = secondHalfSorted.shift();
    } else {
      lesser = firstHalfSorted.shift();
    }
    bothSorted.push(lesser);
  }
  return bothSorted;
}