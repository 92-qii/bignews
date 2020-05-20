
// $(function () {
//     // 1.发送ajax请求读取文章所有分类
//     $.ajax({
//         type: "get",
//         url: BigNew.category_list,
//         success: function (res) {
//             console.log(res)//返回数据如下：
//             /*code: 200
//             data: Array(5)
//             0: {id: 1, name: "爱生活123", slug: "热爱生活"}
//             1: {id: 2, name: "爱旅行", slug: "热爱旅行"}
//             2: {id: 3, name: "爱美食！！！！", slug: "热爱美食"}
//             3: {id: 4, name: "爱运动", slug: "热爱运动"}
//             4: {id: 6, name: "想去旅行", slug: "那就一起去吧"}
//             length: 5
//             __proto__: Array(0)
//             msg: "获取成功"*/
//             if (res.code == 200) {
//                 //2.获取到所有的文章类别信息后,通过模板引擎渲染到页面上
//                 var resHtml = template("art_cate_temp", res);
//                 $("#selCategory").html(resHtml);
//                 if (res.data.totalPage == 0) {
//                     // 服务器返回是否有数据决定是否显示控件
//                     $('#pagination-demo').hide().next().show()
//                 } else {
//                     $('#pagination-demo').show().next().hide()
//                     pagination(res)
//                 }
//             }
//         }
//     })

//     // 2.发送ajax请求显示当前页所有文章的内容

//     // 封装函数
//     function getdata(obj) {
//         $.ajax({
//             url: BigNew.article_query,
//             data: obj,
//             success: function (res) {
//                 console.log(res)
//                 if (res.code == 200) {
//                     //调用模板引擎核心方法
//                     var resHtml = template('arti_list', res);
//                     $('tbody').html(resHtml);
//                     // 启用分页
//                     pagination(res.data.totalPage)
//                 }
//             }
//         })
//     }

//     // 传入参数：对象 调用函数
//     getdata({
//         key: $("#key").val(),
//         type: $('#selCategory').val().trim(), //获取文章类别
//         state: $('#selStatus').val().trim(), //获取文章状态(草稿/已发布)
//         page: 1, //当前的页数
//         perpage: 7 //一页显示多少条
//     })

//     // 3.给筛选按钮注册事件，根据条件把对应的数据渲染到页面上
//     // 3.1给筛选按钮注册事件
//     $("#btnSearch").on("click", function (e) {
//         // 3.2阻止默认提交行为
//         e.preventDefault()
//         // 3.3发送ajax请求返回数据，调用函数即可
//         // getdata({
//         //     key: $("#key").val(),
//         //     type: $('#selCategory').val().trim(), //获取文章类别
//         //     state: $('#selStatus').val().trim(), //获取文章状态(草稿/已发布)
//         //     page: 1, //当前的页数
//         //     perpage: 10 //一页显示多少条
//         // })

//         $.ajax({
//             url: BigNew.article_query,
//             data: {
//                 key: $("#key").val(),
//                 type: $('#selCategory').val().trim(), //获取文章类别
//                 state: $('#selStatus').val().trim(), //获取文章状态(草稿/已发布)
//                 page: 1, //当前的页数
//                 perpage: 7 //一页显示多少条
//             },
//             success: function (res) {
//                 console.log(res)
//                 if (res.code == 200) {
//                     //调用模板引擎核心方法
//                     var resHtml = template('arti_list', res);
//                     $('tbody').html(resHtml);

//                     // 服务器的数据全部响应回来之后，更新分页插件，就是更新总页数(筛选出来的总页数！=原来所有总页数)
//                     // 调用changeTotalPages 这个方法 根据新的总页数 重新生成分页结构（内部重绘分页插件）
//                     // 三个参数：事件名称,总页码,默认当前页
//                     $('#pagination-demo').twbsPagination("changeTotalPages", res.data.totalPage, 1)
//                 }
//             }
//         })
//     })

//     // 4.分页-->在页面渲染完毕后触发
//     function pagination(totalPages, visiblePages) {
//         $('#pagination-demo').twbsPagination({
//             totalPages: totalPages, //总页数
//             visiblePages: visiblePages || 7,//可见最大上限页码值
//             first: '首页',
//             prev: '上一页',
//             next: '下一页',
//             last: '尾页',
//             onPageClick: function (event, page) {
//                 console.log(event, page); //当前点击的页数.
//                 // mypage = page; //把当前点击的这一个页码给mypage赋值. 
//                 // getData(page, null);
//                 getdata({
//                     key: $("#key").val(),
//                     type: $('#selCategory').val().trim(), //获取文章类别
//                     state: $('#selStatus').val().trim(), //获取文章状态(草稿/已发布)
//                     page: page, //当前的页数
//                     perpage: 7 //一页显示多少条
//                 })
//             }
//         })
//     }

// })


