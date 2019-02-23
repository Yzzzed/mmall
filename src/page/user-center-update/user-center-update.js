/*
 * @Author: Yzed 
 * @Date: 2019-03-02 17:43:50 
 * @Last Modified by: Yzed
 * @Last Modified time: 2019-03-02 18:18:31
 */

import './user-center-update.css'
import '../common/nav/nav'
import '../common/header/header'
import navSide from '../common/nav-side/nav-side'
import _mm from '../../util/mm'
import _user from '../../service/user-service'
import templateIndex from './index.string'


//page逻辑部分
let page = {
    init: function(){
        this.onLoad()
        this.bindEvent()
    },
    onLoad: function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'user-center'
        })
        // 加载用户信息
        this.loadUserInfo()
    },
    bindEvent: function(){
        // 点击提交按钮后的动作
        $(document).on('click','.btn-submit', () => {
            let userInfo = {
                phone       : $.trim($('#phone').val()),
                email       : $.trim($('#email').val()),
                question    : $.trim($('#question').val()),
                answer      : $.trim($('#answer').val())
            },
                validateResult = this.validateForm(userInfo)

            if(validateResult.status){
                //更改用户信息
                _user.updateUserInfo(userInfo, (res, msg) => {
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
    // 加载用户信息
    loadUserInfo: function(){
        let userHtml = ''
        _user.getUserInfo((res) => {
            userHtml = _mm.renderHtml(templateIndex, res)
            $('.panel-body').html(userHtml)
        }, (errMsg) => {
            _mm.errorTips(errMsg)
        })
    },
    //验证字段信息
    validateForm: function(formData){
        let result = {
            status: false,
            msg: ''
        }
        
        if(!_mm.validate(formData.phone,'phone')){
            result.msg = '手机号格式不正确'
            return result
        }
        if(!_mm.validate(formData.email,'email')){
            result.msg = '邮箱格式不正确'
            return result
        }
        if(!_mm.validate(formData.question,'require')){
            result.msg = '密码提示问题不能为空'
            return result
        }
        if(!_mm.validate(formData.answer,'require')){
            result.msg = '问题答案不能为空'
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