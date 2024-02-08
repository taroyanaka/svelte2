<script>
let hello_fetch_data = [];
let data_id_from_online = null;
// let DEV_MODE = true;
let DEV_MODE = false;
let EDIT_MODE = false;
let NEW_TEXT = 'text';
let NEW_LINK = 'https://google.com';
let ALL_DATA_LIST_INDEX = 0;
let ALL_DATA_LIST = [];
// left_sideかright_sideどちらかだけを表示するトグル関数
let IS_SHOW_LEFT = true;
let IS_SHOW_RIGHT = true;
let IS_CALENDAR_VISIBLE = true;


// const obj = await app.$$.ctx;
// const keys = Object.keys(obj);  // ["a", "b", "c"] // キーの配列を取得
// const values = Object.values(obj);  // [1, 2, 3] // 値の配列を取得
// const entries = Object.entries(obj);  // [["a", 1], ["b", 2], ["c", 3]] // キーと値のペアの配列を取得
// await entries.filter(V=>typeof V[1] === 'function').filter(V=>V[1].name === 'test_db_init_only_set_name_password_test_mode')[0][1]();


const ALL_DATA_LIST_SAMPLE = [
	{
		"data_id_from_online": null,
		"meta_data": {
			"desc": "Best albums of all time of hard rock and heavy metal, 10"
		},
		"list": [
			{
				"id": 0,
				"text": "High Voltage: AC/DC",
				"link": "https://google.com",
				"check": true,
				"check_date": "2024-01-28T07:19:52.122Z"
			},
			{
				"id": 1,
				"text": "Led Zeppelin IV: Led Zeppelin",
				"link": "https://google.com",
				"check": true,
				"check_date": "2024-01-28T07:19:52.947Z"
			},
		]
	},
];
ALL_DATA_LIST = ALL_DATA_LIST_SAMPLE;
const ALL_DATA_LIST_validation_fn = (ALL_DATA_LIST) =>{
try {
	// "data_id_from_online": 整数かnull
	// "meta_data": {desc: 1文字以上100文字以下の文字列}
	// "list": 配列{ id: 整数で連番。最初の要素は0, text: 1文字以上100文字以下の文字列, link: URL文字列, check: Boolean, check_date: ISO8601形式のDate文字列}
	// "list"が空の場合はエラー
	const check_data_id_from_online = (Data_id_from_online) => {
		typeof Data_id_from_online === 'number' || Data_id_from_online === null ? null : (()=>{throw new Error('data_id_from_onlineが整数かnullでない場合はエラー')})();
	};
	const check_meta_data = (Meta_Data) => {
		typeof Meta_Data.desc === 'string' && Meta_Data.desc.length > 0 && Meta_Data.desc.length < 101 ? null : (()=>{throw new Error('meta_dataが1文字以上100文字以下の文字列でない場合はエラー')})();
	};
	const check_list = (List) => {
		// Listが配列であることを確認
		Array.isArray(List) ? null : (()=>{throw new Error('Listが配列でない場合はエラー')})();
		List.length > 0 ? null : (()=>{throw new Error('listが空の場合はエラー')})();
		// item.idが連番であることを確認
		List.forEach((item, idx) => {
			// idが整数で連番。最初の要素は0
			item.id === idx ? null : (()=>{throw new Error('idが整数で連番。最初の要素は0でない場合はエラー')})();
			// textが1文字以上100文字以下の文字列
			item.text.length > 0 && item.text.length < 101 ? null : (()=>{throw new Error('textが1文字以上100文字以下の文字列でない場合はエラー')})();
			// linkがURL文字列
			isURL(item.link) ? null : (()=>{throw new Error('linkがURL文字列でない場合はエラー')})();
			// checkがBoolean
			typeof item.check === 'boolean' ? null : (()=>{throw new Error('checkがBooleanでない場合はエラー')})();
			// check_dateがISO8601形式のDate文字列
			// isISO8601(item.check_date) ? null : (()=>{throw new Error('check_dateがISO8601形式のDate文字列でない場合はエラー')})();
		});
	};
	// 全てのcheck関数を実行
	ALL_DATA_LIST.forEach(All_Data=>{
		check_data_id_from_online(All_Data.data_id_from_online);
		check_meta_data(All_Data.meta_data);
		check_list(All_Data.list);
	});
} catch (error) {
	console.log(error);
	ERROR_MESSAGE = error.message;
}
};
const check_fn = (idx) => {
	if(ALL_DATA_LIST[ALL_DATA_LIST_INDEX]['list'][idx]['check'] === true){
		delete_event((new Date(ALL_DATA_LIST[ALL_DATA_LIST_INDEX]['list'][idx]['check_date'])));
		ALL_DATA_LIST[ALL_DATA_LIST_INDEX]['list'][idx]['check'] = false;
		ALL_DATA_LIST[ALL_DATA_LIST_INDEX]['list'][idx]['check_date'] = (new Date()).toISOString();
		return;
	};
	if(ALL_DATA_LIST[ALL_DATA_LIST_INDEX]['list'][idx]['check'] === false){
		ALL_DATA_LIST[ALL_DATA_LIST_INDEX]['list'][idx]['check_date'] = (new Date()).toISOString();
		add_event(ALL_DATA_LIST[ALL_DATA_LIST_INDEX]['list'][idx]['text'], (new Date(ALL_DATA_LIST[ALL_DATA_LIST_INDEX]['list'][idx]['check_date'])));
		ALL_DATA_LIST[ALL_DATA_LIST_INDEX]['list'][idx]['check'] = true;
	};
	if(data_id_from_online !== null){
		console.log("data_id_from_online", data_id_from_online);
		insert_or_update_link(data_id_from_online);
	}
};
const new_list_obj = ({Text="foo_bar",Link="https://google.com", INDEX=0}) => ({ id: INDEX, text: Text, link: Link, check: false, check_date: (new Date()).toISOString() });
// Svelteでは、配列を更新するときには、配列自体への参照を変更する必要があります。これは、Svelteが配列の変更を検出するために配列への参照の変更を監視しているからです。
const add_list = () => {
try {
	const old_ALL_DATA_LIST = JSON.parse(JSON.stringify(ALL_DATA_LIST));
	old_ALL_DATA_LIST[ALL_DATA_LIST_INDEX]['list'] = [
		...old_ALL_DATA_LIST[ALL_DATA_LIST_INDEX]['list'],
		new_list_obj({Text: NEW_TEXT, Link: NEW_LINK, INDEX: old_ALL_DATA_LIST[ALL_DATA_LIST_INDEX]['list'].length})
	];
	console.log(old_ALL_DATA_LIST);
	ALL_DATA_LIST_validation_fn(old_ALL_DATA_LIST);
	ALL_DATA_LIST = old_ALL_DATA_LIST;
	console.log("add_list success!!");
} catch (error) {
	console.log(error);
	ERROR_MESSAGE = error.message;		
}
};
const insert_list = ({ALL_DATA_LIST_Idx=0, List_Idx=0}) => {
try {
	ALL_DATA_LIST_Idx = ALL_DATA_LIST_Idx === null ? 0 : ALL_DATA_LIST_Idx;
	List_Idx = List_Idx === null ? 0 : List_Idx;
	const old_ALL_DATA_LIST = JSON.parse(JSON.stringify(ALL_DATA_LIST));
	ALL_DATA_LIST_validation_fn(old_ALL_DATA_LIST);
	ALL_DATA_LIST[ALL_DATA_LIST_Idx]['list'] = [
		...old_ALL_DATA_LIST[ALL_DATA_LIST_Idx]['list'].slice(0, List_Idx),
		new_list_obj("foo_bar", List_Idx),
		...old_ALL_DATA_LIST[ALL_DATA_LIST_Idx]['list'].slice(List_Idx)
	];
	console.log("insert_list success!!");
} catch (error) {
	console.log(error);
	ERROR_MESSAGE = error.message;		
}
};
const delete_list = ({ALL_DATA_LIST_Idx=0, List_Idx=0}) => {
try {
	ALL_DATA_LIST_Idx = ALL_DATA_LIST_Idx === null ? 0 : ALL_DATA_LIST_Idx;
	List_Idx = List_Idx === null ? 0 : List_Idx;
	const old_ALL_DATA_LIST = JSON.parse(JSON.stringify(ALL_DATA_LIST));
	ALL_DATA_LIST_validation_fn(old_ALL_DATA_LIST);
	ALL_DATA_LIST[ALL_DATA_LIST_Idx]['list'] = [
		...old_ALL_DATA_LIST[ALL_DATA_LIST_Idx]['list'].slice(0, List_Idx),
		...old_ALL_DATA_LIST[ALL_DATA_LIST_Idx]['list'].slice(List_Idx + 1)
	];
	console.log("delete_list success!!");
} catch (error) {
	console.log(error);
	ERROR_MESSAGE = error.message;		
}
};
// checkしたlistのindexの配列を返す関数
// const checked_list_index = () => list.map((item, idx) => item.check ? idx : null).filter((item) => item !== null);
const checked_list_index = () => ALL_DATA_LIST[ALL_DATA_LIST_INDEX]['list'].map((item, idx) => item.check ? idx : null).filter((item) => item !== null);
// StrをisURLでチェックしてtrueならそのまま返す関数
const url_check = (Str) => isURL(Str) ? Str : (()=>{throw new Error('URLの形式が正しくありません')})();
const init = (item, User_Name) => {
	// calendarの初期化
	init_calendar();
	JSON.parse(item.data_json_str).data1.forEach((V) => {
		if(V.check === true){
			add_event(V.text, V.check_date);
		}
		NAME === User_Name ? null : (V.check = false, V.check_date = (new Date()).toISOString());
	});
	ALL_DATA_LIST[0]['list'] = JSON.parse(item.data_json_str).data1;
	ALL_DATA_LIST[0]['meta_data'] = JSON.parse(item.data_json_str).data2;
};
// encodeURIComponent
// decodeURIComponent

