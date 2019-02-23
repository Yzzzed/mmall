/*
 * @Author: Yzed 
 * @Date: 2019-03-03 09:48:08 
 * @Last Modified by: Yzed
 * @Last Modified time: 2019-03-03 10:20:48
 */

import './user-pass-update.css'
import '../common/nav/nav'
import '../common/header/header'
import navSide from '../common/nav-side/nav-side'
import _mm from '../../util/mm'
import _user from '../../service/user-service'


//page逻辑部分
let page = {
    init: function(){
        this.onLoad()
        this.bindEvent()
    },
    onLoad: function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'user-pass-update'
        })
    },
    bindEvent: function(){
        // 点击提交按钮后的动作
        $(document).on('click','.btn-submit', () => {
            let userInfo = {
                password        : $.trim($('#password').val()),
                passwordNew     : $.trim($('#password-new').val()),
                passwordConfirm : $.trim($('#password-confirm').val())
            },
                validateResult = this.validateForm(userInfo)

            if(validateResult.status){
                //更改用户密码
                _user.updatePassword({
                    passwordOld: userInfo.password, 
                    passwordNew: userInfo.passwordNew
                }, (res, msg) => {
                    _mm.successTips(msg)
                    window.location.href = './user-center.html'
                }, (errMsg) => {
                    _mm.errorTips(errMsg)
                })
            }else{
                _mm.errorTips(validateResult.msg)
            }
        })
    },
    //验证字段信息
    validateForm: function(formData){
        let result = {
            status: false,
            msg: ''
        }
        
        if(!_mm.validate(formData.password,'require')){
            result.msg = '原密码不能为空'
            return result
        }
        if(!formData.passwordNew || formData.passwordNew.length < 6){
            result.msg = '密码长度不能少于6位'
            return result
        }
        if(formData.passwordNew !== formData.passwordConfirm){
            result.msg = '两次密码输入不一致'
            return result
        }
        //通过验证 返回正确提示
        result.status = true
        result.msg = '验证通过'
        return result
    }
}

$(function(){
    page.init()
})