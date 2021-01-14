$(function () {
    //点击切换登录注册
    $('#link_reg').on('click', function () {
        $('.reg-box').show().siblings('.login-box').hide()
    });
    $('#link_login').on('click', function () {
        $('.login-box').show().siblings('.reg-box').hide()
    });
    //自定义表单验证正则
    var form = layui.form;
    var layer = layui.layer;
    // console.log(form);
    form.verify({
        // 自定义pwd类严重
        pwd: [/^[\S]{6,16}$/, '密码必须6到16位，且不能包含空格'],
        repwd: function (value) {
            var val = $('.reg-box [name=password]').val();
            if (value !== val) {
                return '两次密码必须一致'
            }
        }

    });
    // 提交表单事--发送注册请求
    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('.reg-box  [name=username]').val(),
            // username: 'taotao',
            password: $('.reg-box  [name=password]').val()
            // password: '123456'
        }
        $.post('/api/reguser', data, function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录');
            $('#link_login').click();
        })
    });
    // 点击登录事件
    $('#form-login').on('submit', function (e) {
        e.preventDefault();
        $.post('/api/login', $(this).serialize(), function (res) {
            if (res.status !== 0) {
                layer.msg(res.message)
            }
            layer.msg(res.message)
            localStorage.setItem('token', res.token);
            location.href = 'index.html'
        })
    })

})