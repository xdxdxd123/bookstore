package com.neusoft.bookstore.mapper; 

import java.util.List;

import org.apache.ibatis.session.RowBounds;

import com.neusoft.bookstore.model.ShopUserModel;
//客户
public interface IShopUserMapper {
	//添加用户
	public void insert(ShopUserModel sum) throws Exception;
	//删除用户
	public void delete(ShopUserModel sum) throws Exception;
	//修改用户
	public void update(ShopUserModel sum) throws Exception;
	//取得用户信息
	public ShopUserModel select(int userid) throws Exception;
	//取得所有用户列表（无分页）
	public List<ShopUserModel> selectListByAll() throws Exception;
	//取得所有用户列表（有分页）
	public List<ShopUserModel> selectListByWithPage(RowBounds rb) throws Exception;
	//取得指定功能的用户列表
	public List<ShopUserModel> selectListByFunction(int functionno) throws Exception;
	//取得用户数量
	public int selectCountByAll() throws Exception;
	//修改密码
	public void updateForPassword(ShopUserModel sum) throws Exception;
   //通过用户名检查用户是否存在
	public ShopUserModel checkUserExist(String username)  throws  Exception;
}
