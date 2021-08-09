const http = require('http');
const url = require('url');
const SQL = require('../mySQL');

function start(route) {
  function onRequest(request, response) {
    const { pathname, query } = url.parse(request.url);
    route && route(pathname);
    switch (pathname) {
      case '/map/list':
        var sql = 'SELECT * FROM emp';
        SQL.SELECT(sql, function (result) {
          onSuccess(response, result);
        });
        break;

      case '/map/query':
        var sql = 'SELECT * FROM emp WHERE ' + query.replace(/\s/g, '') + ' LIMIT 1';
        console.log('sql', sql);
        SQL.SELECT(sql, function (result) {
          onSuccess(response, result);
        });
        break;


        // {
        //   "empNo": 7000,
        //     "data": {
        //     "ENAME": "张三"
        //   }
        // }
      case '/map/update':
        var sql = 'UPDATE emp SET ';
        // 暂存请求体信息
        var body = '';

        // 每当接收到请求体数据，累加到post中
        request.on('data', function (chunk) {
          body += chunk;  // 一定要使用+=，如果body=chunk，因为请求favicon.ico，body会等于{}
        });

        // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
        request.on('end', function () {
          // 解析参数
          const bodyData = JSON.parse(body);  //将一个字符串反序列化为一个对象
          console.log('bodyData:', bodyData);
          const sqlUpdateArr = [];
          for (const key in bodyData.data) {
            sqlUpdateArr.push(key + '="' + bodyData.data[key] + '"');
          }
          sql = sql + sqlUpdateArr.join(',') + ' WHERE EMPNO=' + bodyData.empNo;
          console.log('sql', sql);
          SQL.UPDATE(sql, function (result) {
            console.log('result:', result);
            onSuccess(response, { code: 200, success: true, data: {} });
          });
        });
        break;
    }
  }

  http.createServer(onRequest).listen(8888);
  console.log('Server has started.');
}

function onSuccess(response, result) {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write(JSON.stringify(result));
  response.end();
}

exports.start = start;