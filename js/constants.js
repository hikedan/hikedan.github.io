const Lyrics = [
    [
        {'lyric': 'ど', 'beat': 1},
        {'lyric': 'どん', 'beat': 2},
        {'lyric': 'ど', 'beat': 1},
        {'lyric': 'どん', 'beat': 2},
        {'lyric': 'どん', 'beat': 2},
        {'lyric': 'どん！', 'beat': 2}
    ],
    [
        {'lyric': 'ど', 'beat': 1},
        {'lyric': 'どん', 'beat': 2},
        {'lyric': 'が', 'beat': 1},
        {'lyric': 'どん', 'beat': 2},
        {'lyric': 'どん', 'beat': 2},
        {'lyric': 'どん！', 'beat': 2}
    ],
    [
        {'lyric': 'どん', 'beat': 2},
        {'lyric': 'ど', 'beat': 1},
        {'lyric': 'こ', 'beat': 1},
        {'lyric': 'どん', 'beat': 2},
        {'lyric': 'どん', 'beat': 2},
        {'lyric': 'どん！', 'beat': 2}
    ],
    [
        {'lyric': 'こ', 'beat': 1},
        {'lyric': 'こん', 'beat': 2},
        {'lyric': 'こ', 'beat': 1},
        {'lyric': 'こん', 'beat': 2},
        {'lyric': 'こん', 'beat': 2},
        {'lyric': 'こん', 'beat': 2},
        {'lyric': 'やっ', 'beat': 2},
        {'lyric': 'ぴー！', 'beat': 2}
    ],
    [
        {'lyric': 'で', 'beat': 1.5},
        {'lyric': 'で', 'beat': 1.5},
        {'lyric': 'どーん！', 'beat': 5},   
    ]
]

const Holomen = [
    {'name1': "ぺこら",'name': '兎田ぺこら', 'key': 'pekora', 'color': '#7EC2FE', 'lyric_type': 0, 'intro': '全Vtuber1超絶かわいいのは誰だ！', 'call1': 'ぺこちゃん', 'call2': 'マイメロ', 'miss': '残念！はずれぺこ～', 'pass': '大当たり！', 'score': 10000}, 
    {'name1': "るしあ",'name': '潤羽るしあ', 'key': 'rushia', 'color': '#19E8C9', 'lyric_type': 1, 'intro': '全Vtuber1超絶清楚なのは誰だ！', 'call1': 'るーちゃん', 'call2': '', 'miss': 'もっとちゃんと言ってよしっかり！', 'pass': '', 'score': 300}, 
    {'name1': "フレア",'name': '不知火フレア', 'key': 'flare', 'color': '#FE3D1C', 'lyric_type': 1, 'intro': '全Vtuber1オタ声が全力なのは誰だ！', 'call1': 'フレちゃん', 'call2': '', 'miss': '私だよ！', 'pass': '頑張るぞぅ！', 'score': 300}, 
    {'name1': "ノエル",'name': '白銀ノエル', 'key': 'noel', 'color': '#ACBDC5', 'lyric_type': 1, 'intro': '全Vtuber1ボインボインなのは誰だ！', 'call1': 'ノエちゃん', 'call2': '', 'miss': '', 'pass': '', 'score': 300}, 
    {'name1': "マリン",'name': '宝鐘マリン', 'key': 'marine', 'color': '#BA2C2B', 'lyric_type': 1, 'intro': '全Vtuber1ピチピチなのは誰だ！', 'call1': 'マリン', 'call2': 'おばちゃん', 'miss': '', 'pass': '', 'score': 300}, 
    {'name1': "かなた",'name': '天音かなた', 'key': 'kanata', 'color': '#509BEA', 'lyric_type': 1, 'intro': '全Vtuber1握力が強いのは？', 'call1': '天音かなた', 'call2': 'ゴリラ', 'miss': '握りつぶしちゃうぞ☆', 'pass': '', 'score': 300}, 
    {'name1': "ココ",'name': '桐生ココ', 'key': 'coco', 'color': '#F38514', 'lyric_type': 1, 'intro': 'ホロライブ893期生、これが本物のヤクザだぞ☆', 'call1': '桐生ココ', 'call2': '', 'miss': '', 'pass': '', 'score': 300}, 
    {'name1': "わため",'name': '角巻わため', 'key': 'watame', 'color': '#F9AFB2', 'lyric_type': 2, 'intro': '配信画面にウンチが2つあるのは誰だ！', 'call1': '角巻わため', 'call2': '', 'miss': '', 'pass': '', 'score': 300}, 
    {'name1': "トワ",'name': '常闇トワ', 'key': 'towa', 'color': '#BA92CA', 'lyric_type': 3, 'intro': 'ホロライブの中で1番語彙力が無いのは誰だ！', 'call1': 'トワ様', 'call2': '', 'miss': '', 'pass': '', 'score': 300}, 
    {'name1': "ルーナ",'name': '姫森ルーナ', 'key': 'luna', 'color': '#F7ABD5', 'lyric_type': 4, 'intro': '10%の力を出し切り、頑張って優勝目指します！', 'call1': '姫森ルーナ', 'call2': '', 'miss': '', 'pass': '', 'score': 300}, 
]

const NotHolomen = [
    {'name': 'マイメロ', 'key': 'mymelo', 'parent_id': 0, 'color': '', 'lyric_type': 0, 'intro': '', 'call1': 'マイメロ', 'call2': '', 'miss': '', 'pass': '', 'score': 0}, 
    {'name': 'YAGOO', 'key': 'yagoo', 'parent_id': 0, 'color': '', 'lyric_type': 0, 'intro': '', 'call1': 'YAGOO', 'call2': '', 'miss': '', 'pass': '', 'score': 0}, 
    {'name': '汗明', 'key': 'kanmei', 'parent_id': 0, 'color': '', 'lyric_type': 0, 'intro': '', 'call1': '汗明', 'call2': '', 'miss': '', 'pass': '', 'score': 0}, 
]

const AllMen = Holomen.concat(NotHolomen);

const taiko_beat_ms = 100;
const taiko_offset = .65;
const taiko_delay = 600 * taiko_offset;
const taiko_delay_post = 600 * (1-taiko_offset);
const window_delay = 1000;

const NotHolomen_ID_start = 100;

const SCORE_MAX = 999999;