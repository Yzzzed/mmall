/*
 * @Author: Yzed 
 * @Date: 2019-04-05 20:18:35 
 * @Last Modified by: Yzed
 * @Last Modified time: 2019-04-05 21:01:05
 */

import './order-detail.css'
import '../common/nav/nav'
import '../common/header/header'
import navSide from '../common/nav-side/nav-side'
import _mm from '../../util/mm'
import _order from '../../service/order-service'
import templateIndex from './order-detail.string'

//page逻辑部分
const page = {
    data: {
        orderNumber: _mm.getUrlParam('orderNumber')
    },
    init: function(){
        this.onLoad()
        this.bindEvent()
    },
    onLoad: function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'order-list'
        }) 
        this.loadDetail()
    },
    bindEvent: function(){
        const _this = this
        $(document).on('click', '.order-cancel', function(){
            if(window.confirm('确定要取消该订单吗?')){
                _order.cancelOrder(_this.data.orderNumber,res => {
                    _mm.successTips('取消订单成功~')
                    _this.loadDetail()
                }, errMsg => {
                    _mm.errorTips(errMsg)
                })
            }
        })
    },
    //加载订单详情
    loadDetail: function(){
        const _this = this,
            $content = $('.content')
        let orderDetailHtml = ''
        $content.html('<div class="loading"></div>')
        _order.getOrderDetail(_this.data.orderNumber, res => {
            _this.dataFilter(res)
            orderDetailHtml = _mm.renderHtml(templateIndex, res)
            $content.html(orderDetailHtml)
        }, errMsg => {
            $content.html(`<p class="err-tip">${errMsg}</p>`)
        })    
    },
    dataFilter: function(data){
        data.needPay = data.status == 10
        data.isCancelable = data.status == 10
    }
}

$(function(){
    page.init()
})