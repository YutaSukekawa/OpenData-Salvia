<footer>

    <div id="arrow-up" class="arrow"><i class="fas fa-chevron-circle-up fa-2x mb-5"></i></div>
    <div id="arrow-down" class="arrow"><i class="fas fa-chevron-circle-down fa-2x"></i></div>
    <div id="footer" class="text-center py-1">{ footer_text }</div>

    <script>
        this.footer_text = 'OpenData Salvia beta © 2017 Yuta Sukekawa.'
    </script>

    <style>

        #arrow-up {
            display: none;
        }

        .arrow {
            margin-left: 3vw;
            /*margin-top: 1vw;*/
            margin-bottom: 3vw;
            opacity: 0.4;
            width: 100%;
            position: fixed;
            bottom: 0;

            -webkit-transform: translate3d(0,0,0);
            transform: translate3d(0,0,0);
        }

        #footer {

            width: 100%;
            position: fixed;
            bottom: 0;

            font-family: 'Slabo 27px', serif;

            color: rgba(255, 255, 255, 0.4);
            background-color: rgba(0, 0, 0, 0.4);

            z-index: 9;

            -webkit-transform: translate3d(0,0,0);
            transform: translate3d(0,0,0);
        }
    </style>
</footer>
