class FindMenu {

    /**
        見つける！のメニューに関するクラス
        static がついている method は不変のメニュー項目
     */

    /* class 定数 */
    static get FIND_FROM_ADMIN_OPENDATA() {
        return '行政が公開しているオープンデータから見つける';
    }

    static get FIND_FROM_OSM_OPENDATA() {
        return 'OpenStreetMap から見つける';
    }

    /* 前へ戻る がクリック場合 */
    static backOnClick() {
        current_menu_num_gl = (current_menu_num_gl > 0) ? current_menu_num_gl - 1 : 0;
        document.getElementById('menu-table').innerHTML = menu_HTML_list_gl[current_menu_num_gl];

        /* 現在地マーカー削除 */
        if(map_current_marker_gl != null)
            map_current_marker_gl.remove();

        /* マップから円を削除 */
        if(map_al_rad_num_gl != 0)
            map.removeLayer('circle-radius' + map_al_rad_num_gl);

        /* グローバル変数 current_marker_source_gl に紐つけられた id を削除 */
        if(current_marker_source_gl != '')
            map.removeLayer(current_marker_source_gl);

        /* マーカーアイコンの削除 */
        if(map_marker_gl[0] != null) {
            var i = 0;
            while(i < map_marker_gl.length) {
                map_marker_gl[i].remove();
                i++;
            }
        }

        /* フラグリストを初期化 */
        regions_menu_open_gl = [];
        prefectures_menu_open_gl = [];

    }

    /* 行政が公開しているオープンデータから見つける がクリックされた場合 */
    static findFromAdminODOnClick() {
        alert(FindMenu.FIND_FROM_ADMIN_OPENDATA);
    }

    /* OpenStreetMap から見つける がクリックされた場合 */
    static findFromOsmODOnClick() {

        /* find-from-osm-opendata.json を読み込んでメニューを書き換え */
        $.getJSON('json/find-from-osm-opendata.json', function(json) {

            var i = 0;
            var length = json.length;

            var menu_HTML = '<tr><td class="table-text" onclick="FindMenu.backOnClick()"><i class="fas fa-undo fa-fw"></i><span> 前へ戻る</span></td></tr>';

            /* menu-table の書き換え */
            while(i < length) {

                menu_HTML += '<tr><td class="table-text" onclick="'+ json[i]['item-onclick'] +'">'+ json[i]['item-icon'] +'<span> ' + json[i]['item-name'] + ' </span><i id="icon-' + i + '" class="fas fa-spinner faa-spin animated" style="display: none;"></i></td></tr>';
                i++;

            }

            document.getElementById('menu-table').innerHTML = menu_HTML;

            // menu_HTML_list_gl.push(menu_HTML);
            menu_HTML_list_gl[current_menu_num_gl + 1] = menu_HTML;
            current_menu_num_gl ++;

        });

    }

    /* エリアを指定して探す がクリックされた場合 */
    static areaSearchOnclick() {
        $.getJSON('json/ja-prefectures.json', function(json) {

            /* メニューを表示 */
            var i = 0;
            var length = json.length;

            /* 戻る */
            var menu_HTML = '<tr><td class="table-text" onclick="FindMenu.backOnClick()"><i class="fas fa-undo fa-fw"></i><span> 前へ戻る</span></td></tr>';

            /* menu-table の書き換え */
            while(i < length) {
                regions_menu_open_gl[JSON.stringify(json[i]['japanese-regions-name-en']) + '-menu-open'] = false;
                menu_HTML += '<tr id=' + JSON.stringify(json[i]['japanese-regions-name-en']) + '>' +
                                '<td id=' + (JSON.stringify(json[i]['japanese-regions-name-en'] + '-td')) + ' class="table-text" onclick=\'FindMenu.regionsMenuOpen(' + JSON.stringify(json[i]) + ')\'>' +
                                    '<i class="fas fa-map-marker-alt fa-fw"></i><span> ' + json[i]['japanese-regions-name-ja'] + ' </span>' +
                                '</td>' +
                            '</tr>';
                i++;
            }

            document.getElementById('menu-table').innerHTML = menu_HTML;

            // menu_HTML_list_gl.push(menu_HTML);
            menu_HTML_list_gl[current_menu_num_gl + 1] = menu_HTML;
            current_menu_num_gl ++;

        });

    }

