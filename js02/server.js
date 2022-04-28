
//js修改之后一定要重启服务，在终端重新打开
//在终端  输入node 文件.js  (这里就是  node server.js)，然后执行


const { request, response, json } = require('express');//自动生成
//引入 express
const express=require('express');
//创建应用对象 
const app=express();
//创建路由规则    request 是对请求报文的封装   response是对响应报文的封装   
//app.get  适合get的请求方式
app.get('/server',(request,response)=>{
    //设置响应头  设置允许跨域，所有类型的头信息都可以接受
    response.setHeader('Access-Control-Allow-Origin','*');
    //设置响应体
    response.send('hello AJAX GET');
});
//app.post  适合post的请求方式
app.post('/server',(request,response)=>{
    //设置响应头
    response.setHeader('Access-Control-Allow-Origin','*');
    //设置相应体
    response.send('hello AJAX POST');
});
//app.all  适合所有的请求方式
app.all('/server',(request,response)=>{
    //设置响应头
    response.setHeader('Access-Control-Allow-Origin','*');
     //设置自定义的响应头  这样可以自定义，这样所有的头信息都可以接受，包括自定义
     response.setHeader('Access-Control-Allow-Headers','*');//  *表示所有类型的头信息都可以接受
    //设置相应体
    response.send('hello AJAX');
});
//app.all  适合所有的请求方式   /JSON-server 端口发
app.all('/JSON-server',(request,response)=>{
    //设置响应头
    response.setHeader('Access-Control-Allow-Origin','*');
     //设置自定义的响应头  这样可以自定义
     response.setHeader('Access-Control-Allow-Headers','*');//  *表示所有类型的头信息都可以接受

     //响应一个数据  把这个data返回给客户端浏览器
     const data={
         name:"拐子是送财童子",
         age:19
     }
    //因为send()只能接受字符串和Buffer (buffer缓冲区，专门存储二进制数据，用法与数组类似)
    //所以需要将对象进行字符串转化  转换为json格式
    let str=JSON.stringify(data);

    //设置相应体，将响应数据传递出去
    response.send(str);
});


//针对ie缓存的规则
app.get('/ie',(request,response)=>{
    //设置响应头
    response.setHeader('Access-Control-Allow-Origin','*');
    //设置响应体
    response.send('hello IE-2');
});

//针对延时响应网络异常的规则
app.get('/delay',(request,response)=>{
    //设置响应头
    response.setHeader('Access-Control-Allow-Origin','*');
    //添加一个定时器
    setTimeout(function(){
        response.send('延时响应');
    },3000);
    //    setTimeout(()=>{            =>是ES6的箭头函数，相当于匿名函数
    //         response.send('延时响应');
    //    },3000);
});

//JQuery服务  get
app.get('/jquery-server',(request,response)=>{
    //设置响应头
    response.setHeader('Access-Control-Allow-Origin','*');
    //设置自定义响应头
    response.setHeader('Access-Control-Allow-Headers','*');//  *表示所有类型的头信息都可以接受
   //response.send('hello jQuery')
   const data={name:'tom'};
   //将上面的转化为json文件
   response.send(JSON.stringify(data));
});

//JQuery服务  post
app.post('/jquery-server',(request,response)=>{
    //设置响应头
    response.setHeader('Access-Control-Allow-Origin','*');
   response.send('hello jQuery')
});


//axios服务  all
app.all('/axios-server',(request,response)=>{
    //设置响应头
    response.setHeader('Access-Control-Allow-Origin','*');
    //设置自定义响应头
    response.setHeader('Access-Control-Allow-Headers','*');//  *表示所有类型的头信息都可以接受
   //response.send('hello jQuery')
   const data={name:'jack'};
   //将上面的转化为json文件
   response.send(JSON.stringify(data));
});


//fetch()  all
app.all('/fetch-server',(request,response)=>{
    //设置响应头
    response.setHeader('Access-Control-Allow-Origin','*');
    //设置自定义响应头
    response.setHeader('Access-Control-Allow-Headers','*');//  *表示所有类型的头信息都可以接受
   //response.send('hello jQuery')
   const data={name:'jack'};
   //将上面的转化为json文件
   response.send(JSON.stringify(data));
});


// 监听端口启动服务
app.listen(8000,()=>{
    console.log('服务已经启动，8000端口监听中...');
});
//在终端  输入node 文件.js  (这里就是  node server.js)，然后执行
//，点击浏览器输入端口  http://127.0.0.1:8000/server    因为app.get('/server',(request,response)  里面加了server



//  安装nodemon自动重启工具就不必这么麻烦了  在终端  输入npm install -g nodemon
//这样就不必每次关闭端口重新启动，直接终端输入
//在终端  输入 nodemon 文件.js  (这里就是  nodemon server.js)，然后执行
// 但是我这个电脑需要管理员权限所以  需要在前面加上npx 即为  npx nodemon server.js