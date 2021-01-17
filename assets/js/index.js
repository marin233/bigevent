$(function () {
    getuser();
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出？', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });

    })
})

// 获取用户信息
function getuser() {
    // var data = localStorage.getItem('token');
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers: {
        //     token: data,
        // },
        success: function (res) {
            if (res.status !== 0) {
                return '获取用户信息失败';
            }
            renderAvater(res.data);
        },

    })
};
function renderAvater(data) {
    //渲染用户名
    var name = data.nickname || data.username;
    $('#welcome').html('欢迎&nbsp&nbsp' + name);
    //渲染头像
    if (data.user_pic) {
        $('.layui-nav-img').attr('src', data.user_pic).show();
        $('.text-avater').hide();
    } else {
        $('.text-avater').show();
        $('.layui-nav-img').hide();
    }
}

// 发表文章后跳转到文章列表页面
// $('#demo').on('click', function () {
//     console.log('点击了');
// })
function toggleClassName() {
    console.log('跳转成功');
    $('#demo').addClass('layui-this').siblings('dd').removeClass('layui-this')
}