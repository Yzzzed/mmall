/*
 * @Author: Yzed 
 * @Date: 2019-02-23 00:33:16 
 * @Last Modified by: Yzed
 * @Last Modified time: 2019-02-23 00:36:23
 */

import _mm from '../util/mm'

let _cart = {
    //获取购物车数量
    getCartCount: function(resolve, reject){
       _mm.request({
           url: _mm.getServerUrl('/cart/get_cart_product_count.do'),
           success: resolve,
           error: reject
       })
   }
}

export default _cart