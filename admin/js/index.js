
$(function () {
    // // 1.进入index页面要立刻向服务器发送ajax请求返回index.html页面的数据
    // // 原生js写法
    // var xhr = new XMLHttpRequest()
    // // 请求行
    // xhr.open('get', 'http://localhost:8080/api/v1/admin/user/info')
    // // 使用请求头将服务器端返回的token令牌再次发送给服务器端（如果没添加token是403页面）
    // xhr.setRequestHeader("Authorization", "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW4iLCJleHAiOjIxOTQ0MTQyMzcsImlhdCI6MTU4OTYxNDIzN30.WVCqH1jV3KOnynO1J2MnUDVveZcfkxYeaO_ZwoklDVhLeYQ_O01aSuhS3oKYed_LvOqfb3IgwxxRKtwMI4C73gmMh_OeKwB_G0VmzJCAia5Kyjy1SezXWTKcr6CAdOf60qoh-6INwrtqOaL_2U18OO3ADtY6RVVNLe3oXz9d3fE")
    // // 请求体
    // xhr.send(null)
    // xhr.onreadystatechange = function () {
    //     if (xhr.status == 200 && xhr.readyState == 4) {
    //         console.log(xhr.responseText)
    //     }
    // }


    // ajax写法：
    $.ajax({
        type: "get",
        // url: 'http://localhost:8080/api/v1/admin/user/info',
        url: window.BigNew.user_info,
        headers: {
            // 获取本地存储名为token的数据--》token数据在login.js页面提交给服务器的时候已经存储了
            // "Authorization": localStorage.getItem("token")
            'Authorization': localStorage.getItem('token')
        },
        success: function (res) {
            // console.log(res)
            if (res.code == 200) {
                // 将请求回来的内容渲染到页面
                // 显示登陆的用户名 
                $('.user_info span i').text(res.data.nickname)

                // 显示登陆的头像
                $('.user_info img').attr('src', res.data.userPic)

                // 个人中心的图片也设置一样
                $('.user_center_link img').attr('src', res.data.userPic)
            }

        }
    })


    // 设置退出登录实现功能
    // 1.删除token值
    // 2.返回login登录页面

    // 给退出按钮注册事件
    $(".logout").on("click", function () {
        // 1.删除token值
        localStorage.removeItem("token")
        // 2.返回login登录页面
        window.location.href = './login.html'

    })

    // 一级导航栏
    // 3.给左侧导航栏设置显示高亮
    // 思路分析：
    // 1.给左侧的导航按钮注册事件--》静态页面分析：四个导航按钮均有level01类，其中第二个文章管理按钮下可以下拉显示ul列表
    // 2.点击当前导航栏显示高亮（添加类），其他兄弟标签移除类
    // 3.如果当前点击的是第二个level01类（文章管理），则显示下拉列表，给当前导航栏左侧的图标添加类


    // 3.1给每一个导航栏注册一个点击事件
    $(".menu .level01").on("click", function () {
        // 3.2点击当前导航栏显示高亮（添加类），其他兄弟标签移除类
        $(this).addClass('active').siblings().removeClass('active')
        if ($(this).index() == 1) {
            // 3.3如果当前点击的是第二个level01类（文章管理）下标是1，则下拉列表的显示与折叠
            $('.menu .level02').slideToggle()
            // 3.3给当前导航栏左侧的图标切换类--》b标签
            $(this).find("b").toggleClass("rotate0")

            // 4.3点击当前标签时让第一个标签在展开或折叠时保持高亮--触发
            $("ul.level02>li:eq(0)>a")[0].click();

        }

    })
    // 二级导航栏
    // 4.1给点击第二个level01类中的li标签注册事件，
    // 4.2点击当前标签显示高亮，其他兄弟标签移除类
    // 4.3点击当前标签时让第一个标签在展开或折叠时保持高亮
    // 4.1给点击第二个level01类中的li标签注册事件，
    $(".menu .level02  li").on("click", function () {
        // 4.2点击第二个level01类中的li标签显示高亮，其他兄弟标签移除类
        $(this).addClass('active').siblings().removeClass('active')
    })


});
