$(function() {

    var options = {
        aspectRatio: 1,
        preview: '.img-preview',
    }

    var $image = $('#image');
    $image.cropper(options);
    $('#file').on('change', function(e) {
        let filelist = e.target.files;
        if (filelist.length === 0) {
            layui.layer.msg('请选择照片');
        }
        // console.log('dalala');
        // 1. 拿到用户选择的文件
        let file = e.target.files[0];

        // console.log(file);

        // 2. 将文件转化为路径
        let imgURL = URL.createObjectURL(file);
        // console.log(imgURL);

        // 3. 重新初始化裁剪区域
        $image.cropper('destroy')
        $image.attr('src', imgURL)
        $image.cropper(options);
    })
    $('#upload').on('click', function(e) {
        e.preventDefault();
        $('#file').click();
    })
    $('#sureAvatar').on('click', function() {
        // 1. 拿到用户裁剪之后的头像
        var dataURL = $image.cropper('getCroppedCanvas', {
                // 创建一个Canvas画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png'); // 将Canvas画布上的内容，转化为base64格式的字符串
        // 验证是否成功传化为  base64  格式 
        // console.log(dataURL);
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL,
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更换头像失败');
                }
                layui.layer.msg('更换头像成功');
                window.parent.getUserInfo();
            }
        })
    })
})