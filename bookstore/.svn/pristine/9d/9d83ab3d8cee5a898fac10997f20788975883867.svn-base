// JavaScript Document
/*
 * 配置共用信息
 * 共用方法封装
 * 对外部插件的封装
 */
(function(common){
	util = window.util;
	if((document.domain).indexOf('gzebook.cn') != -1 ){
		util.ajaxSettings.apiUrl = 'http://service1.gzebook.cn/mobile';  //正式服务器
		util.ajaxSettings.dominUrl = 'http://service1.gzebook.cn/';
	}else{
		util.ajaxSettings.apiUrl = 'http://ggebook.xtownmobile.com/mobile'; //测试服务器
		util.ajaxSettings.dominUrl = 'http://ggebook.xtownmobile.com/'; //上傳照片地址
	}

    window.common = {
        init:function(){
           //配置接口地址及其他信息
			util.ajaxSettings.valiHandle = function(data){
				if(data.code !== undefined && (data.code == '210' || data.code == '102')){
					location.href = path + 'user/login.html';
				}else{
					return true;
				}
			};
		   /*
		    * 扩展 将form数据转化为json
		    */
			$.fn.serializeJson=function(){
				var serializeObj={};
				var array=this.serializeArray();
				var str=this.serialize();
				$(array).each(function(){
					if(serializeObj[this.name]){
						if($.isArray(serializeObj[this.name])){
							serializeObj[this.name].push(this.value);
						}else{
							serializeObj[this.name]=[serializeObj[this.name],this.value];
						}
					}else{
						serializeObj[this.name]=this.value;
					}
				});
				return serializeObj;
			};
			/*
			 * 防止跨域iframe提交
			 */
			 var xframe = '<meta http-equiv="X-Frame-Options" content="SAMEORIGIN ">',
			 	 antiClickjack = '<style id="antiClickjack">body{display:none !important;}</style>';
			 $('head').append(xframe);
			 $('head').append(antiClickjack);
			 if(document.domain === top.document.domain){
			 	var antiClickjack = document.getElementById("antiClickjack");
				antiClickjack.parentNode.removeChild(antiClickjack);
			 }else {
				top.location = self.location;
			 }

			 $('.footer-info').append('<p class="mt10">网络出版服务许可证：<a href="'+path+'icp.html" target="_blank">(总)网出证(粤)字第029号</a></p>');

			 /*
			  * 添加网站统计
			  */
			  if((document.domain).indexOf('gzebook.cn') != -1){
			  	 $('.footer-info').append('<script src="https://s4.cnzz.com/z_stat.php?id=1259073023&web_id=1259073023" language="JavaScript"></script>');
			  }

        },
		/*
		 * 简化aja调用方式
		 */
		ajax : {
			post : function(url,data,success,async,abortOnRetry,options){
				var prams = {
					type : 'post',
					url : url,
					data : data,
					success : success,
					async : async,
					abortOnRetry : abortOnRetry
				};
				var object;
				if(options){
					object = $.extend({},prams,options);
				}else{
					object = prams;
				}
				new util.ajax(object);
			},
			get : function(url,data,success,async,abortOnRetry,options){
				var prams = {
					type : 'get',
					url : url,
					data : data,
					success : success,
					async : async,
					abortOnRetry : abortOnRetry
				};
				var object;
				if(options){
					object = $.extend({},prams,options);
				}else{
					object = prams;
				}
				new util.ajax(object);
			}
		},
		/*
		 * 表单验证
		 */
		validation : function(form,callback){
			form.validate({
		        errorPlacement: function(error,element){		//用于自定义错误显示位置
		        	if(element.data('error')==='_myError'){
		        		error.addClass('myerror');
		        		error.appendTo(element.parent());
		        	}else{
		        		error.appendTo(element.parent());
		        	}
		        },
		        submitHandler:function(form){
					callback(form);
					return false;
		        }
		    });
		},
		/*
		 * 获取手机验证码
		 */
		getTelCode : function(obj,type,mobile,second){
			var ss = second === undefined ? 120 : second;
			var sss = ss;
			var sending = false;
			var timeout = function(){
			  setTimeout(function(){
				  --sss;
				if(sss>0){
				  obj.html(sss);
				  timeout();
				}else{
				  obj.html('获取验证码').attr('data-usable','true');
				  sss = ss;
				}
			  },1000);
			}
			obj.bind('click',function(){
				var mNum = mobile.val();
				if($(this).attr('data-usable') === 'false')
                    return false;
                if(!/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/.test(mNum)){
                	alert('请输入正确手机号码');
                	return;
                }
                if($('#phone-pic-vild').length > 0){
                	$('#phone-pic-vild').removeClass('none');
                	$('.pic-vild-ipt').val('');
                	//window.common.ajax.get('/user/verifyimage',{type:type,mobile:mNum},function(data){
                		//if()
                		$('.pic-vild-img').attr('src',util.ajaxSettings.apiUrl+'/user/verifyimage?type='+type+'&mobile='+mNum+'&XPS-Deviceos=windows_pc&_'+Math.random()*100000);
                	//});
                }else{
                	window.common.ajax.post('/user/sendsms',{type:type,mobile:mNum},function(data){
						if(data.code == "200"){
							obj.html('已发送');
							setTimeout(function(){
								obj.html(sss).attr('data-usable','false');
	                        	timeout();
							},500);
						}else{
							alert(data.message);
							return false;
						}
					});
                }
			});
			$('.pic-vild-img').bind('click',function(){
				$('.pic-vild-img').attr('src',util.ajaxSettings.apiUrl+'/user/verifyimage?type='+type+'&mobile='+mobile.val()+'&XPS-Deviceos=windows_pc&_'+Math.random()*100000);
			});
			$('.pic-vild-btn').bind('click',function(){
				console.log(sending);
				if(sending){
					return false;
				}
				sending = true;
				window.common.ajax.post('/user/sendsms',{type:type,mobile:mobile.val(),verifycode:$('.pic-vild-ipt').val()},function(data){
					if(data.code == "200"){
						obj.html('已发送');
						$('#phone-pic-vild').addClass('none');
						$('.pic-vild-tip').addClass('none');
						setTimeout(function(){
							obj.html(sss).attr('data-usable','false');
                        	timeout();
						},500);
					}else{
						$('.pic-vild-tip').text(data.message).removeClass('none');
						return false;
					}
				});
				setTimeout(function(){sending = false;},3000);
			});
			$('.pic-vild-close').bind('click',function(){
				$('#phone-pic-vild').addClass('none');
			});
		},
		/*
		 *  加载分页按钮
		 *  总页数超过10的处理  2016-05-05
		 */
		 addPagingBtn : function(total,pagesize,paginglist,pageno){
			 var pagenum = '<li class="pagenum" data-pageno="<%=num%>"><a href="javascript:void(0);"><%=num%></a></li>';
			 var pagecount = Math.ceil(total/pagesize),loadpages = new Array();
			 if(!paginglist)
			 	paginglist = $('#paginglist');
			 if(!pageno)
			 	pageno = 1;
			 paginglist.empty();
			 if(pagecount > 0){
				  if(!pageno || pageno - 6 < 1 || pagecount <= 10){
					  if(pagecount > 10){
						loadpages = [1,2,3,4,5,6,7,8,9,10];

					  }else{
						for(var i = 1 ; i <= pagecount ; i++){
						  loadpages.push(i);
						}
					  }
				  }else{
					  if(pageno - 6 >= 1){
						  if(pageno + 4 < pagecount){
							  for(var i = pageno - 5 ; i <= pageno ; i++){
								  loadpages.push(i);
							  }
							  for(var i = pageno +1 ; i <= pageno+4 ; i++){
								  loadpages.push(i);
							  }
						  }else{
							  var prevs = 9 - (pagecount - pageno);
							  for(var i = pageno - prevs ; i <= pageno ; i++){
								  loadpages.push(i);
							  }
							  for(var i = pageno +1 ; i <= pagecount ; i++){
								  loadpages.push(i);
							  }
						  }
					  }
				  }
				  paginglist.append('<li class="pagefrist"><a href="javascript:void(0);">首页</a></li>\
				  <li class="pageprev"><a href="javascript:void(0);">上一页</a></li>');
				  for(var i = 1; i<=loadpages.length; i++){
					  paginglist.append(util.template(pagenum,{num:loadpages[i-1]}));
				  }
				  paginglist.append('<li class="pagenext"><a href="javascript:void(0);">下一页</a></li>\
				  <li class="pagelast"  data-total = '+total+' data-count = '+pagecount+' data-size = '+pagesize+'><a href="javascript:void(0);">尾页</a></li>');
				 paginglist.find('.pagenum').removeClass('actived');
				  paginglist.find('.pagenum[data-pageno="'+pageno+'"]').addClass('actived');

			  }
	     },
	    // 判断手机端与移动端
		goPAGE : function() {
			if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
				if((document.domain).indexOf('gzebook.cn') != -1){
					window.location.href="http://www.gzebook.cn/wap/index.html";
				}else{
					window.location.href="http://ggprotal.xtownmobile.com/wap/index.html";
				}

			}
		}
    };


    var inner = {
    }

})(window.common = window.common || {});
$(function(){
	Number.prototype.toRound = function(d)
   {
	   var s=this+"";if(!d)d=0;
	   if(s.indexOf(".")==-1)s+=".";s+=new Array(d+1).join("0");
	   if (new RegExp("^(-|\\+)?(\\d+(\\.\\d{0,"+ (d+1) +"})?)\\d*$").test(s))
	   {
		   var s="0"+ RegExp.$2, pm=RegExp.$1, a=RegExp.$3.length, b=true;
		   if (a==d+2){a=s.match(/\d/g); if (parseInt(a[a.length-1])>4)
		   {
			   for(var i=a.length-2; i>=0; i--) {a[i] = parseInt(a[i])+1;
				   if(a[i]==10){a[i]=0; b=i!=1;} else break;}
		   }
			   s=a.join("").replace(new RegExp("(\\d+)(\\d{"+d+"})\\d$"),"$1.$2");
		   }if(b)s=s.substr(1);return (pm+s).replace(/\.$/, "");} return this+"";
   };
    window.common.init();
    common.goPAGE();
});
