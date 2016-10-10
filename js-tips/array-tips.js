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