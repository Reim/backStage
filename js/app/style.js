var SITEURL="http://test2.tirunidea.com/";
var BASE_URL = SITEURL;  
const urls = {
    // index_url:'http://test2.tirunidea.com/shenju_comic/',
    index_url: SITEURL,
}
$(function(){
    $.fn.extend({
        animateCss: function(animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            $(this).addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
        }
    });
    /**字数控制***/
    var GetLength = function (str) {
        ///<summary>获得字符串实际长度，中文2，英文1</summary>
        ///<param name="str">要获得长度的字符串</param>
        var realLength = 0, len = str.length, charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) realLength += 1;
            else realLength += 2;
        }
        return realLength;
    };

    function cutstr(str, len) {
        var str_length = 0;
        var str_len = 0;
        str_cut = new String();
        str_len = str.length;
        for (var i = 0; i < str_len; i++) {
            a = str.charAt(i);
            str_length++;
            if (escape(a).length > 4) {
                //中文字符的长度经编码之后大于4  
                str_length++;
            }
            str_cut = str_cut.concat(a);
            if (str_length >= len) {
                str_cut = str_cut.concat("...");
                return str_cut;
            }
        }
        //如果给定字符串小于指定长度，则返回源字符串；  
        if (str_length < len) {
            return str;
        }
    }
    function load(){
        mirror();
        thumb();
        deleteThumb();
        navAnime();
    }

    function navAnime(){
     //右侧导航nav
        var heightUl = [];
        $('.nav').each(function(i){
            var ulH = $($('.nav').eq(i).find('ul')).height();      
            heightUl.push(ulH); 
        })
        $('.nav').find('ul').css('height','0');
        $('.nav').find('p').on('click',function(){
            $('.nav').find('ul').stop().animate({
                'height':'0',
            },500,function(){
                $(this).hide();
            })
            var index_ = $(this).parent().index();
            $(this).parent().find('ul').show().stop().animate({
            'height':heightUl[index_],
            },500)
            
        })
        $('.nav').each(function(i){
            var lis = $(this).find('ul li');
            $(lis).each(function(j){
                $(this).click(function(){
                    var src = $(this).attr('data-src');
                    $('#iframe_con').attr('src',src);
                    // var mainheight = $('#iframe_con').contents().find(".content").height()+100;
                    // $('#iframe_con').height(mainheight);                
                })
            })

        })
    }
    var windowH = $(window).height();
    $('nav').css({
        'min-height':windowH-62
    })

    $('input[type=file]').each(function(i){
        $(this).attr('id','inputFile'+i)
    })
    //放大预览
    function mirror(){
        // $('.mirror').click(function(){    
        $('.thumbHide').on('click','.mirror',function(){
            var picSrc = $(this).parent().parent().find('img').attr('src');   
            var thumbBox = window.parent.document.getElementById('thumbBox'); 
            $(thumbBox).css('display','block');
            $(thumbBox).find('img').attr('src',picSrc);
            $(thumbBox).find('.close').click(function(){
                $(thumbBox).css('display','none');
            })
        })  
    }
    //缩略图
    function thumb(){
        $('.thumb').click(function(){     
            var picSrc = $(this).attr('src'); 
            var thumbBox = window.parent.document.getElementById('thumbBox'); 
            $(thumbBox).css('display','block');
            $(thumbBox).find('img').attr('src',picSrc);
            $(thumbBox).find('.close').click(function(){
                $(thumbBox).css('display','none');
            })
        })  
    }
    //删除缩略图
    function deleteThumb(){
        $('.thumbHide').on('click','.cancel',function(){
            var msg = "您真的确定要删除吗？\n\n请确认";
                var _this = $(this);
                console.log(_this);
            if (confirm(msg)==true){
                var dataurl = $(this).attr('data-url');
                $.ajax({
                    url:dataurl,
                    success:function(data){
                        if(data.status == '1'){
                            $(_this).parent().parent().remove();
                            console.log(data)
                        }else{
                            alert('删除失败')
                        }
                    }
                })  
            }else{
                return false;
            }
        })      
    }
    load();
  
});

    function fileChange(source){
        console.log(source)
        
        var na = $(source).val();
        console.log(na+'2')
        var arr = na.split('\\');
        var my = arr[arr.length-1]
        $(source).parent().parent().find('.fileName').val(my);    

    }
 
     
          
        