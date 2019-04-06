/*
 * @Author: Yzed 
 * @Date: 2019-04-06 08:04:11 
 * @Last Modified by: Yzed
 * @Last Modified time: 2019-04-06 08:49:44
 */

import './payment.css'
import '../common/nav/nav'
import '../common/header/header'
import _mm from '../../util/mm'
import _payment from '../../service/payment-service'
import templateIndex from './payment.string'

//page逻辑部分
const page = {
    data: {
        orderNumber: _mm.getUrlParam('orderNumber')
    },
    init: function(){
        this.onLoad()
    },
    onLoad: function(){ 
        this.loadPaymentInfo()
    },
    //加载订单详情
    loadPaymentInfo: function(){
        const _this = this,
            $pageWrap = $('.page-wrap')
        let paymentHtml = ''
        $pageWrap.html('<div class="loading"></div>')
        _payment.getPaymentInfo(_this.data.orderNumber, res => {
            paymentHtml = _mm.renderHtml(templateIndex, res)
            $pageWrap.html(paymentHtml)
            _this.listenOrderStatus()
        }, errMsg => {
            $pageWrap.html(`<p class="err-tip">${errMsg}</p>`)
        })
    },
    //监听订单状态
    listenOrderStatus: function(){
        const _this = this
        _this.paymentTimer = window.setInterval(() => {
            _payment.getPaymentStatus(_this.data.orderNumber, res => {
                if(res == true){
                    window.location.href = `./result.html?type=payment&orderNumber=${_this.data.orderNumber}`
                }
            })
        }, 5000)
    }
}

$(function(){
    page.init()
})