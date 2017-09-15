package com.neusoft.bookstore.model;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.type.Alias;
//客户订单
@Alias("Orders")
public class OrdersModel {
	private int orderid;
	private Date time;
	private String delivery;
	private String payment;
	private String status;
	//关联客户
	private ShopUserModel shopuser;
	//关联订单详细信息
	private List<OrderdetailModel> orderdetails;
	
	
	public int getOrderid() {
		return orderid;
	}
	public void setOrderid(int orderid) {
		this.orderid = orderid;
	}
	public Date getTime() {
		return time;
	}
	public void setTime(Date time) {
		this.time = time;
	}
	public String getDelivery() {
		return delivery;
	}
	public void setDelivery(String delivery) {
		this.delivery = delivery;
	}
	public String getPayment() {
		return payment;
	}
	public void setPayment(String payment) {
		this.payment = payment;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public ShopUserModel getShopuser() {
		return shopuser;
	}
	public void setShopuser(ShopUserModel shopuser) {
		this.shopuser = shopuser;
	}
	public List<OrderdetailModel> getOrderdetails() {
		return orderdetails;
	}
	public void setOrderdetails(List<OrderdetailModel> orderdetails) {
		this.orderdetails = orderdetails;
	}
	
	
}
