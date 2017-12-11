function windowOnScroll() {

    /* スクロールイベント */
    $(window).on('scroll', function() {

        /* スクロール量 */
        var y = jQuery(this).scrollTop();

        var scrollHeight = $(document).height();
        var scrollPosition = $(window).height() + y;

        /* 少しでも下にスクロールした場合 */
        if (y >= 10) {
            // $('#footer').fadeOut(100);
            $('#arrow-up').fadeIn(300);
        }
        else {
            // $('#footer').fadeIn(100);
            $('#arrow-up').fadeOut(300);
        }

        /* アンダーコンテンツ 1 が見えてきたら */
        var page_view_point = document.body.scrollHeight / 4 - document.body.scrollHeight / 8;
        if (y >= page_view_point) {
            $('#page-local-text').html('<i class="fas fa-info"></i> このサイトについて');
            $('#page-local-text').fadeIn(500);
            $('#under-area-01').fadeIn(500);
        }
        else if (y < page_view_point) {
            $('#page-local-text').fadeOut(100);
        }
        else {
            $('#under-area-01').fadeOut(500);
        }

        /* アンダーコンテンツ 2 が見えてきたら */
        page_view_point = document.body.scrollHeight / 2 - document.body.scrollHeight / 8;
        if (y >= page_view_point) {
            $('#page-local-text').html('<i class="far fa-chart-bar"></i> オープンデータとは');
            $('#under-area-02').fadeIn(500);
        }
        else {
            $('#under-area-02').fadeOut(500);
        }

        /* アンダーコンテンツ 3 が見えてきたら */
        page_view_point = document.body.scrollHeight / 2 + document.body.scrollHeight / 8;
        if (y >= page_view_point) {
            $('#page-local-text').html('<i class="fas fa-mobile"></i> スマートフォン向け');
            $('#under-area-03').fadeIn(500);
        }
        else {
            $('#under-area-03').fadeOut(500);
        }

        /*スクロールの位置が下部5%の範囲に来た場合 */
        if ((scrollHeight - scrollPosition) / scrollHeight < 0.03) {
            $('#footer').fadeIn(100);
            $('#arrow-down').fadeOut(300);
        }
        /*それ以外のスクロールの位置の場合 */
        else {

            if (y === 0) {
                $('#footer').fadeIn(100);
            }else {
                $('#footer').fadeOut(100);
            }

            $('#arrow-down').fadeIn(300);
        }

    });
    
}
