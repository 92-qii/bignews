
$(function () {
    // 思路：向服务器发送ajax请求将user的信息返回给浏览器渲染到页面上
    // 1.发送ajax请求（带上token）
    // 2.将信息渲染到页面上

    $.ajax({
        type: "get",
        url: window.BigNew.user_detail,
        header: {
            'Authorization': localStorage.getItem('token')
        },
        success: function (res) {
            // console.log(res)//返回结果如下
            /*{code: 200, msg: "获取成功", data: {…}}
           code: 200
           data: {nickname: "李思思", userPic: "http://localhost:8080/icon.jpg", email: "sisili@qq.com", password: "123456", username: "admin"}
           msg: "获取成功"
           __proto__: Object*/
            // 2.将信息渲染到页面上
            if (res.code == 200) {
                $("#form  .username").val(res.data.username)
                $("#form  .nickname").val(res.data.nickname)
                $("#form  .email").val(res.data.email)
                $("#form  .user_pic").attr("src", res.data.userPic)
                $("#form  .password").val(res.data.password)
                // 3.想要用户名不被修改，则在用户名登录框中添加disable属性即可

            }
        }
    })

    // 2.在个人中心页面实现图片预览功能
    // 思路：
    // 1.给上传文件注册onchange事件
    // 2.获取待上传图片的信息(files属性)
    // 3.生成临时存储路径
    // 4.渲染在页面上


    // 2.1给上传文件注册事件
    $("#exampleInputFile").on("change", function () {
        // console.log(this.files)
        // console.log(this.files[0])//打印内容如下
        /*lastModified: 1578133520529
        lastModifiedDate: Sat Jan 04 2020 18:25:20 GMT+0800 (中国标准时间) {}
        name: "微信图片_20200104182516.jpg"
        size: 1091378
        type: "image/jpeg"
        webkitRelativePath: ""*/
        // 2.获取待上传图片的信息(files属性)
        var file = this.files[0]

        // 3.生成临时存储路径渲染在页面上--> URL.createObjectURL()方法
        var url = URL.createObjectURL(file)
        // 4.渲染在页面上-->给img赋予新的scr（临时路径）
        $(".user_pic").attr("src", url)
    })


    // 3.修改个人中心信息，重新上传到服务器，修改成功后刷新相应的数据
    // 1.给修改按钮注册点击事件
    // 2.获取当前表单中所有的信息
    // 3.发送ajax请求
    // 4.请求成功后刷新相应的数据

    // 1.给修改按钮注册点击事件
    // $("button.btn-edit").on("click", function (e)
    $("#form").on("submit", function (e) {

        e.preventDefault();
        // 2.获取当前表单中所有的信息-->FormData是dom对象的方法
        // var data = new FormData($("#form")[0])//将form表单中的带上传数据转换成二进制的形式再进行上传
        var data = new FormData(this)//将form表单中的带上传数据转换成二进制的形式再进行上传

        console.log(data)//返回的是一个数组
        // 表单的序列化：表单中的内容均是字符串形式(此处表单有上传文件)
        // 3.发送ajax请求
        $.ajax({
            type: "post",
            url: BigNew.user_edit,
            headers: {
                // 获取本地存储名为token的数据--》token数据在login.js页面提交给服务器的时候已经存储了
                // "Authorization": localStorage.getItem("token")
                'Authorization': localStorage.getItem('token')
            },
            data: data,
            contentType: false,//不需要进行其他格式的编码
            processData: false,//不要转成字符串形式
            // 4.请求成功后刷新相应的数据
            success: function (res) {
                // console.log(res)//返回信息如下
                /*code: 200
               msg: "更新成功"*/
                if (res.code == 200) {
                    alert(res.msg)

                    // 4.请求成功后刷新相应的数据
                    // 法1：刷新一下页面(刷新了整个页面)
                    // parent.window.location.reload();


                    // 法2:发送ajax请求,刷新相应部分
                    $.ajax({

                        // url: 'http://localhost:8080/api/v1/admin/user/info',
                        url: window.BigNew.user_info,
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
                                // 知识点：在iframe子页面中对父页面进行操作：
                                // js：window.parent.document.querySelector(selector)
                                // jq：parent.$(selector)
                                parent.$('.user_info span i').text(res.data.nickname)

                                // 显示登陆的头像
                                parent.$('.user_info img').attr('src', res.data.userPic)

                                // 个人中心的图片也设置一样
                                parent.$('.user_center_link img').attr('src', res.data.userPic)
                            }
                        }
                    })
                }
            }


        })
    })


})
