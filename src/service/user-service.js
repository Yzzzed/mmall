/*
 * @Author: Yzed 
 * @Date: 2019-02-22 23:51:26 
 * @Last Modified by: Yzed
 * @Last Modified time: 2019-02-23 00:33:19
 */

 import _mm from '../util/mm'

 let _user = {
     //登出
     logout: function(resolve, reject){
         _mm.request({
             url: _mm.getServerUrl('/user/logout.do'),
             method: 'POST',
             success: resolve,
             error: reject
         })
     },
     //检查登录状态
     checkLogin: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/get_user_info.do'),   //请求用户信息的接口 如果拿到用户信息 就有登录状态 否则没有
            method: 'POST',
            success: resolve,
            error: reject
        })
    }
 }

 export default _user