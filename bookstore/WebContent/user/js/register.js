// JavaScript Document
(function($){
	var util = window.util,common = window.common;
	var inner = {
		checkExist : function(){
			$('input[name="username"]').blur(function(){
				var username = $(this).attr('username'),value = $(this).val();
				var _this = $(this);
				if($.trim(value) == '')
				  return;
				common.ajax.post('ShopUser/checkUserExist.mvc',{type:username,value:value},function(data){
					if(data.flag==true){
						_this.siblings('.checkTips').hide();
						_this.parents('form').attr('isError','false');
					}else{
						_this.siblings('.checkTips').show();
						_this.parents('form').attr('isError','true');
					}
				},true,false);
			});
		},
	
		
		submitEvent : function(){
			var submitHandler = function(form){
				if(!$(form).find('.checkbox-info').is(':checked')){
					return false;
				}
				if($(form).attr('isError') != 'true'){
					var parms = $(form).serializeJson();
					parms['userpwd'] = mmd(parms['userpwd']);
					delete parms['surepwd'];
					
					if($(form).attr('id') == 'emailForm'){
						common.ajax.post('/user/register_foreamil',parms,function(data){
							console.log(data);
							if(data.code == "200"){
								$('input[name="userpwd"],input[name="surepwd"]').val(parms['userpwd']);
								alert('娉ㄥ唽鎴愬姛锛岀幇鍦ㄨ烦杞埌鐧诲綍椤甸潰锛�');
								location.href = 'login.html';
								return;
							}else{
								alert(data.message);
								return;
							}
						});
					}else{
						common.ajax.post('/user/reg',parms,function(data){
							if(data.code == "200"){
								$('input[name="userpwd"],input[name="surepwd"]').val(parms['userpwd']);
								alert('娉ㄥ唽鎴愬姛锛岀幇鍦ㄨ烦杞埌鐧诲綍椤甸潰锛�');
								location.href = 'login.html';
								return;
							}else{
								alert(data.message);
								return;
							}
						});
					}
				}
			}
			common.validation($('#mobileForm'),submitHandler);
			common.validation($('#emailForm'),submitHandler);
		},
		/*
		 * 鑾峰彇楠岃瘉鐮�
		 */
		 getTelCode : function(){
			 common.getTelCode($('#getMobileCode'),1,$('#mMobile'));
		 }
	}
	$(function(){
		inner.checkExist();
		inner.submitEvent();
		inner.getTelCode();
	})
})(jQuery)