// text validation
const any_item_validation_and_update = ({Target_Data_Type="text", Edit_New_Text="new_text", ALL_DATA_LIST_Idx=0, List_Idx=0}) => {
	try {
	const old_ALL_DATA_LIST = JSON.parse(JSON.stringify(ALL_DATA_LIST));
	old_ALL_DATA_LIST[ALL_DATA_LIST_Idx]['list'][List_Idx][Target_Data_Type] = Edit_New_Text;
	ALL_DATA_LIST_validation_fn(old_ALL_DATA_LIST[ALL_DATA_LIST_Idx]);
	ALL_DATA_LIST = old_ALL_DATA_LIST;
	ERROR_MESSAGE = "";
	} catch (error) {
	console.log(error);
	ERROR_MESSAGE = error.message;
	}
};
const all_event_check = () => {
	// eventが既にある場合は全て削除
	init_calendar();
	console.log("all_event_check");
	// hello_fetch_dataからusernameがNAMEと一致するものを取り出す
	const my_fetch_list = hello_fetch_data.filter((each_list) => each_list['username'] === NAME);
	// 全てのmy_fetch_listを一つのlistにまとめる
	const all_my_fetch_list = my_fetch_list.reduce((acc, cur) => acc.concat(cur), []);
	// all_my_fetch_listからdata1を取り出す
	const my_list_data1 = all_my_fetch_list.map((web_data) => JSON.parse(web_data.data_json_str)['data1']);
	// my_list_data1を一つのlistにまとめる
	let all_my_list_data1 = my_list_data1.reduce((acc, cur) => acc.concat(cur), []);
	// all_my_list_data1のcheck_dateをISO8601からDateに変換
	const time_fix_all_my_list_data1 = all_my_list_data1.map((item) => ({...item, check_date: new Date(item.check_date) }));
	// time_fix_all_my_list_data1の全てのidxをforeachして、checkがtrueならadd_event()を実行、falseならdelete_event()を実行
	time_fix_all_my_list_data1.forEach((item, idx) => {
		item['check'] === true ? add_event(item['text'], item['check_date']) : delete_event(item['check_date']);
	});
}
const toggle_left_or_right_side = () => {
	// IS_SHOW_LEFTとIS_SHOW_RIGHTが両方true、どちらかだけがtrue、3つの状態がある
	     if (IS_SHOW_LEFT && IS_SHOW_RIGHT){[IS_SHOW_LEFT, IS_SHOW_RIGHT] = [true, false];}
	else if (IS_SHOW_LEFT && !IS_SHOW_RIGHT){[IS_SHOW_LEFT, IS_SHOW_RIGHT] = [false, true];}
	else if (!IS_SHOW_LEFT && IS_SHOW_RIGHT){[IS_SHOW_LEFT, IS_SHOW_RIGHT] = [true, true];}
};
const toggle_calendar = () => IS_CALENDAR_VISIBLE = !IS_CALENDAR_VISIBLE;
const all_calendar_fn = () => {
    let calendar_val = null;
    let all_event = null;

    const init_calendar = () =>{
        const calendarEl = document.getElementById('calendar');
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            displayEventTime: false, // イベントの時刻を非表示にする
        });
        calendar.render();
        calendar_val = calendar;
    }

    // イベント表示
    function show_event(){
            // イベントを一括で取り出す
        var events = calendar_val.getEvents();
        events.forEach(function(event) {
            // console.log('Title: ' + event.title + ', Start: ' + event.start);
            console.log({"event": event, "event.title": event.title, "event.start": event.start});
        });
        all_event = events;
    }
    function add_event(Title="+", Date){
        calendar_val.addEvent({
            title: Title,
            allDay: false,
            start: Date,
        });
        show_event();
    }
    function delete_event(date){
        var events = calendar_val.getEvents();
        events.forEach(function(event) {
            if(event.start.getFullYear() === date.getFullYear() &&
            event.start.getMonth() === date.getMonth() &&
            event.start.getDate() === date.getDate() 
                //    秒まで一致しているか
            &&
            event.start.getHours() === date.getHours() &&
            event.start.getMinutes() === date.getMinutes() &&
            event.start.getSeconds() === date.getSeconds()
            ){
                event.remove();
            }
        });
    }
	return {
		calendar_val,
		all_event,
        init_calendar,
        show_event,
        add_event,
        delete_event,
    }
}
const all_calendar = all_calendar_fn();
const {calendar_val,all_event,init_calendar,show_event,add_event,delete_event,} = all_calendar;
const make_new_list = () =>{
	ALL_DATA_LIST[0] = {data_id_from_online: null, meta_data: {desc: "new_desc"}, list: [new_list_obj({Text:"text", Link:"https://google.com", INDEX: 0})]};
	data_id_from_online = null;
};
import { onMount } from 'svelte';
import { afterUpdate } from 'svelte';
import { isURL } from 'validator';
// $: if(fetch_message) {fetch_hello({});console.log("fetch_message");} listが更新されたらhtmlを更新する
$: {
console.log(ALL_DATA_LIST, "listが更新されたらhtmlを更新する");

}
onMount(async () => {
	try {
		await fetch_hello({});
		await fetch_get_tags_for_autocomplete();	
		await init_calendar();
		// await init(JSON.parse(hello_fetch_data[0]['data_json_str']['data1']));
	} catch (error) {
		console.log(error);		
	}

});	
afterUpdate(async () => {
	try {
		// await fetch_hello({});
		// await fetch_get_tags_for_autocomplete();	
		// await init(JSON.parse(hello_fetch_data[7][0]['data_json_str']['data1']));

	} catch (error) {
		console.log(error);		
	}

});

