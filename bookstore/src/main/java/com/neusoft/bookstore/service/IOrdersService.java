package com.neusoft.bookstore.service;

import java.util.List;

import com.neusoft.bookstore.model.OrdersModel;

//客户订单业务
public interface IOrdersService {
	//增加订单
	public void add(OrdersModel odm) throws Exception;
	//修改订单
	public void modify(OrdersModel odm) throws Exception;
	//删除订单
	public void delete(OrdersModel odm) throws Exception;
	//通过ID查询订单
	public OrdersModel get(int orderid) throws Exception;
	//取得所有订单
	public List<OrdersModel> getListByAll() throws Exception;
	
}
