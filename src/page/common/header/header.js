/*
 * @Author: Yzed 
 * @Date: 2019-02-23 21:22:33 
 * @Last Modified by: Yzed
 * @Last Modified time: 2019-03-07 20:54:20
 */

 import './header.css'
 import _mm from '../../../util/mm'

 //通用页面头部
 let header = {
    init: function(){
        this.onLoad()
        this.bindEvent()
    },
    //跳转到list页面时 keyword存在则搜索内容回填
    onLoad: function(){
        let keyword = _mm.getUrlParam('keyword')
        if(keyword){
            $('#search-input').val(keyword)
        }
    },
    bindEvent: function(){
        let _this = this
        //点击搜索按钮做搜索提交
        $('#search-btn').click(() => {
            _this.searchSubmit()
        })
        //输入回车也做搜索提交
        $('#search-input').keyup( (e) => {
            //13是回车键的keyCode
            if(e.keyCode === 13){
                _this.searchSubmit()
            }
        })
    },
    //搜索的提交 如果有keyword则正常跳转到list页 否则回到首页
    searchSubmit: function(){
        let keyword = $.trim($('#search-input').val())
        if(keyword){
            window.location.href = `./list.html?keyword=${keyword}`
        }else{
            _mm.goHome()
        }
    }
 }

 header.init()
//header不需要对外输出