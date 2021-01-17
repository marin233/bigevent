$(function () {
    var layer = layui.layer;
    var form = layui.form;
    initArtCateList();

    //初始化文章类型列表
    function initArtCateList() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('tmp-table', res);
                $('tbody').html(htmlStr);
            }
        })
    };
    //添加按钮
    var indexAdd = null;
    $('#btnAdd').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '249px'],
            title: '添加文章分类',
            content: $('#tmp-addCate').html()
        });
    });

    //提交表单
    $('body').on('submit', '#addCate', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCateList();
                layer.msg('添加成功')
                layer.close(index);
            }
        })
    });

    //编辑按钮点击事件
    var indexEdit
    $('tbody').on('click', '#btnEdit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '249px'],
            title: '修改文章分类',
            content: $('#tmp-editCate').html()
        });
        //编辑弹出框默认加载值
        var id = this.dataset.id
        $.ajax({
            mathod: 'get',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('editCate', res.data)
            }
        })
    });

    //确认修改弹出框
    var index
    $('body').on('submit', '#editCate', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新失败')
                }
                layer.msg('更新成功');
                layer.close(indexEdit);
                initArtCateList();
            }
        })
    })

    //删除按钮点击事件
    $('tbody').on('click', '#btnDel', function () {
        var id = this.dataset.id;
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    layer.close(index);
                    initArtCateList()
                }
            })
            layer.close(index);

        });
    })

    // 拯救胡鑫，一键清空点击事件
    $('#btnDelAll').on('click', function () {
        console.log('ok');
        layer.confirm('确认拯救胡鑫？', { icon: 3, title: '提示' }, function (index) {
            for (var i = 87854; i < 89000; i++) {
                console.log('循环中');
                $.ajax({
                    method: 'get',
                    url: '/my/article/deletecate/' + i,
                    success: function (res) {
                        console.log('已拯救胡鑫一次');
                    }
                })
            }
            layer.close(index);

        });


    })

})