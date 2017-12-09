/* サイトの初期化 riot tag のマウント後, 呼び出す */
function siteInit() {

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

    /* スタートページ文字の style, class 関連 */
    const start_div_style = 'width:100%;' +
                            'height: 100%;' +
                            'position: relative;' +
                            'display: table;';

    const start_ptag_style = 'display: table-cell;' +
                             'vertical-align: middle;' +
                             'font-family: \'Mplus 1p\';' +
                             'font-size: 4vw;' +
                             'cursor: default;';

    const start_ptag_class = 'text-center text-white';

    const start_str = 'オープンデータで<br>見つけよう！';

    const start_HTML =  '<div id="start-div" style="' + start_div_style + '">' +
                            '<p style="' + start_ptag_style + '" class="' + start_ptag_class + '">' + start_str + '</p>' +
                        '</div>';


    /* 文字の表示 */
    osm_window.innerHTML = start_HTML;

}
