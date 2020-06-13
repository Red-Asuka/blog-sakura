import Vue from 'vue'
var utils = {
  install(Vue) {
    Vue.prototype.utils = {
      // formatDate(new Date().getTime());//2017-05-12 10:05:44
      // formatDate(new Date().getTime(),'YY年MM月DD日');//2017年05月12日
      // formatDate(new Date().getTime(),'今天是YY/MM/DD hh:mm:ss');//今天是2017/05/12 10:07:45
      formatDate: function(time, format = 'YY-MM-DD hh:mm:ss') {
        var date = new Date(time)

        var year = date.getFullYear(),
          month = date.getMonth() + 1, //月份是从0开始的
          day = date.getDate(),
          hour = date.getHours(),
          min = date.getMinutes(),
          sec = date.getSeconds()
        var preArr = Array.apply(null, Array(10)).map(function(elem, index) {
          return '0' + index
        }) ////开个长度为10的数组 格式为 00 01 02 03

        var newTime = format
          .replace(/YY/g, year)
          .replace(/MM/g, preArr[month] || month)
          .replace(/DD/g, preArr[day] || day)
          .replace(/hh/g, preArr[hour] || hour)
          .replace(/mm/g, preArr[min] || min)
          .replace(/ss/g, preArr[sec] || sec)

        return newTime
      }
    }
  }
}
Vue.use(utils)