    static regionsMenuOpen(json) {

        /* メニューを表示 */
        var i = 0;
        var length = json['prefectures'].length;

        /* メニュー（子要素）を開く */
        if('prefectures' in json && !regions_menu_open_gl[json['japanese-regions-name-en'] + '-menu-open']) {

            var menu_HTML = '';

            /* menu-table の書き換え */
            while(i < length) {
                prefectures_menu_open_gl[json['prefectures'][i]['prefectures-name'] + '-menu-open'] = false;
                menu_HTML += '<tr id=' + json['prefectures'][i]['prefectures-name'] + '>' +
                                '<td id=' + (json['prefectures'][i]['prefectures-name'] + '-td') + ' class="table-text" onclick=\'FindMenu.prefecturesMenuOpen(' + JSON.stringify(json['prefectures'][i]) + ', "' + json['prefectures'][i]['prefectures-name-ja'] + '")\'>' +
                                    ' 　<i class="fas fa-map-marker-alt fa-fw"></i><span> ' + json['prefectures'][i]['prefectures-name-ja'] + ' </span>' +
                                '</td>' +
                            '</tr>';
                i++;
            }

            $('#' + json['japanese-regions-name-en']).after(menu_HTML);

            regions_menu_open_gl[json['japanese-regions-name-en'] + '-menu-open'] = true;
            document.getElementById(json['japanese-regions-name-en'] + '-td').className = 'table-text2';

        }
        /* メニュー（子要素）を閉じる */
        else {

            /* 子要素を削除 */
            while(i < length) {

                document.getElementById(json['prefectures'][i]['prefectures-name']).remove();

                /* 孫要素が存在する場合, 孫要素の削除 */
                if(prefectures_menu_open_gl[json['prefectures'][i]['prefectures-name'] + '-menu-open']) {

                    var j = 0;
                    var city_length = ('city' in json['prefectures'][i]) ? json['prefectures'][i]['city'].length : 0;

                    while(j < city_length) {
                        document.getElementById(json['prefectures'][i]['city'][j]['name-en']).remove();
                        j++;
                    }

                    /* フラグを false に */
                    prefectures_menu_open_gl[json['prefectures'][i]['prefectures-name'] + '-menu-open'] = false;

                }

                i++;
            }

            /* フラグを false に */
            regions_menu_open_gl[json['japanese-regions-name-en'] + '-menu-open'] = false;

            /* 自要素の class の変更 */
            document.getElementById(json['japanese-regions-name-en'] + '-td').className = 'table-text';

        }
    }

    static prefecturesMenuOpen(json, prefectures_name_ja) {

        /* メニューを表示 */
        var i = 0;
        var length = ('city' in json) ? json['city'].length : 0;

        /* メニュー（子要素）を開く */
        if(length != 0 && !prefectures_menu_open_gl[json['prefectures-name'] + '-menu-open']) {

            var menu_HTML = '';
            while(i < length) {

                var span_id = json['city'][i]['name-en'] + '-input-hidden';

                menu_HTML += '<tr id=' + json['city'][i]['name-en'] + '>' +
                                '<td id=' + (json['city'][i]['name-en'] + '-td') + ' class="table-text" onclick="FindMenu.updateMenu(\'area-search\', \'' + span_id + '\', \'' + json['city'][i]['name-ja'] + '\');">' +
                                    ' 　　<i class="fas fa-map-marker-alt fa-fw"></i><span> ' + json['city'][i]['name-ja'] + ' </span><input type="hidden" id="' + span_id + '" value="' + prefectures_name_ja + '">' +
                                '</td>' +
                            '</tr>';
                i++;
            }

            $('#' + json['prefectures-name']).after(menu_HTML);

            prefectures_menu_open_gl[json['prefectures-name'] + '-menu-open'] = true;
            document.getElementById(json['prefectures-name'] + '-td').className = 'table-text2';

        }
        /* メニュー（子要素）を閉じる */
        else {

            /* 子要素を削除 */
            while(i < length) {
                document.getElementById(json['city'][i]['name-en']).remove();
                i++;
            }

            /* フラグを false に */
            prefectures_menu_open_gl[json['prefectures-name'] + '-menu-open'] = false;

            /* 自要素の class の変更 */
            document.getElementById(json['prefectures-name'] + '-td').className = 'table-text';
        }

    }

