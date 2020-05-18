// //入口函数
// $(function() {
//   //一: 一进到文章类别页面,就显示所有的文章类别
//   getData();

//   function getData() {
//     //1.发送ajax请求
//     $.ajax({
//       type: "get",
//       url: BigNew.category_list,
//       success: function(backData) {
//         //console.log(backData);
//         if (backData.code == 200) {
//           //2.获取到所有的文章类别信息后,通过模板引擎渲染到页面上
//           var resHtml = template("art_cate_temp", backData);
//           $("tbody").html(resHtml);
//         }
//       }
//     });
//   }

//   //二: 到底点击的是新增分类 /编辑 弹出来的模态框
//   //show.bs.modal
//   //show 方法调用之后立即触发该事件。
//   //如果是通过点击某个作为触发器的元素，则此元素可以通过事件的 relatedTarget 属性进行访问。
//   $("#myModal").on("show.bs.modal", function(e) {
//     //就可以通过e.relatedTarget知道你是新增分类,还是编辑按钮弹出来的模态框
//     //console.log(e.relatedTarget);
//     if (e.relatedTarget === $("#xinzengfenlei")[0]) {
//       //alert('新增分类');
//       $("#exampleModalLabel").text("新增类别");
//       $("#myModal .btn-queren")
//         .text("新增")
//         .addClass("btn-primary")
//         .removeClass("btn-success");
//       //reset() 方法可把表单中的元素重置为它们的默认值。
//       $("#myModal form")[0].reset();
//     } else {
//       //alert('编辑分类');
//       $("#exampleModalLabel").text("修改类别");
//       $("#myModal .btn-queren")
//         .text("编辑")
//         .addClass("btn-success")
//         .removeClass("btn-primary");

//       //把编辑的当前这一行的 文章类别名 和 文章类别别名 显示在模态框中.
//       $("#recipient-name").val(
//         $(e.relatedTarget)
//           .parent()
//           .prev()
//           .prev()
//           .text()
//       ); //文章类别名称
//       $("#message-text").val(
//         $(e.relatedTarget)
//           .parent()
//           .prev()
//           .text()
//       ); //文章类别 别名
//       //把当前点击的整个编辑按钮身上存放的id, 保存在隐藏域中
//       $("#category_id").val($(e.relatedTarget).attr("data-id"));
//     }
//   });

//   //三. 给模态框中的 取消按钮设置一个点击事件
//   $("#myModal .btn-cancel").on("click", function() {
//     //reset() 方法可把表单中的元素重置为它们的默认值。
//     $("#myModal form")[0].reset();
//   });

//   //四:给模态框中的 新增/编辑 按钮设置点击事件
//   $("#myModal .btn-queren").on("click", function() {
//     //判断是否拥有这个类:btn-primary ,如果有就是新增,否则就是编辑
//     if ($(this).hasClass("btn-primary")) {
//       // alert('新增逻辑');
//       //1.获取用户输入的分类类别名称,和分类类别别名
//       var cateName = $("#recipient-name")
//         .val()
//         .trim(); //分类类别名称
//       var cateSlug = $("#message-text")
//         .val()
//         .trim(); //分类类别 别名
//       //2.发送ajax请求,完成新增
//       $.ajax({
//         type: "post",
//         url: BigNew.category_add,
//         data: {
//           name: cateName,
//           slug: cateSlug
//         },
//         success: function(backData) {
//           //console.log(backData);
//           if (backData.code == 201) {
//             $("#myModal").modal("hide");
//             //window.location.reload();//刷新当前页面
//             getData(); //重新发送ajax请求,获取数据重新渲染
//           }
//         }
//       });
//     } else {
//       // alert('编辑逻辑');
//       //获取当前要修改的这一行分类的id, 以及用户修改后的分类名和分类别名
//       // var cateId = $('#category_id').val().trim(); //分类id
//       // var cateName = $('#recipient-name').val().trim(); //分类类别名称
//       // var cateSlug = $('#message-text').val().trim(); //分类类别 别名
//       //上面获取数据的代码只有三句还好,如果像上面这样的获取数据的代码有三十行,那不写死了?
//       //我们就想到了使用formData,但是formData他需要后端支持.  我们这个接口他不支持.
//       //jQuery为我们提供了一个serialize()方法.
//       //作用是: 获取form表单中有name属性的标签的值.
//       var data = $("#myModal form").serialize();
//       console.log(data);

