<header>

	<div id="header" class="cover bs text-white">
		<div class="text-center">
			<!-- responsive 対応 -->
			<h1 class="d-none d-md-inline-block title-text display-4 pt-3"><span class="site-title">{ big_heading }</span></h1>
			<h1 class="title-text-res d-md-none display-4 pt-1">{ big_heading }</h1>
			<h2 class="d-none d-md-inline-block title-text font-weight-normal display-5 pl-4">{ sub_heading_ja }</h2>
			<h2 class="title-text-res d-md-none font-weight-normal display-5 pb-2">{ sub_heading_ja }</h2>
		</div>

		<div class="container">
			<div class="row">
				<div id="mi_01" class="text-center col-2 d-none d-md-inline-block pt-1 pb-2">
					<i class="fas fa-home"></i>
					{ menu_items[0] }
				</div>
				<div id="mi_02" class="text-center col-2 d-none d-md-inline-block pt-1 pb-2">
					<i class="fas fa-info"></i>
					{ menu_items[1] }
				</div>
				<div id="mi_03" class="text-center col-2 d-none d-md-inline-block pt-1 pb-2">
					<i class="fas fa-search"></i>
					{ menu_items[2] }
				</div>
				<div id="mi_04" class="text-center col-2 d-none d-md-inline-block pt-1 pb-2">
					<i class="fas fa-question"></i>
					{ menu_items[3] }
				</div>
				<div id="mi_05" class="text-center col-2 d-none d-md-inline-block pt-1 pb-2">
					<i class="far fa-chart-bar"></i>
					{ menu_items[4] }
				</div>
				<div id="mi_06" class="text-center col-2 d-none d-md-inline-block pt-1 pb-2">
					<i class="fas fa-mobile"></i>
					{ menu_items[5] }
				</div>
			</div>
		</div>
	</div>

	<script>

		this.big_heading = 'OpenData Salvia'
		this.sub_heading_en = 'Let\'s find it!'
		this.sub_heading_ja = 'さあ 見つけよう！'

		/* メニュー項目 */
		this.menu_items = [
			'ホーム',
			'このサイトについて',
			'見つける！',
			'チュートリアル',
			'オープンデータとは',
			'スマートフォン向け'
		]

		var i_class_array = [
			'<i class="fas fa-home"></i> ',
			'<i class="fas fa-info"></i> ',
			'<i class="fas fa-search"></i> ',
			'<i class="fas fa-question"></i> ',
			'<i class="far fa-chart-bar"></i> ',
			'<i class="fas fa-mobile"></i> ',
		]

		/* メニュー文字ウェーブ設定 */
		this.on('mount', function() {

			var i = 0, j, innerHTML_str

			while(i < this.menu_items.length) {

				innerHTML_str = '<span class="mi">' + i_class_array[i]
				j = 0
				while(j < this.menu_items[i].length) {
					innerHTML_str += '<span>' + this.menu_items[i][j] + '</span>'
					j++
				}

				innerHTML_str += '</span>'

				document.getElementById('mi_0' + (i + 1)).innerHTML = innerHTML_str
				i++
			}

		})

	</script>

	<style>

		#header {
			z-index: 10;
		}

		/* cover */
		div.cover {
			background-color: rgba(33, 33, 33, 0.4);
		}

		/* box-shadow */
		.bs {
			-moz-box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.4);
			-webkit-box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.4);
			-o-box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.4);
			-ms-box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.4);
		}

		.site-title {
			cursor: pointer;
		}

		/* タイトル文字 */
		h1.title-text {
			/*font-family: cursive;*/
			font-size: 5vw;
			font-family: 'Slabo 27px', serif;
			display: inline-block;
		}

		h2.title-text {
			font-size: 2vw;
			font-family: "Mplus 1p";
		}

		h1.title-text-res {
			font-size: 10vw;
			font-family: 'Slabo 27px', serif;
		}

		h2.title-text-res {
			font-size: 3vw;
			font-family: "Mplus 1p";
		}

		.container {
			padding-left: 2%;
			padding-right: 2%;
		    width: 100%;
		}

		/* menu_item */
		.mi {
			font-size: 1.2vw;
			cursor: pointer;
			transition: all .3s;
		}

		/* menu_item hover 時に下線を引く */
		.mi::before,
		.mi::after {
			bottom: 0;
			content: '';
			display: block;
			height: 2px;
			position: absolute;
			transition: .5s all;
			width: 0;
		}

		.mi::before {
			background-color: tomato;
			left: 50%;
		}

		.mi::after {
			background-color: tomato;
			right: 50%;
		}

		.mi:hover {
			color: #FFCC00;
		}

		.mi:hover::before,
		.mi:hover::after {
			width: 50%;
		}

		/* hover 時に文字をウェーブ */
		.mi:hover span {
			display: inline-block;
			animation: wave 1s ease-in-out infinite;
		}

		/* アニメーションの時間をずらす */
		.mi:hover span:nth-of-type(1){ animation-delay: 0.0s; }
		.mi:hover span:nth-of-type(2){ animation-delay: 0.1s; }
		.mi:hover span:nth-of-type(3){ animation-delay: 0.2s; }
		.mi:hover span:nth-of-type(4){ animation-delay: 0.3s; }
		.mi:hover span:nth-of-type(5){ animation-delay: 0.4s; }
		.mi:hover span:nth-of-type(6){ animation-delay: 0.5s; }
		.mi:hover span:nth-of-type(7){ animation-delay: 0.6s; }
		.mi:hover span:nth-of-type(8){ animation-delay: 0.7s; }
		.mi:hover span:nth-of-type(9){ animation-delay: 0.8s; }

		@keyframes wave {
			0% {
				transform: translateY(0em);
			}
			60% {
				transform: translateY(-0.6em);
			}
			100% {
				transform: translateY(0em);
			}
		}

	</style>
</header>
