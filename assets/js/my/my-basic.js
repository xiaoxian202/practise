$(function() {
    //获取表单数据
    var form = layui.form
    // 调用接口，获取用户信息
    $.ajax({
        type:'get',
        url:"my/userinfo",
        success:function(res) {
            if(res.status === 0) {
                form.val('basicForm',res.data)
            }
        }

    })

    //修改用户信息
    $('.layui-form').submit(function(e) {
        e.preventDefault()
        //获取表单数据
        // serializeArray获取的是个数组
        var fd = $(this).serializeArray()
        //遍历筛选
        fd = fd.filter(function(value) {
            return value.name !== 'username'
        })
        //通过接口提交数据
        $.ajax({
            type:'post',
            url:'my/userinfo',
            data:fd,
            success:function(res) {
                if(res.status === 0) {
                    layer.msg(res.message)
                }
            }
        })
    })
    
})