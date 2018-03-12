$(function(){

	$('.imagesUpload').each(function(){
		var em=$(this);
		add_webuploader(em);
	})
	function add_webuploader(em){
		// 初始化Web Uploader
		var id=em.find('.file1').attr('id'); //id
		var s=em.find('.file1').attr('data-s'); //上传几张
		var dataType=em.find('.file1').attr('data-param');  //自定义参数的健值
		//var dataType2=em.find('.file1').attr('data-param2');  //自定义参数的值
		if (dataType) {
			var dataType1=JSON.parse(dataType);
		};
		// console.log(typeof(dataType3))
		// console.log(dataType3)
		var url=em.find('.file1').attr('data-url'); //地址
		var uploader = WebUploader.create({

		    // 选完文件后，是否自动上传。
		    auto: true,

		    // swf文件路径
		    swf:'js/lib/Uploader.swf',

		    // 文件接收服务端。
		    server: url,
		    // formData:{
		    	// dataType1:dataType2
		    // },
		    formData:dataType1,
		    // 选择文件的按钮。可选。
		    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
		    pick: '#'+id+'',
		    fileNumLimit:s,
		    // fileNumLimit : 1, 
		    // 只允许选择图片文件。
		    accept: {
		        title: 'Images',
		        extensions: 'gif,jpg,jpeg,bmp,png',
		        mimeTypes: 'image/jpg,image/jpeg,image/png'
		    }
		});
		// attach
		//当有文件添加进来的时候
		uploader.on('fileQueued', function( file ) {
		    var $li = $(
		            '<div id="' + file.id + '" class="file-item fl thumbnail">' +
						'<img>' +
						'<div class="hide thumbHide">'+
							'<span class="cancel" data-url=""></span>'+
							'<span class="mirror"></span>'+
						'</div>'+
		            '</div>'
		            ),
		        $list = $("#fileList"),
		        $img = $li.find('img');

		    // $list为容器jQuery实例
		    $list.append( $li );
			// $li.on('mouseenter', function() {
            //     $(this).find('.thumbHide').show().stop().animate({height: '25%'},500);
			// });		
			// $li.on('mouseleave', function() {
            //     $(this).find('.thumbHide').stop().animate({height: '0'},500,function(){$(this).hide()});
            // });	
			// 删除
			deleteThumb_prev();
			// 预览
			mirror();
		    // 创建缩略图
		    // 如果为非图片文件，可以不用调用此方法。
		    // thumbnailWidth x thumbnailHeight 为 100 x 100
		    uploader.makeThumb( file, function( error, src ) {
		        if ( error ) {
		            $img.replaceWith('<span>不能预览</span>');
		            return;
		        }
		        $img.attr( 'src', src );
		        // $('.genren_tou img').attr( 'src', src );
		        // 单张图片可以从这输出
		    }, 100, 100 );
		});
		// 文件上传过程中创建进度条实时显示。
		uploader.on('uploadProgress', function( file, percentage ) {
		    var $li = $( '#'+file.id ),
		        $percent = $li.find('.progress span');

		    // 避免重复创建
		    if ( !$percent.length ) {
		        $percent = $('<p class="progress"><span></span></p>')
		                .appendTo( $li )
		                .find('span');
		    }

		    $percent.css( 'width', percentage * 100 + '%' );
		});

		// 文件上传成功，给item添加成功class, 用样式标记上传成功。 写入页面
		uploader.on('uploadSuccess', function( file,data ) {
		    $( '#'+file.id ).addClass('upload-state-done');
		    $('#'+file.id+' img').attr('src',data.data.alias);
		    $('#'+file.id).append('<input type="hidden"  name="hash_data[]" value="'+data.data.hash+'">');
		    // $('.yincangdepic').html(data.path);'<li><i class="iconfont">&#xe6a1;</i><img class="w100" src="'+url+'/'+data.path+'" alt=""><div class="yincangdepic1 hide"><input type="text" value="'+data.path+'"></div></li>'
		});
		// 文件上传失败，显示上传出错。
		uploader.on('uploadError', function( file ) {
		    var $li = $( '#'+file.id ),
		        $error = $li.find('div.error');

		    // 避免重复创建
		    if ( !$error.length ) {
		        $error = $('<div class="error"></div>').appendTo( $li );
		    }           

		    $error.text('上传失败');
		});

		// 完成上传完了，成功或者失败，先删除进度条。
		uploader.on( 'uploadComplete', function( file ) {
		    $( '#'+file.id ).find('.progress').remove();
		});
	}
	function deleteThumb_prev(){
		$('.thumbHide').on('click','.cancel',function(){
			$(this).parent().parent().remove();
		})		
	}
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
});