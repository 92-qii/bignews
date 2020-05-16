// //入口函数
// $(function() {
//   //一:发送ajax请求,获取网站管理员用户的个人信息
//   $.ajax({
//     url: window.BigNew.user_info,
//     //设置请求头,把token令牌带过去
//     // headers:{
//     //     Authorization:window.localStorage.getItem('token')
//     // },
//     success: function(backData) {
//       //console.log(backData);
//       if (backData.code == 200) {
//         $(".user_info>span>i").text(backData.data.nickname);
//         $(".user_info>img").attr("src", backData.data.userPic);
//         $(".user_center_link>img").attr("src", backData.data.userPic);
//       }
//     }
//   });

//   //原生js发送ajax请求访问个人信息,把token带过去.
//   // var xhr = new XMLHttpRequest();
//   // xhr.open('get','http://localhost:8080/api/v1/admin/user/info');
//   // //设置一个请求头
//   // xhr.setRequestHeader('Authorization',window.localStorage.getItem('token'));
//   // xhr.onload = function(){
//   //     console.log(xhr.response);
//   // }
//   // xhr.send();

//   //二:登出
//   //1.给登出按钮设置一个点击事件
//   $(".logout").on("click", function() {
//     //2.删除token,跳转到登录页面
//     window.localStorage.removeItem("token");
//     window.location.href = "./login.html";
//   });

//   //三: 首页左侧一级菜单设置点击事件
//   $("div.level01").on("click", function() {
//     //当前点击的设置一个active类,其他的兄弟移除active类.
//     $(this)
//       .addClass("active")
//       .siblings("div")
//       .removeClass("active");
//     //如果你点击的是文章管理.
//     if ($(this).index() == 1) {
//       $("ul.level02").slideToggle(); //二级菜单显示就隐藏,隐藏就显示

//       //设置小剑尖的旋转(其实就是设置有咩有rotate0类- 本质是c3的旋转动画)
//       $(this)
//         .find("b")
//         .toggleClass("rotate0");

//       //默认选中第一个二级菜单.
//       $("ul.level02>li:eq(0)>a")[0].click();
//       //jQuery对象的click()事件,他只会触发js单击事件,而不会触发a标签的默认跳转事件.
//       //dom对象的click()事件,他不仅会触发js单击事件,还会触发a标签的默认跳转事件
//     }
//   });

//   //四:首页左侧二级菜单设置点击事件
//   $("ul.level02>li").on("click", function() {
//     //当前点击的添加active类,其他的兄弟移除active类
//     $(this)
//       .addClass("active")
//       .siblings("li")
//       .removeClass("active");
//   });


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
        url: 'http://localhost:8080/api/v1/admin/user/info',
        headers: {
            // 获取本地存储名为token的数据--》token数据在login.js页面提交给服务器的时候已经存储了
            // "Authorization": localStorage.getItem("token")
            'Authorization': localStorage.getItem('token')
        },
        success: function (res) {
            console.log(res)
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

});
