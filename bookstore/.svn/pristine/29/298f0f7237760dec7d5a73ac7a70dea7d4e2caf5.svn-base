package com.neusoft.bookstore.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.neusoft.bookstore.mapper.IBookcatMapper;
import com.neusoft.bookstore.model.BookcatModel;
import com.neusoft.bookstore.service.IBookcatService;


@Service("BookcatService")
@Transactional
public class BookcatServiceImpl implements  IBookcatService{
@Autowired
private  IBookcatMapper   ibcm;
	
	
	@Override
	public void add(BookcatModel bcm) throws Exception {
		// TODO Auto-generated method stub
		ibcm.insert(bcm);
	}

	@Override
	public void modify(BookcatModel bcm) throws Exception {
		// TODO Auto-generated method stub
		ibcm.update(bcm);
	}

	@Override
	public void delete(BookcatModel bcm) throws Exception {
		// TODO Auto-generated method stub
		ibcm.delete(bcm);
	}

	@Override
	public BookcatModel get(int catid) throws Exception {
		// TODO Auto-generated method stub
		return    ibcm.select(catid);
	}

	@Override
	public List<BookcatModel> getListByAll() throws Exception {
		// TODO Auto-generated method stub
		return  ibcm.selectListByAll();
	}

}
