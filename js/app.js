
// //slideshow
// $(function () {
//     // slideshow クラスを持った要素ごとに処理を実行
//     $('.top').each(function () {

//         var $slides = $(this).find('img'), // すべてのスライド
//             slideCount = $slides.length,   // スライドの点数
//             currentIndex = 0;              // 現在のスライドを示すインデックス

//         // 1 番目のスライドをフェードインで表示
//         $slides.eq(currentIndex).fadeIn();

//         // 7500 ミリ秒ごとに showNextSlide 関数を実行
//         setInterval(showNextSlide, 2500);

//         // 次のスライドを表示する関数
//         function showNextSlide () {

//             // 次に表示するスライドのインデックス
//             // (もし最後のスライドなら最初に戻る)
//             var nextIndex = (currentIndex + 1) % slideCount;

//             // 現在のスライドをフェードアウト
//             $slides.eq(currentIndex).fadeOut();

//             // 次のスライドをフェードイン
//             $slides.eq(nextIndex).fadeIn();

//             // 現在のスライドのインデックスを更新
//             currentIndex = nextIndex;
//         }

//     });

// });

// //sticky header
// $(function () {

//     $('.header').each(function () {

//         var $window = $(window), // Window オブジェクト
//             $header = $(this),   // ヘッダー

//             // ヘッダーのクローン
//             $headerClone = $header.contents().clone(),

//             // ヘッダーのクローンのコンテナー
//             $headerCloneContainer = $('<div class="header-clone"></div>'),

//             // HTML の上辺からヘッダーの底辺までの距離 = ヘッダーのトップ位置 + ヘッダーの高さ
//             threshold = $header.offset().top + $header.outerHeight();

//         // コンテナーにヘッダーのクローンを挿入
//         $headerCloneContainer.append($headerClone);

//         // コンテナーを body の最後に挿入
//         $headerCloneContainer.appendTo('body');

//         // スクロール時に処理を実行するが、回数を 1 秒間あたり 15 までに制限
//         $window.on('scroll', $.throttle(1000 / 15, function () {
//             if ($window.scrollTop() > threshold) {
//                 $headerCloneContainer.addClass('visible');
//             } else {
//                 $headerCloneContainer.removeClass('visible');
//             }
//         }));

//         // スクロールイベントを発生させ、初期位置を決定
//         $window.trigger('scroll');
//     });

// });

//  smooth scroll
$(function () {

    $('.back-to-top').each(function () {

        // html か body のいずれがスクロール可能な要素かを検出
        var $el = $(scrollableElement('html', 'body'));

        // ボタンにクリックイベントを設定
        $(this).on('click', function (event) {
            event.preventDefault();
            $el.animate({ scrollTop: 0 }, 250);
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

// 画像スライダー
// bg.swircher.js を導入
       jQuery(function($) {
    $('.bg-switcher').bgSwitcher({
        images: ['../img/sea.jpg','../img/beach.jpg','../img/sunset.jpg','../img/sky.jpg'], // 切り替え画像
        Interval: 5000, //切り替えの間隔 1000=1秒
        start: true, //$.fn.bkkkgswitcher(config)をコールした時に切り替えを開始する
        loop: true, //切り替えをループする
        shuffle: false, //背景画像の順番をシャッフルする
        effect: "fade", //エフェクトの種類 "fade" "blind" "clip" "slide" "drop" "hide"
        duration: 1000, //エフェクトの時間 1000=1秒
        easing: "swing", //エフェクトのイージング "swing" "linear"
    });
});