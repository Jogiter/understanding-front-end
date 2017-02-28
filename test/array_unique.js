// 利用indexOf判断新数组
Array.prototype.unique1 = function (){
 var tmpArr = [];
 for (var i = 0; i < this.length; i++){
  if (tmpArr.indexOf(this[i]) == -1){
   tmpArr.push(this[i]);
  }
 }
 return tmpArr;
}

 // 利用indexOf判断旧数组
Array.prototype.unique2 = function(){
  var tmpArr = []; //结果数组
  for(var i = 0; i < this.length; i++){
   if (this.indexOf(this[i]) == i){
    tmpArr.push(this[i]);
   }
  }
  return tmpArr;
}

 // 利用hash查找
Array.prototype.unique3 = function(){
  var tmpArr=[], hash = {};
  for(var i = 0; i < this.length; i++){
   if (!hash[this[i]]){
     hash[this[i]] = true;
     tmpArr.push(this[i]);
   }
  }
  return tmpArr;
}

function newArray(size, max, min) {
    var arr = [],
        i = 0;

    size = size || 10;
    max = max || 100;
    min = min || 0;

    while (i < size) {
        arr.push(Math.floor(Math.random() * (max - min)));
        i++;
    }
    return arr;
}

function getTime(n, arr) {
    console.time('t1_' + n);
    arr.unique1();
    console.timeEnd('t1_' + n);

    console.time('t2_' + n);
    arr.unique2();
    console.timeEnd('t2_' + n);

    console.time('t3_' + n);
    arr.unique3();
    console.timeEnd('t3_' + n);

    console.log('======');
}

function test(n) {
    var arr = newArray(Math.pow(10, n));
    getTime(n, arr);
}

function main(time) {
    for (var i = 0; i < time; i++) {
        test(i+1);
    }
}

main(8);

/**
根据测试:
chrome(52.0.2743.116 m)浏览器内 测试main(5)
node(v4.4.4)内 测试main(8)
【利用hash查找】 -> 速度最快
【利用indexOf判断旧数组】 -> 速度最慢
【利用indexOf判断新数组】 -> 速度居中
*/
