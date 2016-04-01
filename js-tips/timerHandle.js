/**
 * Created by Home on 2015/6/25.
 */
(function(){

  //检查数据的类型
  function type(obj){
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  }

  //小于10的数字前面补充一个0
  function prefix2(num, n){
    if(type(num) !== 'number') throw new TypeError('not a number');
    var n = n || 2;
    return num < 10 ? new Array(n).join('0') + num : num;
  }

  //获取一个月份到底有多少天
  function monthDays(yyyy, month){
      var days = {
    '01': 31,
    '02': yyyy % 4 === 0 ? 29 : 28,
    '03': 31,
    '04': 30,
    '05':31,
    '06':30,
    '07':31,
    '08':31,
    '09':30,
    '10':31,
    '11':30,
    '12':31
  };
      return days[month];
  }

  function timeHandle(time, origin){
    var date = new Date(time);
    if(date == 'Invalid Date'){
      throw new Error('Invalid Date');
    }else{
      var yyyy, MM, dd, hh, mm, nowDate, Nyyyy, NMM, Ndd,output;
      nowDate = new Date(origin) || new Date();
      yyyy = date.getFullYear();
      MM = prefix2(date.getMonth()+1);
      dd = prefix2(date.getDate());
      hh = prefix2(date.getHours());
      mm = prefix2(date.getMinutes());
      Nyyyy = nowDate.getFullYear();
      NMM = prefix2(nowDate.getMonth()+1);
      Ndd = prefix2(nowDate.getDate());
      //console.info(yyyy,MM,dd,hh,mm,Nyyyy,NMM,Ndd);
      if(yyyy==Nyyyy){//同年
        if(MM==NMM){//同月
          if(dd == Ndd){//同日
            output = hh + ':' +  mm;
          }else{//不同日
            if(Ndd-dd == 1){//昨天
              output = '昨天 ' + hh + ':' + mm;
            }else if(Ndd-dd>1){//昨天以前
              output = MM + '月' + dd + '日 ' + hh + ':' + mm;
            }
          }
        }else{//不同月
          if(NMM-MM==1 && Ndd==1 && dd==monthDays(yyyy, MM)){ //跨月，昨天
        output = '昨天 ' +  hh + ':' +  mm;
          }else{
            output = MM + '月' + dd + '日 ' + hh + ':' + mm;
          }
        }
      }else{//不同年
        if(NMM==1 && MM==12 && Ndd==1 && dd==31){//跨年，昨天
          output = '昨天 ' + hh + ':' + mm;
        }else{//跨年
          output = yyyy + '年' + MM + '月' + dd + '日';
        }
      }
      return output;
    }
  }

  window['timeHandle'] = timeHandle;

})()
