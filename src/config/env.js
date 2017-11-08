import { isTest } from './index';

let api;

if (process.env.NODE_ENV === 'development' || isTest) {
  //  测试环境
  api.url1 = 'testUrl1.com';
  api.url2 = 'testUr12.com';
} else {
  // 生产环境
  api.url1 = 'prdUrl1.com';
  api.url2 = 'prdUrl2.com';
}

export default api;
