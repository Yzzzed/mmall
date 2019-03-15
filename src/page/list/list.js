/*
 * @Author: Yzed 
 * @Date: 2019-03-07 20:38:58 
 * @Last Modified by: Yzed
 * @Last Modified time: 2019-03-09 11:29:10
 */

import './list.css'
import '../common/nav/nav'
import '../common/header/header'
import _mm from '../../util/mm'
import _product from '../../service/product-service'
import templateIndex from './list.string'
import Pagination from '../../util/pagination/pagination'

let page = {
    data: {
        listParam: {
            keyword     : _mm.getUrlParam('keyword')    || '',
            categoryId  : _mm.getUrlParam('categoryId') || '',
            orderBy     : _mm.getUrlParam('orderBy')    || 'default',
            pageNum     : _mm.getUrlParam('pageNum')    || 1,
            pageSize    : _mm.getUrlParam('pageSize')   || 20
        }
    },
    init: function(){
        this.onLoad()
        this.bindEvent()
    },
    onLoad: function(){
        this.loadList()
    },
    bindEvent: function(){
        let _this = this
        $('.sort-item').click(function(){
            let $this = $(this)
            //每次点击排序页码变回1
            _this.data.listParam.pageNum = 1
            //默认排序
            if($this.data('type') === 'default'){
                if($this.hasClass('active')){
                    return
                }
                else{
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc')
                    _this.data.listParam.orderBy = 'default'
                }
            }
            //价格排序
            else if($this.data('type') === 'price'){
                $this.addClass('active').siblings('.sort-item')
                    .removeClass('active asc desc')
                //判断升降序
                if(!$this.hasClass('asc')){
                    $this.addClass('asc').removeClass('desc')
                    _this.data.listParam.orderBy = 'price_asc'
                }
                else{
                    $this.addClass('desc').removeClass('asc')
                    _this.data.listParam.orderBy = 'price_desc'
                }
            }
            //重新加载列表页
            _this.loadList()
        })
    },
    //加载list数据
    loadList: function(){
        let listHtml = '',
            listParam = this.data.listParam,
            $pListCon = $('.p-list-con')
        $pListCon.html('<div class="loading"></div>')
        //删除重复多余的参数
        listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId)
        //请求
        _product.getProductList(listParam, (res) => {
            listHtml = _mm.renderHtml(templateIndex, {
                list: res.list
            })
            $pListCon.html(listHtml)
            
            this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            })
        }, (errMsg) => {
            _mm.errorTips(errMsg)
        })
    },
    //加载分页信息
    loadPagination: function(pageInfo){
        this.pagination ? '' : (this.pagination = new Pagination())
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : (pageNum) => {
                this.data.listParam.pageNum = pageNum
                this.loadList()
            }
        }))
    }
}

$(function(){
    page.init()
})