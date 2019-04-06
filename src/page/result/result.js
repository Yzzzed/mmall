/*
 * @Author: Yzed 
 * @Date: 2019-02-24 00:15:08 
 * @Last Modified by: Yzed
 * @Last Modified time: 2019-04-06 08:59:20
 */

import './result.css'
import '../common/nav-simple/nav-simple'
 
import _mm from '../../util/mm'

$(function(){
let type = _mm.getUrlParam('type') || 'default',
    $element = $(`.${type}-success`)

if(type === 'payment'){
    const orderNumber = _mm.getUrlParam('orderNumber'),
        $orderNumber = $element.find('.order-number')
    $orderNumber.attr('href', `${$orderNumber.attr('href')}${orderNumber}`)
}
//显示对应的提示元素
$element.show()

})
