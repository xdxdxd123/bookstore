// JavaScript Document

/*
 *  个人中心共用处理方法
 *  var userInfo  为个人中心页面全局变量，储存用户信息
 */

var userInfo = {};

(function($){
	var util = window.util,common = window.common;
	
	var inner = {
		/*
		 * 如果没有获取到本地保存的usertoken，直接跳转到登录页面
		 * 设置身份验证处理函数，code=210为token失效
		 */
		init:function(){
			var token = util.getCookie('usertoken');
			if(token == null){
				location.href = path + 'user/login.html';
			}

		},
		/*
		 * 获取用户信息并完善左边栏,需要进行身份验证
		 */
		getUserinfo:function(){
			common.ajax.get('/user/personal',{},function(data){
				userInfo = data;
				if(!$.isEmptyObject(userInfo)){
					var userPhoto = userInfo.picurl;
					if(userPhoto != ''){
						$('.userPhoto').find('img').attr('src',userPhoto);
					}
					$('.userNick').text(userInfo.truename);
				}
			},false,false,{isValidate:true});
		}
	}
	
	$(function(){
		inner.init();
		inner.getUserinfo();
	});
})(jQuery);