import axios from 'axios';
import jsonp from 'jsonp';

var querystring = require('querystring');

/**
 * 请求过滤设置
 *
 * @param {Object} request 请求信息
 * @param {Function} next 回调函数
 */

axios.defaults.timeout = 15000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.request.use((config) => {
  // Do something before request is sent
  if (config.method === 'post') {
    config.data = querystring.stringify(config.data);
  }
  return config;
}, (error) => {
  // Do something with request error
  return Promise.reject(error);
});

 function getJsonp(url, params) {
  return new Promise((resolve, reject) => {
    if (params) {
      if (url.indexOf('?') !== -1 ) {
        url += '&' +querystring.stringify(params);
      }else{
        url += "?" +querystring.stringify(params);
      }
    }
    jsonp(url, params, (err, data)=>{
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}


export { axios, getJsonp };
