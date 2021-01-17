$(function () {
    var layer = layui.layer
    var form = layui.form

    initCate()
    // 初始化富文本编辑器
    initEditor()

    function initCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文字类型失败')
                }
                // 模版渲染数据
                var htmlStr = template('tmp-cate', res);
                $('[name=cate_id]').html(htmlStr);
                form.render();
            }
        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 选择封面按钮 绑定点击事件
    $('#chooseImage').on('click', function () {
        $('#coverFile').click();
    })
    // 为coverFile绑定change事件，改变幕布的图片
    $('#coverFile').on('change', function (e) {
        var files = e.target.files;
        if (files.length <= 0) {
            return layer.msg('没有选择图片')
        }
        var newImgURL = URL.createObjectURL(files[0]);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    // 定义文章发布状态
    var art_state = '已发布';
    $('#btnSave2').on('click', function () {
        art_state = '草稿'
    })
    //表单发布事件
    $('#form-pub').on('submit', function (e) {
        e.preventDefault();
        var fd = new FormData($(this)[0]);
        fd.append('state', art_state);
        // 4. 将封面裁剪过后的图片，输出为一个文件对象
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                //6.发送ajax请求发布文章
                publishArticle(fd);
            })

        //送ajax请求发布文章函数
        function publishArticle(fd) {
            $.ajax({
                method: 'post',
                url: '/my/article/add',
                data: fd,
                contentType: false,
                processData: false,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('发表失败')
                    }
                    layer.msg('发表成功')
                    //跳转到列表页
                    // window.parent.$('#demo').click();

                    location.href = '/article/art_list.html'
                    //切换左侧边框选中样式
                    window.parent.toggleClassName();

                }
            })
        }
    })

})