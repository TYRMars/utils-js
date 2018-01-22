// util 工具库封装
const util = {};

// 返回数组指定项
util.indexOf = function (array,item) {
  for (let i = 0; i < array.length; i++) {
    if(array[i] === item){
      return i;
    }
  }
  return -1;
}

// 判断是否为函数
util.isFunction = function (source) {
  return '[object Function]' === Object.prototype.toString.call(source);
}

// 对象浅复制
util.extend = function (dst, obj) {
  for (var i in object) {
    if (object.hasOwnProperty(i)) {
      dst[i] = obj[i];
    }
  }
}

//
util.json = function (options) {
  let opt = {
    url:'',
    type:'get',
    data:{},
    success:function () {},
    error:function () {}
  };
  util.extend(opt,options);
  if (opt.url) {
    let xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveObject('Microsoft.XMLHTTP');
    let data = opt.data, url = opt.url, type = opt.type.toUpperCase()
  }
}

 export default util;
