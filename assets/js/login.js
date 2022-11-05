(function () {
    $('#link-reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link-login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    let form = layui.form
    let layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            let pwds = $('.reg-box [name=password]').val()
            if (pwds !== value) {
                return '两次密码输入不一致'
            }
        }
    })

    // 监听注册表单提交
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        let data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg("注册成功，请登录")
            $("#link-login").click()
        })
    })

    // 监听登录表单提交
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })

})()