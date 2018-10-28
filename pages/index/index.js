//index.js
//获取应用实例
const app = getApp();
import { translateArray, arrayRandom, compareArr } from '../../utils/util'

var order = [];
let str = '';
for(let i = 0; i < 10 ; i++){
  order.push(i)
}
for (let i = 65; i < 123; i++){
  if(i < 91 || i > 96){
    order.push(String.fromCharCode(i));
  }  
}
for(let i = 0; i< 18; i++){
  let index = Math.round(Math.random() * 61) 
  str += order[index];
}
let tableArr = [];
// 定义红棋和黑棋
for (let i = 0; i < 16; i++){
  let pieceItem = {
    value: i,
    color: 'red',
    sort: parseInt(Math.random() * 40),
    cover: false
  };
  if(i >= 8){
    pieceItem.color = 'black';
  }
  tableArr.push(pieceItem)
}
// 将红旗和黑棋混合
// 随机排列
tableArr.sort(compareArr('sort'));
const gamesObj = {
  row: 4,
  column: 4
};
Page({
  data: {
    toView: 'red',
    scrollTop: 100,
    order: [],
    table: []
  },
  onLoad: function(){
    this.setData({order, str, table: translateArray(JSON.parse(JSON.stringify(tableArr)), gamesObj.row)});
    console.log(this.data.table);
    // this.getDB();
  },
  onClick: function(e){
    let dataType = e.currentTarget.dataset.type;
    if(dataType === 'game'){
      this.playGames(e)
    }
  },
  playGames: function(e){
    let table = this.data.table;
    let curIndex = e.currentTarget.dataset.index;
    let rowIndex = e.currentTarget.dataset.rowindex;
    let curValue = e.currentTarget.dataset.value;
    let curColor = e.currentTarget.dataset.color;
    let leftValue = null, rightValue = null, topValue = null, bottomValue = null;
    // 行判断
    if(rowIndex > 0){
      topValue = table[rowIndex-1][curIndex]
    }
    if(rowIndex < table.length-1){
      bottomValue = table[rowIndex+1][curIndex];
    }
    // 列判断
    if(curIndex > 0){
      leftValue = table[rowIndex][curIndex-1];
    }
    if(curIndex < gamesObj.row -1){
      rightValue = table[rowIndex][curIndex+1];
    }


    tableArr.forEach(item => {
      if(item.value === curValue && item.color === curColor){
        item.arrowShow = true;
        item.cover = true
      }else{
        item.arrowShow = false
      }
      if(item.arrowShow){
        item.topValue = topValue;
        item.rightValue = rightValue;
        item.bottomValue = bottomValue;
        item.leftValue = leftValue
      }
    });
    this.setData({table: translateArray(JSON.parse(JSON.stringify(tableArr)), gamesObj.row)})
    console.log(curValue, topValue, rightValue, bottomValue, leftValue);
  },
  getDB: function(){
    wx.cloud.init({
      env: 'test'
    })
    const testDB = wx.cloud.database({
      env: 'test'
    })
    const todos = testDB.collection('todos')
    const todo = testDB.collection('todos').doc('W82GCQIrVDZJFtPc')
    console.log(todo)

    testDB.collection('todos').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        description: "learn cloud database",
        due: new Date("2018-09-01"),
        tags: [
          "cloud",
          "database"
        ],
        // 为待办事项添加一个地理位置（113°E，23°N）
        location: new testDB.Geo.Point(113, 23),
        done: false
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      },
      fail: err => {
        console.log(err);
      }
    })
  }
})