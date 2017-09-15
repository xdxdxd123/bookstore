package com.neusoft.bookstore.service.impl;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.neusoft.bookstore.mapper.IBookMapper;
import com.neusoft.bookstore.model.BookModel;
import com.neusoft.bookstore.service.IBookService;


@Service("BookService")
@Transactional
public class BookServiceImpl implements IBookService {
	@Autowired
	private  IBookMapper  ibm;
	
	@Override
	public void add(BookModel bm) throws Exception {
		// TODO Auto-generated method stub
ibm.insert(bm);
	}

	@Override
	public void modify(BookModel bm) throws Exception {
		// TODO Auto-generated method stub
ibm.update(bm);
	}

	@Override
	public void delete(BookModel bm) throws Exception {
		// TODO Auto-generated method stub
ibm.delete(bm);
	}

	@Override
	public BookModel get(int bookid) throws Exception {
		// TODO Auto-generated method stub
		return   ibm.select(bookid);
	}

	@Override
	public List<BookModel> getListByAll() throws Exception {
		// TODO Auto-generated method stub
		return ibm.selectListByAll();
	}

	@Override
	public List<BookModel> selectListByWithPage(int rows, int page) throws Exception {
		// TODO Auto-generated method stub
		
		RowBounds  rb=new  RowBounds((rows-1)*page,rows);
		return  ibm.selectListByWithPage(rb);
	}

}
