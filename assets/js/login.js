$(function() {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
            $('.login-box').hide();
            $('.reg-box').show();
        })
        // 点击“去登录”的链接
    $('#link_login').on('click', function() {
        $('.reg-box').hide();
        $('.login-box').show();
    })
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须是6-12位，且不能出现空格'],
        repwd: function(value) {
            let pwd = $('.reg-box [name=password]').val();
            if (value != pwd) {
                return "两次密码不一致";
            }
        }
    })
    $('.form_reg').on('submit', function(e) {
        // 1. 组织默认行为的提交
        e.preventDefault();
        // 2. 发起ajax请求
        // 2.1 组织数据
        let data = {
                username: $('.form_reg [name=username]').val(),
                password: $('.form_reg [name=password]').val(),
            }
            // 2.2 发起请求
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg('注册失败，请重新注册');
            };
            layer.msg('注册成功');
            $('#link_login').click();
        })
    })
    $('.form_login').on('submit', function(e) {
        // 1. 默认行为的提交
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: {
                username: $('.form_login [name=username]').val(),
                password: $('.form_login [name=password]').val(),
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败');
                }
                layer.msg('登录成功。欢迎来到大事件');
                // 将res中的令牌存放到当前浏览器数据中
                localStorage.setItem('token', res.token);
                // 跳转到后台主页
                location.href = '/index.html';
            }
        })
    })
})