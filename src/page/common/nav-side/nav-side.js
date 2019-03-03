/*
 * @Author: Yzed 
 * @Date: 2019-02-23 22:26:58 
 * @Last Modified by: Yzed
 * @Last Modified time: 2019-03-03 12:10:57
 */

import './nav-side.css'
import _mm from '../../../util/mm'
import templateIndex from './nav-side.string'

//侧边导航
let navSide = {
    option: {
        name: '',
        navList: [
            {name: 'user-center',desc: '个人中心',href: './user-center.html'},
            {name: 'order-list',desc: '我的订单',href: './order-list.html'},
            {name: 'user-pass-update',desc: '修改密码',href: './user-pass-update.html'},
            {name: 'about',desc: '关于MMall',href: './about.html'}
        ]
    },
   init: function(option){
       $.extend(this.option,option)
        this.renderNav()
   },
   //渲染导航菜单
   renderNav: function(){
    //计算active数据
    for(let item of this.option.navList){
        if(item.name === this.option.name){
            item.isActive = true
        }
    }
    //渲染数据
    let navHtml = _mm.renderHtml(templateIndex, {
        navList: this.option.navList
    })
    //把html放入容器
    $('.nav-side').html(navHtml)
   }
}

export default navSide