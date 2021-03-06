package com.neusoft.bookstore.model;

import org.apache.ibatis.type.Alias;
//订单详细信息表
@Alias("Orderdetail")
public class OrderdetailModel {
	//关联客户订单
	private OrdersModel  order;
	//关联图书详细信息
	private BookModel book;
	public OrdersModel getOrder() {
		return order;
	}
	public void setOrder(OrdersModel order) {
		this.order = order;
	}

	public BookModel getBook() {
		return book;
	}
	public void setBook(BookModel book) {
		this.book = book;
	}
	private int count;
	private int price;
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	
}
