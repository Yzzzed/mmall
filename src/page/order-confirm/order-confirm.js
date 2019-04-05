/*
 * @Author: Yzed 
 * @Date: 2019-03-31 16:28:32 
 * @Last Modified by: Yzed
 * @Last Modified time: 2019-04-05 07:44:02
 */

import './order-confirm.css'
import '../common/header/header'
import '../common/nav/nav'
import _mm from '../../util/mm'
import _order from '../../service/order-service'
import _address from '../../service/address-service'
import templateAddress from './address-list.string'
import templateProduct from './product-list.string'
import addressModal from './address-modal';

let page = {
    data: {
        selectAddressId: null
    },
    init: function(){
        this.onLoad()
        this.bindEvent()
    },
    onLoad: function(){
        this.loadAddressList()
        this.loadProductList()
    },
    bindEvent: function(){
        const _this = this
        //地址选择
        $(document).on('click','.address-item', function(){
            $(this).addClass('active').siblings('.address-item').removeClass('active')
            _this.data.selectAddressId = $(this).data('id')
        })
        //提交订单
        $(document).on('click','.order-submit', function(){
            const shippingId = _this.data.selectAddressId
            if(shippingId){
                _order.createOrder({
                    shippingId: shippingId
                }, res => {
                    window.location.href = `./payment.html?orderNumber=${res.orderNo}`
                }, errMsg => {
                    _mm.errorTips(errMsg)
                })
            } else{
                _mm.errorTips('请选择地址后再提交~')
            }
        })
        //添加地址
        $(document).on('click','.address-add', function(){
            addressModal.show({
                isUpdate: false,
                onSuccess: function(){
                    _this.loadAddressList()
                }
            })
        })
        //编辑地址
        $(document).on('click','.address-update', function(e){
            e.stopPropagation()
            const shippingId = $(this).parents('.address-item').data('id')
            _address.getAddress(shippingId, res => {
                addressModal.show({
                    isUpdate    : true,
                    data        : res,
                    onSuccess   : function(){
                        _this.loadAddressList()
                    }
                })
            }, errMsg => {
                _mm.errorTips(errMsg)
            })   
        })
        //删除地址
        $(document).on('click','.address-delete', function(e){
            e.stopPropagation()
            const id =$(this).parents('.address-item').data('id')
            if(window.confirm('确认要删除该地址吗?')){
                _address.deleteAddress(id, res => {
                    _this.loadAddressList()
                }, errMsg => {
                    _mm.errorTips(errMsg)
                })
            }
        })
    },  
    //加载地址列表
    loadAddressList: function(){
        const _this = this
        $('.address-con').html('<div class="loading"></div>')
        //获取地址列表
        _address.getAddressList( (res) => {
            _this.addressFilter(res)
            const addressListHtml = _mm.renderHtml(templateAddress, res)
            $('.address-con').html(addressListHtml)
        }, (errMsg) => {
            $('.address-con').html('<p class="err-tip">地址加载失败，请刷新后重试</p>')
        })
    },
    //处理地址列表选中状态
    addressFilter: function(data){
        if(this.data.selectAddressId){
            let selectAddressIdFlag = false
            for(let item of data.list){
                if(item.id === this.data.selectAddressId){
                    item.isActive = true
                    selectAddressIdFlag = true
                }
            }
            //如果以前选中的地址不在列表里 将其删除
            if(!selectAddressIdFlag){
                this.data.selectAddressId = null
            }
        }
    },
    //加载商品清单
    loadProductList: function(){
        const _this = this
        $('.product-con').html('<div class="loading"></div>')
        //加载商品列表
        _order.getProductList((res) => {
            const productListHtml = _mm.renderHtml(templateProduct, res)
            $('.product-con').html(productListHtml)
        }, (errMsg) => {
            $('.product-con').html('<p class="err-tip">商品加载失败，请刷新后重试</p>')
        })
    }
}

$(function(){
    page.init()
})