/*
 * @Author: Yzed 
 * @Date: 2019-04-06 08:16:59 
 * @Last Modified by: Yzed
 * @Last Modified time: 2019-04-06 08:28:32
 */

import _mm from '../util/mm'

const _payment = {
    //支付
    getPaymentInfo: function(orderNumber, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/order/pay.do'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error: reject
        })
    },
    //查询订单状态
    getPaymentStatus: function(orderNumber, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/order/query_order_pay_status.do'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error: reject
        })
    }
}
export default _payment