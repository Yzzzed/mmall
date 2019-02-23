/*
 * @Author: Yzed 
 * @Date: 2019-02-24 00:15:08 
 * @Last Modified by: Yzed
 * @Last Modified time: 2019-02-24 20:27:54
 */

import './result.css'
import '../common/nav-simple/nav-simple'
 
import _mm from '../../util/mm'

$(function(){
let type = _mm.getUrlParam('type') || 'default',
    $element = $(`.${type}-success`)

//显示对应的提示元素
$element.show()

})