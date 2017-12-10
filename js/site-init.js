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
            const strt_ico_cntnr_style = 'display: none;' +
                                         'position: relative;' +
                                         'top: 50%;' +
                                         '-webkit-transform: translateY(-50%); /* Safari用 */' +
                                         'transform: translateY(-50%);';

            const strt_ico_col_style = '';

            const strt_box_btn_style = '';

            const strt_ico_cntnr_class = 'container';
            // const strt_ico_col_class = 'col-3 text-center text-white';

            const strt_menu_HTML =  '<div id="start-container" style="' + strt_ico_cntnr_style + '">' +
                                        '<div class="container mb-5">' +
                                            '<div class="row text-center text-white">' +
                                                '<div class="col-2"></div>' +
                                                '<div class="col-2" onclick="MenuItem.menuItemOnClick(1);">' +
                                                    '<i class="fas fa-info fa-5x text-info"></i>' +
                                                '</div>' +
                                                '<div class="col-1"></div>' +
                                                '<div class="col-2" onclick="MenuItem.menuItemOnClick(2);">' +
                                                    '<i class="fas fa-search fa-5x text-success"></i>' +
                                                '</div>' +
                                                '<div class="col-1"></div>' +
                                                '<div class="col-2" onclick="MenuItem.menuItemOnClick(3);">' +
                                                    '<i class="fas fa-question fa-5x text-warning"></i>' +
                                                '</div>' +
                                                '<div class="col-2"></div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="' + strt_ico_cntnr_class + '">' +
                                            '<div class="row text-center">' +
                                                '<div class="col-2"></div>' +
                                                '<div id="btn-01" class="box-btn col-2" onclick="MenuItem.menuItemOnClick(1);">' +
                                                    '<div class="py-2">このサイトについて</div>' +
                                                '</div>' +
                                                '<div class="col-1"></div>' +
                                                '<div id="btn-02" class="box-btn col-2" onclick="MenuItem.menuItemOnClick(2);">' +
                                                    '<div class="py-2">見つける !</div>' +
                                                '</div>' +
                                                '<div class="col-1"></div>' +
                                                '<div id="btn-03" class="box-btn col-2" onclick="MenuItem.menuItemOnClick(3);">' +
                                                    '<div class="py-2">チュートリアル</div>' +
                                                '</div>' +
                                                '<div class="col-2"></div>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>';

            osm_window.innerHTML = strt_menu_HTML;

            var start_container = document.getElementById('start-container');

            $(start_container).fadeIn(500);

            $('.box-btn::before').on('click', function() {
                $(this).toggleClass('.box-btn::before');
            });

            // $(start_container).fadeIn(1500);

        }).then(() => {

            // alert('aaa');

        });

    });

}
