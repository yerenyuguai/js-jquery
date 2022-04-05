(function(){
     //函数外看不到msg，他是私有的属性
     var msg="Hello World"
     //操作数据的函数
     function doSomething(){
         console.log('doSomething() '+msg.toUpperCase());//让msg的单词都变为大写
     }
     function doOtherthing(){
         console.log('doOtherthing() '+msg.toLowerCase());//让msg的单词都变为小写
     }
     //把要暴露的属性变为window的属性，给外部使用的方法
    window.myMdoule1={
        doSomething:doSomething,
        doOtherthing:doOtherthing
    }
})();//立即执行函数 