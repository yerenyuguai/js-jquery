function myMdoule(){
    //函数外看不到msg，他是私有的属性
    var msg="Hello World"
    //操作数据的函数
    function doSomething(){
        console.log('doSomething() '+msg.toUpperCase());//让msg的单词都变为大写
    }
    function doOtherthing(){
        console.log('doOtherthing() '+msg.toLowerCase());//让msg的单词都变为小写
    }
    //向外暴露对象  给外部使用的方法
    return {
        doSomething:doSomething,//前者是属性名，后者是属性值
        doOtherthing:doOtherthing
    }
}