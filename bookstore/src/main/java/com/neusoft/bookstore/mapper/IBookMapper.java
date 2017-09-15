package com.neusoft.bookstore.mapper; 

import java.util.List;
import org.apache.ibatis.session.RowBounds;
import com.neusoft.bookstore.model.BookModel;

//图书详细信息
public interface IBookMapper {
	//添加图书详细信息
	public void insert(BookModel bm) throws Exception;
	//删除图书详细信息
	public void delete(BookModel bm) throws Exception;
	//修改图书详细信息
	public void update(BookModel bm) throws Exception;
	//取得图书详细信息
	public BookModel select(int bookid) throws Exception;
	//取得所有图书详细信息（无分页）
	public List<BookModel> selectListByAll() throws Exception;
	//取得所有图书详细信息（有分页）
	public List<BookModel> selectListByWithPage(RowBounds rb) throws Exception;
	//根据搜索条件取得图书目录书（分页）
	public List<BookModel> selectListByConditionWithPage(String name,String author,RowBounds rb) throws Exception;
	//取得指定类型的图书目录（分页）
	public List<BookModel> selectListByBookcatWithPage(int catid,RowBounds rb) throws Exception;
	//取得指定图书类型的所有的图书
	public List<BookModel>selectBooksByBookcatId(int catid)  throws Exception;
}
