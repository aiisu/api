/**
 * Created by kabocha on 2016/11/17.
 */
var roman2hiragana = {
    'a':'あ', 'i':'い', 'u':'う', 'e':'え', 'o':'お',
    'ka':'か', 'ki':'き', 'ku':'く', 'ke':'け', 'ko':'こ',
    'sa':'さ', 'si':'し', 'su':'す', 'se':'せ', 'so':'そ', 'shi':'し',
    'ta':'た', 'ti':'ち', 'tu':'つ', 'te':'て', 'to':'と', 'chi':'ち', 'tsu':'つ',
    'na':'な', 'ni':'に', 'nu':'ぬ', 'ne':'ね', 'no':'の',
    'ha':'は', 'hi':'ひ', 'hu':'ふ', 'he':'へ', 'ho':'ほ', 'fu':'ふ',
    'ma':'ま', 'mi':'み', 'mu':'む', 'me':'め', 'mo':'も',
    'ya':'や', 'yi':'い', 'yu':'ゆ', 'ye':'いぇ', 'yo':'よ',
    'ra':'ら', 'ri':'り', 'ru':'る', 're':'れ', 'ro':'ろ',
    'wa':'わ', 'wyi':'ゐ', 'wu':'う', 'wye':'ゑ', 'wo':'を',
    'nn':'ん', 'N':'ん',
    'ga':'が', 'gi':'ぎ', 'gu':'ぐ', 'ge':'げ', 'go':'ご',
    'za':'ざ', 'zi':'じ', 'zu':'ず', 'ze':'ぜ', 'zo':'ぞ', 'ji':'じ',
    'da':'だ', 'di':'ぢ', 'du':'づ', 'de':'で', 'do':'ど',
    'ba':'ば', 'bi':'び', 'bu':'ぶ', 'be':'べ', 'bo':'ぼ',
    'pa':'ぱ', 'pi':'ぴ', 'pu':'ぷ', 'pe':'ぺ', 'po':'ぽ',
    'kya':'きゃ', 'kyu':'きゅ', 'kyo':'きょ',
    'sya':'しゃ', 'syu':'しゅ', 'syo':'しょ',
    'tya':'ちゃ', 'tyi':'ちぃ', 'tyu':'ちゅ', 'tye':'ちぇ', 'tyo':'ちょ', 'cha':'ちゃ', 'chu':'ちゅ', 'che':'ちぇ', 'cho':'ちょ',
    'nya':'にゃ', 'nyi':'にぃ', 'nyu':'にゅ', 'nye':'にぇ', 'nyo':'にょ',
    'hya':'ひゃ', 'hyi':'ひぃ', 'hyu':'ひゅ', 'hye':'ひぇ', 'hyo':'ひょ',
    'mya':'みゃ', 'myi':'みぃ', 'myu':'みゅ', 'mye':'みぇ', 'myo':'みょ',
    'rya':'りゃ', 'ryi':'りぃ', 'ryu':'りゅ', 'rye':'りぇ', 'ryo':'りょ',
    'gya':'ぎゃ', 'gyi':'ぎぃ', 'gyu':'ぎゅ', 'gye':'ぎぇ', 'gyo':'ぎょ',
    'zya':'じゃ', 'zyi':'じぃ', 'zyu':'じゅ', 'zye':'じぇ', 'zyo':'じょ',
    'ja':'じゃ', 'ju':'じゅ', 'je':'じぇ', 'jo':'じょ', 'jya':'じゃ', 'jyi':'じぃ', 'jyu':'じゅ', 'jye':'じぇ', 'jyo':'じょ',
    'dya':'ぢゃ', 'dyi':'ぢぃ', 'dyu':'ぢゅ', 'dye':'ぢぇ', 'dyo':'ぢょ',
    'bya':'びゃ', 'byi':'びぃ', 'byu':'びゅ', 'bye':'びぇ', 'byo':'びょ',
    'pya':'ぴゃ', 'pyi':'ぴぃ', 'pyu':'ぴゅ', 'pye':'ぴぇ', 'pyo':'ぴょ',
    'fa':'ふぁ', 'fi':'ふぃ', 'fe':'ふぇ', 'fo':'ふぉ',
    'fya':'ふゃ', 'fyu':'ふゅ', 'fyo':'ふょ',
    'xa':'ぁ', 'xi':'ぃ', 'xu':'ぅ', 'xe':'ぇ', 'xo':'ぉ', 'la':'ぁ', 'li':'ぃ', 'lu':'ぅ', 'le':'ぇ', 'lo':'ぉ',
    'xya':'ゃ', 'xyu':'ゅ', 'xyo':'ょ',
    'xtu':'っ', 'xtsu':'っ','q':'っ',
    'wi':'うぃ', 'we':'うぇ',
    'va':'ヴぁ', 'vi':'ヴぃ', 'vu':'ヴ', 've':'ヴぇ', 'vo':'ヴぉ',
    ':':'-'
};
var voice_50 =[
    'あ', 'い', 'う', 'え', 'お',
    'か', 'き', 'く', 'け', 'こ',
    'さ', 'し', 'す', 'せ', 'そ',
    'た', 'ち', 'つ', 'て', 'と',
    'な', 'に', 'ぬ', 'ね', 'の',
    'は', 'ひ', 'ふ', 'へ', 'ほ',
    'ま', 'み', 'む', 'め', 'も',
    'や', 'い', 'ゆ', 'いぇ', 'よ',
    'ら', 'り', 'る', 'れ', 'ろ',
    'わ', 'ゐ', 'う', 'ゑ', 'を',
    'ん', 'ん',
    'が', 'ぎ', 'ぐ', 'げ', 'ご',
    'ざ', 'じ', 'ず', 'ぜ', 'ぞ',
    'だ', 'ぢ', 'づ', 'で', 'ど',
    'ば', 'び', 'ぶ', 'べ', 'ぼ',
    'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'
];

