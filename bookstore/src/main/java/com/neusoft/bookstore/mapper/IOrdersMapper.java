package com.neusoft.bookstore.mapper; 

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import com.neusoft.bookstore.model.OrdersModel;

//客户订单
public interface IOrdersMapper {
	//添加客户订单
	public void insert(OrdersModel odm) throws Exception;
	//删除客户订单
	public void delete(OrdersModel odm) throws Exception;
	//修改客户订单
	public void update(OrdersModel odm) throws Exception;
	//取得客户订单
	public OrdersModel select(int orderid) throws Exception;
	//取得所有客户订单（无分页）
	public List<OrdersModel> selectListByAll() throws Exception;
	//取得所有客户订单（有分页）
	public List<OrdersModel> selectListByWithPage(RowBounds rb) throws Exception;
	//根据客户id取得客户订单
	public List<OrdersModel> selectListByShopUser(int userid) throws Exception;
	//取得订单总数
	public int selectCountAll() throws Exception;
}
