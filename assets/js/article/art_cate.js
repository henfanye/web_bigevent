(function () {
    let layer = layui.layer
    let form = layui.form

    initArtCateList()
    function initArtCateList() {
        $.ajax({
            method: "GET",
            url: '/my/article/cates',
            success: function (res) {
                let htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    let indexAdd = null
    $('#btnAddcate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '在线调试'
            , content: $('#dialog-add').html(),
            area: ['500px', '250px']
        });
    })

    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    console.log(res)
                    return layer.msg('新增分类失败')
                }
                initArtCateList()
                layer.msg('新增分类成功')
                layer.close(indexAdd)
            }
        })
    })

    let indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类'
            , content: $('#dialog-edit').html(),
            area: ['500px', '250px']
        });

        let id = $(this).attr('data-id')
        $.ajax({
            method: "GET",
            url: '/my/article/cates/' + id,
            success: function (res) {
                console.log(res)
                form.val('form-edit', res.data)
            }
        })
    })

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    console.log(res)
                    return layer.msg("更新失败")
                }
                layer.msg("更新成功")
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })

    $("tbody").on('click', ".btn-delete", function () {
        let id = $(this).attr("data-id")

        layer.confirm('确定删除？', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: "GET",
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        console.log(res)
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    layer.close(index);
                    initArtCateList()
                }
            })


        });
    })
})()