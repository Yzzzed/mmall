/*
 * @Author: Yzed 
 * @Date: 2019-02-22 23:51:26 
 * @Last Modified by: Yzed
 * @Last Modified time: 2019-03-03 10:28:43
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
    },
    login: function(userInfo,resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/login.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    checkUsername: function(username,resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/check_valid.do'),
            data: {
                type: 'username',
                str: username
            },
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    register: function(userInfo,resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/register.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //获取用户密码提示问题
    getQuestion: function(username,resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/forget_get_question.do'),
            data: {
                username: username
            },
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //检查密码提示问题答案
    checkAnswer: function(userInfo,resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/forget_check_answer.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    resetPassword: function(userInfo,resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/forget_reset_password.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //获取用户信息
    getUserInfo: function(resolve,reject){
        _mm.request({
            url: _mm.getServerUrl('/user/get_information.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    // 更新个人信息
    updateUserInfo: function(userInfo,resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/update_information.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //登录状态下更新密码
    updatePassword: function(userInfo,resolve,reject){
        _mm.request({
            url: _mm.getServerUrl('/user/reset_password.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        })
    }
 }

 export default _user