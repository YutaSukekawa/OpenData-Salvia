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

    // osm_window.style.boxShadow = '2px 2px 20px  rgba(0,0,0,0.5)';
    // osm_window.style.border = '1px solid gray';

}
