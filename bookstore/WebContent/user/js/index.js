// JavaScript Document
(function($){
	var categories = {};
	var inner = {
       // 首页焦点图
       bigBanner:function(){
          var myindex = 100;
          var num = 0;
          var stopgap = $('.banner ul li').length-1;
          // 指示器1
          $('.banner ol li').mouseenter(function(e) {
            myindex++;
                $(this).addClass('current').siblings().removeClass();
            var index = $(this).index();
            $('.banner ul li').eq(index).stop().fadeIn().siblings().stop().fadeOut();
            num=index;
            });

          // 自动播放模块
          var timer=null;
          var speed = 5000;
          function autorun(){
            num++;
            myindex++;
            if( num>stopgap ){ num=0 }
            $('.banner ol li').eq(num).addClass('current').siblings().removeClass();
            $('.banner ul li').eq(num).fadeIn().siblings().stop().fadeOut();
          }
          timer=setInterval(autorun,speed)  ;    // 指令进行了分离

          //停止自动播放，鼠标移上清除定时器，鼠标离开重新启动定时器。
          $('.banner').hover(function(e) {
                clearInterval(timer);
            $('.banner span').fadeIn();
            },function(){
                clearInterval(timer);
            timer=setInterval(autorun,speed);   // 指令进行了分离
            $('.banner span').fadeOut();
          });
       },
	   /*
	    * 全部图书分类
	    */
	   loadClassNavi:function(){
		   common.ajax.get('/ebook/category',{},function(data){
			   if(data.sorttypes !== undefined){
				   $.each(data.sorttypes,function(key,frist){
					   var child = $('<div class="classify-child"></div>');
					   $('#classify').append(child);
					   child.append('<p class="classify-title f14 fb">'+frist.name+'</p>');
					   var div = $('<div class="clearfix"></div>');
					   var seconds = frist.categories;
					   if(seconds.length > 0){
						   child.append(div);
						   $.each(seconds,function(k,second){
							   div.append('<a href="classify/classify.html?id='+second.id+'&secname='+second.name+'">'+second.name+'</a>');
						   });
					   }
				   });
			   }
		   });
	   },
	   /*
	    * 加载首页信息，除图书畅销榜
	    */
		loadBookshop:function(){
			common.ajax.get('/ebook/bookshop',{},function(data){
				//新闻资讯
				if(data.news !== undefined){
					var news = data.news,newsList = news.newslist;
					if(newsList.length > 0){
						inner.loadNewsList(news);
					}
				}
				//重磅推荐、最新上架、热门作品
				if(data.recommends !== undefined){
					var recommends = data.recommends;
					$.each(recommends,function(key,val){
						if(val.booklist.length >0){
							if(val.type == 'home' || val.type == 'fullcut&id=1'){
								inner.loadHeavyList(val);
							}else{
								inner.loadHotList(val);
							}
						}

					});
				}
				//专区
				if(data.categories !== undefined){
					inner.loadCateWrap(data.categories);
				}
				//焦点图
				if(data.focus !== undefined){
					inner.loadFocusImg(data.focus);
				}
			});
		},
		/*
		 * 新闻资讯
		 */
		loadNewsList:function(data){
			var tmpl = '<li class="ellipsis"><a href="'+path+'information/info.html?opt=sysnews&id=<%=id%>" title="<%=name%>"><%=name%></a></li>';
			$('.newsInfo_more').attr('href',path+'information/news.html?id='+data.id);
			$.each(data.newslist,function(key,value){
				$('.newsInfo-list').append(util.template(tmpl,value));
			});
		},
		/*
		 * 重磅推荐  满减区
		 */
		 loadHeavyList:function(data){
			 var tmpl = '<li>\
	            <p class="heavyList-img f_left"><a href="books/bookDetail.html?bookid=<%=id%>"><img src="<%=picurl%>" width="120" height="164" /></a></p>\
	            <div class="heavyList-info gray ml20 f_left">\
	              <a class="heavyList-title ellipsis" title="<%=name%>" href="books/bookDetail.html?bookid=<%=id%>"><%=name%></a>\
	              <p class="heavyList-eval gray"><p class="heavyList-start iblock"></p><em class="ml5 f14"><%=starnum%></em><em class="ml5 f14">(<%=commentnum%>点评)</em></p>\
	              <p class="mt10 gray"><%=author%></p>\
	              <div class="heavyList-desc"><%=desc%></div>\
	              <p class="heavyList-price"><em class="fb color-black">价格：</em><em class="fb ml5 color-red">&#65509;<%=saleprice%></em><em class="ml20">&#65509;<%=price%></em></p>\
	            </div>\
	            </li>';
		     var type = data.type;
		     $.each(data.booklist,function(key,value){
                // if(value.length >0){
			     	// style="margin-top:<%=margintop%>px;"
					// if(key > 1){
					//  value['margintop'] = '42';
					// }else{
					//  value['margintop'] = '0';
					// }
					if(type =='home'){
	                    // 重磅推荐
						var li = $(util.template(tmpl,value)),startnum = parseFloat(value.starnum);
						li.find('.heavyList-start').css('background-position','0 -'+(startnum*2*20)+'px');
				    	$('.heavyOnly').append(li);
					}else{
						// 满减区
						var li = $(util.template(tmpl,value)),startnum = parseFloat(value.starnum);
						li.find('.heavyList-start').css('background-position','0 -'+(startnum*2*20)+'px');
				    	$('.fullOnly').append(li);
						$('.fullCut').css('display', 'block');
					}
                // }
			 });
		 },
		 /*
		  * 最新上架、热门作品
		  */
		  loadHotList:function(data){
			  var left = '<p class="comLeftOne-img"><a href="books/bookDetail.html?bookid=<%=id%>"><img src="<%=picurl%>" width="120" height="164" /></a></p>\
			  <h3 class="comLeftOne-title ellipsis f14 fb"><a title="<%=name%>" href="books/bookDetail.html?bookid=<%=id%>"><%=name%></a></h3>\
			  <p class="mt15 pents"><%=author%></p>\
			  <p class="comLeftOne-desc"><%=desc%></p>\
			  <p class="comLeftOne-price"><em class="fb color-black">价格：</em><em class="fb ml5 color-red">&#65509;<%=saleprice%></em><em class="ml20">&#65509;<%=price%></em></p>';
		     var right = '<li>\
              <a class="bookList-img" href="books/bookDetail.html?bookid=<%=id%>"><img src="<%=picurl%>" width="120" height="164" /></a>\
              <h3 class="ellipsis f14"><a href="books/bookDetail.html?bookid=<%=id%>" class="authors" title="<%=name%>"><%=name%></a></h3>\
              <p class="color-red mt15">&#65509;<%=saleprice%></p>\
            </li>';
			var type = data.type;
			$.each(data.booklist,function(key,value){
				if(key == 0){
					if(type == 'new'){
						var top = type == 'new'
						console.log();
						$('.newsList').find('.comLeftOne').append(util.template(left,value));
					}else if(type == 'hot'){
						$('.hotList').find('.comLeftOne').append(util.template(left,value));
					}else if(type == 'famous'){
						var famous = $(util.template(left,value))
						$('.famousList').find('.comLeftOne').append(famous);
						$('.famousList .comLeftOne').find('.comLeftOne-price').remove();
						famous.find('a').attr('href','books/famousMore.html?userid='+value.id+'&author='+value.author);
						famous.find('a').attr('title',value.author);
						$('.famousList .comLeftOne').find('.pents').text('作者简介')
						$('.famousList .comLeftOne').find('.comLeftOne-title a').text(value.author).attr('title',value.author);
					}
				}else{
					if(type == 'new'){
						$('.newsList').find('.bookList').append(util.template(right,value));
					}else if(type == 'hot'){
						$('.hotList').find('.bookList').append(util.template(right,value));
					}else if(type == 'famous'){
						var famous = $(util.template(right,value))
						$('.famousList').find('.bookList').append(famous);
						$('.famousList .bookList').find('p').remove();
						famous.find('a').attr('href','books/famousMore.html?userid='+value.id+'&author='+value.author);
						famous.find('.authors').text(value.author).attr('title',value.author);
						famous.find('.bookList-img').attr('title',value.author);

					}
				}
			});

            // 通过type判断是否含有这个字段的列表信息，如果有则去掉none
            $("#content").find('.commonList[data-type='+type+']').removeClass('none');
		  },
		  /*
		   * 专区书籍
		   */
		  loadCateList:function(data,id,sid,text){
			  var li = '<li>\
				<a class="bookList-img" href="books/bookDetail.html?bookid=<%=id%>"><img src="<%=picurl%>" width="120" height="164" /></a>\
				<h3 class="ellipsis f14"><a href="books/bookDetail.html?bookid=<%=id%>" title="<%=name%>"><%=name%></a></h3>\
				<p class="color-red mt15">&#65509;<%=price%></p>\
			  </li>';
			  $('#'+id).find('.bookList').empty();
			  $.each(data,function(key,value){
				  $('#'+id).find('.bookList').append(util.template(li,value));
			  });

              // 判断：图书,原创,特价专区 跳转链接title是否为空
			  if(text == undefined){
			  	  var untext = $('#'+id).find(".comLeftTwo-tab li").eq(0).text();
			      $('#'+id).siblings('.titleWrap').find('a').attr('href','books/booklist.html?'+'opt='+sid+'&title='+untext);
			  }else{
			      $('#'+id).siblings('.titleWrap').find('a').attr('href','books/booklist.html?'+'opt='+sid+'&title='+text);
			  }
		  },
		  /*
		   * 专区模块
		   */
		  loadCateWrap:function(data){
			  var menu = '<li data-id="<%=id%>"><%=name%><span class="tabArrow"></span></li>';
			  var wrap = '<div class="commonList">\
				  <div class="titleWrap clearfix">\
					<h2 class="f_left"><%=name%></h2>\
					<a class="f_right mr10" href="#?id=<%=id%>">查看更多&gt;</a>\
				  </div>\
				  <div id="cate<%=id%>" class="categories-list clearfix">\
					<div class="comLeftTwo <%=cateType%>">\
					  <ul class="comLeftTwo-tab">\
					  </ul>\
					</div>\
					<div class="comRight comRightTwo">\
					  <ul class="bookList clearfix">\
					  </ul>\
					</div>\
				  </div>\
				</div>';
			  $.each(data,function(key,value){
				  if(key == 0){
					  value.cateType = 'comLeftTwo-ori';
				  }else if(key == 1){
					  value.cateType = 'comLeftTwo-magz';
				  }else{
					  value.cateType = 'comLeftTwo-disc';
				  }
				  var wrapper = $(util.template(wrap,value));
				  $('#categories').append(wrapper);
				  $.each(value.sortlist,function(k,sortlist){
					  categories[sortlist.id] = sortlist.booklist;
					  var li = $(util.template(menu,sortlist));
					  wrapper.find('.comLeftTwo-tab').append(li);
					  if(k == 0){
						  li.addClass('active');
						  inner.loadCateList(sortlist.booklist,'cate'+value.id,sortlist.id);
					  }

				  });

			  });
		  },
		  /*
		   * 切换专区子类型
		   */
		  switchCateType:function(){
			  $(document).on('click','.comLeftTwo-tab li',function(){
				  var id = $(this).data('id'),pid = $(this).parents('.categories-list').attr('id'),text = $(this).text();;
				  if($(this).hasClass('active'))
				     return;
				  $(this).addClass('active').siblings().removeClass('active');
				  inner.loadCateList(categories[id],pid,id,text);
			  });
		  },
		  /*
		   * 加载焦点图片
		   */
		   loadFocusImg:function(data){
			   var img = '<li><a href="<%=goUrl%>"><img src="<%=picurl%>" /></a></li>';
			   $.each(data,function(key,value){
				   var url = value.url;
				   if(url.indexOf('openItem') != -1){
					   url = url.replace('openItem://','');
					   var type = url.split('?')[0],id = url.split('?')[1];
					   if(type == 'top'){
						   value.goUrl = path + 'rank/rank.html?' + type + '&' +id;
					   }else if(type == 'book'){
						   value.goUrl = path + 'books/bookDetail.html?bookid=' + id.split('=')[1];
					   }else{
						   value.goUrl = path + 'information/info.html?opt=' + type + '&' +id;
					   }
				   }else{
					   value.goUrl = value.url;
				   }
				   var focusDot = $('<li></li>');
				   var li = $(util.template(img,value));
				   $('.banner ul').append(li);
				   $('.banner ol').append(focusDot);
				   if(key == 0){
					   focusDot.addClass('current');
					   li.addClass('current');
				   }
			   });
			   inner.bigBanner();
		   },
		   /*
		    * 图书畅销榜
		    */
			loadSellList:function(){
				var frist = '<p class="rankingFirst-img pr f_left">\
					<a href="'+path+'books/bookDetail.html?bookid=<%=id%>"><img src="<%=picurl%>" width="60" height="80" /></a>\
					<em class="rankingNum rankingFirst-num">1</em>\
				  </p>\
				  <div class="rankingFirst-info f_left">\
					<h3 class="ellipsis"><a title="<%=name%>" href="'+path+'books/bookDetail.html?bookid=<%=id%>"><%=name%></a></h3>\
					<h4 class="mt5"><%=author%></h4>\
				  </div>';
				var li = '<li class="clearfix">\
					<em class="rankingNum f_left"><%=index%></em>\
					<h3 class="ellipsis f_left"><a title="<%=name%>" href="'+path+'books/bookDetail.html?bookid=<%=id%>"><%=name%></a></h3>\
				  </li>';
				common.ajax.get('/ebook/sell',{},function(data){
					if(data.booklist !== undefined){
						$.each(data.booklist,function(key,value){
							if(key == 0){
								$('.rankingFirst').append(util.template(frist,value));
							}else{
								value.index = key+1;
								$('.rankingList').append(util.template(li,value));
							}
						});
					}
				});
			}
	}

	$(function(){
		inner.loadClassNavi();
		inner.loadBookshop();
		inner.switchCateType();
		inner.loadSellList();
	});

})(jQuery);