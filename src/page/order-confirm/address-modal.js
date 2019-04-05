/*
 * @Author: Yzed 
 * @Date: 2019-04-02 21:08:43 
 * @Last Modified by: Yzed
 * @Last Modified time: 2019-04-04 11:47:56
 */


import _mm from '../../util/mm'
import _address from '../../service/address-service'
import _cities from '../../util/cities/cities'
import templateAddressModal from './address-modal.string'


const addressModal = {
    show: function(option){
        //把option绑定到addressModal上
        this.option = option
        this.option.data = option.data || {}
        this.$modalWrap = $('.modal-wrap')
        //渲染页面
        this.loadModal()
        //绑定事件
        this.bindEvent()
    },
    hide: function(){
        this.$modalWrap.empty()
    },
    bindEvent: function(){
        const _this = this
        //省份与城市 二级联动
        this.$modalWrap.find('#receiver-province').change(function(){
            const selectedProvince = $(this).val()
            _this.loadCities(selectedProvince)
        })
        //提交收货地址
        this.$modalWrap.find('.address-btn').click(function(){
            const receiverInfo = _this.getReceiverInfo(),
                isUpdate = _this.option.isUpdate
            //使用新地址且验证通过
            if(!isUpdate && receiverInfo.status){
                _address.save(receiverInfo.data, res => {
                    _mm.successTips('地址添加成功~')
                    _this.hide()
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res)
                }, errMsg => {
                    _mm.errorTips(errMsg)
                })
            }
            //更新收件人并验证通过
            else if(isUpdate && receiverInfo.status){
                _address.update(receiverInfo.data, res => {
                    _mm.successTips('地址修改成功~')
                    _this.hide()
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res)
                }, errMsg => {
                    _mm.errorTips(errMsg)
                })
            }
            //验证不通过
            else{
                _mm.errorTips(receiverInfo.errMsg || '哪里不对了~')
            }
        })
        //阻止事件冒泡
        this.$modalWrap.find('.modal-container').click( e => {
            e.stopPropagation()
        })
        //关闭弹窗
        this.$modalWrap.find('.close').click(() => {
            _this.hide()
        })
        
    },
    loadModal: function(){
        const addressModalHtml = _mm.renderHtml(templateAddressModal, {
            isUpdate: this.option.isUpdate,
            data    : this.option.data
        })
        this.$modalWrap.html(addressModalHtml)
        //加载省份
        this.loadProvince()
        
    },
    //加载省份
    loadProvince: function(){
        const provinces = _cities.getProvinces() || [],
            $provinceSelect = this.$modalWrap.find('#receiver-province')
        $provinceSelect.html(this.getSelectOption(provinces))
        //更新地址时，省份回填
        if(this.option.isUpdate && this.option.data.receiverProvince){
            $provinceSelect.val(this.option.data.receiverProvince)
            this.loadCities(this.option.data.receiverProvince)
        }

    },
    //加载城市
    loadCities: function(provinceName){
        let cities = _cities.getCities(provinceName) || [],
            $citySelect = this.$modalWrap.find('#receiver-city')
        $citySelect.html(this.getSelectOption(cities))
        //更新地址时，并且有城市信息 做信息回填
        if(this.option.isUpdate && this.option.data.receiverCity){
            $citySelect.val(this.option.data.receiverCity)
        }
    },
    //获取表单收件人信息 并且做表单验证
    getReceiverInfo: function(){
        let receiverInfo = {},
            result = {
                status: false
            }
        receiverInfo.receiverName       = $.trim(this.$modalWrap.find('#receiver-name').val())
        receiverInfo.receiverProvince   = this.$modalWrap.find('#receiver-province').val()
        receiverInfo.receiverCity       = this.$modalWrap.find('#receiver-city').val()
        receiverInfo.receiverPhone      = $.trim(this.$modalWrap.find('#receiver-phone').val())
        receiverInfo.receiverAddress    = $.trim(this.$modalWrap.find('#receiver-address').val())
        receiverInfo.receiverZip        = $.trim(this.$modalWrap.find('#receiver-zip').val())

        if(this.option.isUpdate){
            receiverInfo.id   = this.$modalWrap.find('#receiver-id').val()          
        }
        if(!receiverInfo.receiverName){
            result.errMsg = '请输入收件人姓名'
        }
        else if(!receiverInfo.receiverProvince){
            result.errMsg = '请选择收件人所在省份'
        }
        else if(!receiverInfo.receiverCity){
            result.errMsg = '请选择收件人所在城市'
        }
        else if(!receiverInfo.receiverAddress){
            result.errMsg = '请输入收件人详细地址'
        }
        else if(!receiverInfo.receiverPhone){
            result.errMsg = '请输入收件人手机号'
        }
        else{
            result.status = true
            result.data = receiverInfo
        }
        return result
    },
    //获取select框的选项 输入array 输出html
    getSelectOption: function(optionArray){
        let html = '<option value="">请选择</option>'
        for(let item of optionArray){
            html += `<option value="${item}">${item}</option>`
        }
        return html
    }
    
    
}

export default addressModal