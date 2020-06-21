/**
通用配置
 */
$(function() {
    var baseURL = 'http://www.liulongbin.top:3007/'
    //拦截器
    $.ajaxPrefilter(function(option) {
        //1.配置基准地址
        option.url = baseURL+option.url

        //2.请求头
        if(option.url.lastIndexOf('/my/') !== -1) {
            option.headers = {
                Authorization:localStorage.getItem('mytoken')
            }
        }
        
        //3.处理异常情况
        option.complete = function(res) {
            console.log(res);
            if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                //清除错误的tolen
                localStorage.removeItem('mytoken')
                //跳转到登录页
                location.href = 'login.html'
            }
        }
    })

})