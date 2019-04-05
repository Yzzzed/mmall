/*
 * @Author: Yzed 
 * @Date: 2019-03-17 09:23:52 
 * @Last Modified by: Yzed
 * @Last Modified time: 2019-03-31 16:26:59
 */

import './cart.css'
import '../common/header/header'
import nav from '../common/nav/nav'
import _mm from '../../util/mm'
import _cart from '../../service/cart-service'
import templateIndex from './cart.string'

let page = {
    data: {
        
    },
    init: function(){
        this.onLoad()
        this.bindEvent()
    },
    onLoad: function(){
        
        this.loadCart()
    },
    bindEvent: function(){
        let _this = this
        //商品选择与取消
        $(document).on('click','.cart-select', function(){
            let $this = $(this),
                productId = $this.parents('.cart-table').data('product-id')
            //选中
            if($this.is(':checked')){
                _cart.selectProduct(productId, (res) => {
                    _this.renderCart(res)
                }, (errMsg) => {
                    _this.showCartError()
                })
            }
            //取消选中
            else{
                _cart.unselectProduct(productId, (res) => {
                    _this.renderCart(res)
                }, (errMsg) => {
                    _this.showCartError()
                })
            }
        })

        //商品全选与取消
        $(document).on('click','.cart-select-all', function(){
            let $this = $(this)
            //全选
            if($this.is(':checked')){
                _cart.selectAllProduct((res) => {
                    _this.renderCart(res)
                }, (errMsg) => {
                    _this.showCartError()
                })
            }
            //全选
            else{
                _cart.unselectAllProduct((res) => {
                    _this.renderCart(res)
                }, (errMsg) => {
                    _this.showCartError()
                })
            }
        })

        //修改商品数量
        $(document).on('click','.count-btn', function(){
            let $this = $(this),
                $pCount = $this.siblings('.count-input'),
                curCount = parseInt($pCount.val()),
                type = $this.hasClass('plus') ? 'plus' : 'minus',
                productId = $this.parents('.cart-table').data('product-id'),
                minCount = 1,
                maxCount = parseInt($pCount.data('max')),
                newCount = 0
            if(type === 'plus'){
                if(curCount >= maxCount){
                    _mm.errorTips('商品数量已达到上限')
                    return
                }
                newCount = curCount + 1
            }
            else if(type = 'minus'){
                if(curCount < minCount){
                    return
                }
                newCount = curCount - 1
            }
            //更新商品数量
            _cart.updateProduct({
                productId : productId,
                count : newCount
            }, (res) => {
                _this.renderCart(res)
            }, (errMsg) => {
                _this.showCartError()
            })
        })
        //删除单个商品
        $(document).on('click','.cart-delete', function(){
            if(window.confirm('确认要删除该商品吗?')){
                let productId = $(this).parents('.cart-table').data('product-id')
                _this.deleteCartProduct(productId)
            }
        })
        //删除选中商品
        $(document).on('click','.delete-selected', function(){
            if(window.confirm('确认要删除选中的商品吗?')){
                let arrProductIds = [],
                    $selectedItem = $('.cart-select:checked')
                    //循环查找选中的商品
                for(let i=0,iLen = $selectedItem.length;i<iLen;i++){
                    arrProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'))
                }
                if(arrProductIds.length){
                    _this.deleteCartProduct(arrProductIds.join(','))
                }else{
                    _mm.errorTips('您还没有选中要删除的商品')
                } 
            }
        })
        //去结算
        $(document).on('click','.btn-submit', function(){
            //判断总价大于0 进行提交
            if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
                window.location.href = './order-confirm.html'
            }else{
                _mm.errorTips('请选择商品后再提交')
            }
        })
    },  
    //加载购物车数据
    loadCart: function(){
        //获取购物车列表
        _cart.getCartList( (res) => {
            this.renderCart(res)
        }, (errMsg) => {
            this.showCartError()
        })
        // $pageWrap.html('<div class="loading"></div>')

    },
    //渲染购物车
    renderCart: function(data){
        this.filter(data)
        //缓存购物车信息
        this.data.cartInfo = data
        //生成html
        let cartHtml = _mm.renderHtml(templateIndex, data)
        $('.page-wrap').html(cartHtml)
        //导航购物车更新数量
        nav.loadCartCount()
    },
    //删除指定商品,支持批量,productId用逗号分割
    deleteCartProduct: function(productIds){
        let _this = this
        _cart.deleteProduct(productIds, (res) => {
            _this.renderCart(res)
        }, (errMsg) => {
            _this.showCartError()
        })
    },
    //数据匹配
    filter: function(data){
        data.notEmpty = !!data.cartProductVoList.length
    },
    showCartError: function(){
        $('.page-wrap').html('<p class="err-tip">加载失败~请刷新~</p>')
    }
}

$(function(){
    page.init()
})