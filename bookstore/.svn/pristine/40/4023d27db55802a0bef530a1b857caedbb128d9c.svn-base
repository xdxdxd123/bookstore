package com.neusoft.bookstore.model;

import java.util.List;
import org.apache.ibatis.type.Alias;

//图书详细信息
@Alias("Book")
public class BookModel {
	private int bookid;
	private String name;
	private double price;
	private double saleprice;
	private String description;
	private String author;
	private String catalog;
	private String image;
	private double discount;
	private int remaincount;
	//关联订单详细信息
	private List<OrderdetailModel> orderdetails;
	//关联图书分类信息
	private BookcatModel bookcat;
	

	public int getBookid() {
		return bookid;
	}
	public void setBookid(int bookid) {
		this.bookid = bookid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public double getSaleprice() {
		return saleprice;
	}
	public void setSaleprice(double saleprice) {
		this.saleprice = saleprice;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}

	public String getCatalog() {
		return catalog;
	}
	public void setCatalog(String catalog) {
		this.catalog = catalog;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public double getDiscount() {
		return discount;
	}
	public void setDiscount(double discount) {
		this.discount = discount;
	}
	public int getRemaincount() {
		return remaincount;
	}
	public void setRemaincount(int remaincount) {
		this.remaincount = remaincount;
	}
	public List<OrderdetailModel> getOrderdetails() {
		return orderdetails;
	}
	public void setOrderdetails(List<OrderdetailModel> orderdetails) {
		this.orderdetails = orderdetails;
	}
	public BookcatModel getBookcat() {
		return bookcat;
	}
	public void setBookcat(BookcatModel bookcat) {
		this.bookcat = bookcat;
	}
	
}