    /* 現在地から近くのスポットを探す がクリックされた場合 */
    static currentPositionSearchOnclick() {

        /* マーカー */
        var el = document.createElement('div');
        el.id = 'current-position-marker';
        el.className = 'marker';
        el.innerHTML = '<i class="fas fa-map-marker-alt fa-3x faa-bounce animated"></i>';

        if(latlon_gl == null) {

            /* 現在地を取得する */
            var cp = getCurrentPosition();
            $('#icon-1').fadeIn(100);

            /* 取得結果の実行 */
            cp.then(function(latlon) {  // 取得成功

                /* デバッグ 用 */
                // latlon.longitude = 141.488399;
                // latlon.latitude = 40.512284;

                latlon_gl = latlon;

                $('#icon-1').fadeOut(100);

                /* 現在地にマーカーを立てる */
                map_current_marker_gl = new mapboxgl.Marker(el, {offset: [0, -19]})
                    .setLngLat([latlon.longitude, latlon.latitude])
                    .addTo(map);

                map.flyTo({
                    center: [latlon.longitude, latlon.latitude],
                    zoom: 15
                });

                /* メニューの書き換え */
                FindMenu.updateMenu('current-pos-search');

                /* マップにサークル情報を追加 */
                map.addSource("circle-radius250", createGeoJSONCircle([latlon.longitude, latlon.latitude], 0.25));
                map.addSource("circle-radius500", createGeoJSONCircle([latlon.longitude, latlon.latitude], 0.5));
                map.addSource("circle-radius750", createGeoJSONCircle([latlon.longitude, latlon.latitude], 0.75));

                /* 半径 100 m に円を描く */
                FindMenu.radioButtonRadius(250);

            }, function(reason) {   // 取得失敗
                alert(reason);
            });

        }
        else {
            FindMenu.updateMenu('current-pos-search');

            /* 現在地にマーカーを立てる */
            map_current_marker_gl = new mapboxgl.Marker(el, {offset: [0, -19]})
                .setLngLat([latlon_gl.longitude, latlon_gl.latitude])
                .addTo(map);

            /* 円を描く */
            FindMenu.radioButtonRadius(250);

            map.flyTo({
                center: [latlon_gl.longitude, latlon_gl.latitude],
                zoom: 15
            });
        }

    }

