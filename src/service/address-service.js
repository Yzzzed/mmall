/*
 * @Author: Yzed 
 * @Date: 2019-04-02 09:43:56 
 * @Last Modified by: Yzed
 * @Last Modified time: 2019-04-04 18:07:37
 */

import _mm from '../util/mm'

const _address = {
    //获取地址列表
   getAddressList: function(resolve, reject){
       _mm.request({
           url: _mm.getServerUrl('/shipping/list.do'),
           data: {
               pageSize : 50
           },
           success: resolve,
           error: reject
       })
    },
    //新建收件人
    save: function(addressInfo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/shipping/add.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        })
    },
    //更新地址
    update: function(addressInfo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/shipping/update.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        })
    },
    //删除地址
    deleteAddress: function(shippingId, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/shipping/del.do'),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        })
    },
    //获取单个地址信息
    getAddress: function(shippingId, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/shipping/select.do'),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        })
    }
}

export default _address