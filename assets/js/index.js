$(function() {
    getUserInfo();
    $("#logout").on('click', function(e) {
        e.preventDefault();
        layui.layer.confirm('确定退出登录', { icon: 3, title: '提示' }, function(index) {
            // 1.清除tocken
            localStorage.removeItem('token');
            // 2. 跳转到登录页面
            location.href = '/login.html';
            // 关闭提示框
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败');
            }
            // 调用renderAvatar函数渲染用户头像
            renderAvatar(res.data);
        }
    })
}

function renderAvatar(userdata) {
    // 1. 获取用户的名称
    let name = userdata.nickname || userdata.username;
    // 2. 设置欢迎词
    $('#welcome').html('欢迎' + name);
    // 3.1 渲染图片头像
    if (userdata.user_pic !== null) {
        $('.layui-nav-img').attr('src', userdata.user_pic).show();
        $('.text-avatar').hide();
    } else {
        let first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
        $('.layui-nav-img').hide();
    }
}