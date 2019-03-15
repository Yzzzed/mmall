/*
 * @Author: Yzed 
 * @Date: 2019-03-09 11:28:35 
 * @Last Modified by: Yzed
 * @Last Modified time: 2019-03-15 12:57:50
 */

import './detail.css'
import '../common/nav/nav'
import '../common/header/header'
import _mm from '../../util/mm'
import _product from '../../service/product-service'
import _cart from '../../service/cart-service'
import templateIndex from './detail.string'

let page = {
    data: {
        productId : _mm.getUrlParam('productId') || '',
    },
    init: function(){
        this.onLoad()
        this.bindEvent()
    },
    onLoad: function(){
        if(!this.data.productId){
            _mm.goHome()
        }
        this.loadDetail()
    },
    bindEvent: function(){
        let _this = this
        //图片预览
        $(document).on('mouseenter','.p-img-item', function(){
            let imgUrl = $(this).find('.p-img').attr('src')
            $('.main-img').attr('src', imgUrl)
        })
        //加减操作
        $(document).on('click','.p-count-btn', function(){
            let type        = $(this).hasClass('plus') ? 'plus' : 'minus',
                $pCount     = $('.p-count'),
                curCount    = parseInt($pCount.val()),
                minCount    = 1,
                maxCount    = _this.data.detailInfo.stock || 1
            
            if(type === 'plus'){
                $pCount.val(curCount < maxCount ? curCount + 1 : maxCount)
            }
            else if(type === 'minus'){
                $pCount.val(curCount > minCount ? curCount - 1 : minCount)
            }
        })
        //加入购物车
        $(document).on('click','.cart-add', () => {
            _cart.addToCart({
                productId : this.data.productId,
                count     : $('.p-count').val() 
            }, (res) => {
                window.location.href = './result.html?type=cart-add'
            }, (errMsg) => {
                _mm.errorTips(errMsg)
            })
        })
    },  
    //加载商品数据
    loadDetail: function(){
        let html = '',
            $pageWrap = $('.page-wrap')
        
        $pageWrap.html('<div class="loading"></div>')

        _product.getProductDetail(this.data.productId, res => {
            this.filter(res)
            this.data.detailInfo = res
            
            html = _mm.renderHtml(templateIndex, res)
            $pageWrap.html(html)
        }, errMsg => {
            $pageWrap.html('<p class="err-tip">获取商品信息失败~</p>')
        })
    },
    //数据匹配
    filter: function(data){
        data.subImages = data.subImages.split(',')
    }
}

$(function(){
    page.init()
})
