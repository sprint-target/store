const http = require('http');
const fs = require('fs');
const url = require('url');
// 创建服务器
http.createServer( function (req, res) {  
   // 解析请求，包括文件名
   let pathname = '';
   if(url.parse(req.url).pathname == '/'){
       pathname = 'public/index.html'
   }else{
    pathname = 'public' + url.parse(req.url).pathname;
   }
   // 输出请求的文件名
   console.log("req for " + pathname + " received.");
   // 从文件系统中读取请求的文件内容
   fs.readFile(pathname.substr(0), function (err, data) {
      if (err) {
         console.log(err);
         // HTTP 状态码: 404 : NOT FOUND
         // Content Type: text/html
         res.writeHead(404, {'Content-Type': 'text/html'});
      }else{             
         // HTTP 状态码: 200 : OK
         // Content Type: text/html
         res.writeHead(200, {'Content-Type': 'text/html'});       
         // 响应文件内容
         res.write(data.toString());        
      }
      //  发送响应数据
      res.end();
   });   
}).listen(3000);
// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:3000/');