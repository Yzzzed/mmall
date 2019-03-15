/*
 * @Author: Yzed 
 * @Date: 2019-02-21 00:35:06 
 * @Last Modified by: Yzed
 * @Last Modified time: 2019-03-07 12:12:08
 */

import './index.css'
import '../common/nav/nav'
import '../common/header/header'
import '../../util/slider/slider'
import templateBanner from '../../page/index/banner.string'
import _mm from '../../util/mm'

$(function(){
    let bannerHtml = _mm.renderHtml(templateBanner)
    $('.banner-con').html(bannerHtml)
    $('.banner').unslider()

    let $slider = $('.banner').unslider({
        dots: true
    })
    
    $('.banner-con .banner-arrow').click(function(){
        let forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    })
})


