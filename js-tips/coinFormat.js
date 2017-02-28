/**
 * 将数字千分化
 * 到万的显示'xxxx万'
 * 到亿的显示'xxxx亿'
 * 到万亿的显示'xxxx万亿'
 */
function formatCoin(num, digits = 2) {
    digits = Math.pow(10, digits) // 保留小数位数

    // 千分化
    function toThousands(num) {
        let itg = parseInt(num) // 取整数部分
        let itg_length = itg.toString().length
        let length = num.toString().length
        let dec = num.toString().slice(itg_length, length)// 取小数部分
        // 整数部分千分，小数部分保留2位附加
        return (itg || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + (parseInt(dec * digits) / digits).toString().slice(1);
    }

    num = parseFloat(num)
    if (isNaN(num)) {
        throw new TypeError('parameter must be a number')
    }
    if (num < 1e4) {
        return toThousands(num)
    } else if (num >= 1e4 && num < 1e8) {
        return toThousands(num / 1e4) + '万'
    } else if (num >= 1e8 && num < 1e12) {
        return toThousands(num / 1e8) + '亿'
    } else {
        return toThousands(num / 1e12) + '万亿'
    }
}


// 测试
function testing() {
    var test = [
                1.23456e0,
                1.23456e1,
                1.23456e2,
                1.23456e3,
                1.23456e4,
                1.23456e5,
                1.23456e6,
                1.23456e7,
                1.23456e8,
                1.23456e9,
                1.23456e10,
                1.23456e11,
                1.23456e12,
                1.23456e13,
                1.23456e14,
                1.23456e15,
                1.23456e16,
                'asd'
                ];



    for (let i = 0, length = test.length; i < length; i++) {
        let op = formatCoin(test[i])
        console.log('OP:', op)
    }
}

testing()


