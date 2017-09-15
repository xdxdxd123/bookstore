package com.neusoft.bookstore;

import java.util.List;

import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import com.neusoft.bookstore.mapper.IBookMapper;
import com.neusoft.bookstore.mapper.IBookcatMapper;
import com.neusoft.bookstore.model.BookModel;
import com.neusoft.bookstore.model.BookcatModel;

public class TestBook_Bookcat {
	@Test
	public void test() throws Exception {
		ClassPathXmlApplicationContext cpac = new ClassPathXmlApplicationContext("context.xml");
		IBookMapper ibm = (IBookMapper) cpac.getBean("IBookMapper");
		IBookcatMapper ibcm = (IBookcatMapper) cpac.getBean("IBookcatMapper");
		BookcatModel bcm = new BookcatModel();
		bcm.setCatname("文学");
		ibcm.insert(bcm);
		BookModel bm = new BookModel();
		bm.setAuthor("sdf");
		bm.setBookcat(bcm);
		bm.setCatalog("dfgd");
		bm.setName("fasdf");
		bm.setDiscount(1);
		bm.setImage("fsdf");
		bm.setDescription("ddsfdsfdsf");
		bm.setPrice(10);
		bm.setRemaincount(2);
		bm.setSaleprice(10);
		ibm.insert(bm);
		ibm.insert(bm);
		ibm.insert(bm);
		ibm.insert(bm);
		ibm.insert(bm);
		ibm.insert(bm);
	List <BookModel>  list= ibm.selectBooksByBookcatId(bcm.getId());
	for(BookModel  bm1:list)
		System.out.println(bm1.getBookid());
		cpac.close();
	}
}
