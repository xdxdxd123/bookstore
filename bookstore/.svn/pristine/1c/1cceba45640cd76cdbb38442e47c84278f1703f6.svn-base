package com.neusoft.bookstore;

import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import com.neusoft.bookstore.mapper.IBookcatMapper;
import com.neusoft.bookstore.model.BookcatModel;

public class TestDB {
	@Test
	public void testDB() throws Exception {
		// TODO Auto-generated method stub
		ClassPathXmlApplicationContext ac = new ClassPathXmlApplicationContext("context.xml");
		IBookcatMapper ibcm = (IBookcatMapper) ac.getBean("IBookcatMapper");
		BookcatModel bcm = new BookcatModel();
		bcm.setId(2);
		bcm.setCatname("文学");
		ibcm.insert(bcm);
		ac.close();
	}

}
