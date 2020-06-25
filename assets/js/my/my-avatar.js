$(function() {
    //获取裁剪区域的 DOM 元素
    var $image = $('#image')
    //配置项
    var options = {
        //纵横比
        aspectRatio:1,
        preview: '.img-preview'
    }
    // 创建裁剪区域
    $image.cropper(options)

    //触发点击事件
    $('#upload').click(function() {
        $('#fileUp').click()
    })

    //change事件
    $('#fileUp').change(function(e) {
        //拿到用户选择的文件
        var file = e.target.files[0]
        //把文件转化成url地址
        var imgURL = URL.createObjectURL(file)

        $image.cropper('destroy') //销毁原来的裁剪区
            .attr('src',imgURL)   //改变图片路径
            .cropper(options)     //创建新的裁剪区域
    })

    //点击确定按钮，改变头像
    $('#btnOk').click(function() {
        //获取裁剪后的图片信息
        var imgData = $image.cropper('getCroppedCanvas',{
            width:100,
            height:100
        })//toDataURL:把画布上的内容转化成base64字符串
        .toDataURL('image/png')

        //调用接口，上传数据
        $.ajax({
            type:'post',
            url:'my/update/avatar',
            data:{
                avatar:imgData
            },
            success:function(res) {
                if(res.status === 0) {
                    layer.msg(res.message)
                    //刷新页面
                    window.parent.$.loadUserInfo()
                }
            }
        })
    })

})