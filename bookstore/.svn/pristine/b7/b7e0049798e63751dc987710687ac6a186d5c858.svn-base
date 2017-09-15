package com.neusoft.bookstore.mapper; 

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import com.neusoft.bookstore.model.OrderdetailModel;

//订单详细信息
public interface IOrderdetailMapper {
	//添加订单详细信息
	public void insert(OrderdetailModel odm) throws Exception;
	//删除订单详细信息
	public void delete(OrderdetailModel odm) throws Exception;
	//修改订单详细信息
	public void update(OrderdetailModel odm) throws Exception;
	//取得订单详细信息
	public OrderdetailModel select(int orderid) throws Exception;
	//取得所有订单详细信息（无分页）
	public List<OrderdetailModel> selectListByAll() throws Exception;
	//取得所有订单详细信息（有分页）
	public List<OrderdetailModel> selectListByWithPage(RowBounds rb) throws Exception;
	
}
