$(function() {
    //表单验证
    var form = layui.form
    form.verify({
        oldPwd:[/^[\S]{6}$/,'密码必须6位，且不能出现空格'],
        //新旧密码不能一样
        newPwd:function(value) {
            //获取旧密码
            var old = $('form input[name="oldPwd"]').val()
            if(value === old) {
                return '新旧密码不能一样'
            }
        },
        //新密码跟确认密码一致
        same:function(value) {
            //获取新密码
            var pwd = $('form input[name="newPwd"]').val()
            if(value !== pwd) {
                return '新旧密码不一致'
            }
        }
    })
    //提交事件
    $('form').submit(function(e) {
        //阻止默认行为
        e.preventDefault()
        //获取表单数据
        var formData = $(this).serialize()
        //调用接口，提交数据
        function loadRePwd() {
            $.ajax({
                type:'post',
                url:'my/updatepwd',
                data:formData,
                success:function(res) {
                    if(res.status === 0) {
                        layer.msg(res.message)
                        //清空输入框
                        var form = document.getElementsByTagName('form')[0];
                        form.reset()
                    }
                }
            })
        }
        loadRePwd()

    })  
})