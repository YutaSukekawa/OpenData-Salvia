class MenuItem {

    constructor() {

    }

    static menuItemOnClick(item_number) {

        const HOME = 0;
        const ABOUT_THIS_SITE = 1;
        const FIND = 2;
        const TUTORIAL = 3;
        const ABOUT_OPEN_DATA = 4;
        const FOR_MOBILE = 5;

        switch (item_number) {
            case HOME:
                this.home();
                break;

            case ABOUT_THIS_SITE:
                this.aboutThisSite();
                break;

            case FIND:
                this.find();
                break;

            case TUTORIAL:
                this.tutorial();
                break;

            case ABOUT_OPEN_DATA:
                this.aboutOpenData();
                break;

            case FOR_MOBILE:
                this.forMobile();
                break;

            default:

        }

    }

    /* MenuItem の class メソッド private メソッドの作り方誰か教えてー */
    static home() {
        // alert('ホーム');
    }

    static aboutThisSite() {
        // alert('このサイトについて');
        $("html,body").animate({scrollTop:$('#under-area-01-top').offset().top});
    }

    static find() {

        if(map == null) {

            /* OSM window の位置を調整する */
            var header_height = document.getElementById('header').clientHeight;
            var footer_rect = document.getElementById('footer').getBoundingClientRect();
            var main_height = footer_rect.top - header_height;
            var osm_window = document.getElementById('map');
            var cf_margin_top = parseInt(osm_window.style.marginTop, 10);

            $.get('add-html/contents-foundation.html', function(html) {
                $('#container').before(html).ready(function() {

                    osm_window.style.background = 'none';

                    var div_cf = document.getElementById('div-cf');
                    div_cf.style.marginTop = cf_margin_top + 'px';
                    if(browser == 'safari') div_cf.style.marginTop = 0;
                    div_cf.style.height = document.getElementById('container').clientHeight + 'px';

                    /* もし, divタグ start-div が存在したら削除 */
                    if(document.getElementById('start-div')) {
                        document.getElementById('start-div').remove();
                    }

                    /* もし, divタグ start-container が存在したら削除 */
                    if(document.getElementById('start-container')) {
                        document.getElementById('start-container').remove();
                    }

                    osm_window.style.height = '70vh';

                    var oc_margin_top = Math.floor((main_height - osm_window.clientHeight) / 2);
                    osm_window.style.marginTop = oc_margin_top + 'px';
                    osm_window.style.left = '15%';

                    if (browser == 'safari') oc_margin_top = 0;

                    /* menu のスタイルを変更 */
                    var contents_find_menu = document.getElementById('menu');
                    var osm_window_height = osm_window.clientHeight - parseInt(osm_window.style.marginTop, 10);
                    var cfm_margin_top = Math.floor((osm_window_height - osm_window_height * 0.88) / 2);
                    contents_find_menu.style.marginTop = cfm_margin_top + 'px';

                    $('#div-cf').animate({
                        height: osm_window.clientHeight + 'px',
                        marginTop: oc_margin_top + 'px'}, 400, function() {

                            console.log(oc_margin_top + ' : ' + osm_window.style.marginTop);

                            /* アニメーションが終了したら */
                            $('#menu').fadeIn(300);

                            /* 地図表示用にスタイルを変更 */
                            osm_window.style.width = '60vw';

                            /* OSM を表示する */
                            mapboxgl.accessToken = 'pk.eyJ1IjoieXV0YXN1a2VrYXdhIiwiYSI6ImNqN3U4dm9zeDI5a3EzMm8zM3Zha3N0YXMifQ.7c2R5J9mZpJi2Y1dU5AENw';
                            var map_style = 'mapbox://styles/mapbox/streets-v9';

                            map = new mapboxgl.Map({
                                container: 'map',
                                style: map_style,
                                center: [141.488399, 40.512284],
                                zoom: 12,
                                minZoom: 6,
                                maxZoom: 17,
                                pitch: 45,
                                hash: true,
                                attributionControl: true
                            });
                            map.addControl(new mapboxgl.NavigationControl());

                            /* マップをロードしたら */
                            map.on('load', function () {

                                /* マーカー */
                                var el = document.createElement('div');
                                el.id = 'current-position-marker';
                                el.className = 'marker';
                                el.innerHTML = '<i class="fas fa-map-marker-alt fa-3x faa-bounce animated"></i>';

                                /* 現在地を取得する */
                                var cp = getCurrentPosition();

                                /* 取得結果の実行 */
                                cp.then(function(latlon) {  // 取得成功

                                    /* 現在地にマーカーを立てる */
                                    new mapboxgl.Marker(el, {offset: [0, -19]})
                                        .setLngLat([latlon.longitude, latlon.latitude])
                                        .addTo(map);

                                    map.flyTo({
                                        center: [latlon.longitude, latlon.latitude],
                                        zoom: 15
                                    });

                                    /* 半径 300m に円を描く */
                                    // map.addSource("polygon", createGeoJSONCircle([latlon.longitude, latlon.latitude], 0.3));
                                    //
                                    // map.addLayer({
                                    //     "id": "polygon",
                                    //     "type": "fill",
                                    //     "source": "polygon",
                                    //     "layout": {},
                                    //     "paint": {
                                    //         "fill-color": "skyblue",
                                    //         "fill-opacity": 0.5
                                    //     }
                                    // });

                                    // map.getSource('polygon').setData(createGeoJSONCircle([-93.6248586, 41.58527859], 1).data);

                                    // Post.postData(latlon);

                                }, function(reason) {   // 取得失敗
                                    alert(reason);
                                });

                            });

                    });

                });
            });

        }
    }

    static tutorial() {
        // alert('チュートリアル');
    }

    static aboutOpenData() {
        $("html,body").animate({scrollTop:$('#under-area-02-top').offset().top});
        // alert('オープンデータとは');
    }

    static forMobile() {
        $("html,body").animate({scrollTop:$('#under-area-03-top').offset().top});
        // alert('スマートフォン向け');
    }
}
