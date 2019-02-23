
import Hogan from 'hogan.js'

let conf = {
    serverHost: ''
}

const _mm = {

    //网络请求

    request: function(param){
        
        let _this = this    //this指向问题 重点注意 此处定义_this为了取到_mm对象

        $.ajax({
            type: param.method || "get",
            url: param.url || "",
            data: param.data || "",
            dataType: param.type || "json",

            success: function (res) {

                /*判断是否请求成功 对请求数据进行封装*/

                //请求成功

                if(res.status === 0){
                    typeof param.success === 'function' && param.success(res.data, res.msg)
                }

                //没有登录状态，需要强制登录

                else if(res.status === 10){
                    _this.doLogin()
                }

                //请求数据错误

                else if(res.status === 1){
                    typeof param.error === 'function' && param.error(res.msg)
                }
            },

            //请求失败 返回错误码

            error: function (err) {
                typeof param.error === 'function' && param.error(err.statusText)
            }
        })
    },

    //获取服务器地址

    getServerUrl: function(path){
        return conf.serverHost + path
    },

    //获取url参数 正则表达式要理解 为了获取(&)name=value(&)中的value

    getUrlParam: function(name){
        let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
        let result = window.location.search.substr(1).match(reg)
        return result ? decodeURIComponent(result[2]) : null
    },

    //渲染html模板 把传入的模板和数据进行拼接

    renderHtml: function(htmlTemplate,data){
        let template = Hogan.compile(htmlTemplate)
        let result = template.render(data)
        
        return result
    },

    successTips: function(msg){
        alert(msg || '操作成功')
    },

    errorTips: function(msg){
        alert(msg || '哪里不对了~')
    },

    //字段的验证 支持非空、手机、邮箱的判断

    validate: function(value,type){
        let val = $.trim(value)       //去掉前后空格
        //非空验证
        if(type === 'require'){
            return !!val
        }
        //手机号验证
        if(type === 'phone'){
            return /^1\d{10}$/.test(val)
        }
        //邮箱验证
        if(type === 'email'){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(val)
        }
    },

    //统一登录处理

    doLogin: function(){
        //encodeURLComponment 防止链接中有些特殊字符导致链接解析错误 加uri编码更安全
        window.location.href = `./user-login.html?redirect=${encodeURIComponent(window.location.href)}`

    },goHome: function(){
        window.location.href = './index.html'
    }
}

export default _mm