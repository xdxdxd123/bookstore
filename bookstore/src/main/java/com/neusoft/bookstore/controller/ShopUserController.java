package com.neusoft.bookstore.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.neusoft.bookstore.model.ShopUserModel;
import com.neusoft.bookstore.result.ResultMessage;
import com.neusoft.bookstore.service.IShopUserService;

@RestController
@RequestMapping(value="/ShopUser")
public class ShopUserController {
	 private IShopUserService isu=null;
	 @Autowired
	public void setIsu(IShopUserService isu) {
		this.isu = isu;
	}

	@RequestMapping(value="/add",method= {RequestMethod.POST})
	public ResultMessage add(ShopUserModel sum) throws Exception{
		ResultMessage result=new ResultMessage();
		result.setMessage("增加客户信息失败");
		isu.add(sum);
		result.setResult("Y");
		result.setMessage("增加客户信息成功");
		return result;
	}
	@RequestMapping(value="/modify",method= {RequestMethod.POST})
	public ResultMessage modify(ShopUserModel sum) throws Exception{
		ResultMessage result=new ResultMessage();
		result.setMessage("修改客户信息失败");
		isu.modify(sum);
 		result.setResult("Y");
 		result.setMessage("修改客户信息成功");
 		return result;
	}
	@RequestMapping(value="/delete",method= {RequestMethod.POST})
	public ResultMessage delete(ShopUserModel sum) throws Exception{
		ResultMessage result=new ResultMessage();
		result.setMessage("删除客户信息失败");
		isu.delete(sum);
		result.setResult("Y");
		result.setMessage("删除客户信息成功");
		return result;
	}
	@RequestMapping(value="/get",method= {RequestMethod.GET},produces= "application/JSON")
	public ShopUserModel get(@RequestParam int userid)throws Exception{
		return isu.get(userid);
	}
	@RequestMapping(value="/getListByAll",method= {RequestMethod.GET},produces="application/JSON")
	public List<ShopUserModel> getListByAll()throws Exception{
		return isu.getListByAll();
	}
	@RequestMapping(value="/validate",method= {RequestMethod.GET},produces="application/JSON")
	public Boolean validate(@RequestParam int userid,@RequestParam String password) throws Exception {
		return isu.validate(userid, password);
	}
	@RequestMapping(value="/checkUserExist",method= {RequestMethod.POST},produces="application/JSON")
	public Boolean checkUserExist(@RequestParam String username)throws Exception{
		boolean flag=false;
		flag =isu.checkUserExist(username) ;
		return  flag;  
	}
}
