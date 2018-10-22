//index.js
//获取应用实例
const app = getApp()

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
console.log(order.length)
for(let i = 0; i< 18; i++){
  let index = Math.round(Math.random() * 61) 
  console.log(index)
  str += order[index];
}
Page({
  data: {
    toView: 'red',
    scrollTop: 100,
    order: []
  },
  onLoad: function(){
    this.setData({ order, str})
  }
})