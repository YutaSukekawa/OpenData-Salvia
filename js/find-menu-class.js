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

            menu_HTML_list_gl.push(menu_HTML);
            current_menu_num_gl ++;

        });

    }

    /* エリアを指定して探す がクリックされた場合 */
    static areaSearchOnclick() {
        alert('aaa');
    }

    /* 現在地から近くのスポットを探す がクリックされた場合 */
    static currentPositionSearchOnclick() {

        if(latlon_gl == null) {

            /* マーカー */
            var el = document.createElement('div');
            el.id = 'current-position-marker';
            el.className = 'marker';
            el.innerHTML = '<i class="fas fa-map-marker-alt fa-3x faa-bounce animated"></i>';

            /* 現在地を取得する */
            var cp = getCurrentPosition();
            $('#icon-1').fadeIn(100);

            /* 取得結果の実行 */
            cp.then(function(latlon) {  // 取得成功

                /* デバッグ 用 */
                latlon.longitude = 141.488399;
                latlon.latitude = 40.512284;

                latlon_gl = latlon;

                $('#icon-1').fadeOut(100);

                /* 現在地にマーカーを立てる */
                new mapboxgl.Marker(el, {offset: [0, -19]})
                    .setLngLat([latlon.longitude, latlon.latitude])
                    .addTo(map);

                map.flyTo({
                    center: [latlon.longitude, latlon.latitude],
                    zoom: 15
                });

                /* メニューの書き換え */
                updateMenu();

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
            updateMenu();
        }

        function updateMenu() {

            // alert('aaa');

            $.getJSON('json/osm-data.json', function(json) {

                var i = 0;
                var length = json.length;

                /* 戻る */
                var menu_HTML = '<tr><td class="table-text" onclick="FindMenu.backOnClick()"><i class="fas fa-undo fa-fw"></i><span> 前へ戻る</span></td></tr>';

                /* ラジオボタン */
                menu_HTML += '<tr><td style="cursor: default;font-size: 1vw; color: lightblue;"> 現在地から半径</td></tr><td>' +
                    '<span class="table-text ml-1 mr-2"><input type="radio" name="radius" value="250m" onclick="FindMenu.radioButtonRadius(250)" checked> 250m</span>' +
                    '<span class="table-text mx-2"><input type="radio" name="radius" value="500m" onclick="FindMenu.radioButtonRadius(500)"> 500m</span>' +
                    '<span class="table-text mx-2"><input type="radio" name="radius" value="750m" onclick="FindMenu.radioButtonRadius(750)"> 750m</span>' +
                '</td></tr>';

                /* コンテンツ */
                while(i < length) {
                    menu_HTML += '<tr><td class="table-text" onclick="FindMenu.findFromOsmODOnclick(\'current-pos-search\', \'八戸市\', \'' + json[i]['key'] + '\', \'' + json[i]['value'] + '\', null, ' + latlon_gl.latitude + ', ' + latlon_gl.longitude + ', ' + i + ')">' +
                                    json[i]['item-icon'] +'<span> ' + json[i]['item-name'] + ' </span><i id="icon-' + i + '" class="fas fa-spinner faa-spin animated" style="display: none;"></i></td></tr>';
                    marker_icon_HTML_gl[i] = json[i]['item-icon'];
                    marker_icon_HTML_gl[i] = marker_icon_HTML_gl[i].slice(0, 10) + 'fa-1x color-orange faa-float animated ' + marker_icon_HTML_gl[i].slice(10, marker_icon_HTML_gl[i].length);
                    i++;
                }

                document.getElementById('menu-table').innerHTML = menu_HTML;

                menu_HTML_list_gl.push(menu_HTML);
                current_menu_num_gl ++;

            });

        }

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

        const promise = new Promise((resolve, reject) => {

            /* json ファイルから query テンプレートの読み込み */
            $.getJSON('json/overpass-api-query.json', function(json) {

                /* exe_content に合致する Query を抽出 */
                var i = 0;
                while(i < json.length) {
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
                if(map_marker_gl != null) {
                    map.removeLayer(current_marker_source_gl);  // グローバル変数 current_marker_source_gl に紐つけられた id を削除
                    map_marker_gl.remove();     // マーカーアイコンの削除
                }

                /* マップにピンを立てる */
                var i = 0;
                var features = [];

                /* json のデータ数だけ繰り返す */
                while (i < result_json.elements.length) {

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
                var source = 'points-' + value + radius;
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

                /* map にマーカー表示 */
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
                features.forEach(function(marker) {
                    var el = document.createElement('div');
                    el.className = 'marker';
                    el.innerHTML = marker_icon_HTML_gl[icon_HTML_num];

                    map_marker_gl = new mapboxgl.Marker(el, {offset: [0, 0]})
                        .setLngLat(marker.geometry.coordinates)
                        .addTo(map);

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
                url: 'http://www.overpass-api.de/api/interpreter',
                data: post_data,
                cache: false,
                dataType: 'json'
            });

            return ajax_result;
        }

    }

}
