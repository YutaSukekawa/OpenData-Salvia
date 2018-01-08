function makeTableFromPointTags(value, html, tags_dict, json_tags) {

    var i = 0;
    var length = (tags_dict != null) ? Object.keys(tags_dict).length : 0;

    var address = '';   // 住所
    var phone = '';     // 電話番号
    var food_cuisine = '';  // 料理の種類
    var opening_hours = ''; // 営業時間

    var table_html = '<table>';

    switch (value) {

        /* レストラン */
        case 'restaurant':

            /* 住所を作成 */
            address = ((tags_dict[9] in json_tags) ? '〒' + json_tags[tags_dict[9]] + ' ' : '') +    // 郵便番号
                      ((tags_dict[10] in json_tags) ? json_tags[tags_dict[10]] : '') +   // 県名
                      ((tags_dict[11] in json_tags) ? json_tags[tags_dict[11]] : '') +   // 市区町村名
                      ((tags_dict[12] in json_tags) ? json_tags[tags_dict[12]] : '') +   // 地区名
                      ((tags_dict[13] in json_tags) ? json_tags[tags_dict[13]] : '') +   // 区画
                      ((tags_dict[14] in json_tags) ? json_tags[tags_dict[14]] : '');    // 区画番号
            table_html += (address != '') ? '<tr><td>住所: ' + address + '<td></tr>' : '';

            /* 電話番号 */
            phone = (tags_dict[15] in json_tags) ? json_tags[tags_dict[15]] : '';
            table_html += (phone != '') ? '<tr><td>電話番号: ' + phone + '<td></tr>' : '';

            /* 料理の種類 */
            food_cuisine = (tags_dict[0] in json_tags) ? json_tags[tags_dict[0]] : '';
            table_html += (food_cuisine != '') ? '<tr><td>料理の種類: ' + food_cuisine + '<td></tr>' : '';

            /* 営業時間 */
            opening_hours = (tags_dict[1] in json_tags) ? json_tags[tags_dict[1]] : '';
            table_html += (opening_hours != '') ? '<tr><td>営業時間: ' + opening_hours + '<td></tr>' : '';

            table_html += '</table>';

            break;

        /* ファーストフード */
        case 'fast_food':

            /* 住所を作成 */
            address = ((tags_dict[9] in json_tags) ? '〒' + json_tags[tags_dict[9]] + ' ' : '') +    // 郵便番号
                      ((tags_dict[10] in json_tags) ? json_tags[tags_dict[10]] : '') +   // 県名
                      ((tags_dict[11] in json_tags) ? json_tags[tags_dict[11]] : '') +   // 市区町村名
                      ((tags_dict[12] in json_tags) ? json_tags[tags_dict[12]] : '') +   // 地区名
                      ((tags_dict[13] in json_tags) ? json_tags[tags_dict[13]] : '') +   // 区画
                      ((tags_dict[14] in json_tags) ? json_tags[tags_dict[14]] : '');    // 区画番号
            table_html += (address != '') ? '<tr><td>住所: ' + address + '<td></tr>' : '';

            /* 電話番号 */
            phone = (tags_dict[15] in json_tags) ? json_tags[tags_dict[15]] : '';
            table_html += (phone != '') ? '<tr><td>電話番号: ' + phone + '<td></tr>' : '';

            /* 料理の種類 */
            food_cuisine = (tags_dict[0] in json_tags) ? json_tags[tags_dict[0]] : '';
            table_html += (food_cuisine != '') ? '<tr><td>料理の種類: ' + food_cuisine + '<td></tr>' : '';

            /* 営業時間 */
            opening_hours = (tags_dict[1] in json_tags) ? json_tags[tags_dict[1]] : '';
            table_html += (opening_hours != '') ? '<tr><td>営業時間: ' + opening_hours + '<td></tr>' : '';

            table_html += '</table>';

            break;

        /* カフェ */
        case 'cafe':

            /* 住所を作成 */
            address = ((tags_dict[9] in json_tags) ? '〒' + json_tags[tags_dict[9]] + ' ' : '') +    // 郵便番号
                      ((tags_dict[10] in json_tags) ? json_tags[tags_dict[10]] : '') +   // 県名
                      ((tags_dict[11] in json_tags) ? json_tags[tags_dict[11]] : '') +   // 市区町村名
                      ((tags_dict[12] in json_tags) ? json_tags[tags_dict[12]] : '') +   // 地区名
                      ((tags_dict[13] in json_tags) ? json_tags[tags_dict[13]] : '') +   // 区画
                      ((tags_dict[14] in json_tags) ? json_tags[tags_dict[14]] : '');    // 区画番号
            table_html += (address != '') ? '<tr><td>住所: ' + address + '<td></tr>' : '';

            /* 電話番号 */
            phone = (tags_dict[15] in json_tags) ? json_tags[tags_dict[15]] : '';
            table_html += (phone != '') ? '<tr><td>電話番号: ' + phone + '<td></tr>' : '';

            /* 料理の種類 */
            food_cuisine = (tags_dict[0] in json_tags) ? json_tags[tags_dict[0]] : '';
            table_html += (food_cuisine != '') ? '<tr><td>料理の種類: ' + food_cuisine + '<td></tr>' : '';

            /* 営業時間 */
            opening_hours = (tags_dict[1] in json_tags) ? json_tags[tags_dict[1]] : '';
            table_html += (opening_hours != '') ? '<tr><td>営業時間: ' + opening_hours + '<td></tr>' : '';

            table_html += '</table>';

            break;

        /* 居酒屋・バー */
        case 'pub|bar':

            /* 住所を作成 */
            address = ((tags_dict[9] in json_tags) ? '〒' + json_tags[tags_dict[9]] + ' ' : '') +    // 郵便番号
                      ((tags_dict[10] in json_tags) ? json_tags[tags_dict[10]] : '') +   // 県名
                      ((tags_dict[11] in json_tags) ? json_tags[tags_dict[11]] : '') +   // 市区町村名
                      ((tags_dict[12] in json_tags) ? json_tags[tags_dict[12]] : '') +   // 地区名
                      ((tags_dict[13] in json_tags) ? json_tags[tags_dict[13]] : '') +   // 区画
                      ((tags_dict[14] in json_tags) ? json_tags[tags_dict[14]] : '');    // 区画番号
            table_html += (address != '') ? '<tr><td>住所: ' + address + '<td></tr>' : '';

            /* 電話番号 */
            phone = (tags_dict[15] in json_tags) ? json_tags[tags_dict[15]] : '';
            table_html += (phone != '') ? '<tr><td>電話番号: ' + phone + '<td></tr>' : '';

            /* 料理の種類 */
            // food_cuisine = (tags_dict[0] in json_tags) ? json_tags[tags_dict[0]] : '';
            // table_html += (food_cuisine != '') ? '<tr><td>料理の種類: ' + food_cuisine + '<td></tr>' : '';

            /* 営業時間 */
            opening_hours = (tags_dict[1] in json_tags) ? json_tags[tags_dict[1]] : '';
            table_html += (opening_hours != '') ? '<tr><td>営業時間: ' + opening_hours + '<td></tr>' : '';

            table_html += '</table>';

            break;

    }

    html = html.replace('html-table-tag', table_html);

    return html;
}
