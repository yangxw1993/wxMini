//index.js
//获取应用实例
const app = getApp();
import { translateArray } from '../../utils/util'

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
let table = [];
for (let i = 0; i < 16; i++){
  table.push(i)
}

Page({
  data: {
    toView: 'red',
    scrollTop: 100,
    order: [],
    table: []
  },
  onLoad: function(){
    this.setData({ order, str, table: translateArray(table, 4)});
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
    let leftValue = '', rightValue = '', topValue = '', bottomValue = '';
    topValue = table[rowIndex-1][curIndex];
    rightValue = table[rowIndex][curIndex+1];
    bottomValue = table[rowIndex+1][curIndex];
    leftValue = table[rowIndex][curIndex-1];

    /*table.forEach( (rowItem, rowIdx) => {
      if(rowIdx === rowIndex){
        rowItem.forEach( (item, index) => {
          lef
        })
      }
    });*/
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