    static updateMenu(exe_content, span_id, city_name_ja) {

        selected_area_gl = (exe_content == 'area-search') ? ' 検索エリア: ' + document.getElementById(span_id).value + ' ' + city_name_ja : '';

        $.getJSON('json/osm-data.json', function(json) {

            var i = 0;
            var length = json.length;

            /* 戻る */
            var menu_HTML = '<tr><td class="table-text" onclick="FindMenu.backOnClick()"><i class="fas fa-undo fa-fw"></i><span> 前へ戻る</span></td></tr>';

            /* ラジオボタン */

            var menu_text = (exe_content == 'current-pos-search') ? ' 現在地から半径' : selected_area_gl;
            var radio_button_HTML = (exe_content == 'current-pos-search') ?
                '<span class="table-text2 ml-1 mr-2"><input type="radio" name="radius" value="250m" onclick="FindMenu.radioButtonRadius(250)" checked> 250m</span>' +
                '<span class="table-text2 mx-2"><input type="radio" name="radius" value="500m" onclick="FindMenu.radioButtonRadius(500)"> 500m</span>' +
                '<span class="table-text2 mx-2"><input type="radio" name="radius" value="750m" onclick="FindMenu.radioButtonRadius(750)"> 750m</span>' :
                '';

            menu_HTML +=
            '<tr><td style="cursor: default;font-size: 1vw; color: moccasin;">' + menu_text + '</td></tr><td>' +
                radio_button_HTML +
            '</td></tr>';

            /* コンテンツ */
            while(i < length) {

                /* menu HTML の作成 */
                menu_HTML += (exe_content == 'current-pos-search') ?
                    '<tr><td class="table-text" onclick="FindMenu.findFromOsmODOnclick(\'' + exe_content + '\', \'八戸市\', \'' + json[i]['key'] + '\', \'' + json[i]['value'] + '\', null, ' + latlon_gl.latitude + ', ' + latlon_gl.longitude + ', ' + i + ')">' +
                        json[i]['item-icon'] +'<span> ' + json[i]['item-name'] + ' </span><i id="icon-' + i + '" class="fas fa-spinner faa-spin animated" style="display: none;"></i>' +
                    '</td></tr>' :
                    '<tr><td class="table-text" onclick="FindMenu.findFromOsmODOnclick(\'' + exe_content + '\', \'' + city_name_ja + '\', \'' + json[i]['key'] + '\', \'' + json[i]['value'] + '\', null, null, null, ' + i + ')">' +
                        json[i]['item-icon'] +'<span> ' + json[i]['item-name'] + ' </span><i id="icon-' + i + '" class="fas fa-spinner faa-spin animated" style="display: none;"></i>' +
                    '</td></tr>';

                /* 使用アイコンの読み込み */
                marker_icon_HTML_gl[i] = json[i]['item-icon'];
                marker_icon_HTML_gl[i] = marker_icon_HTML_gl[i].slice(0, 10) + 'fa-1x color-orange faa-float animated ' + marker_icon_HTML_gl[i].slice(10, marker_icon_HTML_gl[i].length);

                /* 項目が持つタグの読み込み */
                position_tags_dict_gl[json[i]['value']] = ('tags' in json[i]) ? json[i].tags[1] : null;

                // alert(position_tags_dict_gl[i]['0']);

                i++;
            }

            document.getElementById('menu-table').innerHTML = menu_HTML;

            // menu_HTML_list_gl.push(menu_HTML);
            menu_HTML_list_gl[current_menu_num_gl + 1] = menu_HTML;
            current_menu_num_gl ++;

        });

    }

    /* Radio Button OnClick */
    static radioButtonRadius(radius) {

        /* マップから円を削除 */
        if(map_al_rad_num_gl != 0)
            map.removeLayer('circle-radius' + map_al_rad_num_gl);

        /* マップに円を追加 */
        map.addLayer({
            'id': 'circle-radius' + radius,
            'type': 'fill',
            'source': 'circle-radius' + radius,
            'layout': {},
            'paint': {
                'fill-color': 'skyblue',
                'fill-opacity': 0.25
            }
        });

        map_al_rad_num_gl = radius;
    }

