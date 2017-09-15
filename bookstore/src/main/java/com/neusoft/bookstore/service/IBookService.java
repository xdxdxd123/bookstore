package com.neusoft.bookstore.service;

import java.util.List;


import com.neusoft.bookstore.model.BookModel;

//图书详细信息业务
public interface IBookService {
	//增加图书信息
	public void add(BookModel bm) throws Exception;
	//修改图书信息
	public void modify(BookModel bm) throws Exception;
	//删除图书信息
	public void delete(BookModel bm) throws Exception;
	//通过ID查询图书信息
	public BookModel get(int bookid) throws Exception;
	//取得所有图书信息
	public List<BookModel> getListByAll() throws Exception;
	//取得所有图书详细信息（有分页）
	public List<BookModel> selectListByWithPage(int rows,int page)  throws   Exception;
	
}
