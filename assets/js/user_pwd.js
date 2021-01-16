$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        Pwd: [/^[\S]{6,16}$/, '密码长度为6-16位且不能用空格'],
        newPwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同';
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不同';
            }
        }
    })

    //修改密码
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改失败');
                };
                layer.msg('修改成功');
                $('.layui-form')[0].reset();
            }
        })
    })
})