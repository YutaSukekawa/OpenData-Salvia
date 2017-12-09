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
        osm_window.style.width = '100%';
        osm_window.style.borderRadius = 0;
        osm_window.style.backgroundColor = 'rgba(33, 33, 33, 0.4)';

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

        const start_str = '"Open Data" で<br>見つけよう！';

        /* 格納した文字列を HTML に */
        const start_HTML =  '<div id="start-div" style="' + start_div_style + '">' +
                                '<p id="start_str" style="' + start_ptag_style + '" class="' + start_ptag_class + '">' + start_str + '</p>' +
                            '</div>';

        /* innerHTML で要素を追加 */
        osm_window.innerHTML = start_HTML;

        /* <p> タグ id start_str の上下センタリング */
        var start_div = document.getElementById('start_div');
        var start_ptag = document.getElementById('start_str');

        /* 文字をフェードインで表示 */
        $(start_ptag).fadeIn(1500);

        /* フェードアウトしたら */
        const promise = new Promise((resolve, reject) => {

            setTimeout(function() {

                $(start_ptag).fadeOut(1500);

                setTimeout(function() {
                    resolve();
                }, 1600);

            }, 3000);

        });

        /* <p> タグ id start_str を削除 */
        promise.then(() => {
            start_ptag.remove();
        });

    });

}
