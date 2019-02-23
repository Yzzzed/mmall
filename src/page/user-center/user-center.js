/*
 * @Author: Yzed 
 * @Date: 2019-03-02 15:50:36 
 * @Last Modified by: Yzed
 * @Last Modified time: 2019-03-02 17:23:49
 */

import './user-center.css'
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
    },
    onLoad: function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'user-center'
        })
        // 加载用户信息
        this.loadUserInfo()
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
    }
}

$(function(){
    page.init()
})