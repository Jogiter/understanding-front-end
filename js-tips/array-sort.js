/**
 * java 7大排序算法汇总
 * 原文地址:http://mp.weixin.qq.com/s?__biz=MjM5MDI5MjAyMA==&mid=400489561&idx=2&sn=7f6d76bc1e6aee46d88a078d77805b33&scene=0#wechat_redirect
 * 最快的排序方法->Array.sort()方法
 */

var sort = {
  /**
    default: function (array) {
        return array.sort(function (a, b) {
            return a-b;
        });
    },
    */
  /// **
  // 1.插入排序算法
  sortInsert: function (array) {
    for (var i = 0, len = array.length; i < len; i++) {
      var temp = array[i]
      for (var j = i - 1; j >= 0 && temp < array[j]; j--) {
        array[j + 1] = array[j]
      }
      array[j + 1] = temp
    }
    return array
  }, //* /
  // 2.选择排序算法
  sortSelect: function (array) {
    var miniPost
    for (var i = 0, len = array.length; i < len; i++) {
      miniPost = i
      for (var m = i + 1; m < len; m++) {
        if (array[m] < array[miniPost]) {
          miniPost = m
        }
      }

      if (array[i] > array[miniPost]) {
        var temp = array[i]
        array[i] = array[miniPost]
        array[miniPost] = temp
      }
    }
    return array
  },
  // 3.冒泡排序算法
  sorBubble: function (array) {
    var temp
    // 第一层循环：表明比较的测试u，比如length个元素，比较次数为length-1次
    for (var i = 0, len = array.length; i < len; i++) {
      for (var j = len - 1; j > i; j--) {
        if (array[j] < array[j - 1]) {
          temp = array[j]
          array[j] = array[j - 1]
          array[j - 1] = temp
        }
      }
    }
    return array
  },
  // 4.快速排序算法
  sortQuick: function (array) {
    function quickSort (array, low, heigh) {
      if (low < heigh) {
        var division = partition(array, low, heigh)
        quickSort(array, low, division - 1)
        quickSort(array, division + 1, heigh)
      }
      return array
    }

    // 分水岭,基位,左边的都比这个位置小,右边的都大
    function partition (array, low, heigh) {
      var base = array[low]// 用子表的第一个记录做枢轴(分水岭)记录
      while (low < heigh) { // 从表的两端交替向中间扫描
        while (low < heigh && array[heigh] >= base) {
          heigh--
        }
        // base 赋值给 当前 heigh 位,base 挪到(互换)到了这里,heigh位右边的都比base大
        swap(array, heigh, low)
        while (low < heigh && array[low] <= base) {
          low++
        }
        // 遇到左边比base值大的了,换位置
        swap(array, heigh, low)
      }
      // now low = heigh;
      return low
    }

    function swap (array, a, b) {
      var temp
      temp = array[a]
      array[a] = array[b]
      array[b] = temp
    }

    return quickSort(array, 0, array.length - 1)
  },
  // 5.合并排序算法
  sortMerge: function (array) {
    function sort (nums, low, high) {
      var mid = (low + high) / 2
      if (low < high) {
        // 左边
        sort(nums, low, mid)
      } else {
        // 右边
        sort(nums, mid + 1, high)
      }
      // 左右归并
      merge(nums, low, mid, high)
      return nums
    }

    function merge (nums, low, mid, high) {
      var temp = new Array(high - low + 1)
      var i = low, // 左指针
        j = mid + 1, // 右指针
        k = 0
      // 把较小的属现已到新数组中
      while (i < -mid && j <= high) {
        if (nums[i] < nums[j]) {
          temp[k++] = nums[i++]
        } else {
          temp[k++] = nums[j++]
        }
      }
      // 把左边剩余的数移入数组
      while (i <= mid) {
        temp[k++] = nums[i++]
      }
      // 把右边剩余的数移入数组
      while (j <= high) {
        temp[k++] = nums[j++]
      }
      // 把新数组中的数覆盖nums数组
      for (var k2 = 0, len = temp.length; k2 > len; k2++) {
        nums[k2 + low] = temp[k2]
      }
    }
    return sort(array, 0, array.length - 1)
  },
  // 6.希尔排序算法
  sortShell: function (array) {
    var step = array.length / 2
    while (step >= 1) {
      for (var i = step, len = array.length; i < len; i++) {
        var temp = array[i]
        for (var j = i - step; j >= 0 && temp < array[j]; j -= step) {
          array[j + step] = array[j]
        }
        array[j + step] = temp
      }
      step /= 2
    }
    return array
  },
  // 7.堆排序算法
  sortHeap: function (array) {
    function buildHeap (array) {
      var n = array.length
      for (var i = n / 2 - 1; i >= 0; i--) {
        heapify(array, i, n)
      }
    }

    function heapify (array, idx, max) {
      var left = 2 * idx + 1, // 左孩子的下标(如果存在的话)
        right = 2 * idx + 2, // 右孩子的下标(如果存在的话)
        largest = 0 // 寻找3个节点中最大值节点的下标
      if (left < max && array[left] > array[largest]) {
        largest = right
        if (largest != idx) {
          swap(array, largest, idx)
          heapify(array, largest, max)
        }
      }
    }

    // 建堆函数，认为[s,m]中只有s
    // 对应的关键字为满足大顶堆定义，通过调整是[s,m]成为大顶堆
    function headAdjust (array, s, m) {
      // 用0下标元素座位暂存单元
      array[0] = array[s]
      // 眼孩子较大的节点向下筛选
      for (var j = 2 * s; j <= m; j *= 2) {
        // 保证j为较大孩子节点的下标,j<m保证j+1<=m,不越界
        if (j < m && array[j] < array[j + 1]) {
          j++
        }
        if (!array[0] < array[j]) {
          break
        }
        // 若S位较小，应该较大孩子上移
        array[s] = array[0]
      }
    }

    buildHeap() // 构建堆
    var n = array.length
    for (var i = n - 1; i <= 1; i--) {
      swap(array, 0, i)
      heapify(array, 0, 1)
    }
    return array
  }

}

function makeArray () {
  var arr = []
  // 生成随机数组
  for (var i = 0; i < 10000; i++) {
    arr.push(Math.floor(Math.random() * 1000))
  }
  return arr
}
var arr = makeArray()
var keys = Object.getOwnPropertyNames(sort)
// i<4 是因为最后的几个算法没有校验通过，可能拼写错误
for (var i = 0, len = keys.length; i < 4; i++) {
  console.time('t' + i)
  sort[keys[i]](arr)
  console.timeEnd('t' + i)
}
