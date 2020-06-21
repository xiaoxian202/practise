$(function() {
    //表单验证
    var form = layui.form
    form.verify({
        uname:[/^[\S]{6,8}$/,'用户名必须6到8位，且不能出现空格'],
        pwd:function(value) {
            var reg = /^\d{6}$/
            if(!reg.test(value)) {
                return '密码必须是6位数字'
            }
        },
        same:function(value) {
            //获取密码
            var valPwd = $('#add-form input[name="password"]').val()
            if(valPwd !== value) {
                return '两次输入的密码不一致'
            }

        }
    })
    //调用接口监听登录提交事件
    $('#load-form').submit(function (e) {
        //阻止默认
        e.preventDefault()
        //获取表单数据
        var formData = $(this).serialize()
        $.ajax({
            type:'post',
            url:'api/login',
            data:formData,
            success:function(res) {
                console.log(res);
                if(res.status === 0) {
                    //添加一个标识
                    localStorage.setItem('mytoken',res.token)
                    // 提示
                    layer.msg(res.message)
                    //跳转到主页
                    location.href = 'index.html'
                    //清空输入框
                    e.target.reset()
                }else {
                    // 提示
                    layer.msg(res.message)
                }
            }
        })
    })

    //控制注册表单提交
    $('#add-form').submit(function(e) {
        e.preventDefault()
        var fd = $(this).serialize()
        $.ajax({
            type:'post',
            url:'api/reguser',
            data:fd,
            success:function(res) {
                console.log(res);
                if(res.status === 0) {
                    layer.msg(res.message)
                    
                    $('#add-form .links').click()
                }else {
                    layer.msg(res.message)
                }
            }
        })
    })

    // //点击登录表单底部连接，自身隐藏，注册显示
    $('#load-form .links').click(function() {
        $('#load-form').hide()
        $('#add-form').show()
    })
    //点击注册表单下面链接，自身隐藏，注册显示
    $('#add-form .links').click(function() {
        $('#add-form').hide()
        $('#load-form').show()
    })
})