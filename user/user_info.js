$(function() {
    var form = layui.form;

    form.verify({
        nickname: [
            /^[\S]{6,12}$/, '昵称必须6到12位，且不能出现空格'
        ],
    })
    initUserInfo();
    $('#reset').on('click', function(e) {
        e.preventDefault();
        initUserInfo();
    })

    // 监听表单提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('更新用户信息失败');
                }
                layui.layer.msg('更新用户信息成功');
                // 更新完成用户信息后，重新渲染 头像 和 昵称
                window.parent.getUserInfo();
            }
        })
    })
})

function initUserInfo() {
    let form = layui.form;

    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败');
            };
            // console.log(res);
            form.val('formUserInfo', res.data);
            // 下面代码是为了获取 form 中的值
            // console.log(form.val('formUserInfo'));
        }
    })
}