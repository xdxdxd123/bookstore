package com.neusoft.bookstore.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.neusoft.bookstore.mapper.IShopUserMapper;
import com.neusoft.bookstore.model.ShopUserModel;
import com.neusoft.bookstore.service.IShopUserService;
//用户业务实现类
@Service("ShopUserService")
@Transactional
public class ShopUserServiceImpl implements IShopUserService{
	
	private IShopUserMapper sump;
	@Autowired
	public void setSump(IShopUserMapper sump) {
		this.sump = sump;
	}
	@Override
	public void add(ShopUserModel sum) throws Exception{
		sump.insert(sum);
	}
	@Override
	public void modify(ShopUserModel sum) throws Exception{
		sump.update(sum);
	}
	@Override
	public void delete(ShopUserModel sum) throws Exception{
		sump.delete(sum);
	}
	@Override
	public ShopUserModel get(int userid) throws Exception{
		return sump.select(userid);
	}
	@Override
	public List<ShopUserModel> getListByAll()throws Exception{
		return sump.selectListByAll();
	}
	//登录验证
	@Override
	public boolean validate(int userid,String password) throws Exception{
		boolean result =false;
		ShopUserModel sum =sump.select(userid);
		if(sum!=null&&sum.getPassword()!=null&&sum.getPassword().equals(password)){
			return true;
		}
		return result;
	}
	//验证用户是否存在
	@Override
	public boolean checkUserExist(String username) throws Exception{
		boolean result =false;
		ShopUserModel sum =sump.checkUserExist(username);;
		if(sum!=null)
			return true;
		return result;
	}
	@Override
	public int getPageCountByAll(int rows) throws Exception {
		// TODO Auto-generated method stub
		return 0;
	}
	@Override
	public int getCountByAll() throws Exception {
		// TODO Auto-generated method stub
		return  sump.selectCountByAll() ;
	}
	@Override
	public void ChangePassword(ShopUserModel sum) throws Exception {
		// TODO Auto-generated method stub
	sump.update(sum);
	}
	
}