const all_web_prop = () => {
	// $: if(fetch_message) {fetch_hello({});console.log("fetch_message");}
// let NAME = 'user1';
let NAME = 'user2';
let TEST_MODE = 'TEST_MODE';
// let TEST_MODE = 'PRODUCTION_MODE';
// let PASSWORD = 'user_pass1';
let PASSWORD = 'user_pass2';
let COMMENT = 'comment1';
let COMMENT_REPLY = 'reply1';
let TAG = 'tag1';
let ALL_TAGS = [];
let RESPONSE;
let TAG_VAL = "";
let ORDER_BY = 'ASC';
let ORDER_BY_COLUMN = 'id';
let REQ_TAG = '';
let USER = '';
let ERROR_MESSAGE = "";
let SUCCESS_MESSAGE = '';
let ERROR_MESSAGE_STACK = [];
let SUCCESS_MESSAGE_STACK = [];
let FETCH_TEST_DATA = [{'value': 0},{'value2': 1}];
// let DOMAIN_NAME = 'https://spectrum-whip-sulfur.glitch.me/';
const DOMAIN_NAME = 'http://localhost:8000/';
return {
	NAME,
	PASSWORD,
	COMMENT,
	COMMENT_REPLY,
	TAG,
	TAG_VAL,
	ORDER_BY,
	ORDER_BY_COLUMN,
	REQ_TAG,
	USER,
	ERROR_MESSAGE,
	SUCCESS_MESSAGE,
	ERROR_MESSAGE_STACK,
	SUCCESS_MESSAGE_STACK,
	FETCH_TEST_DATA,
	ALL_TAGS,
	DOMAIN_NAME,
};
}
const all_prop = all_web_prop();
let {NAME, PASSWORD, COMMENT, COMMENT_REPLY, TAG, TAG_VAL, ORDER_BY, ORDER_BY_COLUMN, REQ_TAG, USER, ERROR_MESSAGE, SUCCESS_MESSAGE, ERROR_MESSAGE_STACK, SUCCESS_MESSAGE_STACK, FETCH_TEST_DATA, ALL_TAGS, DOMAIN_NAME} = all_prop;
// コードの見通しを良くするために(エディタのFold機能のために)、all_fetch_fnとall_fetchにより、関数を全てまとめてオブジェクトにして返す
// 1.all_fetch_fnを定義して、関数を全てまとめる 2.all_fetch_fn()を実行して全ての関数が含まれたオブジェクトを取得 3.all_fetchの全ての関数を取得
const all_fetch_fn = ()  => {
	const test = async (foo) => {console.log('test')};
	// linkのidとusernameが一致するものがある場合はupdateする
	// 一致した場合はupdateで、一致しない場合はinsertになる関数
	// server sideでLink_idとuser_idの一致は確認しているので、ここではupdateのLink_idとuser_idの一致を確認する必要はない
	const insert_or_update_link = async (Link_id) => {
		try {
			const DATA_JSON_STR = JSON.stringify({data1: ALL_DATA_LIST[ALL_DATA_LIST_INDEX]['list'], data2: ALL_DATA_LIST[ALL_DATA_LIST_INDEX]['meta_data']});
			// Link_idとuser_idが一致するものがある場合はupdateする
			if(Link_id !== undefined  && Link_id !== null){
				console.log('update');
				console.log(ALL_DATA_LIST[ALL_DATA_LIST_INDEX]['list']);
				RESPONSE = await (await fetch(DOMAIN_NAME+'update_link', get_POST_object({ name: NAME, password: PASSWORD, link_id: Link_id, data_json_str: DATA_JSON_STR }))).json();
				await response_handling(RESPONSE);
				return;
			}
			console.log('insert');
			await fetch_insert_link();
		} catch (error) {ERROR_MESSAGE = error.message;}
	};
	const fetch_hello = async ({ORDER_BY_PARAM='DESC', ORDER_BY_COLUMN_PARAM='id', REQ_TAG_PARAM, USER_PARAM}) => {
		// console.log(ORDER_BY_COLUMN_PARAM);
		try {
			console.log(REQ_TAG_PARAM);
		ORDER_BY = ORDER_BY_PARAM; // ? ORDER_BY_PARAM : 'DESC';
		ORDER_BY_COLUMN = ORDER_BY_COLUMN_PARAM; // ? ORDER_BY_COLUMN_PARAM : 'links.id';
		REQ_TAG = REQ_TAG_PARAM; // ? REQ_TAG_PARAM : null;
		USER = USER_PARAM; // ? USER_PARAM : null;
		const make_get_param = () => {
			const get_param_array = [];
			if(ORDER_BY) {get_param_array.push(`order_by=${ORDER_BY}`)};
			if(ORDER_BY_COLUMN) {get_param_array.push(`order_by_column=${ORDER_BY_COLUMN}`)};
			if(REQ_TAG) {get_param_array.push(`tag=${REQ_TAG}`)};
			if(USER) {get_param_array.push(`user=${USER}`)};
			const endpoint = DOMAIN_NAME+'read_all';
			const get_param = get_param_array.join('&');
			return `${endpoint}?${get_param}`;
		};
		const res = await (await fetch(make_get_param())).json();
		if(res.result === 'fail') throw new Error(res.error);
		const pre_result = await (await fetch(make_get_param())).json();
		// pre_resultが空の場合はエラーを投げる
		if(pre_result.length === 0) throw new Error('条件に一致するデータがありませんでした');
		hello_fetch_data = pre_result.message;
		} catch (error) {
			console.log(error);
			ERROR_MESSAGE = error.message;
		}
	};
	const get_POST_object = (BODY_OBJ) => {
		return {
		method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(BODY_OBJ)
		}
	};
	const response_handling = async (RESPONSE) => {
		try {
		// RESPONSE.status === 400 ? console.log('RESPONSE.status: RESPONSE.status === 400') : null;
		RESPONSE.status === 200 ? SUCCESS_MESSAGE = RESPONSE.result : null;
		(RESPONSE.result === 'fail' || RESPONSE.status === 400) ? (()=>{throw new Error(RESPONSE.message)})() : (await fetch_hello({}));
		} catch (error) {
			(()=>{throw new Error(error.message)})();
		}
	}
	// URLの配列の文字列から始まる場合はtrueを返す関数を1行で
	// const is_include_WHITE_LIST_URL = (target_url_str, WHITE_LIST_URL_ARRAY) => WHITE_LIST_URL_ARRAY.some((WHITE_LIST_URL) => target_url_str.startsWith(WHITE_LIST_URL));
	const fetch_insert_link = async (sample_data) => {
		try {
		// sample_dataがある場合はsample_dataをlistに代入
			if(sample_data){
				const sample_data_json_str = sample_data === "sample1" ?
					JSON.parse(`{"data1":[{"id":0,"text":"High Voltage: AC/DC","link":"https://google.com","check":true,"check_date":"2024-01-28T07:19:52.122Z"},{"id":1,"text":"Led Zeppelin IV: Led Zeppelin","link":"https://google.com","check":true,"check_date":"2024-01-28T07:19:52.947Z"},{"id":2,"text":"Appetite for Destruction: Guns N' Roses","link":"https://google.com","check":true,"check_date":"2024-01-28T07:19:54.374Z"},{"id":3,"text":"Master of Puppets: Metallica","link":"https://google.com","check":false,"check_date":"2024-01-28T07:19:48.132Z"},{"id":4,"text":"Back in Black: AC/DC","link":"https://google.com","check":false,"check_date":"2024-01-28T07:19:48.132Z"},{"id":5,"text":"Paranoid: Black Sabbath","link":"https://google.com","check":false,"check_date":"2024-01-28T07:19:48.132Z"},{"id":6,"text":"The Dark Side of the Moon: Pink Floyd","link":"https://google.com","check":false,"check_date":"2024-01-28T07:19:48.132Z"},{"id":7,"text":"Destroyer: KISS","link":"https://google.com","check":false,"check_date":"2024-01-28T07:19:48.132Z"},{"id":8,"text":"Rumours: Fleetwood Mac","link":"https://google.com","check":false,"check_date":"2024-01-28T07:19:48.132Z"},{"id":9,"text":"Machine Head: Deep Purple","link":"https://google.com","check":false,"check_date":"2024-01-28T07:19:48.132Z"}],"data2":{"desc":"Best albums of all time of hard rock and heavy metal, 10"}}`) : 
					JSON.parse(`{"data1":[{"id":0,"text":"Dark & Wild: BTS","link":"https://google.com","check":false,"check_date":"2024-01-28T07:39:04.575Z"},{"id":1,"text":"The Red Summer: Red Velvet","link":"https://google.com","check":false,"check_date":"2024-01-28T07:39:04.575Z"},{"id":2,"text":"WINGS: BTS","link":"https://google.com","check":false,"check_date":"2024-01-28T07:39:04.575Z"},{"id":3,"text":"Reboot: Wonder Girls","link":"https://google.com","check":false,"check_date":"2024-01-28T07:39:04.575Z"},{"id":4,"text":"Square Up: BLACKPINK","link":"https://google.com","check":false,"check_date":"2024-01-28T07:39:04.575Z"},{"id":5,"text":"HYYH 花様年華 (The Most Beautiful Moment in Life) Pt. 2: BTS","link":"https://google.com","check":false,"check_date":"2024-01-28T07:39:04.575Z"},{"id":6,"text":"EXODUS: EXO","link":"https://google.com","check":false,"check_date":"2024-01-28T07:39:04.575Z"},{"id":7,"text":"Odd: SHINee","link":"https://google.com","check":false,"check_date":"2024-01-28T07:39:04.575Z"},{"id":8,"text":"Flight Log: Turbulence: GOT7","link":"https://google.com","check":false,"check_date":"2024-01-28T07:39:04.575Z"},{"id":9,"text":"Love Shot: EXO","link":"https://google.com","check":false,"check_date":"2024-01-28T07:39:04.575Z"}],"data2":{"desc":"Best albums of all time of hard rock and heavy metal, 10"}}`) ;
				ALL_DATA_LIST[ALL_DATA_LIST_INDEX]['list'] = sample_data_json_str['data1'];
				ALL_DATA_LIST[ALL_DATA_LIST_INDEX]['meta_data'] = sample_data_json_str['data2'];
			}
		// listのcheckを全部falseにし、change_dateを現在時刻にする
		const check_mode = false;
		if(check_mode === true){
			ALL_DATA_LIST[ALL_DATA_LIST_INDEX]['list'] = ALL_DATA_LIST[ALL_DATA_LIST_INDEX]['list'].map((item) => item.check === true ? {...item, check: false, check_date: (new Date()).toISOString()} : item);
		};
		const DATA_JSON_STR = JSON.stringify({
			data1: ALL_DATA_LIST[ALL_DATA_LIST_INDEX]['list'],
			data2: ALL_DATA_LIST[ALL_DATA_LIST_INDEX]['meta_data']
		});
		RESPONSE = await (await fetch(DOMAIN_NAME+'insert_link', get_POST_object({ name: NAME, password: PASSWORD, data_json_str: DATA_JSON_STR }))).json();
		await response_handling(RESPONSE);
		} catch (error) {ERROR_MESSAGE = error.message;}
	};
	// copy insert(他のユーザーのlinkをコピーして自分のlinkとして保存する)
	// copyするときはcheckを全部falseでchange_dateを現在時刻にする
	const fetch_copy_insert_link = async (Other_User_DATA1, Other_User_DATA2) => {
		try {
		const DATA_JSON_STR = JSON.stringify({data1: Other_User_DATA1, data2: Other_User_DATA2});
		RESPONSE = await (await fetch(DOMAIN_NAME+'insert_link', get_POST_object({ name: NAME, password: PASSWORD, data_json_str: DATA_JSON_STR }))).json();
		await response_handling(RESPONSE);
		} catch (error) {ERROR_MESSAGE = error.message;}
	};
	const fetch_delete_link = async (LINK_ID) => {
		try {
		RESPONSE = await (await fetch(DOMAIN_NAME+'delete_link', get_POST_object({ name: NAME, password: PASSWORD, id: LINK_ID }))).json();
		await response_handling(RESPONSE);
		} catch (error) {ERROR_MESSAGE = error.message;}
	}
	const fetch_like_increment_or_decrement = async (LINK_ID) => {
		try {
		RESPONSE = await (await fetch(DOMAIN_NAME+'like_increment_or_decrement', get_POST_object({ name: NAME, password: PASSWORD, link_id: LINK_ID }))).json()
		await response_handling(RESPONSE);
		} catch (error) {ERROR_MESSAGE = error.message;}
	};
	const fetch_insert_comment = async (Link_id) => {
		try {
		RESPONSE = await (await fetch(DOMAIN_NAME+'insert_comment', get_POST_object({ name: NAME, password: PASSWORD, link_id: Link_id, comment: COMMENT }))).json();
		await response_handling(RESPONSE);
		} catch (error) {ERROR_MESSAGE = error.message;}
	};
	const fetch_delete_comment = async (COMMENT_ID) => {
		try {
		RESPONSE = await (await fetch(DOMAIN_NAME+'delete_comment', get_POST_object({ name: NAME, password: PASSWORD, comment_id: COMMENT_ID }))).json();
		await response_handling(RESPONSE);
		} catch (error) {ERROR_MESSAGE = error.message;}
	}
	const fetch_insert_comment_reply = async (Comment_id) => {
		try {
		RESPONSE = await (await fetch(DOMAIN_NAME+'insert_comment_reply', get_POST_object({ name: NAME, password: PASSWORD, comment_id: Comment_id, comment_reply: COMMENT_REPLY }))).json();
		await response_handling(RESPONSE);
		} catch (error) {ERROR_MESSAGE = error.message;}
	};
	const fetch_delete_comment_reply = async (Comment_reply_id) => {
		try {
		RESPONSE = await (await fetch(DOMAIN_NAME+'delete_comment_reply', get_POST_object({ name: NAME, password: PASSWORD, comment_reply_id: Comment_reply_id }))).json();
		await response_handling(RESPONSE);
		} catch (error) {ERROR_MESSAGE = error.message;}
	};
	const fetch_insert_tag = async (LINK_ID, TAG_PARAM) => {
		try {
		TAG = TAG_PARAM || TAG_VAL.value;
		RESPONSE = await (await fetch(DOMAIN_NAME+'insert_tag', get_POST_object({ name: NAME, password: PASSWORD, link_id: LINK_ID, tag: TAG }))).json();
		await response_handling(RESPONSE);
		} catch (error) {ERROR_MESSAGE = error.message;}
	};
	const fetch_get_collect_value_for_test = async () => {
		try {
		const RESULT_OF_TEST = await (await fetch(DOMAIN_NAME+'get_collect_value_for_test', get_POST_object({ name: NAME, password: PASSWORD }))).json();
		FETCH_TEST_DATA = RESULT_OF_TEST.message;
		} catch (error) {
		console.log(error);
		}
	};
	const fetch_get_tags_for_autocomplete = async () => {
		const json = await (await fetch(DOMAIN_NAME+'get_tags_for_autocomplete', get_POST_object({ name: NAME, password: PASSWORD })))
						.json();
		const RES = await json;
		ALL_TAGS = await RES.message;
	};
	const remove_error_message = () => ERROR_MESSAGE = "";
	// <button on:click={() => ORDER_BY_COLUMN === 'links.id' ? ORDER_BY_COLUMN = 'created_at' : ORDER_BY_COLUMN === 'created_at' ? ORDER_BY_COLUMN = 'updated_at' : ORDER_BY_COLUMN = 'links.id'}>ORDER_BY_COLUMN: {ORDER_BY_COLUMN}</button>
	// const fetch_hello = async ({ORDER_BY_PARAM='DESC', ORDER_BY_COLUMN_PARAM='links.id', REQ_TAG_PARAM, USER_PARAM}) => {
	const order_by_column_and_fetch_hello = async () => {
		switch (true) {
			case ORDER_BY_COLUMN === 'id' : ORDER_BY_COLUMN = 'created_at'; break;
			case ORDER_BY_COLUMN === 'created_at' : ORDER_BY_COLUMN = 'updated_at'; break;
			case ORDER_BY_COLUMN === 'updated_at' :  ORDER_BY_COLUMN = 'id'; break;
			default: ORDER_BY_COLUMN = 'id'; break;
		}
		await fetch_hello({
			ORDER_BY_PARAM: ORDER_BY,
			ORDER_BY_COLUMN_PARAM: ORDER_BY_COLUMN,
			REQ_TAG_PARAM: 'TEST',
		});
	};
	const order_by_and_fetch_hello = async () => {
		switch (true) {
			case ORDER_BY === 'ASC' : ORDER_BY = 'DESC'; break;
			case ORDER_BY === 'DESC' :  ORDER_BY = 'ASC'; break;
			default: ORDER_BY_COLUMN = 'DESC'; break;
		}
		await fetch_hello({
			ORDER_BY_PARAM: ORDER_BY,
			ORDER_BY_COLUMN_PARAM: ORDER_BY_COLUMN,
			// REQ_TAG_PARAM: 'TEST',
		});
	};
	const req_tag_and_fetch_hello = async (TAG) => {
		REQ_TAG = TAG;
		await fetch_hello({
			REQ_TAG_PARAM: REQ_TAG,
		});
	};
	const user_and_fetch_hello = async (USER) => {
		const USER_VAL = USER ? USER : 'user1';
		await fetch_hello({
			USER_PARAM: USER_VAL,
		});
	};
	// returnで全ての関数が含まれたオブジェクトを返す
	return {
		test,
		insert_or_update_link,
		fetch_hello,
		fetch_insert_link,
		fetch_delete_link,
		fetch_like_increment_or_decrement,
		fetch_insert_comment,
		fetch_delete_comment,
		fetch_insert_comment_reply,
		fetch_delete_comment_reply,
		fetch_insert_tag,
		fetch_copy_insert_link,
		fetch_get_collect_value_for_test,
		fetch_get_tags_for_autocomplete,
		remove_error_message,
		order_by_column_and_fetch_hello,
		order_by_and_fetch_hello,
		req_tag_and_fetch_hello,
		user_and_fetch_hello,
	};
};
const all_fetch = all_fetch_fn();
const {test,insert_or_update_link,fetch_hello,fetch_insert_link,fetch_delete_link,fetch_like_increment_or_decrement,fetch_insert_comment,fetch_delete_comment,fetch_insert_comment_reply,fetch_delete_comment_reply,fetch_insert_tag,fetch_copy_insert_link,fetch_get_collect_value_for_test,fetch_get_tags_for_autocomplete,remove_error_message,order_by_column_and_fetch_hello,order_by_and_fetch_hello,req_tag_and_fetch_hello,user_and_fetch_hello,} = all_fetch;
// all_fetch_fnと同様。エンドポイントに対するtestをまとめる
const all_test_fn = ()  => {
	const test_db_init_only_set_name_password_test_mode = async () =>{
    (NAME = 'testuser',PASSWORD = 'duct_mean_fuckst1ck',TEST_MODE = 'TEST_MODE');
    console.log('success');
}
const test_db_init_on_start = async () =>{
    try {
    (NAME = 'testuser',PASSWORD = 'duct_mean_fuckst1ck',TEST_MODE = 'TEST_MODE');
    RESPONSE = await (await fetch(DOMAIN_NAME+'test_db_init', get_POST_object({ name: NAME, password: PASSWORD, test_mode: TEST_MODE }))).json()
    RESPONSE.result === 'fail' ? (()=>{throw new Error(RESPONSE.error)})() : null;
    } catch (error) {
    ERROR_MESSAGE = error.message;
    }
}
const test_db_init_on_end = async () =>{
    try {
    (NAME = 'testuser',PASSWORD = 'duct_mean_fuckst1ck',TEST_MODE = 'TEST_MODE');
    RESPONSE = await (await fetch(DOMAIN_NAME+'test_db_init', get_POST_object({ name: NAME, password: PASSWORD, test_mode: TEST_MODE }))).json()
    RESPONSE.result === 'fail' ? (()=>{throw new Error(RESPONSE.error)})() : null;
    } catch (error) {
    ERROR_MESSAGE = error.message;
    }
}

const test_message_stacker = (Data, Expect_result) =>{
    SUCCESS_MESSAGE === 'success'
        ? (console.log('OK'), SUCCESS_MESSAGE_STACK.push(['OK', (Data?Data+'は':'') + 'OK']))
        : null;
    ERROR_MESSAGE === Expect_result
        ? (console.log('OK'), ERROR_MESSAGE_STACK.push(['OK', Expect_result]))
        : console.log('NG');
}
const test_for_LINK = async (
    {
        Data='SELECT',
        Expect_result='SQLの予約語を含む場合はエラー'
    }
    ) =>{
    LINK = Data;
    await fetch_insert_link();
    test_message_stacker(Data, Expect_result);
}

const test_for_TAG = async (
    {
        Data='test!',
        Param_of_link_id=1,
        Expect_result='記号を含む場合はエラー'
    }
    ) =>{
    await fetch_insert_tag(Param_of_link_id, Data);
    test_message_stacker(Data, Expect_result);
}

const test_for_COMMENT = async (
    {
        Data=('a'.repeat(51)),
        Param_of_link_id=1,
        Expect_result='commentの文字数がdata_limitを超える場合はエラー'
    }
    ) =>{
    COMMENT = Data;
    await fetch_insert_comment(Param_of_link_id);
    test_message_stacker(Data, Expect_result);
}

const test_for_COMMENT_REPLY = async (
    {
        Data=('a'.repeat(51)),
        Param_of_comment_id=1,
        Expect_result='commentの文字数がdata_limitを超える場合はエラー'
    }
) =>{
    COMMENT_REPLY = Data;
    await fetch_insert_comment_reply(Param_of_comment_id);
    test_message_stacker(Data, Expect_result);
}

const test_for_LIKE_INCREMENT_OR_DECREMENT = async (
    {
        Data='',
        Param_of_link_id=1,
        Expect_result='success'
    }
) =>{
    await fetch_like_increment_or_decrement(Param_of_link_id);
    test_message_stacker(Data, Expect_result);
}

const test_sample_exe = async () => {
    await test_db_init_on_start();
    await test_for_LINK({
        Data: 'SELECT',
        Expect_result: 'SQLの予約語を含む場合はエラー'
    });
    await test_for_LINK({
        Data: 'https::///google.co.jp',
        Expect_result: 'URLの形式が正しくありません'
    });
    await test_for_LINK({
        Data: 'https://hogehoge.com/',
        Expect_result: '許可されていないURLです'
    });
    await test_for_LINK({
        Data: 'https://www.yahoo.co.jp/',
        Expect_result: 'OK'
    });
    await test_for_LINK({
        Data: 'https://www.google.co.jp/',
        Expect_result: 'OK'
    });
    await test_for_LINK({
        Data: 'https://www.youtube.com/',
        Expect_result: 'OK'
    });
    await test_for_LINK({
        Data: 'https://www.google.co.jp/',
        Expect_result: '同じlinkが存在します'
    });
    
    console.log(ERROR_MESSAGE_STACK);
    console.log(SUCCESS_MESSAGE_STACK);
}

const test_sample_exe2 = async () => {
    await test_for_TAG({
        Param_of_link_id: 1,
        Expect_result: '記号を含む場合はエラー'
    });
    await test_for_TAG({
        Data: 'test!',
        Param_of_link_id: 1,
        Expect_result: '記号を含む場合はエラー'
    });
    await test_for_TAG({
        Data: 'test tag',
        Param_of_link_id: 1,
        Expect_result: '空白を含む場合はエラー'
    });
    await test_for_TAG({
        Data: 'testlong',
        Param_of_link_id: 1,
        Expect_result: '7文字以上はエラー'
    });
    await test_for_TAG({
        Data: 'SELECT',
        Param_of_link_id: 1,
        Expect_result: 'SQLの予約語を含む場合はエラー'
    });
    await test_for_TAG({
        Data: 'test',
        Param_of_link_id: 1,
        Expect_result: 'OK'
    });
    // 既に同じタグがついています
    await test_for_TAG({
        Data: 'test',
        Param_of_link_id: 1,
        Expect_result: '既に同じタグがついています'
    });
    // 別のlinkへのtagはエラーにならない
    await test_for_TAG({
        Data: 'test',
        Param_of_link_id: 2,
        Expect_result: 'OK'
    });
    // 既に同じタグがついています
    await test_for_TAG({
        Data: 'test',
        Param_of_link_id: 2,
        Expect_result: '既に同じタグがついています'
    });

    await test_for_TAG({
        Data: 'TEST',
        Param_of_link_id: 1,
        Expect_result: 'OK'
    });

    console.log(ERROR_MESSAGE_STACK);
    console.log(SUCCESS_MESSAGE_STACK);
}

const test_sample_exe3 = async () => {
    // 'commentの文字数がdata_limitを超える場合はエラー'
    // 'should return "commentの文字数がdata_limit(test userは1000)を超える場合はエラー" when comment length is greater than data limit'
    // error_check_insert_comment('a'.repeat(1500), 50);

    await test_for_COMMENT({
        Data: 'a'.repeat(1500),
        Param_of_link_id: 1,
        Expect_result: 'commentの文字数がdata_limit(test userは50)を超える場合はエラー'
    });
    // 'should return "0文字の場合はエラー" when comment length is 0'
    // error_check_insert_comment('', 100);
    await test_for_COMMENT({
        Data: '',
        Param_of_link_id: 1,
        Expect_result: '0文字の場合はエラー'
    });
    // 'should return "空白を含む場合はエラー" when comment contains spaces'
    // error_check_insert_comment('This is a comment with spaces', 100);
    await test_for_COMMENT({
        Data: 'This is a comment with spaces',
        Param_of_link_id: 1,
        Expect_result: '空白を含む場合はエラー'
    });
    // 'should return "記号を含む場合はエラー" when comment contains symbols'
    // error_check_insert_comment('This is a comment with ! symbol', 100);
    await test_for_COMMENT({
        Data: 'This!Symbol',
        Param_of_link_id: 1,
        Expect_result: '記号を含む場合はエラー'
    });
    // 'should return "300文字以上はエラー" when comment length is greater than 300'
    // error_check_insert_comment('a'.repeat(301), 100);
    await test_for_COMMENT({
        Data: 'a'.repeat(301),
        Param_of_link_id: 1,
        Expect_result: '300文字以上はエラー'
    });
    // 'should return "SQLの予約語を含む場合はエラー" when comment contains SQL reserved words'
    // error_check_insert_comment('SELECT * FROM comments', 100);
    await test_for_COMMENT({
        Data: 'SELECT * FROM comments',
        Param_of_link_id: 1,
        Expect_result: 'SQLの予約語を含む場合はエラー'
    });
    // 'should return "OK" when comment is valid'
    // error_check_insert_comment('This is a valid comment', 100);
    await test_for_COMMENT({
        Data: 'ThisIsaValidComment',
        Param_of_link_id: 1,
        Expect_result: 'OK'
    });
}

const test_sample_exe4 = async () => {
    // 'comment_replyが空の場合はエラー'
    // 'comment_replyの文字数がdata_limitを超える場合はエラー'
    await test_for_COMMENT_REPLY({
        Data: 'a'.repeat(1500),
        Param_of_comment_id: 1,
        Expect_result: 'comment_replyの文字数がdata_limit(test userは50)を超える場合はエラー'
    });
    // '0文字の場合はエラー'
    await test_for_COMMENT_REPLY({
        Data: '',
        Param_of_comment_id: 1,
        Expect_result: '0文字の場合はエラー'
    });
    // '記号を含む場合はエラー'
    await test_for_COMMENT_REPLY({
        Data: 'This!Symbol',
        Param_of_comment_id: 1,
        Expect_result: '記号を含む場合はエラー'
    });
    // '空白を含む場合はエラー'
    await test_for_COMMENT_REPLY({
        Data: 'spa ces',
        Param_of_comment_id: 1,
        Expect_result: '空白を含む場合はエラー'
    });
    // '10文字以上はエラー'
    await test_for_COMMENT_REPLY({
        Data: 'a'.repeat(11),
        Param_of_comment_id: 1,
        Expect_result: '10文字以上はエラー'
    });
    // 'SQLの予約語を含む場合はエラー'
    await test_for_COMMENT_REPLY({
        Data: 'SELECT * FROM comments',
        Param_of_comment_id: 1,
        Expect_result: 'SQLの予約語を含む場合はエラー'
    });
    // 'OK'
    await test_for_COMMENT_REPLY({
        Data: 'ValidRep',
        Param_of_comment_id: 1,
        Expect_result: 'OK'
    });
    // 同じユーザーから同じcommentへのreplyが既に存在する場合はエラー
    await test_for_COMMENT_REPLY({
        Data: 'ValidRep',
        Param_of_comment_id: 1,
        Expect_result: '同じユーザーから同じcommentへのreplyが既に存在する場合はエラー'
    });
}

const test_sample_exe5 = async () => {
    // link_idがありません
    await test_for_LIKE_INCREMENT_OR_DECREMENT({
        Param_of_link_id: 1000000000,
        Expect_result: 'link_idがありません'
    });
    // message.response = 'increment_it';
    await test_for_LIKE_INCREMENT_OR_DECREMENT({
        Param_of_link_id: 1,
        Expect_result: 'success'
    });
    // message.response = 'decrement_it';
    await test_for_LIKE_INCREMENT_OR_DECREMENT({
        Param_of_link_id: 1,
        Expect_result: 'success'
    });
    // do like again
    await test_for_LIKE_INCREMENT_OR_DECREMENT({
        Param_of_link_id: 1,
        Expect_result: 'success'
    });
}
return {
test_message_stacker,
test_db_init_only_set_name_password_test_mode,
test_db_init_on_start,
test_db_init_on_end,
test_for_LINK,
test_for_TAG,
test_for_COMMENT,
test_for_COMMENT_REPLY,
test_for_LIKE_INCREMENT_OR_DECREMENT,
test_sample_exe,
test_sample_exe2,
test_sample_exe3,
test_sample_exe4,
test_sample_exe5,
}

};
const all_test = all_test_fn();
const {test_message_stacker,test_db_init_only_set_name_password_test_mode,test_db_init_on_start,test_db_init_on_end,test_for_LINK,test_for_TAG,test_for_COMMENT,test_for_COMMENT_REPLY,test_for_LIKE_INCREMENT_OR_DECREMENT,test_sample_exe,test_sample_exe2,test_sample_exe3,test_sample_exe4,test_sample_exe5,} = all_test;
</script>


