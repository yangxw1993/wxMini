const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n
};
// 将数组等份拆分
const translateArray = (arr, num)=> {
  let a = [], i = 0;
  if (Array.isArray(arr)) {
    let size = arr.length;
    do {
      a.push(arr.splice(0, num));
      i++;
    } while (i < size / num);
    return a;
  } else {
    return a;
  }
};
function arrayRandom(arr) {
  arr.sort(function () {
    return Math.random() - 0.5;
  });
}
// 数组排序
function compareArr(property) {
  return function (obj1, obj2) {
    let value1 = obj1[property];
    let value2 = obj2[property];
    return value2 - value1;
  }
}
module.exports = {
  formatTime,
  translateArray,
  arrayRandom,
  compareArr
}
