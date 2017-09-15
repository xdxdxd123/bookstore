// JavaScript Document
(function(util){
	/*
	 *  基础工具类
	 */
	 var cache = {};
	 window.util = {
		 /*
		  *错误信息处理，全局配置
		  */
		 ajaxSettings : {
			 apiUrl:'',           //api接口服务地址
			 readUrl:'',          //阅读器目录地址
			 loginUrl: '',        //未授权验证时是否跳到指定页面
			 errorpage: '',       //请求错误时跳转的错误页面
			 errorHandle: null,   //错误信息处理  function(error_msg,error_status){}  token失效：code=210
			 validate: {},         //身份验证信息，带在头部信息
			 valiHandle: null      //身份验证处理方法，通过返回true，不通过自行跳转或者弹出错误信息
		 },
		 /*
		  *ajax封装函数
		  *内置错误信息处理及信息验证，配合window.util.ajaxSettings设置
		  *使用分页功能时需要注意：@pageListLoad 参数是在第一次调用及每次切换分页时调用的，@success 参数只在第一次调用，需要在该函数中处理页面及其他的信息
		  */
		 ajax:function(options){
			 var settings = window.util.ajaxSettings;
			 var defaults = {
				  type:'post',            //请求方式  默认'post'
				  url:'',                //发送请求的地址
				  async: true,           //默认同步请求
				  data:'',               //请求参数，无参数时不需填写,如果有分页列表，页码请求参数名为：pageno
				  dataType:'json',       //返回数据类型，默认'json'
				  headers: {},           //头部信息
				  success: null,         //请求成功时处理函数
				  isValidate: false,     //是否进行身份验证
				  paging: false,         //是否为分页列表  为 true 时需设置pagePrev,pageNext,pageNum对象，页码参数固定为:pageno
				  pagePrev: '',          //上一页按钮
				  pageNext: '',          //下一页按钮
				  pageFrist: '',         //首页
				  pageLast: '',          //尾页
				  pageNum: '',           //页码按钮 页码数属性：data-pageno="xx"
				  pageListLoad: null,    //分页列表加载处理函数
				  abortOnRetry: true     //是否需要拦截重复ajax
			  };
			  var _this = this;
			  _this.settings = $.extend( true, {}, defaults, options );
			  var pageno = parseInt(_this.settings.data.pageno);
			 /*if(!_this.settings.isValidate){
				  _this.settings.headers = {};
			  }*/
			  /*
			   * PC端请求接口必须带入参数（广购）
			   */
			  if(_this.settings.data == '' || $.isEmptyObject(_this.settings.data)){
				  _this.settings.data = {'XPS-Deviceos':'windows_pc','XPS-Brower':window.util.browser.appname};
			  }else{
				  _this.settings.data['XPS-Deviceos'] = 'windows_pc';
				  _this.settings.data['XPS-Brower'] = window.util.browser.appname;
			  }
			  _this.settings.headers = $.extend({},_this.settings.headers,settings.validate);
			  //调用ajax请求
			  ajax(_this.settings.type,_this.settings.url,_this.settings.data,function(data){
				  if(_this.settings.isValidate){
					  if(settings.valiHandle(data)){  // 验证通过
						  if(_this.settings.paging){
							  window.scrollTo(0,0);
							  _this.settings.pageListLoad(data,1);
							  _this.settings.success(data);
						  }else{
							  _this.settings.success(data);
         				  }
					  }
				  }else{
					  if(_this.settings.paging){
						  window.scrollTo(0,0);
						  _this.settings.pageListLoad(data,1);
						  _this.settings.success(data);
					  }else{
						  _this.settings.success(data);
					  }
				  }
			  },_this.settings.async,_this.settings.headers,_this.settings.dataType,_this.settings.abortOnRetry);
			  
			  //绑定分页按钮事件，并初始化样式
			  if(_this.settings.paging){
				  function pageAjax(_pageno){
					  _this.settings.data.pageno = _pageno;
					  ajax(_this.settings.type,_this.settings.url,_this.settings.data,function(data){
						  if(_this.settings.isValidate){
							  if(settings.valiHandle(data)){  // 验证通过
							  	 window.scrollTo(0,0);
							     _this.settings.pageListLoad(data,_pageno);
								 pageno = _pageno;
							  }
						  }else{
							  window.scrollTo(0,0);
							  _this.settings.pageListLoad(data,_pageno);
							  pageno = _pageno;
						  }
						 // $(_this.settings.pageNum).removeClass('actived');
						 // $(_this.settings.pageNum).eq(pageno-1).addClass('actived');
					  },_this.settings.async,_this.settings.headers,_this.settings.dataType,_this.settings.abortOnRetry);
				  }

				  function prev(){
					  if(pageno == 1)
					     return;
					  pageAjax(pageno-1);
					   var pageToal = parseInt($(_this.settings.pageLast).data('total')),pageCount = parseInt($(_this.settings.pageLast).data('count')),pageSize = parseInt($(_this.settings.pageLast).data('size'));
					  window.common.addPagingBtn(pageToal,pageSize,$(this).parent('ul'),pageno-1);
				  }
				  function next(){
					  var pageToal = parseInt($(_this.settings.pageLast).data('total')),pageCount = parseInt($(_this.settings.pageLast).data('count')),pageSize = parseInt($(_this.settings.pageLast).data('size'));
					  if(pageno == pageCount)
					     return;
					  pageAjax(pageno+1);
					   var pageToal = parseInt($(_this.settings.pageLast).data('total')),pageCount = parseInt($(_this.settings.pageLast).data('count')),pageSize = parseInt($(_this.settings.pageLast).data('size'));
					  window.common.addPagingBtn(pageToal,pageSize,$(this).parent('ul'),pageno+1);
				  }
				  function frist(){
					  var pageToal = parseInt($(_this.settings.pageLast).data('total')),pageCount = parseInt($(_this.settings.pageLast).data('count')),pageSize = parseInt($(_this.settings.pageLast).data('size'));
					  if(pageno == 1)
					     return;
					  pageAjax(1);
					  window.common.addPagingBtn(pageToal,pageSize,$(this).parent('ul'),1);
				  }
				  function last(){
					  var pageToal = parseInt($(_this.settings.pageLast).data('total')),pageCount = parseInt($(_this.settings.pageLast).data('count')),pageSize = parseInt($(_this.settings.pageLast).data('size'));
					  if(pageno == pageCount)
					     return;
					  pageAjax(pageCount);
					  window.common.addPagingBtn(pageToal,pageSize,$(this).parent('ul'),pageCount);
				  }
				  function pagenum(){
					  if($(this).hasClass('actived'))
					     return;
					  pageAjax(parseInt($(this).data('pageno')));
					   var pageToal = parseInt($(_this.settings.pageLast).data('total')),pageCount = parseInt($(_this.settings.pageLast).data('count')),pageSize = parseInt($(_this.settings.pageLast).data('size'));
					  window.common.addPagingBtn(pageToal,pageSize,$(this).parent('ul'),parseInt($(this).data('pageno')));
				  }
				  
				   //上一页
				  //$(document).off('click',_this.settings.pagePrev,prev);
				  $(document).on('click',_this.settings.pagePrev,prev);
				  //下一页
				  //$(document).off('click',_this.settings.pageNext,next);
				  $(document).on('click',_this.settings.pageNext,next);
				  //首页
				  //$(document).off('click',_this.settings.pageFrist,frist);
				  $(document).on('click',_this.settings.pageFrist,frist);
				  //尾页
				  //$(document).off('click',_this.settings.pageLast,last);
				  $(document).on('click',_this.settings.pageLast,last);
				  //点击页码
				  //$(document).off('click',_this.settings.pageNum,pagenum);
				  $(document).on('click',_this.settings.pageNum,pagenum);
			  }
		 },		 
		  /*
		   * 表单验证
		   * 页面引入 jquery-html5Validate.js 详情可以参考html5Validate-demo文件
		   * form参数 为表单对象，callback参数 表单验证通过并提交成功时执行的回调函数，settings验证配置 可以扩展验证规则
		   * 通过定义表单的@data-url属性设置提交路径，@method属性设置表单的提交方式
		   */
		  validate:function(form,callback,settings){
			  if(typeof settings == 'undefined')
			    settings = {};
			  $(form).html5Validate(function(){
				  window.util.ajax({
					  url : $(form).data('url'),
					  type : $(form).attr('method'),
					  success : callback
				  });
			  },settings);
		  },
		  /*
		  *模板编译为可以用于页面呈现的函数，通过JSON数据源生成复杂的HTML并呈现出来
		  *在加载列表时可以将需要替换的JSON数据键名预先写在html代码中，调用后返回替换后的html代码
		  *@str : html代码，字符串类型， @data ：JSON数据，{"username":"张三",....}
		  *调用方式：1. window.util.template('<p><%=name%></p>',{name:'张三')
		  *         2.<script type="text/html" id="template"><p><%=name%></p></script> -> $('#result').html(window.util.template("template",{name:'张三'}));
		  */
		  template:function tmpl(str, data, isreapt){
			  var fn = !/\W/.test(str) ? cache[str] = cache[str] || tmpl(document.getElementById(str).innerHTML) : new Function("obj",
						"var p=[],print=function(){p.push.apply(p,arguments);};" +
						"with(obj){p.push('" +
						str
						  .replace(/[\r\t\n]/g, " ")
						  .split("<%").join("\t")
						  .replace(/((^|%>)[^\t]*)'/g, "$1\r")
						  .replace(/\t=(.*?)%>/g, "',$1,'")
						  .split("\t").join("');")
						  .split("%>").join("p.push('")
						  .split("\r").join("\\'")
					  + "');}return p.join('');");
			  if(data){
				  if(isreapt){
					  var result = '';
					  data.forEach(function(value){
						  result += fn( value );
					  });
					  return result;
				  }else{
					  return fn( data );
				  }
			  }else{
				  return fn;
			  }
			  //return data ? fn( data ) : fn;
		  },
		  /*
		   * 获取连接参数值， @name参数名
		   */
		   getQueryString:function(name){
			   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			   var r = window.location.search.substr(1).match(reg);
			   if (r != null) return decodeURI(r[2]); return null;
		   },
		   /*
		    * 获取cookie值
		    */
		   getCookie:function(name){
			  var arr,reg=new RegExp("(^| )"+encrypt.encode(name)+"=([^;]*)(;|$)");
			  if(arr=document.cookie.match(reg))
			  return encrypt.decode(arr[2]);
			  else
			  return null;
		   },
		   /*
		    * 设置cookie值
		    */
		   setCookie:function(name,value,expires,path,domain,secure){
			  var cookieText=encrypt.encode(name)+"="+encrypt.encode(value);
			  if(expires){
				   var date = new Date(); 
    			   date.setTime(date.getTime() + expires*60*60*1000); //小时
				   cookieText+=";expires="+date.toGMTString();
			  }
			  if(path){
				   cookieText+=";path="+path;
			  }else{
				   cookieText+=";path=/";
			  }
			  if(domain){
				   cookieText+=";domain="+domain;
			  }
			  if(secure){
				   cookieText+=";secure="+secure;
			  }
			  document.cookie = cookieText;
		   },
		   /*
		    * 取消cookie值
		    */
		   delCookie:function(name,path,domain,secure){
			  window.util.setCookie(name,"",-1,path,domain,secure);
		   },
		   /*
		    * 保存sessionStorage
		    */
		   setSeStorage:function(name,value){
			   name = encrypt.encode(name);
			   value = encrypt.encode(value);
			   sessionStorage.setItem(name,value);
		   },
		   /*
		    * 获取sessionStorage值
		    */
		   getSeStorage:function(name){
			   name = encrypt.encode(name);
			   var val = sessionStorage.getItem(name);
			   if(typeof val == 'undefined' || val == null)
			     val = null;
			   else
			     val = encrypt.decode(val);
			   return val;
		   },
		   /*
		    * 删除指定sessionStorage
		    */
		   delSeStorage:function(name){
			   name = encrypt.encode(name);
			   sessionStorage.removeItem(name);
		   },
		   /*
		    * 获取浏览器名称及版本号
		    */
		   browser:browserInfo()
	 }; 
	 
	 
	 
	 
	 
	 /*
	  *内部函数，ajax请求配置函数
	  */
	 var pendingRequests = {};
	 var ajax = function(type, url, param, callback, async, headers, dataType,abortOnRetry){
		 var eSettings = window.util.ajaxSettings;
		 if(url.indexOf('http://') == -1 && url.indexOf('https://') == -1)
		   url = eSettings.apiUrl+url;
		 $.ajax({  
			  type:type, 
			  url:url,  
			  cache:false,  
			  ifModified: false,  
			  async: undefined === async ? true : async, 
			  data:param, 
			  dataType:undefined === dataType ? "json" : dataType, 
			  headers: undefined === headers ? {} : headers, 
			  beforeSend:function(xhr){  //发送请求前处理重复请求
				  var key = url;
				  var flag = abortOnRetry === undefined ? true : abortOnRetry;
				  if(/.+&_=[\d]{13}$/.test(key)){
					  key = key.split('&_=')[0];
				  }
				  if(!flag){
				     return true;
				  }else{
					 if(pendingRequests[key] !== undefined){
						 console.log('重复发送');
						 xhr.abort();
					 }else{
						 pendingRequests[key] = xhr;
					 }
				  }
				  //清空序列，1.5S后可以重新请求
				  var timer = setTimeout(function(){
					  timer = null;
					  pendingRequests = {};
				  },1500);
			  },
			  success:function(data){  
			      callback(data);
				  refreshCookie();
			  },
			  error:function(XMLHttpRequest, textStatus){  //请求失败时调用此函数
			      var error_msg;
				  switch (XMLHttpRequest.status){  
					  case(500):  
						  error_msg = "服务器系统内部错误";  
						  break;  
					  case(401):  
					      if(eSettings.loginUrl != '')
						     location.href = eSettings.loginUrl;  //跳转到登录页面
						  error_msg = "请求未经授权";  
						  break;  
					  case(403):  
						  error_msg = "无权限执行此操作";  
						  break;  
					  case(404):  
						  error_msg = "请求的资源不存在";  
						  break;
					  case(408):  
						  error_msg = "请求超时";  
						  break;  
					  default:
						  error_msg = "未知错误";  
				  }
				  if(eSettings.errorpage != ''){
					  location.href = eSettings.errorpage+'?status='+XMLHttpRequest.status;  //跳转到错误处理页面并发送错误类型
				  }else if(typeof eSettings.errorHandle == 'function'){
					  eSettings.errorHandle(error_msg,XMLHttpRequest.status);
				  }else{
					  console.log(error_msg);
				  }
				  XMLHttpRequest = null;
			  },
			  complete:function (XMLHttpRequest, textStatus,errorThrown) {  //请求完成后回调函数
			      pendingRequests[url] = null;  //请求完成在清楚线程缓存
				  XMLHttpRequest = null;
			  }
		  });
	 }
	 
	 function browserInfo(){  
		var browser = {appname: 'unknown', version: 0},  
			userAgent = window.navigator.userAgent.toLowerCase();  
		if ( /(msie|firefox|opera|chrome|netscape)\D+(\d[\d.]*)/.test( userAgent ) ){  
			browser.appname = RegExp.$1;  
			browser.version = RegExp.$2;  
		} else if ( /version\D+(\d[\d.]*).*safari/.test( userAgent ) ){ // safari  
			browser.appname = 'safari';  
			browser.version = RegExp.$2;  
		}  
		return browser;  
	 }
	 /*
	  * 刷新cookie保存的登录用户信息
	  */
	 function refreshCookie(){
		 var util = window.util;
		 var userid = util.getCookie('userid'),
			 username = util.getCookie('username'),
			 usertoken = util.getCookie('usertoken'),
			 usermac = util.getCookie('usermac'),
			 usertype = util.getCookie('usertype');
		 if(userid == null || username == null || usertoken == null || usertype == null)
		    return;
		 util.setCookie('userid',userid,1);
		 util.setCookie('username',username,1);
		 util.setCookie('usertoken',usertoken,1);
		 util.setCookie('usermac',usermac,1);
		 util.setCookie('usertype',usertype,1);
	 }
	 
})(window.util = window.util || {});


(function() {  
})();

