<header>

	<!-- <div class="row cover box-shadow text-white">
		<div class="col-4"><h1 class="title-text display-4 my-2 pl-5">{ big_heading }</h1></div>
		<div class="col-8"><h2 class="title-text display-5 my-2 pl-2">{ sub_heading }</h2></div>
	</div> -->

	<div id="header" class="cover box-shadow text-white">
		<div class="text-center">
			<h1 class="d-none d-md-inline-block title-text display-4 pt-3 pb-3">{ big_heading }</h1>
			<h1 class="d-md-none title-text display-4 pt-3 pb-1">{ big_heading }</h1>
			<h2 class="d-none d-md-inline-block title-text font-weight-normal display-5 pb-3 pl-4">{ sub_heading_ja }</h2>
			<h2 class="title-text-res d-md-none font-weight-normal display-5 pb-3">{ sub_heading_ja }</h2>
		</div>
	</div>

	<script>

		this.big_heading = 'OpenData Salvia'
		this.sub_heading_en = 'Let\'s find it!'
		this.sub_heading_ja = 'さあ 見つけよう！'

	</script>

	<style>
		/*cover*/
		div.cover {
			background-color: rgba(255, 255, 255, 0.3);
		}

		/*box-shadow*/
		.box-shadow {
			-moz-box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.3);
			-webkit-box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.3);
			-o-box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.3);
			-ms-box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.3);
		}

		.title-text {
			/*font-family: cursive;*/
			font-size: 5vw;
			font-family: 'Slabo 27px', serif;
			display: inline-block;
		}

		h2.title-text {
			font-size: 2vw;
			font-family: "Mplus 1p";
		}

		.title-text-res {
			font-size: 3vw;
			font-family: "Mplus 1p";
		}

	</style>
</header>
