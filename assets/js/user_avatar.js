$(function () {


    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    var layer = layui.layer;
    //点击上传选择文件
    $('#btnChooseImage').on('click', function () {
        $('#file').click();
    })
    // 更换显示框图片
    $('#file').on('change', function (e) {
        if (this.files.length <= 0) {
            layer.msg('请选择文件')
        }
        //拿到用户选择的文件
        var file = this.files[0];
        //将该文件更换为url地址
        var imgURL = URL.createObjectURL(file);
        console.log(imgURL);
        $('#image')
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域


    })
    //上传并加载裁剪后的图片
    $('#btnUpload').on('click', function () {
        //裁剪图片
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')//查看文档发现需要获得裁剪图片的base64格式的字符串；
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('上传头像失败')
                }
                window.parent.getuser();
            }
        })
    })

})
