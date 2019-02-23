/*
 * @Author: Yzed 
 * @Date: 2019-02-26 20:19:36 
 * @Last Modified by: Yzed
 * @Last Modified time: 2019-02-26 21:42:23
 */

import './user-pass-reset.css'
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
    data: {
        username    : '',
        question    : '',
        answer      : '',
        token       : '',
    },
    init: function(){
        this.onLoad()
        this.bindEvent()
    },
    onLoad: function(){
        this.loadStepUsername()
    },
    bindEvent: function(){
        // let _this = this
        //输入用户名的下一步的按钮点击
        $('#submit-username').click(() => {
            let username = $.trim($('#username').val())
            if(username){
                _user.getQuestion(username, (res) => {
                    this.data.username = username
                    this.data.question = res
                    this.loadStepQuestion()
                }, (errMsg) => {
                    formError.show(errMsg)
                })
            }
            else{
                formError.show('请输入正确的用户名')
            }
        })
        //输入密码提示问题答案中的按钮点击
        $('#submit-question').click(() => {
            let answer = $.trim($('#answer').val())
            if(answer){
                //检查密码提示问题答案
                _user.checkAnswer({
                    username : this.data.username,
                    question : this.data.question,
                    answer   : answer
                }, (res) => {
                    this.data.answer = answer
                    this.data.token = res
                    this.loadStepPassword()
                }, (errMsg) => {
                    formError.show(errMsg)
                })
            }
            else{
                formError.show('请输入正确的密码提示问题答案')
            }
        })
        //输入新密码后的按钮点击
        $('#submit-password').click(() => {
            let password = $.trim($('#password').val())
            if(password && password.length >= 6){
                //检查密码提示问题答案
                _user.resetPassword({
                    username    : this.data.username,
                    passwordNew : password,
                    forgetToken : this.data.token
                }, (res) => {
                    window.location.href = './result.html?type=pass-reset'
                }, (errMsg) => {
                    formError.show(errMsg)
                })
            }
            else{
                formError.show('请输入不少于6位的新密码')
            }
        })
    },
    //加载输入用户名
    loadStepUsername: function(){
        $('.step-username').show()
    },
    loadStepQuestion: function(){
        //清楚错误提示
        formError.hide()
        //容器切换
        $('.step-username').hide()
            .siblings('.step-question').show()
            .find('.question').text(this.data.question)
    },
    loadStepPassword: function(){
        //清楚错误提示
        formError.hide()
        //容器切换
        $('.step-question').hide()
            .siblings('.step-password').show()
    }
}

$(function(){
    page.init()
})