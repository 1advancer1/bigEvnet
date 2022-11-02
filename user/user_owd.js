$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '昵称必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            if (value == $('[name=pwd]').val()) {
                return '新旧密码不能一致';
            }
        },
        rePwd: function(value) {
            if (value != $('[name=newPwd]').val()) {
                return '两次密码不一致';
            }
        }
    })
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新密码失败');
                }
                layer.msg('更新密码成功');
                // 重置表单
                $('#reset').click();
            }
        })
    })
})