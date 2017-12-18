/* GetBrowser */
function getBrowser() {

	/***
		引数: 無し
		処理: ブラウザの種類を取得して返す．
	***/

	var ua = navigator.userAgent;
	var result = 'unknown';
 
	if ( ua.indexOf('Edge') !== -1 ) {
		result = 'edge';
	} else if ( ua.indexOf('Chrome') !== -1 ) {
		result = 'chrome';
	} else if ( ua.indexOf('Safari') !== -1 ) {
		result = 'safari';
	}
 
	if ( ua.indexOf('Firefox') !== -1 ) {
		result = 'firefox';
	}
 
	if ( ua.indexOf('MSIE 8') !== -1 ) {
		result = 'ie8';
	} else if ( ua.indexOf('MSIE 9') !== -1 ) {
		result = 'ie9';
	} else if ( ua.indexOf('MSIE 10') !== -1 ) {
		result = 'ie10';
	} else if ( ua.indexOf('Trident') !== -1 ) {
		result = 'ie11';
	}
 
	return result;
 
}