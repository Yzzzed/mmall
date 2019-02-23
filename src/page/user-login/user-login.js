/*
 * @Author: Yzed 
 * @Date: 2019-02-24 20:28:02 
 * @Last Modified by: Yzed
 * @Last Modified time: 2019-02-26 19:56:35
 */

import './user-login.css'
import '../common/nav-simple/nav-simple'
 
import _mm from '../../util/mm'
import _user from '../../service/user-service'

//表单里面错误提示
let formError = {
    show: function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg)
    },
    hide: function(){
        $('.error-item').hide().find('.err-msg').text('')
    }
}

//page逻辑部分
let page = {
    init: function(){
        this.bindEvent()
    },
    bindEvent: function(){
        // let _this = this
        //登录按钮的点击
        $('#submit').click( () =>{
            this.submit()
        })
        // 如果按下回车，也进行提交
        $('.user-content').keyup( (e) => {
            // keyCode == 13 表示回车键
            if(e.keyCode === 13){
                this.submit()
            }
        })
    },
    // 提交表单
    submit: function(){
        let formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        },
            //表单验证结果
            validateResult = this.formValidate(formData)
        //验证成功
        if(validateResult.status){
            _user.login(formData, (res) => {
                window.location.href = _mm.getUrlParam('redirect') || './index.html'
            }, (errMsg) => {
                formError.show(errMsg);
            })
        }
        //验证失败
        else{
            //错误提示
            formError.show(validateResult.msg)
        }
    },
    //表单字段验证
    formValidate: function(formData){
        let result = {
            status: false,
            msg: ''
        }
        if(!_mm.validate(formData.username,'require')){
            result.msg = '用户名不能为空'
            return result
        }
        if(!_mm.validate(formData.password,'require')){
            result.msg = '密码不能为空'
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