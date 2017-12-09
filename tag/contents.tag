<contents>

    <div id="container">
        <div id="map"></div>
    </div>

    <script>
        this.on('mount', function() {

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

            /*z-index: 8;*/
        }

        div#map {

            /*display: none;*/
            width: 90vw;
            height: 70vh;
            margin: auto;

            /* 影 */
            /*-moz-box-shadow: 0px 10px 10px  rgba(0,0,0,0.5);
            -webkit-box-shadow: 0px 10px 10px rgba(0,0,0,0.5);
            -o-box-shadow: 0px 10px 10px rgba(0,0,0,0.5);
            -ms-box-shadow: 0px 10px 10px rgba(0,0,0,0.5);*/

            /* 丸角 */
            -moz-border-radius: 6px;
        	-webkit-border-radius: 6px;
        	-o-border-radius: 6px;
            -ms-border-radius: 6px;

            /* 外枠 */
            /*border: 1px solid gray;*/

        }
    </style>

</contents>
