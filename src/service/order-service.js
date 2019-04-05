/*
 * @Author: Yzed 
 * @Date: 2019-03-31 16:36:46 
 * @Last Modified by: Yzed
 * @Last Modified time: 2019-04-05 21:06:13
 */

import _mm from '../util/mm'

const _order = {
    //获取商品列表
    getProductList: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/order/get_order_cart_product.do'),
            success: resolve,
            error: reject
        })
    },
    //获取订单列表
    getOrderList: function(ListParam, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/order/list.do'),
            data: ListParam,
            success: resolve,
            error: reject
        })
    },
    //提交订单
    createOrder: function(orderInfo,resolve,reject){
        _mm.request({
            url: _mm.getServerUrl('/order/create.do'),
            data: orderInfo,
            success: resolve,
            error: reject
        })
    },
    cancelOrder: function(orderNo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/order/cancel.do'),
            data: {
                orderNo: orderNo
            },
            success: resolve,
            error: reject
        })
    },
    //获取订单详情
    getOrderDetail: function(orderNo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/order/detail.do'),
            data: {
                orderNo: orderNo
            },
            success: resolve,
            error: reject
        })
    }
    
    
}

export default _order