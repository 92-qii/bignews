//入口函数
$(function () {

  // 方法一：在发送ajax请求前检验输入的用户名或密码是否为空，为空的或则不往下执行，不再发送ajax请求
  // //一:登录需求:
  // //1.给登录按钮设置一个点击事件
  // $(".input_sub").on("click", function (e) {
  //   e.preventDefault();
  //   //2.获取用户输入的用户名和密码
  //   var username = $(".input_txt")
  //     .val()
  //     .trim();
  //   var password = $(".input_pass")
  //     .val()
  //     .trim();
  //   //3.判断非空
  //   if (username == "" || password == "") {
  //     // alert('账号和密码不能为空!');
  //     $("#myModal .modal-body").text("账号和密码不能为空!");
  //     $("#myModal").modal();
  //     return;
  //   }
  //   //3.发送ajax请求,完成登录
  //   $.ajax({
  //     type: "post",
  //     //接口地址从window对象中的BigNew对象中获取.
  //     url: window.BigNew.user_login,
  //     data: {
  //       username: username,
  //       password: password
  //     },

  //     success: function (backData) {
  //       console.log(backData);
  //       $("#myModal .modal-body").text(backData.msg);
  //       $("#myModal").modal();
  //       if (backData.code == 200) {
  //         //账号密码正确,会返回一个token,把他存在本地.
  //         window.localStorage.setItem("token", backData.token);

  //         //此事件在模态框被隐藏（并且同时在 CSS 过渡效果完成）之后被触发。
  //         $("#myModal").on("hidden.bs.modal", function (e) {
  //           window.location.href = "./index.html";
  //         });
  //       }
  //     }
  //   });
  // });


  // 方法二：直接在ajax内检验密码是否为空
  // 1.给form表单注册 submit事件
  $(".login_form").on("submit", function (e) {
    // 2.阻止表单的默认提交
    e.preventDefault();
    // 3.发送ajax请求
    $.ajax({
      type: "post",
      url: "http://localhost:8080/api/v1/admin/user/login",
      data: $(this).serialize(),
      // 4.提交前检验
      beforeSend: function () {
        // 检验用户名和密码是否为空--遍历input标签中具有name属性的标签
        var flag = false
        $(".login_form  input[name]").each(function (index, ele) {
          if ($.trim($(ele).val()) == "") {
            // 如果输入的为空  更换flag的值为true
            flag = true
          }
        })
        if (flag) {
          // 如果此时flag为true，表明密码和用户起码有一个为空
          // alert("输入的用户名或密码不能为空")
          // 弹出模态框
          $(".modal").modal("show")
          // 添加模态框中的提示文本
          $(".modal-body p").text("输入的用户名或密码不能为空")
          // 弹出模态框

          return false//阻止代码继续向下执行
        }
      },
      success: function (res) {
        // console.log(res)
        if (res.code == 200) {
          // alert("登录成功")
          // 弹出模态框
          $(".modal").modal("show")
          // 添加模态框中的提示文本
          $(".modal-body p").text("登录成功")
          // 给添加的模态框注册事件--》hidden.bs.modal--》事件在在模态框被隐藏（并且同时在 CSS 过渡效果完成）之后被触发
          $(".modal").on("hidden.bs.modal", function () {
            // 跳转到新页面
            window.location.href = "./index.html"
            // 设置本地存储，存储名为token的数据，存储内容为token令牌内容
            localStorage.setItem("token", res.token)
          })



        } else {
          // alert(res.msg)
          // 弹出模态框
          $(".modal").modal("show")
          // 添加模态框中的提示文本
          $(".modal-body p").text(res.msg)
        }
      }
    })
  })
});
