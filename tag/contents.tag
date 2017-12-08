<contents>

    <div id="container">
        <div id="map"></div>
    </div>

    <script>
        this.on('mount', function() {

            /* OSM を表示する */
            mapboxgl.accessToken = 'pk.eyJ1IjoieXV0YXN1a2VrYXdhIiwiYSI6ImNqN3U4dm9zeDI5a3EzMm8zM3Zha3N0YXMifQ.7c2R5J9mZpJi2Y1dU5AENw'
            var map_style = 'mapbox://styles/mapbox/streets-v9'

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
            })
            map.addControl(new mapboxgl.NavigationControl())

        })
    </script>

    <style>
        div#container {
            width: 100%;
        	height: 100%;

            /* 天地中央寄せ */
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            margin: auto;
        }

        div#map {
            /*position: absolute;*/
            width: 90vw;
            height: 70vh;
            margin: auto;

            /* 影 */
            -moz-box-shadow: 0px 10px 10px  rgba(0,0,0,0.5);
            -webkit-box-shadow: 0px 10px 10px rgba(0,0,0,0.5);
            -o-box-shadow: 0px 10px 10px rgba(0,0,0,0.5);
            -ms-box-shadow: 0px 10px 10px rgba(0,0,0,0.5);

            /* 丸角 */
            -moz-border-radius: 6px;
        	-webkit-border-radius: 6px;
        	-o-border-radius: 6px;
            -ms-border-radius: 6px;

            /* 外枠 */
            border: 1px solid gray;
        }
    </style>

</contents>