    /* 検索項目がクリックされた時 */
    static findFromOsmODOnclick(exe_content, area_name, key, value, radius, latitude, longitude, icon_HTML_num) {

        radius = (radius == null) ? map_al_rad_num_gl : radius;

        var query = '';
        var i = 0;
        var length = 0;

        const promise = new Promise((resolve, reject) => {

            /* json ファイルから query テンプレートの読み込み */
            $.getJSON('json/overpass-api-query.json', function(json) {

                /* exe_content に合致する Query を抽出 */
                i = 0;
                length = json.length;
                while(i < length) {
                    if(json[i]['exe-content'] == exe_content) {
                        query = json[i]['opa-query'];
                        break;
                    }
                    i++;
                }

                /* 抽出した Query の書き換え */
                query = (query.match(/area-name/)) ? query.replace('area-name', area_name) : query;
                query = (query.match(/radius/)) ? query.replace('radius', radius) : query;
                query = (query.match(/latitude/)) ? query.replace('latitude', latitude) : query;
                query = (query.match(/longitude/)) ? query.replace('longitude', longitude) : query;
                query = (query.match(/Key/)) ? query.replace('Key', key) : query;
                query = (query.match(/Value/)) ? query.replace('Value', value) : query;

                resolve();
            });

        });

        /* query の準備完了 */
        promise.then(resolve => {

            /* query の送信 */
            var result = FindMenu.overpassAPIQueryExe(query);

            /* 実行結果 */
            result.then(function(result_json) {

                /* marker 及び source の削除 */
                if(map_marker_gl[0] != null) {
                    map.removeLayer(current_marker_source_gl);  // グローバル変数 current_marker_source_gl に紐つけられた id を削除
                    i = 0;
                    length = map_marker_gl.length;
                    while(i < length) {
                        map_marker_gl[i].remove();
                        i++;
                    }
                }

                /* マップにピンを立てる */
                i = 0;
                var features = [];

                /* json のデータ数だけ繰り返す */
                length = result_json.elements.length;
                while (i < length) {

                    var title = '';

                    ['name', 'name:en'].forEach(function(key) {
                        if (key in result_json.elements[i].tags) {
                            title = result_json.elements[i].tags.name;
                        }
                    });

                    features[i] = {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [result_json.elements[i].lon, result_json.elements[i].lat]
                        },
                        "properties": {
                            "title": title,
                        }
                    }

                    i++;
                }

                /* 文字列型 source を作成し, グローバル変数に source を代入 */
                var source_end = (exe_content == 'area-search') ? area_name : radius
                var source = 'points-' + value + source_end;
                current_marker_source_gl = source;

                /* source が存在しない場合 */
                if(map.getSource(source) == null) {

                    /* source の追加 */
                    map.addSource(source, {
                        "type": "geojson",
                        "data": {
                            "type": "FeatureCollection",
                            "features": features
                        }
                    });
                }

                /* map にマーカーレイヤーを追加 */
                map.addLayer({
                    "id": source,
                    "type": "symbol",
                    "source": source,
                    "layout": {
                        "icon-image": "{icon}-15",
                        "text-field": "{title}",
                        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                        "text-offset": [0, 0.6],
                        "text-anchor": "top"
                    }
                });

                /* マーカーアイコンの作成, 表示 */
                var map_flyto_lat = 0, map_flyto_lon = 0;
                i = 0;
                $.get('add-html/marker-popup.html', function(html) {

                    // var marker_popup_HTML = html;

                    features.forEach(function(marker) {

                        /* icon HTML */
                        var el = document.createElement('div');
                        el.className = 'marker';
                        el.innerHTML = marker_icon_HTML_gl[icon_HTML_num];

                        /* popup HTML の変更 */
                        var marker_popup_HTML = html;

                        marker_popup_HTML = marker_popup_HTML.replace('<i class="1st-icon"></i>', marker_icon_HTML_gl[icon_HTML_num].replace('fa-1x color-orange faa-float animated', 'fa-2x _1st-icon-color mr-1'));
                        marker_popup_HTML = ('name' in result_json.elements[i].tags) ? marker_popup_HTML.replace('position-name', result_json.elements[i].tags.name) : marker_popup_HTML.replace('position-name', '名称不明');

                        marker_popup_HTML = makeTableFromPointTags(value, marker_popup_HTML, position_tags_dict_gl[value], result_json.elements[i].tags);

                        /* マーカーポップアップの設定 */
                        var popup = new mapboxgl.Popup()
                            .setHTML(marker_popup_HTML);

                        /* マーカーの追加 */
                        map_marker_gl[i] = new mapboxgl.Marker(el, {offset: [0, 0]})
                            .setLngLat(marker.geometry.coordinates)
                            .setPopup(popup)
                            .addTo(map);

                        map_flyto_lat += marker.geometry.coordinates[1];
                        map_flyto_lon += marker.geometry.coordinates[0];

                        i++;

                    });

                    /* 全ポイントの緯度経度の平均値を求める */
                    map_flyto_lat = map_flyto_lat / i;
                    map_flyto_lon = map_flyto_lon / i;

                    /* エリア指定検索なら, マップ移動 */
                    if(exe_content == 'area-search')
                        map.flyTo({
                            center: [map_flyto_lon, map_flyto_lat],
                            zoom: 10
                        });

                });

            });
        });
    }

    /* Overpass API を実行し結果を返す */
    static overpassAPIQueryExe(query) {

        return new Promise((resolve, reject) => {

            /* query を送信 */
            var post_data = {'data': query};
            var result = ajax(post_data);
            result.done(function(result_json) {
                resolve(result_json);
            });


        });

        function ajax(post_data) {

            var ajax_result = $.ajax({
                type: 'POST',
                url: 'https://www.overpass-api.de/api/interpreter',
                data: post_data,
                cache: false,
                dataType: 'json'
            });

            return ajax_result;
        }

    }

}
