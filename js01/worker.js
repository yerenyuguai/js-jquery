function fibonacci(n){
   return n<=2?1:fibonacci(n-1)+fibonacci(n-2);//三目运算符，n<=2的话就为1，否则，满足f(n)=f（n-1）+f(n-2)
}
var onmessage=function(event){
    var number=event.data;
    console.log('分线程接受到主线程发送的数据'+number);
    //计算部分写在这里
    var result=fibonacci(number);
    postMessage(result);
    console.log('分线程向主线程返回的数据'+result);

}