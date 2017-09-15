// JavaScript Document

/*
 * 我的书架
 */
 
(function($){
	var bookli = '<li><a class="gotoBook" data-id="<%=id%>" data-type="<%=filetype%>" data-parent="<%=parent%>" href="#'+path+'books/bookDetail.html?bookid=<%=id%>" title="<%=name%>">\
				  <img src="<%=picurl%>" width="122" height="165" alt=""/>\
				  <p class="ellipsis"><%=name%></p>\
				  <p class="ellipsis"><%=desc%></p>\
			  </a>\
		  </li>';
	var isbuy;
	var inner = {
		/*
		 * 切换类型
		 */
		 switchType:function(){
			 $('.relatedChoice li').click(function(){
				 if($(this).hasClass('hover'))
				   return;
				 $(this).addClass('hover').siblings().removeClass('hover');
				 var showid = $(this).data('for');
				 inner.loadlist(showid);
			 });
		 },
		 /*
		  * 加载列表
		  */
		 loadlist:function(showid){
			 var url;
			 $('#bookList > div').addClass('none');
			 if(showid == 'myBuyList'){
				 url = '/user/buyrecord'; 
			 }else if(showid == 'myCollentList'){
				 url = '/user/fav'; 
			 }else{
				 url = '/user/readhistory'; 
			 }
			 var showList = $('#'+showid);
			 //判断是否已经加载过了，已经加载过了不再加载
			 if(!showList.attr('data-load')){
				 common.ajax.get(url,{pageno:1,pagesize:5,type:1},function(data){
					  if(data.totalnum !== undefined){
						  common.addPagingBtn(data.totalnum,5,$('#'+showid).find('.paginglist'));
					  }
				  },true,false,{
					  paging : true,
					  pagePrev : '#'+ showid + ' .pageprev',
					  pageNext : '#'+ showid + ' .pagenext',
					  pageFrist : '#'+ showid + ' .pagefrist',
					  pageLast : '#'+ showid + ' .pagelast',
					  pageNum : '#'+ showid + ' .pagenum',
					  pageListLoad : function(data,pageno){
					  	console.log(showid);
						  showList.find('.booksList').empty();
						  if(data.booklist != undefined){
							  var booklist = data.booklist;
							  $.each(booklist,function(key,val){

								  val.parent = showid;
								  if(val.filetype == undefined)
								    val.filetype = '';
								  var li = $(util.template(bookli,val));
								  showList.find('.booksList').append(li);
								  if(val.isbuy){
								  	li.attr('data-isbuy',val.isbuy)
								  }
							  });
							  showList.show().attr('data-load','true');
							  var isbuyli = showList.find('.booksList li');
                              var isbuy = isbuyli.data('isbuy');
                              var stale = '<span class="cuEing">已过期</span>';
                              if(isbuy == '2'){
                                  isbuyli.find('a').append(stale);
                              }
                            
						  }
					  }
				  });
			 }
			 showList.removeClass('none');
		 },
		 /*
		  * 点击书籍
		  */
		  initGoBook : function(){
			  $(document).on('click','.gotoBook',function(){
				  var parent = $(this).data('parent'),id = $(this).data('id'),type = $(this).data('type'),isbuy = $(this).parent('li').data('isbuy');
				  if(isbuy == '2'){
                      $(this).parent('a').attr('href','');
                      return;
				  }
				  if(parent == 'myBuyList'){
					  if(type == 'epub'){
						  window.open(path + 'ebook/epub.html?bookid='+id+'&readtype=0');
					  }else{
						  window.open(path + 'ebook/pdf.html?bookid='+id+'&readtype=0');
					  }
				  }else{
					  location.href = $(this).attr('href').replace('#','');
				  }
			  });
		  }
	}
	
	$(function(){
		inner.switchType();
		inner.initGoBook();
		inner.loadlist('myBuyList');
	});
})(jQuery);