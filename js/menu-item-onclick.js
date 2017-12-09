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
        alert('ホーム');
    }

    static aboutThisSite() {
        alert('このサイトについて');
    }

    static find() {

        map = null;

        /* OSM window の位置を調整する */
        var header_height = document.getElementById('header').clientHeight;
        var footer_rect = document.getElementById('footer').getBoundingClientRect();
        var main_height = footer_rect.top - header_height;
        var osm_window = document.getElementById('map');

        osm_window.style.height = '70vh';

        var oc_margin_top = Math.floor((main_height - osm_window.clientHeight) / 2);
        osm_window.style.marginTop = oc_margin_top + 'px';

        /* 地図表示用にスタイルを変更 */
        osm_window.style.width = '90vw';
        osm_window.style.boxShadow = '0px 10px 10px  rgba(0,0,0,0.5)';
        osm_window.style.border = '1px solid gray';
        osm_window.style.borderRadius = '6px';

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
    }

    static tutorial() {
        alert('チュートリアル');
    }

    static aboutOpenData() {
        alert('オープンデータとは');
    }

    static forMobile() {
        alert('スマートフォン向け');
    }
}
