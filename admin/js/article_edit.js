$(function () {
    // console.log(window.location.search); 
    // location.search获取URL地址栏中的?后面的参数数据
    // "?id=20"
    var str = location.search.slice(1) // 从索引为1的位置开始截取到最后
    var id = utils.convertToObj(str).id
    console.log(id);
    $.ajax({
        type: 'get',
        url: BigNew.article_search,
        data: {
            id: id
        },
        success: function (res) {
            console.log(res);
            // 将数据渲染到页面上
            if (res.code == 200) {
                $('#form input[name=title]').val(res.data.title)
                $('#form .article_cover').attr('src', res.data.cover)
                $('#form select[name="categoryId"]').val(res.data.categoryId)
                $('#form input[name=date]').val(res.data.date)
                $('#form textarea[name=content]').val(res.data.content)
            }
        }
    })

    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            console.log(res)
            console.log(typeof res)
            // 1.2 获取数据并渲染页面
            if (res.code == 200) {
                var htmlStr = template('categoryList', res)
                $('.category').html(htmlStr)
            }
        }
    })

})
