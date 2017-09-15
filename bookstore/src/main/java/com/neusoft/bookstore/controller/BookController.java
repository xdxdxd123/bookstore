package com.neusoft.bookstore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.neusoft.bookstore.model.BookModel;
import com.neusoft.bookstore.result.ResultMessage;
import com.neusoft.bookstore.service.IBookService;

@RestController
@RequestMapping(value="/admin")
public class BookController {
	@Autowired
	private  IBookService  ibs;
	@RequestMapping(value="/add")
	public  ResultMessage  add(BookModel  bcm){
	ResultMessage  rm=	new  ResultMessage();
	try {
		ibs.add(bcm);
		rm.setMessage("添加图书成功");
	} catch (Exception e) {
		// TODO Auto-generated catch block
	rm.setError("添加图书失败");
	}
	return  rm;
	}

}
