/* [常用正则表达式大全，手机、电话、邮箱、身份证(最严格的验证)、IP地址、网址、日期等，一般前台js验证，来这里就够了...](http://blog.csdn.net/lun379292733/article/details/8169807) */

/*
 * 手机号码格式
 */
var regMobile = /1[3,4,5,8]\d[\s,-]?\d{4}[\s,-]?\d{4}/ // 不包括171，170等虚拟字段
var regMobile = /1[3,4,5,7,,8]\d[\s,-]?\d{4}[\s,-]?\d{4}/ // 包括171，170等虚拟字段; 长度不限制11位
var regMobile = /^1(3|4|5|7|8)\d{9}$/ // 包括171，170等虚拟字段; 长度限制11位

/*
 * 固定电话号码格式
 * 因为固定电话格式比较复杂，情况比较多，主要验证了以下类型
 * 如：010-12345678、0912-1234567、(010)-12345678、(0912)1234567、(010)12345678、(0912)-1234567、01012345678、09121234567
 */
var regPhone = /^(^0\d{2}-?\d{8}$)|(^0\d{3}-?\d{7}$)|(^0\d2-?\d{8}$)|(^0\d3-?\d{7}$)$/

/*
 * Email邮箱
 * 如：zhangsan@163.com、li-si@236.net、wan_gwu999@SEED.NET.TW
 */
var regEmail = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+(\.[a-zA-Z]{2,3})+$/

// https://stackoverflow.com/questions/46155/how-to-validate-email-address-in-javascript
var validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

/*
 * 身份证15位编码规则：dddddd yymmdd xx p
 * dddddd：6位地区编码
 * yymmdd: 出生年(两位年)月日，如：910215
 * xx: 顺序编码，系统产生，无法确定
 * p: 性别，奇数为男，偶数为女
 *
 * 身份证18位编码规则：dddddd yyyymmdd xxx y
 * dddddd：6位地区编码
 * yyyymmdd: 出生年(四位年)月日，如：19910215
 * xxx：顺序编码，系统产生，无法确定，奇数为男，偶数为女
 * y: 校验码，该位数值可通过前17位计算获得
 *
 * 前17位号码加权因子为 Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]
 * 验证位 Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ]
 * 如果验证码恰好是10，为了保证身份证是十八位，那么第十八位将用X来代替
 * 校验位计算公式：Y_P = mod( ∑(Ai×Wi),11 )
 * i为身份证号码1...17 位; Y_P为校验码Y所在校验码数组位置
 */
function validateIdCard (idCard) {
  var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/

  // 如果通过该验证，说明身份证格式正确，但准确性还需计算
  if (regIdCard.test(idCard)) {
    if (idCard.length == 18) {
      var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2) // 将前17位加权因子保存在数组里
      var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2) // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
      var idCardWiSum = 0 // 用来保存前17位各自乖以加权因子后的总和
      for (var i = 0; i < 17; i++) {
        idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i]
      }

      var idCardMod = idCardWiSum % 11 // 计算出校验码所在数组的位置
      var idCardLast = idCard.substring(17) // 得到最后一位身份证号码

      // 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
      if (idCardMod == 2) {
        if (idCardLast == "X" || idCardLast == "x") {
          return true
        } else {
          return false
        }
      } else {
        // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
        if (idCardLast == idCardY[idCardMod]) {
          return true
        } else {
          return false
        }
      }
    }
  } else {
    return false
  }
}

/*
 * 只能为正整数
 */
var regNum = /^\d+$/

/*
 * 邮政编码
 */
var regPostCode = /^\d{6}$/

/*
 * 用户名
 * 只能是字母数字下划线，并且以字母开头(5-16位)
 */
var regUserName = /^[a-zA-Z]\w{4,15}$/

/*
 * IP地址
 * 如：192.168.1.102
 */
var regIP = /^((([1-9]\d?)|(1\d{2})|(2[0-4]\d)|(25[0-5]))\.){3}(([1-9]\d?)|(1\d{2})|(2[0-4]\d)|(25[0-5]))$/

/*
 * 只能是中文汉字
 */
var regChineseChar = /^[\u4e00-\u9fa5]+$/

/*
 * 网址
 * 只允许http、https、ftp这三种
 * 如：http://www.baidu.com
 */
var regWeb = /^(([hH][tT]{2}[pP][sS]?)|([fF][tT][pP]))\:\/\/[wW]{3}\.[\w-]+\.\w{2,4}(\/.*)?$/

/*
 * 日期格式验证
 * 因为日期格式比较多，主要验证了以下类型
 * 2012-05-14、2012/05/6、2012.5.14、20120528
 */
var regDate = /^[1-9]\d{3}([-|\/|\.])?((0\d)|([1-9])|(1[0-2]))\1(([0|1|2]\d)|([1-9])|3[0-1])$/

export function isMoney (n) {
  return /^\d+$/.test(n)
}

export function trim (str) {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}
