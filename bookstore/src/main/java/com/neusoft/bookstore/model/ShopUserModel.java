package com.neusoft.bookstore.model;

import java.util.List;

import org.apache.ibatis.type.Alias;
//客户
@Alias("ShopUser")
public class ShopUserModel {
	private int userid;
	private String username;
	private String password;
	private String realname;
	private String tel;
	private String address;
	private String email;
	//关联客户订单
	private List<OrdersModel> orders;
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public String getRealname() {
		return realname;
	}
	public void setRealname(String realname) {
		this.realname = realname;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public List<OrdersModel> getOrders() {
		return orders;
	}
	public void setOrders(List<OrdersModel> orders) {
		this.orders = orders;
	}
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	
	
}
