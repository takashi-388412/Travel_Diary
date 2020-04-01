// 画像スライダー
// bg.swircher.js を導入
  jQuery(function($) {
    $('.bg-switcher').bgSwitcher({
        // images: ['../img/sea.jpg','../img/beach.jpg','../img/sunset.jpg','../img/sky.jpg'], // 切り替え画像
        images: ['./dist/img/sea.jpg','./dist/img/beach.jpg','./dist/img/sunset.jpg','./dist/img/sky.jpg'], 
        Interval: 3000, //切り替えの間隔 1000=1秒
        start: true, //$.fn.bkkkgswitcher(config)をコールした時に切り替えを開始する
        loop: true, //切り替えをループする
        shuffle: false, //背景画像の順番をシャッフルする
        effect: "fade", //エフェクトの種類 "fade" "blind" "clip" "slide" "drop" "hide"
        duration: 1000, //エフェクトの時間 1000=1秒
        easing: "swing", //エフェクトのイージング "swing" "linear"
    });
});
var navPos = jQuery( '#global-nav' ).offset().top; // グローバルメニューの位置
var navHeight = jQuery( '#global-nav' ).outerHeight(); // グローバルメニューの高さ
jQuery( window ).on( 'scroll', function() {
  if ( jQuery( this ).scrollTop() > navPos ) {
    jQuery( 'body' ).css( 'padding-top', navHeight );
    jQuery( '#global-nav' ).addClass( 'm_fixed' );
  } else {
    jQuery( 'body' ).css( 'padding-top', 0 );
    jQuery( '#global-nav' ).removeClass( 'm_fixed' );
  }
});
//  smooth scroll
$(function () {
    $('.back-to-top').each(function () {
        // html か body のいずれがスクロール可能な要素かを検出
        var $el = $(scrollableElement('html', 'body'));
        // ボタンにクリックイベントを設定
        $(this).on('click', function (event) {
            event.preventDefault();
            $el.animate({ scrollTop: 0 }, 500);
        });
    });
    // scrollTop が利用できる要素を検出する関数
    // http://www.learningjquery.com/2007/10/improved-animated-scrolling-script-for-same-page-links#update4
    function scrollableElement (elements) {
        var i, len, el, $el, scrollable;
        for (i = 0, len = arguments.length; i < len; i++) {
            el = arguments[i],
            $el = $(el);
            if ($el.scrollTop() > 0) {
                return el;
            } else {
                $el.scrollTop(1);
                scrollable = $el.scrollTop() > 0;
                $el.scrollTop(0);
                if (scrollable) {
                    return el;
                }
            }
        }
        return [];
    }
}); 