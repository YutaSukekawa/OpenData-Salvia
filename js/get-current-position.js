function getCurrentPosition() {

    /* 現在地取得 */
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
        /* 取得成功 */
        function(position) {
            resolve({"latitude": position.coords.latitude, "longitude": position.coords.longitude});
        },

        /* 取得失敗 */
        function(error) {
            switch(error.code) {
                case 1: //PERMISSION_DENIED
                    reject("位置情報の利用が許可されていません");
                    break;
                case 2: //POSITION_UNAVAILABLE
                    reject("現在位置が取得できませんでした");
                    break;
                case 3: //TIMEOUT
                    reject("タイムアウトになりました");
                    break;
                default:
                    reject("その他のエラー(エラーコード:"+error.code+")");
                    break;
            }
        });
    });

}
