const { request, response } = require('express');
const express=require('express');
const app=express();

app.get('/home',(request,response)=>{
    //响应一个页面
    response.sendFile(__dirname+'/index.html');
})

app.get('/data',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    response.send('用户数据')
})

//设置监听端口  上一个server文件端口是8000，这里就不能再用8000
app.listen(9000,()=>{
    console.log('ok');
})

//JSONP服务
app.all('/jsonp-server',(request,response)=>{
    //★★★★★   send（）里装的也是js代码
    //  因为scpript请求返回的内容不是js语句的话  比如我们想输出hello Jsonp，返回的是hello Jsonp，
    //而这句话 js引擎解析不了，需要加上对应的js语句才能解析
   //   response.send('console.log("hello Jsonp")');

   const data={
    name:'sup'
   }
   //将数据转化为字符串
   let str=JSON.stringify(data);
   //返回结果
   response.end(`handle(${str})`);//相比send，end的话不会添加特殊响应头  ,  `在键盘tab上面
})

//用户名检测是否存在  jsonp实践中的    默认已经存在
app.all('/check-username',(request,response)=>{
   const data={
    exist:1,
    msg:'用户名已存在'
   }
   //将数据转化为字符串
   let str=JSON.stringify(data);
   //返回结果
   response.end(`f1(${str})`);//相比send，end的话不会添加特殊响应头  ,  `在键盘tab上面
})
//jquery-server  jsonp实践中的    默认已经存在
app.all('/jquery-jsonp-server',(request,response)=>{
    const data={
     name:'Shao Yuhe',
     sex:'男',
     city:['北京','烟台','杭州']
    }
    //将数据转化为字符串
    let str=JSON.stringify(data);
    //接受callback参数  
    let cb=request.query.callback
    //返回结果
    response.end(`${cb}(${str})`); 
    //相比send，end的话不会添加特殊响应头  ,  `在键盘tab上面 
 })

 //CORS   设置CORS响应头实现跨域
 app.all('/cors-server',(request,response)=>{
     //设置响应头，才能实现跨域，前面段就是设置响应头
     response.setHeader('Access-Control-Allow-Origin','*');//* 表示通配  ，所有网页端口都可以
     //，指向某一个就可以  response.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:5500');
     //  上一行就代表只允许5500端口使用
     response.setHeader('Access-Control-Allow-Headers','*');//头
     response.setHeader('Access-Control-Allow-Method','*');//方法可以随意
     response.send('hello CORS');
 })