<main>
<button on:click={() => test()}>test</button>
<button on:click={() => all_event_check()}>all_event_check</button>
<button on:click={() => test_db_init_only_set_name_password_test_mode()}>test_db_init_only_set_name_password_test_mode</button>
<button on:click={() => test_for_TAG({})}>test_for_TAG</button>
<button on:click={() => toggle_left_or_right_side({})}>toggle_left_or_right_side</button>



<div class="core">
	<div class={IS_SHOW_LEFT ? '' : 'hidden'}>
	<div class="left_side">
		ALL_DATA_LIST_INDEX: {ALL_DATA_LIST_INDEX}
		ERROR_MESSAGE: {ERROR_MESSAGE}
		<button on:click={toggle_calendar}>toggle_calendar</button>
		{data_id_from_online}
		<button on:click={() => add_event()}>add_event</button>
		<button on:click={() => show_event()}>show_event</button>
		<!-- debag用(HTMLと変数をバインドしないとchromeのconsoleでapp.$$.ctxで表示されないため) -->
		<span>{all_event}</span>
		<span>{calendar_val}</span>

		{#if DEV_MODE === false}
		<div class={IS_CALENDAR_VISIBLE ? '' : 'hidden'}>
			<div id='calendar'></div>
		</div>
		{/if}





{#each ALL_DATA_LIST as outer_list, outer_idx}
		<div class="list">
		EDIT_MODE: 
		<input type="radio" class="EDIT_MODE" id="edit_mode_on" name="EDIT_MODE" value="on" on:change={() => EDIT_MODE = true} checked={EDIT_MODE} />
		<input type="radio" class="EDIT_MODE" id="edit_mode_off" name="EDIT_MODE" value="off" on:change={() => EDIT_MODE = false} checked={!EDIT_MODE} />
		<!-- <button on:click={() => insert_or_update_link(data_id_from_online)} class="insert_or_update_link">insert_or_update_link</button> -->
<button on:click={() => insert_or_update_link()} class="insert_or_update_link">insert_or_update_link</button>
		<!-- <button on:click={() => make_new_list({})} class="make_new_list">make_new_list</button> -->
<button on:click={() => make_new_list()} class="make_new_list">make_new_list</button>
		<button on:click={() => fetch_insert_link("sample1")} class="fetch_insert_link">sample1 fetch_insert_link</button>
		<button on:click={() => fetch_insert_link("sample2")} class="fetch_insert_link">sample2 fetch_insert_link</button>
		<!-- <div>desc: {meta_data.desc}</div> -->
		<div>desc: {ALL_DATA_LIST[ALL_DATA_LIST_INDEX]['meta_data']['desc']}</div>
		{#if EDIT_MODE}
			<!-- <input type="text" value={meta_data.desc} on:input={(e) => meta_data.desc = e.target.value} /> -->
<input type="text" value={ALL_DATA_LIST[ALL_DATA_LIST_INDEX]['meta_data']['desc']} on:input={(e) => ALL_DATA_LIST[ALL_DATA_LIST_INDEX]['meta_data']['desc'] = e.target.value} />
		{/if}
		<ul>
		<!-- {#each list as item, idx} -->
{#each outer_list['list'] as item, idx}
		<li class="list-group-item" style="background-color: {item.check ? 'gray' : ''}">
			<span>{idx}</span>
			<a href={item.link}>{item.text}</a>
			<span>{item.check}</span>
			<span>{item.check_date}</span>
			{#if EDIT_MODE}
				<input type="text"
					minlength="1" maxlength="20"
					required
					value={item.text} on:input={(e) => any_item_validation_and_update({Target_Data_Type: "text", Edit_New_Text: e.target.value, ALL_DATA_LIST_Idx: ALL_DATA_LIST_INDEX, List_Idx: idx}) } />
				<input type="url" 
					pattern="https?://.+"
					value={item.link} on:input={(e) => any_item_validation_and_update({Target_Data_Type: "link", Edit_New_Link: e.target.value, ALL_DATA_LIST_Idx: ALL_DATA_LIST_INDEX, List_Idx: idx}) } />
				<!-- <button on:click={() => insert_list(idx)}>insert_list</button> -->
				<button on:click={() => insert_list({ALL_DATA_LIST_Idx: ALL_DATA_LIST_INDEX, List_Idx: idx})}>insert_list</button>
				<button on:click={() => delete_list({ALL_DATA_LIST_Idx: ALL_DATA_LIST_INDEX, List_Idx: idx})}>delete_list</button>
			{/if}
			<input type="checkbox" class="checkbox" id="checkbox1" name="checkbox1" value="1" on:change={() => check_fn(idx)} checked={item.check} />
		</li>
		{/each}
		</ul>
		<input type="text" minlength="1" maxlength="20" required value={NEW_TEXT} on:input={(e) => NEW_TEXT = e.target.value} />
		<input type="url" value={NEW_LINK} on:input={(e) => NEW_LINK = e.target.value} placeholder="https://example.com" pattern="https?://.+">
		<!-- <input type="url" value={NEW_LINK} on:input={(e) => NEW_LINK = e.target.value} /> -->
		<button on:click={() => add_list()}>add_list</button>
		</div>
{/each}




	</div>
	</div>

	{#if DEV_MODE === false}
<!-- <div class={is_only_one_side_open === 'left' ? '' : 'hidden'}> -->
<div class={IS_SHOW_RIGHT ? '' : 'hidden'}>
<div class="right_side">
	<!-- debag用(HTMLと変数をバインドしないとchromeのconsoleでapp.$$.ctxで表示されないため) -->
	name: <input bind:value={NAME} type="text" placeholder="name">
	password: <input bind:value={PASSWORD} type="password" placeholder="password">
	<div>

<!-- DATA1: <textarea bind:value={DATA1} placeholder="DATA1" class="link"></textarea> -->
<!-- DATA2: <textarea bind:value={DATA2} placeholder="DATA2" class="link"></textarea> -->

<!-- <button on:click={fetch_insert_link} class="insert_link">insert_link</button> -->

		<button on:click={() => fetch_hello({})}>CLEAR</button>
		<button on:click={() => order_by_and_fetch_hello()}>ORDER_BY: {ORDER_BY}</button>
		<button on:click={() => order_by_column_and_fetch_hello()}>ORDER_BY_COLUMN: {ORDER_BY_COLUMN}</button>		
	</div>
	{#each ALL_TAGS as item, index}
	<button on:click={() => req_tag_and_fetch_hello(item.tag)}>{item.tag}</button>
	{/each}
	<ul>
	{#each hello_fetch_data as item, index}
		<br>
		<br>

		<li>		
			<div>
				{#each item.tags as tags, INDEX}
				<button on:click={() => req_tag_and_fetch_hello(tags.tag)}>{tags.tag}</button>
				{/each}
			</div>

			<div>
				<input bind:this={TAG_VAL} list="autocomplete_list" type="text" name="" id="hoge" bind:value={TAG} placeholder="tag" on:input={fetch_get_tags_for_autocomplete}>
				<datalist id="autocomplete_list">
					{#each ALL_TAGS as item, index}
					<option value={item.tag}>
					{/each}
				</datalist>
				<button on:click={fetch_insert_tag(item.id)}>fetch_insert_tag</button>
				{item.id}
			</div>
			<ul>
			<li>
			<!-- data1とdata2を一時的に表示用にJSON.stringifyする -->
			<!-- <span>data1: {JSON.parse(item.data_json_str).data1}</span> -->
<span>data1: {JSON.stringify(JSON.parse(item.data_json_str).data1)}</span>
<button on:click={() => init(
	item,
	item['username'],
	)}>init_from_online</button>
{item.id}
			<!-- <span>data2: {JSON.parse(item.data_json_str).data2}</span> -->
			<span>data2: {JSON.stringify(JSON.parse(item.data_json_str).data2)}</span>
			<button on:click={fetch_delete_link(item.id)}>fetch_delete_link</button>
			<!-- fetch_copy_insert_link 自分自身が所有するlinkの時はボタンを表示しない -->
			{#if item.username !== NAME}
			<button on:click={fetch_copy_insert_link(JSON.parse(item.data_json_str).data1, JSON.parse(item.data_json_str).data2)}>fetch_copy_insert_link</button>
			{/if}

			</li>
			</ul>

			<!-- <div>created_at: {item.created_at}</div> -->
			<!-- <div>updated_at: {item.updated_at}</div> -->
			<!-- <div>user_id: {item.user_id}</div> -->
			<!-- <div>username: {item.username}</div> -->
			<button on:click={() => user_and_fetch_hello(item.username)}>{item.username}</button>
			<!-- <div>like_count: {item.like_count}</div> -->
			<!-- like_countの数だけ😇が表示される -->
			<!-- {#each Array(item.like_count) as item, index} -->
			{#each item.likes as item, index}
			<span>😇</span>
			{/each}
			<button on:click={fetch_like_increment_or_decrement(item.id)}>like_increment_or_decrement</button>
			<div>
				<input type="text" name="" id="" bind:value={COMMENT} placeholder="comment">
				<button on:click={fetch_insert_comment(item.id)}>fetch_insert_comment</button>
			</div>
			<ul class="comment_zone">{#each item.comments_and_replies as comments_and_reply, INDEX}
				<li>
					{comments_and_reply[INDEX]['comment']}
					<button on:click={() => user_and_fetch_hello(comments_and_reply[INDEX]['username'])}>{comments_and_reply[INDEX]['username']}</button>
					<button on:click={fetch_delete_comment(comments_and_reply[INDEX]['id'])}>fetch_delete_comment</button>
				</li>
					<input bind:value={COMMENT_REPLY} type="text" placeholder="comment_reply">
					<button on:click={fetch_insert_comment_reply(comments_and_reply[INDEX]['id'])}>fetch_insert_comment_reply</button>
				<li class="reply_zone">
					<ul>{#each comments_and_reply['comment_replies'] as comment_reply, INDEX}
						<li>
							{comment_reply['reply']}
							<button on:click={() => user_and_fetch_hello(comment_reply['username'])}>{comment_reply['username']}</button>
							<button on:click={fetch_delete_comment_reply(comment_reply['id'])}>fetch_delete_comment_reply</button>
						</li>
					{/each}</ul>
				</li>
	{/each}</ul>
	</li>
	{/each}
	</ul>
	</div>
	</div>
	{/if}
</div>
</main>



<aside>
	<a href="https://taroyanaka.github.io/svelte2/">this site is https://taroyanaka.github.io/svelte2/</a>
</aside>






<style>
#calendar{
	width: 100%;
	/* height: 20rem; */
	/* zindex -1 */
	z-index: -1;
}
.EDIT_MODE{
	width: 3rem;
	height: 3rem;
}
.checkbox{
	width: 2rem;
	height: 2rem;
}
.core{
	position: relative;
	display: flex;

}
.left_side, .right_side {
  flex: 1;
}
.hidden {
    display: none;
}
input:invalid {
  border: red solid 3px;
  background-color: red !important;
}
</style>
