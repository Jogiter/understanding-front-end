/**
 * [ECMAScript 6 入门](http://es6.ruanyifeng.com/#docs/function#尾递归优化的实现)
 * 函数调用自身，称为递归。如果尾调用自身，就称为尾递归。
 * 递归非常耗费内存，但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。
 * 不同方式实现菲波那切数列
 *
 * 变形题目：一只青蛙一次可以跳上 1 级台阶，也可以跳上 2 级。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。 
 * 解析 f(n) = f(n-1) + f(n-2); f(2) = 1; f(1) = 1.
 */

// 非尾递归。需要保存n个调用记录，复杂度 O(n)
function Fibonacci (n) {
  if (n <= 1) {
    return 1
  }
  return Fibonacci(n - 2) + Fibonacci(n - 1)
}
// Fibonacci(100000) 
// Uncaught RangeError: Maximum call stack size exceeded

// 尾递归。只保留一个调用记录，复杂度 O(1)
function Fibonacci (n, ac1 = 1, ac2 = 1) {
  if (n <= 1) {
    return ac2
  }
  return Fibonacci(n - 1, ac2, ac1 + ac2)
}
// Fibonacci(100000) 
// Uncaught RangeError: Maximum call stack size exceeded


// 尾递归优化
function tco(f) {
  var value;
  var active = false;
  var accumulated = [];

  return function accumulator() {
    accumulated.push(arguments);
    if (!active) {
      active = true;
      while (accumulated.length) {
        value = f.apply(this, accumulated.shift());
      }
      active = false;
      return value;
    }
  };
}

let fib = tco(function(n, ac1 = 1, ac2 = 1) {
  if (n <= 1) {
    return ac2
  }
  return fib(n - 1, ac2, ac1 + ac2)
})

// 不会发生调用栈溢出
let res = fib(100000)
console.log(res) // Infinity

