/**
 * author: jogiter
 * usable: to make <img> fits to it`s parent selector
 * 需要在使用之前引入jQuery.js
 */


// 引入jQuery
(function($){

/**
 * imageSuit(selector, url[, adaptive])
 * selector: 图片的父选择器
 * url: 图片的地址
 * adaptive: 是否自适应
 */
function imageSuit(selector){
  //对selector需要进行校验，确定他是一个合法的选择器
  //...
  //获取图片的真正url
  var url = realUrl($(selector).find('img').attr('src'));
  var img = $('<img>').attr('src', url).css({display: 'none'}).addClass('_imageSuit').appendTo(document.body);
  //获取图片的实际宽和高,宽高比
  var iw = $('._imageSuit').width(), ih = $('._imageSuit').height(), ia = iw/ih;
  //获取选择器的宽和高,宽高比
  var sw = $(selector).width(), sh = $(selector).height(), sa = sw/sh;
  //图片展示时的实际宽和高,留白的距离
  var tw,th,blankLenght;

  console.log('实际宽高:',iw,ih,'选择器宽高:',sw,sh);
  if(ia > sa){//如果图片的宽高比大于选择器的宽高比，选择器的上下留白
    tw = sw;
    th = tw / ia;
    blankLenght = (sh - th)/2;
    $(selector).find('img').attr('width', tw).attr('height', th).css({marginTop: blankLenght});
  }else{//如果图片的宽高比小于选择器的宽高比，选择器的左右留白
    th = sh;
    tw = th * ia;
    blankLenght = (sw - tw)/2;
    $(selector).find('img').attr('width', tw).attr('height', th).css({marginLeft: blankLenght});
  }
  $('._imageSuit').detach();
}


//检查数据的类型
function type(obj){
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}



//检查str是否存在数组中的任何一个元素，存在返回true
function idxOf(str, arr){
  console.log(str + '&' + arr)
  if(type(arr) === 'array'){
    var len = arr.length;
    var flag = false;
    while(len){
      len--;
      if(str.indexOf(arr[len]) > -1){
        flag = true;
        break;
      }
    }
    return flag;
  }else{
    console.error('second parameter is not array');
    return;
  }
}




//或者添加原型函数：检查str是否存在数组中的任何一个元素，存在返回true
String.prototype.idxOf = function(arr){
  if(type(arr) === 'array'){
    var len = arr.length;
    var flag = false;
    while(len){
      len--;
      if(this.indexOf(arr[len]) > -1){
        flag = true;
        break;
      }
    }
    return flag;
  }else{
    console.error('second parameter is not array');
    return;
  }
}


//整理图片的url
function realUrl(url){
  if(!url.idxOf(['http://','https://','ftp://','file://',':\\'])){
 // if(!idxOf1(url, ['http://','https://','ftp://','file://',':\\'])){
    url = window.location.href.slice(0, window.location.href.lastIndexOf('/')+1) + url;
  }
  return url;
}


window.imageSuit = imageSuit;

})(jQuery)