$(function () {
    /* 思路分析：
        本页面要实现三个功能：
        1.一点击文章列表页时要向服务器发送ajax请求 ，返回页面所有数据，渲染到页面上；
        2.给全部分类设置事件，一点击向服务器发送请求，返回所有数据，渲染到下拉列表
        3.给筛选按钮注册事件，一点击向服务器发送请求，返回相应数据，渲染到页面
        4.点击页码，发送请求，返回当前页的所有数据*/

    // 1. 发送ajax请求全部分类所有的分类 
    $.ajax({
        type: "get",
        url: BigNew.category_list,
        success: function (res) {
            console.log(res)//返回数据如下：
            /*code: 200
            data: Array(5)
            0: {id: 1, name: "爱生活123", slug: "热爱生活"}
            1: {id: 2, name: "爱旅行", slug: "热爱旅行"}
            2: {id: 3, name: "爱美食！！！！", slug: "热爱美食"}
            3: {id: 4, name: "爱运动", slug: "热爱运动"}
            4: {id: 6, name: "想去旅行", slug: "那就一起去吧"}
            length: 5
            __proto__: Array(0)
            msg: "获取成功"*/
            if (res.code == 200) {
                //2.获取到所有的文章类别信息后,通过模板引擎渲染到页面上
                var resHtml = template("categoryList", res);
                $('#selCategory').html(resHtml)
            }
        }
    })
    // 封装了一个根据不同条件来查询数据的函数
    // 两个形参：页数、函数
    // 封装了一个根据不同条件来查询数据的函数
    function getDataByParams(myPage, callback) {
        $.ajax({
            type: 'get',
            url: BigNew.article_query,
            data: {
                key: $('#key').val(),
                type: $('#selCategory').val(),
                state: $('#selStatus').val(),
                page: myPage,
                perpage: 7
            },
            success: function (res) {
                console.log(res)
                if (res.code == 200) {
                    // 2.2 渲染数据
                    var htmlStr = template('articleList', res.data)
                    $('tbody').html(htmlStr)
                    /*********************************以上为函数相同部分******/
                    // 2.4  根据服务器响应回来的数据来判断是否显示控件
                    if (res.data.totalPage == 0 && myPage == 1) {
                        $('#pagination-demo').hide().next().show()
                    } else if (res.data.totalPage != 0 && callback != null) {
                        // 就说明是有数据响应回来的，应该要显示分页控件
                        $('#pagination-demo').show().next().hide()
                        // 2.3 实现函数的调用
                        callback(res)
                        // pagination(res)
                    } else if (res.data.totalPage != 0 && res.data.data.length == 0) {
                        currentPage -= 1  // 针对于最后一页而言的 
                        // 重绘控件页码
                        // 更新分页控件的总页码 
                        // 1. 第1个参数是一个事件 当页码值发生变化时就会触发
                        // 2. 第2个参数是 要变化的新的总页码值
                        // 3. 第3个参数 是当前页码值
                        $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, currentPage)
                    }

                }
            }
        })
    }
    // 2. 显示文章数据
    // 2.1 一跳转到当前这个页面就要发送ajax请求
    getDataByParams(1, pagination)

    // 3. 分页功能的函数
    var currentPage = 1
    function pagination(res, visiblePages) {
        $('#pagination-demo').twbsPagination({
            totalPages: res.data.totalPage, // 总页数
            visiblePages: visiblePages || 7, // 可见最大上限页码值
            first: '首页',
            last: '最后一页',
            next: '下一页',
            prev: '上一页',
            initiateStartPageClick: false, // 不要默认点击 
            onPageClick: function (event, page) {
                //  console.log(event,page);
                // page是当前页码
                currentPage = page // 当默认页改成被单击后的页码
                // 调用方法，实现当前页码的数据渲染
                getDataByParams(page, null)
            }
        })

    }
    // 4. 给筛选按钮注册事件 根据新条件渲染页面
    // 4.1 给筛选按钮注册事件
    $('#btnSearch').on('click', function (e) {
        // 4.2 阻止默认的请求行为
        e.preventDefault()

        // 4.3 发送请求获取数据

        getDataByParams(1, function (res) {
            // 更新分页控件的总页码
            $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, 1)
        })

    })

    /**
     * 1. 当前项目不要纠结于某一行代码
     * 2. 要听完整的思路
     */
    // 给模态框中的删除键注册事件
    var articleId
    $('#myModal').on('show.bs.modal', function (e) {
        // console.log(e.relatedTarget );
        articleId = $(e.relatedTarget).data('id')
    })
    // 5.2 给模态框上的确定按钮注册事件
    var articleId
    $('#myModal .btn-sure').on('click', function () {
        // 5.3 发送ajax请求 
        $.ajax({
            type: 'post',
            url: BigNew.article_delete,
            data: {
                id: articleId
            },
            success: function (res) {
                // 5.4 请求成功后要隐藏模态框 
                $('#myModal').modal('hide')
                // 5.5 刷新当前页面
                getDataByParams(currentPage, null)
            }
        })
    })
})