/*
 * roman -> hiragana
 *
 * @param (String) roman:
 * @return (String): hiragana
 */
function r2h(roman) {
    var i, iz, match, regex,
        hiragana = '', table = roman2hiragana;

    regex = new RegExp((function(table){
        var key,
            s = '^(?:';

        for (key in table) if (table.hasOwnProperty(key)) {
            s += key + '|';
        }
        return s + '(?:n(?![aiueo]|y[aiueo]|$))|' + '([^aiueon])\\1)';
    })(table));
    for (i = 0, iz = roman.length; i < iz; ++i) {
        if (match = roman.slice(i).match(regex)) {
            if (match[0] === 'n') {
                hiragana += 'ん';
            } else if (/^([^n])\1$/.test(match[0])) {
                hiragana += 'っ';
                --i;
            } else {
                hiragana += table[match[0]];
            }
            i += match[0].length - 1;
        } else {
            hiragana += roman[i];
        }
    }
    return hiragana;
}

function r2h_low(roman) {
    var table = roman2hiragana;
    var word = roman;
    var hiragana ="";
    var wl = word.length;
    for (var j= 0;j< wl;){
        for (var i=3;i > 0 ;i--){
            if(table.hasOwnProperty(word.substring(j,j+i))){
                hiragana += table[word.substring(j,j+i)];
                j = j+i;
                break;
            }
            if(i==1){
                j = j+i;
            }
        }
    }
    return hiragana;
}
function h2n(roman) {
    var table = roman2hiragana;
    var word = roman;
    var hiragana =[];
    var wl = word.length;
    for (var j= 0;j< wl;){
        for (var i=3;i > 0 ;i--){
            if(table.hasOwnProperty(word.substring(j,j+i))){
                hiragana.push(table[word.substring(j,j+i)]);
                j = j+i;
                break;
            }
            if(i==1){
                j = j+i;
            }
        }
    }
    var outArr = [];
    var tmpHra ;
    for (var n = 0; n < hiragana.length; n++){
        tmpHra = [];
        tmpHra =  hiragana;
        console.log(hiragana);
        for(var c = 0; c < voice_50.length; c++){
            tmpHra[n] = voice_50[c];
            var tmpWord ="";
            for (var u=0;u<tmpHra.length;u++){
                tmpWord = tmpWord + tmpHra[u];
            }
            outArr.push(tmpWord);
        }

    }
    return outArr;
}