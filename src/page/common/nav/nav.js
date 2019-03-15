/*
 * @Author: Yzed 
 * @Date: 2019-02-22 21:35:47 
 * @Last Modified by: Yzed
 * @Last Modified time: 2019-03-07 20:54:12
 */

 import './nav.css'
 import _mm from '../../../util/mm'
 import _user from '../../../service/user-service'
 import _cart from '../../../service/cart-service'

 //导航
 let nav = {
    init: function(){
        this.bindEvent()
        this.loadUserInfo()
        this.loadCartCount()
        return this     //this指向它的调用者
    },
    bindEvent: function(){
        //登录点击事件
        $('.js-login').click(() => {
            _mm.doLogin()
        })
        //注册点击事件
        $('.js-register').click(() => {
            window.location.href = './user-register.html'
        })
        //退出点击事件
        $('.js-logout').click(() => {
            _user.logout((res) => {
                
                /*  
                 *  登出成功的话就刷新一下会重新请求接口
                 *  res作为参数传给_user.logout里面的resolve
                 *  通过resolve传给_mm.success
                 */
                
                window.location.reload()    
            },(errMsg) => {
                _mm.errorTips(errMsg)
            })
        })
    },
    //加载用户信息
    loadUserInfo: function() {
        _user.checkLogin((res) => {
            $('.user.not-login').hide().siblings('.user.login').show()
                .find('.username').text(res.username)
        }, (errMsg) =>{
            //啥也不做
        })
    },
    //加载购物车数量
    loadCartCount:function(){
        _cart.getCartCount((res) => {
            $('.nav .cart-count').text(res || 0)
        }, (errMsg) => {
            $('.nav .cart-count').text(0)
        })
    }
 }

 export default nav.init()