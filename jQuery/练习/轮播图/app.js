/*
功能说明:
1.点击向右(左)的图标，平滑切换到下(上)一页
2.无限循环切换:第一-页的上一页为最后页，最后一页的下一页是第一页
3.每隔1s 自动滑动到下一-页
4.当鼠标进入图片区域时， 自动切换停止，当鼠标离开后，又开始自动切换
5.切换页面时，下面的圆点也同步更新
6. 点击圆点图标切换到对应的页
*/
//写成外部js文件，保证这里的代码是在页面加载完成后实现，也不会污染主页面
$(function () {
    var $container = $('#container');
    var $list = $('#list');
    var $points = $('#pointsDiv>span');
    var $prev = $('#prev');
    var $next = $('#next');
    var PAGE_WIDTH = 600;//每张图片固定大小
    var TIME = 400;//翻页的持续时间
    var ITME_time = 20;//单元移动的间隔时间
    var imgCount = $points.length;
    var index=0;//当前下标
    var moving=false;//表示翻页的状态，false是没有处于翻页中状态

    //点击向右(左)的图标，平滑切换到下(上)一页
    $next.click(function () {
        //平滑翻到下一页
        nextPage(true);
    })
    $prev.click(function () {
        //平滑翻到上一页
        nextPage(false);
    })


    //每隔三秒自动滑动到下一页面
    var timeid = setInterval(function () {
        nextPage(true);
    }, 1000)


    //当鼠标进入图片区域时， 自动切换停止，当鼠标离开后，又开始自动切换
    $container.hover(function () {
        //清除定时器
        clearInterval(timeid);
    }, function () {
        //重新再次启动计时器
        timeid = setInterval(function () {
            nextPage(true)
        }, 1000)
    })

    //定义函数  //true为下一页，false为上一页
    function nextPage(next) {

        //   var currleft=$list.position().left
        //  var offset=next?-PAGE_WIDTH:PAGE_WIDTH;  next为负，就-PAGE_WIDTH
        //   $list.css('left',currleft+offset);
        //上面是立刻跳到下一页

        // offset 总的偏移量
        // TIME  总的时间
        //单元移动间隔时间   ITME_time
        //单元移动的偏移量   itemoffsrt=offset /(TIME/ITME_time)

 
        //如果正在翻页，则直接结束           ★★★★★★★★★★★
        if(moving){//表示已经处于翻页状态中
            return;
        }
        moving =true;//表示正在翻页


        //启动循环计时器不断更新$list的left,到达目的地停止计时器
        var offset = 0;
        //判断参数是否是布尔值
        if(typeof next==='boolean'){
            //计算offse
        offset = next ? -PAGE_WIDTH : PAGE_WIDTH;
        }else{
            offset=-(next-index)*PAGE_WIDTH
        }
        
        //计算itemoffset  
        var itemoffsrt = offset / (TIME / ITME_time);
        //得到当前的left值 
        var currleft = $list.position().left
        //计算目标的left值
        var targetleft = currleft + offset;
        //  启动循环计时器不断更新$list的left,到达目的地停止计时器
        var intervarId = setInterval(function () {
            currleft += itemoffsrt;  //不断累加,计算出最新的currleft

            //判断是否达到目标
            if (currleft === targetleft) {
                //清除定时器
                clearInterval(intervarId);
                //如果到达了最右边的图片（img/15.jpg）,跳转到最左边的第二张  （img/15.jpg）

                //标识翻页停止
                moving=false;

                if (currleft === -(imgCount + 1) * PAGE_WIDTH) {
                    currleft = -PAGE_WIDTH;
                } else if (currleft === 0) {
                    //如果到达最左边的图片（"img/波吉鼠.jpg"）,则跳转到最右边的第二章（"img/波吉鼠.jpg"
                    currleft = -imgCount * PAGE_WIDTH
                }
            }
            $list.css('left', currleft);//将最新的currleft设置进去
        }, ITME_time)
        //更新原点  
    updatePoints(next);
    }
    
    function updatePoints(next) {
        //计算出目标原点targetIndex的下标
        var targetIndex = 0;
        //判断参数是否是布尔值
        if(typeof next==='boolean'){
            if (next) {
                //下一张
                targetIndex = index + 1;//因为放入了七个图片  所以范围[0,imgcount-1]
                if (targetIndex === imgCount) {//第一个原点
                    targetIndex = 0;
                }
            } else {
                targetIndex = index - 1;
                if (targetIndex === -1) {//第五个原点
                    targetIndex = imgCount - 1;
                }
            }
        }else{
            targetIndex=next;
        }
       

        //将当前index的<span>的class移出  就是这个on
        $points.eq(index).removeClass('on')
        //给目标原点添加class 就是这个on
        $points[targetIndex].className = 'on'
        //将index更新为targetIndex
        index = targetIndex;
    }

    //6. 点击圆点图标切换到对应的页
    $points.click(function(){
        //计算目标页面的下标
        var targetIndex=$(this).index();
        //当点击的不是当前页面的下标才会翻页
        if(targetIndex!=index){
            nextPage(targetIndex)
        }
    })
})