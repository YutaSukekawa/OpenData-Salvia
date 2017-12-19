class FindMenu {

    /* class 定数 */
    static get FIND_FROM_ADMIN_OPENDATA() {
        return '行政が公開しているオープンデータから見つける';
    }

    static get FIND_FROM_OSM_OPENDATA() {
        return 'OpenStreetMap から見つける';
    }

    /* 前へ戻る がクリック場合 */
    static backOnClick() {
        now_menu_HTML_gl = back_menu_HTML_gl;
        document.getElementById('menu-table').innerHTML = back_menu_HTML_gl;
    }

    /* 行政が後悔しているオープンデータから見つける がクリックされた場合 */
    static findFromAdminODOnClick() {
        alert(FindMenu.FIND_FROM_ADMIN_OPENDATA);
    }

    /* OpenStreetMap から見つける がクリックされた場合 */
    static findFromOsmODOnClick() {
        /* back_menu_HTML_gl の書き換え */
        back_menu_HTML_gl = now_menu_HTML_gl;

        /* find-from-osm-opendata.json を読み込んでメニューを書き換え */
        $.getJSON('json/find-from-osm-opendata.json', function(json) {

            var i = 0;
            var length = json.length;

            var menu_HTML = '<tr><td class="table-text" onclick="FindMenu.backOnClick()"><i class="fas fa-undo fa-fw"></i><span> 前へ戻る</span></td></tr>';

            /* menu-table の書き換え */
            while(i < length) {

                menu_HTML += '<tr><td class="table-text" onclick="">'+ json[i]['item-icon'] +'<span> ' + json[i]['item-name'] + '</span></td></tr>';
                i++;

            }

            document.getElementById('menu-table').innerHTML = menu_HTML;

            now_menu_HTML_gl = menu_HTML;

        });
    }

}
