/*
 * @Author: Yzed 
 * @Date: 2019-03-07 20:42:11 
 * @Last Modified by: Yzed
 * @Last Modified time: 2019-03-15 08:31:05
 */

import _mm from '../util/mm'

let _product = {
    //获取商品列表
   getProductList: function(listParam,resolve, reject){
       _mm.request({
           url: _mm.getServerUrl('/product/list.do'),
           data: listParam,
           success: resolve,
           error: reject
       })
    },
    getProductDetail: function(productId,resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/product/detail.do'),
            data: {
                productId : productId
            },
            success: resolve,
            error: reject
        })
     },
    
}

export default _product