//       //发送ajax请求,完成编辑
//       $.ajax({
//         type: "post",
//         url: BigNew.category_edit,
//         // data: {
//         //     id: cateId,
//         //     name: cateName,
//         //     slug: cateSlug
//         // },
//         data: data,
//         success: function(backData) {
//           //console.log(backData);
//           if (backData.code == 200) {
//             $("#myModal").modal("hide");
//             //window.location.reload();//刷新当前页面
//             getData(); //重新发送ajax请求,获取数据重新渲染
//           }
//         }
//       });
//     }
//   });

//   //五:删除分类
//   $("tbody").on("click", ".btn-delete", function() {
//     if (confirm("你确定要删除吗?")) {
//       //获取要删除的分类id
//       var id = $(this).attr("data-id");
//       //发送ajax请求完成删除
//       $.ajax({
//         type: "post",
//         url: BigNew.category_delete,
//         data: {
//           id: id
//         },
//         success: function(backData) {
//           //console.log(backData);
//           if (backData.code == 204) {
//             getData();
//           }
//         }
//       });
//     }
//   });


// });


$(function () {
  // 需求：点击文章管理导航栏，向列表页面发送ajax请求，将获取到的list页面数据渲染到页面中

  // 1. 发送请求获取数据，渲染页面
  // 1.1 发送ajax请求
  render()
  function render() {
    $.ajax({
      type: 'get',
      url: BigNew.category_list,
      success: function (res) {
        console.log(res);//获取内容如下：
        /*code: 200
       data: Array(5)
       0: {id: 1, name: "爱生活", slug: "热爱生活"}
       1: {id: 2, name: "爱旅行", slug: "热爱旅行"}
       2: {id: 3, name: "爱美食", slug: "热爱美食"}
       3: {id: 4, name: "爱运动", slug: "热爱运动"}
       4: {id: 5, name: "经济特区", slug: "热爱经济"}
       length: 5
       __proto__: Array(0)
       msg: "获取成功"*/
        console.log(typeof res);
        // 1.2把数据通过模板引擎渲染到页面上
        if (res.code == 200) {
          var htmlStr = template('categoryList', res)
          $('tbody').html(htmlStr)
        }
      }
    })
  }

  // 2.给新增按钮注册点击事件
  $("#xinzengfenlei").on("click", function () {
    // alert("123")
    // 2.1显示模态框
    $(".add_modal").modal("show")
    // 2.2修改标题
    $(".add_modal  h4").text("新增分类")
    // 2.3清空模态框
    $('#myForm')[0].reset()  //DOM对象的表单重置
  })


  // 3.给模态框中的编辑键添加事件(以委托形式)
  $("tbody").on("click", ".btn-edit", function () {
    // alert("123")

    // 3.1显示模态框
    $(".add_modal").modal("show")
    // 3.2修改标题
    $(".add_modal  h4").text("编辑分类")
    // 3.3获取当前按钮所在的那条数据的索引值 
    var id = $(this).data('id')

    // 3.4发送ajax请求，将获取的数据渲染到模态框中
    $.ajax({
      type: 'get',
      url: BigNew.category_search,
      data: {
        id: id
      },
      success: function (res) {
        if (res.code == 200) {
          $('#myForm input[name=id]').val(res.data[0].id)
          $('#myForm input[name=name]').val(res.data[0].name)
          $('#myForm input[name=slug]').val(res.data[0].slug)
        }
      }
    })
  })

  // 4.给模态框中的确定按钮注册事件
  $(".add_modal .btn-sure").on("click", function () {
    // 4.1通过判断是否有id来判断当前操作是更新还是添加
    // 获取隐藏域中的id
    var id = $('#myForm input[name=id]').val()
    // 4.2发送ajax请求
    $.ajax({
      type: 'post',
      // 点击确定按钮判断有没有id，如果有就是更新没有就是添加
      url: id ? BigNew.category_edit : BigNew.category_add,
      // 4.3收集表单中所有信息
      data: $('#myForm').serialize(),
      success: function (res) {
        // console.log(res);
        if (res.code == 200 || res.code == 201) {
          //隐藏模态框
          $('.add_modal').modal('hide');
          // 刷新当前页面
          render()
        }
      }
    })
  })


  // 5.给模态框中的删除按钮注册事件(委托事件)
  $('tbody').on("click", '.btn-del', function () {
    // 5.1先弹出模态框
    $('.delModal').modal('show');
    // 5.2获取当前按钮所在的那条数据的id
    window.categoryId = $(this).data('id')
    // console.log(window.categoryId)
  })
  // 给删除模态框确定按钮注册事件
  $('.delModal .btn-sure').on('click', function () {
    $.ajax({
      type: 'post',
      url: BigNew.category_delete,
      data: {
        id: window.categoryId
      },
      success: function (res) {
        if (res.code == 204) {
          $('.delModal').modal('hide');
          render()
        }
      }
    })
  })


})