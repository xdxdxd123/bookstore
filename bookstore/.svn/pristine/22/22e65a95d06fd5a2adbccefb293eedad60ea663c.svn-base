// JavaScript Document

(function($){
	var common = window.common,
		url = '/user/login',
		type;
	var inner = {
		/*
		 * 登录
		 */
		login : function(){
			$(document).keypress(function(e){
				var keycode = (e.keyCode ? e.keyCode : e.which);  
				if(keycode == '13'){  
					$('#loginBtn').trigger('click');  
				}  
			});
			$('#loginBtn').bind('click',function(){
				var username = $('#username').val(),password = $('#password').val(),params,typedata;
				if($.trim(username) != '' && password != ''){
					params = {'XPS-Username':username,'XPS-Password':mmd(password)};
					if(type){
						typedata = {'XPS-Logintype':type};
						params = {'XPS-Username':username,'XPS-Password':password};
					}
					common.ajax.post(url,typedata,function(data){
						if(data.code === undefined || data.code == '200'){
							var userinfo = data.userinfo;
							util.setCookie('userid',userinfo.userid,1);
							util.setCookie('username',userinfo.username,1);
							util.setCookie('usertoken',userinfo.usertoken,1);
							util.setCookie('usermac',userinfo.usermac,1);
							util.setCookie('usertype',userinfo.usertype,1);
							$('#errorTip').hide();
							setTimeout(function(){
								location.href = '../index.html';
							},200);
						}else{
							$('#errorTip').show();
						}
					},true,true,{headers:params});
				}else{
					$('#errorTip').show();
				}
			});
		},
		changeType : function(){
			$('.landing-ul li').bind('click',function(){
				var _this = $(this);
				type = _this.attr('data-type');
				if(type != '0'){
					url = '/user/cooperationuserlogin';
				}
				_this.addClass('contentli').siblings().removeClass('contentli');
			});
		},
		thridLogin: function(){
			WB2.anyWhere(function (W) {
			    W.widget.connectButton({
			        id: "login-sina",
			        type: '3,2',
			        callback: {
			            login: function (o) { //登录后的回调函数
			                inner.thridReqs(o.id,o.screen_name,o.avatar_hd,3);
			            },
			            logout: function () { //退出后的回调函数
			            }
			        }
			    });
			});
			QC.Login.signOut();
			QC.Login({btnId:"login-qq"}, function(oInfo, oOpts){
			   QC.Login.getMe(function(openId, accessToken){
		          	inner.thridReqs(openId,oInfo.nickname,oInfo.figureurl_qq_2,1);
		        });
			});	
		},
		thridReqs: function(uid,name,hd,type){
			var ps = mmd(uid.toString());
			var params = {
					'XPS-Uuid': uid,
					'XPS-Password': ps,
					'XPS-Logintype': type,
					'XPS-Username': name,
					'XPS-Headimgurl': hd
				};
			common.ajax.post('/user/thirdlogin',params,function(data){
				var userinfo = data.userinfo;
				util.setCookie('userid',userinfo.userid,1);
				util.setCookie('username',userinfo.username,1);
				util.setCookie('usertoken',userinfo.usertoken,1);
				util.setCookie('usermac',userinfo.usermac,1);
				util.setCookie('usertype',userinfo.usertype,1);
				setTimeout(function(){
					location.href = '../index.html';
				},200);
			});
		}
	}
	
	$(function(){
		inner.login();
		inner.changeType();
		inner.thridLogin();
	});
	$(window).load(function() {
		WB2.logout(function() {
		});
	});
})(jQuery);
