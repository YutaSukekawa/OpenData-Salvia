function importRiotTag() {


	if (! new Array().push) return false;

	/* .tag ファイルをここに追加 */
	var riot_tags = new Array(
        './tag/header.tag',
		'./tag/contents.tag',
		'./tag/footer.tag',
        './tag/map.tag',
    );

    for(var i = 0; i < riot_tags.length; i++) {
    	document.write('<script src="'+ riot_tags[i] +'" type="riot/tag"></script>');
    }
}

importRiotTag();
