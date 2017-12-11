/* サイトの初期化 riot tag のマウント後, 呼び出す */
function siteInit() {

    /* ページ読み込み確認をして */
    const promise = new Promise((resolve, reject) => {
        setInterval(() => {
            if(document.getElementById('footer').clientHeight != null){
                resolve();
            }
        }, 100);
    });

    /* start 画面の実行 */
    promise.then(() => {

        /* start 画面の表示 */
        var header_height = document.getElementById('header').clientHeight;
        var footer_rect = document.getElementById('footer').getBoundingClientRect();
        var main_height = footer_rect.top - header_height;
        var osm_window = document.getElementById('map');

        osm_window.style.height = '50vh';

        var oc_margin_top = Math.floor((main_height - osm_window.clientHeight) / 2);
        osm_window.style.marginTop = oc_margin_top + 'px';

        /* スタート画面用に要素のスタイルを書き換え */
        // osm_window.style.width = '80vw';
        osm_window.style.width = '100vw';
        osm_window.style.borderRadius = 0;
        osm_window.style.backgroundColor = 'rgba(33, 33, 33, 0.4)';
        // osm_window.style.borderRadius = '6px';

        /* contents 領域のリサイズ 及び背景設定 */
        var contents_div = document.getElementById('contents');
        contents_div.style.height = document.body.clientHeight + 'px';
        document.getElementById('container').style.height = document.getElementById('map').clientHeight + 'px';
        contents_div.style.backgroundImage = 'linear-gradient(45deg, rgba(104, 175, 104, 0.6), rgba(59, 155, 179, 0.6)),' +
                          'url(img/header-cover.jpg)';
        contents_div.style.backgroundSize = 'cover';

        /* スタートページ文字の style, class 関連を文字列として格納 */
        const start_div_style = 'width:100%;' +
                                'height: 100%;';

        const start_ptag_style = 'display: none;' +
                                 'position: relative;' +
                                 'top: 50%;' +
                                 '-webkit-transform: translateY(-50%); /* Safari用 */' +
                                 'transform: translateY(-50%);' +
                                 'font-family: \'Mplus 1p\';' +
                                 'font-size: 4vw;' +
                                 'cursor: default;';

        const start_ptag_class = 'text-center text-white';

        const start_str = '"Open Data" で<br>見つけよう !';

        /* 格納した文字列を HTML に */
        const start_HTML =  '<div id="start-div" style="' + start_div_style + '">' +
                                '<p id="start-str" style="' + start_ptag_style + '" class="' + start_ptag_class + '">' + start_str + '</p>' +
                            '</div>';

        /* innerHTML で要素を追加 */
        osm_window.innerHTML = start_HTML;

        /* <p> タグ id start_str の上下センタリング */
        var start_div = document.getElementById('start-div');
        var start_ptag = document.getElementById('start-str');

        /* 文字をフェードインで表示 */
        $(start_ptag).fadeIn(1500);

        /* フェードアウトしたら */
        const promise = new Promise((resolve, reject) => {

            /* 3000 - 1500 = 1500秒後にフェードアウト */
            setTimeout(function() {

                $(start_ptag).fadeOut(1500);

                setTimeout(function() {
                    resolve();
                }, 1600);

            }, 3000);

        });

        /* <p> タグ id start_str を削除, スタートボタンとアイコンを表示 */
        promise.then(() => {

            start_ptag.remove();

            /* アイコンとロゴを表示 */
            $.get('add-html/strt-cntnr-inner.html', function(html) {
                osm_window.innerHTML = html;
                var start_container = document.getElementById('start-container');
                $(start_container).fadeIn(500);
            });

        }).then(() => {

            $.get('add-html/contents-after.html', function(html) {
                $(contents_div).after(html);
                $('.contents-under-area').css('height', contents_div.clientHeight + 'px');
                // var cnts_undr_ara = document.getElementsByClassName('contents-under-area');



            });

        });

    });

}
