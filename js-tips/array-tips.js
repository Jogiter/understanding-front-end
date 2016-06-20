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
