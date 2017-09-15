// JavaScript Document
/*
 * 对页面共用功能处理
 */
(function(pages){
	var util = window.util,common = window.common;
	window.pages = {
		init:function(){
			inner.isLogined();
			inner.initSearch();
			inner.classMenuEvent();
			inner.goBookrack();
			inner.loadArea();
			
			//隐私申明
			if(util.ajaxSettings.apiUrl != 'http://ggebook.xtownmobile.com/mobile'){
				$('a[href*="information/info.html?opt=sysnews&id=13"]').attr('href',path + 'information/info.html?opt=sysnews&id=81');
			}
		}
	}
	
	var inner = {
		/*
		 *判断用户是否登录
		 *切换topBar显示的信息
		 */
		isLogined:function(){
			var username = util.getCookie('username');
			var token = util.getCookie('usertoken');
			var mac = util.getCookie('usermac');
			var user_type = util.getCookie('usertype');
			//用户登录
			if(token != null){
				//设置token验证，可在ajax调用时决定使不使用验证
				window.util.ajaxSettings.validate = {'XPS-Usertoken':token,'XPS-ID':mac};
				inner.showCartNum();
				inner.loginout();
			}
			if(username != null){
				var userType = util.getQueryString('usertype');
				$('.userName').html(username);
				if (userType == null) {
					//隐藏未登录信息
					$('#bShare,.gotoLogin,.webNavi').hide();
					//显示登录后信息
					$('.welcome,.topBar-menu-logined').show();
					/*
					 *
					 * 查看用户类型，显示对应类型链接，如：作者申请或作者空间
					 *
					 */
					if (user_type == '0') {
						$('#author_apply,#press_apply').show();
					}else if (user_type == '1') {
						$('#author_house,#press_apply').show();
					}else if (user_type == '2') {
						$('#author_apply,#press_house').show();
					}else if (user_type == '3') {
						$('#author_house,#press_house').show();
					}
				}else{
					//隐藏未登录信息
					$('.gotoLogin').hide();
					//显示登录后信息
					$('.welcomeRoom').show();
					/*
					 *
					 * 查看用户类型，显示对应类型链接，如：作者申请或作者空间
					 *
					 */
					if (userType == '1') {
						if (user_type == '1') {
							$('.press_apply').show();
						}else if (user_type == '3') {
							$('.press_house').show();
						}
					}else if (userType == '2') {
						if (user_type == '2') {
							$('.author_apply').show();
						}else if (user_type == '3') {
							$('.author_house').show();
						}
					}
				}

				//显示购物车商品个数
				/*
				 * 点击用户名进入个人资料页面
				 */
				$('.userName').click(function(){
					if(util.getCookie('usertoken') != null){
						location.href = path + 'user/profiles.html';
					}else{
						location.href = path + 'user/login.html';
					}
				});
			}
		},
		/*
		 * 关键字搜索
		 */
		initSearch:function(){
			$('#searchBtn').bind('click',function(){
				var searchText = $('#searchIpt').val();
				if($.trim(searchText) == '')
				  return;
				searchText = encodeURIComponent(searchText);
				surl = path + 'search/search.html?key=' + searchText;
				location.href = surl;
			});
			$(document).keydown(function(e){
				if(e.keyCode == "13"){
					$('#searchBtn').trigger("click");
				}
			})
		},
		/*
		 * 底部专区列表加载
		 */
		loadArea:function(){
			var helpTitle = '<%=name%>';
			var helpList = '<li><a href="'+path+'information/info.html?opt=sysnews&id=<%=id%>"><%=name%></a></li>';
			common.ajax.get('/user/findsysnews',{},function(data){
				if (!$.isEmptyObject(data)) {
					$.each(data, function (i,val) {
						$('#helpArea>li>p').eq(i).append(util.template(helpTitle,val));
						$.each(val.data, function (j,v) {
							$('.areaList').eq(i).append(util.template(helpList,v));
						});
					})
				}
			});
		},
	   /*
		* 图书分类菜单列表
		*/
		classMenuEvent:function(){
			if($('.classNaviWrap').length == 0)
			   return;
			var subClassify = {};
			/*
			 * 操作事件
			 */
			 $(document).on('click','.classNaviBig-title',function(){
				 var parent = $(this).parent(),siblings = parent.siblings();
				 siblings.find('.classNaviBig-title').removeClass('active');
				 siblings.find('.classNaviSmall').slideUp(250).find('li').removeClass('actived');
				 $(this).toggleClass('active').next('.classNaviSmall').slideToggle(250);
				 $('.classNaviThird').removeClass('open');
			 });
			 $(document).on('click','.classNaviSmall li',function(){
				 var subid = $(this).data('id'),
				     thirds = subClassify[subid];
					 offsetTop = $(this).position().top;
					 secname = $(this).find('a').text();
				 $('.classNaviSmall li').removeClass('actived');
				 $('.classNaviThird').removeClass('open');
				 $(this).addClass('actived');
				 if(thirds !== undefined && thirds.length > 0){
					 $('.classNaviThird').empty();
					 $.each(thirds,function(key,third){
						 $('.classNaviThird').append('<a href="../classify/classify.html?id='+third.id+'&secname='+secname+'&thridname='+third.name+'">'+third.name+'</a>');
					 });
					 setTimeout(function(){
						 $('.classNaviThird').css('top',offsetTop+'px').addClass('open');
					 },100);
				 }
			 });
			
			/*
			 * 加载一二级分类
			 */
			common.ajax.get('/ebook/category',{},function(data){
				if(data.sorttypes !== undefined){
					var classifyData = data.sorttypes;
					$.each(classifyData,function(key,frist){
						//一级
						var li = $('<li data-id="'+frist.id+'"></li>');
						$('.classNaviBig').append(li);
						li.append('<p class="classNaviBig-title">'+frist.name+'</p>');
						var classNaviSmall = $('<ul class="classNaviSmall none"></ul>');
						var seconds = frist.categories;
						if(seconds.length > 0){
							//二级
							li.append(classNaviSmall);
							$.each(seconds,function(k,second){
								classNaviSmall.append('<li data-id="'+second.id+'"><a href="../classify/classify.html?id='+second.id+'&secname='+second.name+'">'+second.name+'</a></li>');
								if(second.subcategories !== undefined){
									subClassify[second.id] = second.subcategories;
								}
							});
						}
					});
				}
			});
		},
		/*
		 *  我的书架
		 */
		goBookrack:function(){
			$('#goBookrack').click(function(){
				var token = util.getCookie('usertoken');
				if(token != null){
					location.href = path + 'user/bookrack.html';
				}else{
					location.href = path + 'user/login.html';
				}
			});
		},
		/*
		 * 购物车数量
		 */
		showCartNum:function(){
			common.ajax.get('/user/shoppingcartnum',{},function(data){
				if(data.totalnum !== undefined){
					$('#cartNum').text(data.totalnum);
				}
			});
		},
		/*
		 * 退出登录
		 */
		 loginout:function(){
			 $('.loginOut').click(function(){
				 util.delCookie('userid');
				 util.delCookie('username');
				 util.delCookie('usertoken');
				 util.delCookie('usermac');
				 location.reload();
			 });
		 }
	} 
})(window.pages = window.pages || {});
$(function(){
	window.pages.init();
});