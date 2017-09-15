package com.neusoft.bookstore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.neusoft.bookstore.model.BookcatModel;
import com.neusoft.bookstore.result.ResultMessage;
import com.neusoft.bookstore.service.IBookcatService;

@RestController
@RequestMapping("/admin")
public class BookcatController {
	@Autowired
	private  	IBookcatService  ibs ;
@RequestMapping(value="/add")
public  ResultMessage  add(BookcatModel  bcm  )
{
	ResultMessage  rm=new  ResultMessage();
	try {
		ibs.add(bcm);
		rm.setMessage("添加成功");
	} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
		rm.setMessage("添加失败");
	}
			return  rm;
}


@RequestMapping(value="/modify" )
public ResultMessage  modify(BookcatModel  bcm)
{
ResultMessage     rm=new  ResultMessage();
try {
	ibs.modify(bcm);
} catch (Exception e) {
	// TODO Auto-generated catch block
	e.printStackTrace();
}
return rm;
}

}
