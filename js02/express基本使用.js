//npm i express 进行安装express框架

//引入 express
const { request, response } = require('express');
const express=require('express');
//创建应用对象 
const app=express();
//创建路由规则    request 是对请求报文的封装   response是对响应报文的封装
app.get('/',(request,response)=>{
    //设置简单的相应
    response.send('hello express');
});
// 监听端口启动服务
app.listen(8000,()=>{
    console.log('服务已经启动，8000端口监听中...');
});
//在终端  输入node 文件.js  (这里就是  node express基本使用.js)，然后执行
//，点击浏览器输入端口  127.0.0.1:8000