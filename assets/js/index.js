$(function() {
    var mytoken = localStorage.getItem('mytoken')
    //判断
    if(!mytoken) {
        //不存在，调转到登录页面
        location.href = 'login.html'
    }

    //调用接口获取用户信息
    function loadUserInfo() {
        $.ajax({
            type:'get',
            url:'my/userinfo',
            success:function(res) {
                if(res.status === 0) {
                    var info = res.data
                    //填充页面数据                  
                    $('#welcome-log').html(info.username)
                    $('#welcome-load').html(info.username)
                    //判断 如果有图片
                    if(info.user_pic) {
                        //删除div
                        $('#welcome-log,#welcome-load')
                        .parent()
                        .siblings('div')
                        .remove()
    
                        //添加img
                        // <img src="http://t.cn/RCzsdCq" class="layui-nav-img">
                        $('#welcome-log,#welcome-load')
                        .parent()
                        .parent()
                        .find('img')
                        .remove()
                        .end()
                        .prepend('<img src="'+info.user_pic+'">')
                    }else {
                        // 显示div
                    }
                }
            }
        })
    }
    loadUserInfo()

    //退出功能
    $('#logout-btn').click(function() {
        // 询问
        layer.confirm('确认要退出吗?', {icon: 3, title:'提示'}, function(index){
            // 实现退出的功能：清除token,跳转到登录页面
            localStorage.removeItem('mytoken')
            // 关闭弹窗
            layer.close(index)
            // 跳转到登录页面
            location.href = './login.html'
          })
        
    })
})