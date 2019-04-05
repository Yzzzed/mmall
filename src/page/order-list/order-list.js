/*
 * @Author: Yzed 
 * @Date: 2019-04-05 08:00:07 
 * @Last Modified by: Yzed
 * @Last Modified time: 2019-04-05 20:20:35
 */

import './order-list.css'
import '../common/nav/nav'
import '../common/header/header'
import navSide from '../common/nav-side/nav-side'
import _mm from '../../util/mm'
import _order from '../../service/order-service'
import templateIndex from './order-list.string'
import Pagination from '../../util/pagination/pagination'


//page逻辑部分
const page = {
    data: {
        listParam: {
            pageNum: 1,
            pageSize: 10
        }
    },
    init: function(){
        this.onLoad()
    },
    onLoad: function(){
        this.loadOrderList()
        // 初始化左侧菜单
        navSide.init({
            name: 'order-list'
        }) 
    },
    //加载订单列表
    loadOrderList: function(){
        const _this = this,
            $listCon = $('.order-list-con')
        let orderListHtml = ''
        $listCon.html('<div class="loading"></div>')
        _order.getOrderList(this.data.listParam, res => {
            orderListHtml = _mm.renderHtml(templateIndex, res)
            $listCon.html(orderListHtml)
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            })
        }, errMsg => {
            $listCon.html('<p class="err-tip">加载订单失败，请刷新~</p>')
        })
        
    },
    //加载分页信息
    loadPagination: function(pageInfo){
        this.pagination ? '' : (this.pagination = new Pagination())
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : (pageNum) => {
                this.data.listParam.pageNum = pageNum
                this.loadOrderList()
            }
        }))
    }
}

$(function(){
    page.init()
})