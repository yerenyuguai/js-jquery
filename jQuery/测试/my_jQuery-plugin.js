//     
//     需求:
// 1.给$添加4个工具方法:
//  min(a, b) :返回较小的值
//  max(c, d) :返回较大的值
//  leftTrim() :去掉字符串左边的空格
//  rightTrim() :去掉字符串右边的空格
// 2.给jQuery对象 添加3个功能方法:
//  checkALl() :全选
//  unCheckALL() :全不选
//  reverseCheck() :全反选
//  
(function(){
    //扩展$工具的方法
    $.extend({
        min:function(a,b){
            return a<b?a:b;
        },
        max:function(a,b){
            return a>b?a:b;
        },
        leftTrim:function(str){
            return str.replace(/^\s+/,'')//^ 开头  \s+ 一个或多   以多个空格开头
        },
        rightTrim:function(str){
            return str.replace(/\s+$/,'')//$ 结尾  \s+ 一个或多个
        }
    })

    //扩展jQuery对象的方法
    $.fn.extend({
        checkAll:function(){
            this.prop('checked',true);//this是jQuery
        },
        uncheckAll:function(){
            this.prop('checked',false);
        },
        reservecheck:function(){
            //this是jQuery
            this.each(function(){
                //this是DOM元素
                this.checked=!this.checked;
            })
        }
    })
})()