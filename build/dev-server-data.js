/**
 * Created by jianghaiyang807 on 2017/1/17.
 * mock数据
 */

const mockData = require('../mock');

module.exports = function (app) {

  mockData.forEach((item) => {
    item.apis.forEach((sub) => {
      app.all(sub.url, (req, res) => {
        req.get('origin')?res.setHeader('Access-Control-Allow-Origin', req.get('origin')):'';
        // req.get('origin')?res.setHeader('Access-Control-Allow-Origin','*'):'';
        res.setHeader('Access-Control-Allow-Methods', 'DELETE,GET,HEAD,POST,PUT,OPTIONS,TRACE');
        res.setHeader("Access-Control-Allow-Headers", "X-Custom-Header,accept, Content-Type");
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Content-Type', 'application/json;charset=UTF-8');
        res.status(200).send(sub.data);
      });
    });
  });

};
