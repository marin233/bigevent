$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '请输入1-6位用户名'
            }
        }
    });
    initUserInfo()
    // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            headers: localStorage.getItem('token'),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('用户信息获取失败')
                }
                form.val('initUserInfo', res.data)
            }
        })
    };
    //重置按钮功能
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    });
    //提交按钮功能
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg('提交失败')
                };
                layer.msg('提交成功');
                window.parent.getuser();
            }
        })
    })
})

