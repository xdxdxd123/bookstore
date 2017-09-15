// JavaScript Document
(function($){
    var util = window.util,common = window.common;
    var classifyList = '<li><a href="../books/bookDetail.html?bookid=<%=id%>" title="<%=name%>">' +
        '<img src="<%=picurl%>" width="121" height="164" alt=""/>' +
        '<p class="ellipsis f14"><%=name%></p>' +
        '<p class="clearfix" style="height: 14px;"><em class="ellipsis f_left" style="width:80px;"><%=author%></em><em class="f_right" style="color:#c01d4a;">¥<%=price%></em></p>' +
        '</a></li>';
    var sortList = '<li type="<%=type%>"><a href="../rank/rank.html?sortType=<%=type%>"><%=name%></a></li>';
    var inner = {
        /*
         * 排行
         */

        initSearch : function(){
            inner.searchResult();
        },
        searchResult : function(){
            var sortId = 0;
            var categoriesType = util.getQueryString('id');
            common.ajax.get('/ebook/pctop',{},function(data){
                $('#sortList').empty();
                if(data.categories != undefined){

                    var categories = data.categories;
                    $.each(categories,function(key,val){
                        $('#sortList').append(util.template(sortList,val));
                    });
                    if (categoriesType == null) {
                        categoriesType = categories[0].type;
                        sortId = categoriesType.split('&')[1];
                        sortId = sortId.split('=')[1];
                    }else{
                        sortId = categoriesType;
                    }
                    $('#sortList>li[type="top&id='+sortId+'"]').addClass("active");
                    $(".listTitle>span").html($('#sortList>li[type="top&id='+sortId+'"]').find('a').html());
                    inner.loadRankList(sortId);
                }
            });
        },
		loadRankList:function(sortId){
			common.ajax.get('/ebook/books',{pageno:1,pagesize: 15,opt:"top",id:sortId},function(data){
                //console.log(JSON.stringify(data));
                if(data.totalnum !== undefined){
                    common.addPagingBtn(data.totalnum,15);
                }
            },true,false,{
                paging : true,
                pagePrev : '.pageprev',
                pageNext : '.pagenext',
                pageFrist : '.pagefrist',
                pageLast : '.pagelast',
                pageNum : '.pagenum',
                pageListLoad : function(data,pageno){
                    $('#bookList').empty();
                    if(data.booklist != undefined){

                        var booklist = data.booklist;
                        $.each(booklist,function(key,val){
                            $('#bookList').append(util.template(classifyList,val));
                        });
                    }
                }
            });
		}

    };
    $(function(){
        inner.initSearch();
    });
})(jQuery);