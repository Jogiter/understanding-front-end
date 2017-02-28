//1、最简单的办法，就是创建一个新数组，并遍历数组逐项添加到新数组中
Array.prototype.clone = function() {
    var a = [];
    for (var i = 0, l = this.length; i < l; i++)
        a.push(this[i]);
    return a;
}

//2、通过Array对象的slice方法
Array.prototype.clone = function() {
    return this.slice(0);
}

//3、通过Array对象的concat方法
Array.prototype.clone = function() {
        return [].concat(this);
    }
    //或者 Array.prototype.clone=function(){ return this.concat(); }

// 数组去重复（最佳算法）
Array.prototype.unique = function() {
    this.sort();
    var array = [this[0]];
    for (var i = 1; i < this.length; i++) {
        if (this[i] !== array[array.length - 1]) {
            array.push(this[i]);
        }
    }
    return array;
}

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

 // 利用hash查找 (根据随机测试， hash方式速度最快)
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


/**获取数组中最小值&&索引*/
var indexOfSmallest = {
    t1: function(array) {
        var lowest = 0;
        for (var i = 1; i < array.length; i++) {
            if (array[i] < array[lowest]) lowest = i;
        }
        return lowest;
    },
    t2: function(array) {
        return array.reduce(function(lowest, next, index) {
               return next < array[lowest] ? index : lowest; },
             0);
    },
    t3: function(array) {
        return array.indexOf(Math.min.apply(Math, array));
    }
};


function makeArray(n = 100, max = 100, min = 0) {
    let ret = [];
    for (let i = 0; i < n; i++) {
        ret.push(Math.floor(Math.random() * (max - min)));
    }
    return ret;
}

var array = makeArray(Math.pow(10, 1));

console.time('t1');
indexOfSmallest.t1(array);
console.timeEnd('t1');

console.time('t2');
indexOfSmallest.t2(array);
console.timeEnd('t2');

console.time('t3');
indexOfSmallest.t3(array);
console.timeEnd('t3');

// 经测试，t3方法速度最快，但是当数组长度过长时，会产生调用堆栈溢出的错误
// TODO: [http://es6.ruanyifeng.com/#docs/function#尾递归](在ES6中，只要使用尾递归，就不会发生栈溢出，相对节省内存。)