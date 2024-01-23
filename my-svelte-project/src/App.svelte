<script>
// let dev_mode = true;
let dev_mode = false;

let tmp_ary=[1,2,3];
// 全てdata_aとdata_bを入れるlist
let all_list_and_meta_data = [];

// dataの初期値のサンプルデータ
let data = null;
// data = {
//   labels: ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'],
//   datasets: [
//     {
//       data: [300, 50, 100, 40, 120],
//     },
//   ],
// };
let sample = ["High Voltage: AC/DC","Led Zeppelin IV: Led Zeppelin","Appetite for Destruction: Guns N' Roses","Master of Puppets: Metallica","Back in Black: AC/DC","Paranoid: Black Sabbath","The Dark Side of the Moon: Pink Floyd","Destroyer: KISS","Rumours: Fleetwood Mac","Machine Head: Deep Purple",];
let sample2 = ["Dark & Wild: BTS","The Red Summer: Red Velvet","WINGS: BTS","Reboot: Wonder Girls","Square Up: BLACKPINK","HYYH 花様年華 (The Most Beautiful Moment in Life) Pt. 2: BTS","EXODUS: EXO","Odd: SHINee","Flight Log: Turbulence: GOT7","Love Shot: EXO",];
let meta_data = {
"desc": "Best albums of all time of hard rock and heavy metal, 10",
};
// data_aにlist
// data_bにmeta_data


let test = "test";
let list = [];
let edit_mode = false;
let new_text = 'text';
let new_link = 'https://google.com';

// $: if(fetch_message) {fetch_hello({});console.log("fetch_message");}
let hello_fetch_data = [];

// let NAME = 'user1';
let NAME = 'user2';
let TEST_MODE = 'TEST_MODE';
// let TEST_MODE = 'PRODUCTION_MODE';
// let PASSWORD = 'user_pass1';
let PASSWORD = 'user_pass2';
let DATA1 = 'data1';
let DATA2 = 'data2';
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
let COLLECT_VALUE = [{'value': 0},{'value2': 1}];

// let DOMAIN_NAME = 'https://spectrum-whip-sulfur.glitch.me/';
const DOMAIN_NAME = 'http://localhost:8000/';

// コードの見通しを良くするために(エディタのFold機能のために)、all_fetch_fnとall_fetchにより、関数を全てまとめてオブジェクトにして返す
// 1.all_fetch_fnを定義して、関数を全てまとめる 2.all_fetch_fn()を実行して全ての関数が含まれたオブジェクトを取得 3.all_fetchの全ての関数を取得
const all_fetch_fn = ()  => { 
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
	
const uncheck_list = () => {
	let res = list.map((item) => ({...item, check: false, check_date: new Date()}))
	// console.log(res);
	return res;
};
	// URLの配列の文字列から始まる場合はtrueを返す関数を1行で
	// const is_include_WHITE_LIST_URL = (target_url_str, WHITE_LIST_URL_ARRAY) => WHITE_LIST_URL_ARRAY.some((WHITE_LIST_URL) => target_url_str.startsWith(WHITE_LIST_URL));
	let hoge = null;
	const fetch_insert_link = async () => {
		try {
// listのcheckを全部falseにし、change_dateを現在時刻にする
const check_mode = false;
if(check_mode===true){list = uncheck_list};
		// listをlist_validation関数でチェック
		list_validation(list);
		// RESPONSE = await (await fetch(DOMAIN_NAME+'insert_link', get_POST_object({ name: NAME, password: PASSWORD, link: LINK }))).json();
		const DATA_JSON_STR = JSON.stringify({data1: list, data2: meta_data});
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
		COLLECT_VALUE = RESULT_OF_TEST.message;
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
const {fetch_hello,fetch_insert_link,fetch_delete_link,fetch_like_increment_or_decrement,fetch_insert_comment,fetch_delete_comment,fetch_insert_comment_reply,fetch_delete_comment_reply,fetch_insert_tag,fetch_copy_insert_link,fetch_get_collect_value_for_test,fetch_get_tags_for_autocomplete,remove_error_message,order_by_column_and_fetch_hello,order_by_and_fetch_hello,req_tag_and_fetch_hello,user_and_fetch_hello,} = all_fetch;

import { onMount } from 'svelte';
import { afterUpdate } from 'svelte';
import { Doughnut } from 'svelte-chartjs';
import {Chart as ChartJS,Title,Tooltip,Legend,ArcElement,CategoryScale,	} from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
import { isURL } from 'validator';
// $: if(fetch_message) {fetch_hello({});console.log("fetch_message");} listが更新されたらhtmlを更新する
$: {
console.log(list, "listが更新されたらhtmlを更新する");
update_data();
}

let calendar_val = null;
let all_event = null;
document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
		displayEventTime: false, // イベントの時刻を非表示にする
    });
    calendar.render();
	calendar_val = calendar;
});


// 白に近い灰色
// #D2D6D9
// #D2D6D9 灰色
// #F7464A 赤
const split_volume = (ary) => ary.map((value) => 10 / ary.length);
// listのcheckがtrueのindexのみ色を変える
const any_index_color_list = (ary, index=[], color_code="#F7464A") => ary.map((value, idx) => value['check'] ? color_code : "#D2D6D9");
const update_data = () => {
	// sampleをdataと同じ形式に変換(labelsはsampleの一列目と二列目の結合,volumeは均等分割した値,)
	data = {
		// labels: list.map((value) => value['link'] + ": " + value['text']),
		labels: list.map((value) => value['text']),
		datasets: [
		{
			data: split_volume(list),
			backgroundColor: any_index_color_list(list, checked_list_index(), "#F7464A"),
		},
		],
	};
}
// idを指定してcheckを切り替え
const check_fn = (idx) => {
	// list[idx]['check']がtrueならdelete_event()を実行して早期リターン
	if(list[idx]['check'] === true){
		delete_event(list[idx]['check_date']);
		list[idx]['check'] = false;
		list[idx]['check_date'] = new Date();
		return;
	};

	if(list[idx]['check'] === false){
		list[idx]['check_date'] = new Date();
		add_event(list[idx]['text'], list[idx]['check_date']);
		list[idx]['check'] = true;
	};
};
// 最大のid+1(listが空の時は0)
const new_id = () => list.length ? Math.max(...list.map((item) => item.id)) + 1 : 0;
const new_list_obj = (Text) => ({ id: new_id(), text: Text, link: 'https://google.com', check: false, check_date: new Date() });
// Svelteでは、配列を更新するときには、配列自体への参照を変更する必要があります。これは、Svelteが配列の変更を検出するために配列への参照の変更を監視しているからです。
const add_list = () => list = [...list, new_list_obj];
const insert_list = (idx) => list = [...list.slice(0, idx), new_list_obj(), ...list.slice(idx)];
const delete_list = (idx) => list = [...list.slice(0, idx), ...list.slice(idx + 1)];
// checkしたlistのindexの配列を返す関数
const checked_list_index = () => list.map((item, idx) => item.check ? idx : null).filter((item) => item !== null);

// StrをisURLでチェックしてtrueならそのまま返す関数
const url_check = (Str) => isURL(Str) ? Str : (()=>{throw new Error('URLの形式が正しくありません')})();
// listのvalidationの関数
// 正しいデータ構造は 例: {id: 0, text: 'Dark & Wild: BTS', link: 'https://google.com', check: false, check_date: Wed Jan 17 2024 13:40:41 GMT+0900 (日本標準時)}
// {id: 整数Num, text: 1文字以上文字列, link: URL文字列(url_check関数でチェック), check: Boolean, check_date: Date}
const list_validation = (Ary) => {
	try {
	// Aryが配列でない場合はエラー
	Array.isArray(Ary) ? null : (()=>{throw new Error('Aryが配列でない場合はエラー')})();
	Ary.forEach((V, I) => {
		// idが整数でない場合はエラー
		typeof V.id !== 'number' ? (()=>{throw new Error('idが整数でない場合はエラー')})() : null;
		// textが1文字以上でない場合はエラー
		V.text.length < 1 ? (()=>{throw new Error('textが1文字以上でない場合はエラー')})() : null;
		// linkがURLでない場合はエラー
		typeof V.link !== 'string' ? (()=>{throw new Error('linkが文字列でない場合はエラー')})() : null;
		// linkがURLでない場合はエラー
		url_check(V.link);
		// checkがBooleanでない場合はエラー
		typeof V.check !== 'boolean' ? (()=>{throw new Error('checkがBooleanでない場合はエラー')})() : null;
		// check_dateがDateでない場合はエラー
		V.check_date instanceof Date ? null : (()=>{throw new Error('check_dateがDateでない場合はエラー')})();
	});
	// Aryが空の場合はエラー
	Ary.length === 0 ? (()=>{throw new Error('Aryが空の場合はエラー')})() : null;
	} catch (error) {
	console.log(error);
	ERROR_MESSAGE = error.message;
	}
};


const init = (Ary, From_Online, User_Name) => {
	console.log(NAME);
	console.log(User_Name);
	if(From_Online){
		list = Ary;
		console.log("NAME === User_Name", NAME === User_Name);
		// console.log("uncheck_list", uncheck_list());

		// NAMEとUser_Nameが一致する場合は何もせず、
		// NAMEとUser_Nameが一致しない場合は、uncheck_list()でリストのcheckとcheck_dateを初期化する
		NAME === User_Name ? null : list = uncheck_list();
		return;
	}
	tmp_ary = Ary;
	Ary.forEach(V=>{
		list = [...list, new_list_obj(V)];
	});
};

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
	// let date = new Date();
	// plus_day ? date.setDate(date.getDate() + plus_day) : null;
	calendar_val.addEvent({
		title: Title,
		allDay: false,
		start: Date,
	});
	show_event();
}

// 
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

// onMount(fetch_hello({}));
onMount(async () => {
	try {
		await fetch_hello({});
		await fetch_get_tags_for_autocomplete();	
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



init(sample);
all_list_and_meta_data = [{List: list, Meta_Data: meta_data},];
// init(sample2);

</script>

































<div class="core">
	<div class="left_side">

<div>
{#each all_list_and_meta_data as item, index}
	<div>desc: {item['Meta_Data']['desc']}</div>
	<br />
	{#each item['List'] as item2, index2}
		<div>{item2['text']}</div>
	{/each}
{/each}
</div>


{#if dev_mode === false}
<div>{sample2}</div>
{/if}

{#if dev_mode === false}
	<div id='calendar'></div>
{/if}

	<!-- <div>{tmp_ary}</div> -->

	<!-- button -->
	<button on:click={() => add_event()}>add_event</button>
	<button on:click={() => show_event()}>show_event</button>
	<!-- edit_modeのon/offのラジオ -->
	edit_mode: 
	<input type="radio" class="edit_mode" id="edit_mode_on" name="edit_mode" value="on" on:change={() => edit_mode = true} checked={edit_mode} />
	<input type="radio" class="edit_mode" id="edit_mode_off" name="edit_mode" value="off" on:change={() => edit_mode = false} checked={!edit_mode} />
	<!-- information tag -->
	<div>{meta_data.desc}</div>
	<ul>
		<!-- eachでlist -->
		{#each list as item, idx}
			<li class="list-group-item" style="background-color: {item.check ? 'gray' : ''}">
				<span>{idx}</span>
				<a href={item.link}>{item.text}</a>
<span>{item.check}</span>
<span>{item.check_date}</span>
				<!-- edit_modeのon/offで表示を切り替える -->
				{#if edit_mode}
					<input type="text" value={item.text} on:input={(e) => item.text = e.target.value} />
<input type="url" value={item.link} on:input={(e) => item.link = e.target.value} />
					<button on:click={() => insert_list(idx)}>insert_list</button>
					<button on:click={() => delete_list(idx)}>delete_list</button>
				{/if}
				<input type="checkbox" class="checkbox" id="checkbox1" name="checkbox1" value="1" on:change={() => check_fn(idx)} checked={item.check} />
			</li>
		{/each}
	</ul>
	<input type="text" value={new_text} on:input={(e) => new_text = e.target.value} />
	<input type="url" value={new_link} on:input={(e) => new_link = e.target.value} />
	<button on:click={() => add_list()}>add</button>
	<!-- debag用(HTMLと変数をバインドしないとchromeのconsoleでapp.$$.ctxで表示されないため) -->
	<span>{all_event}</span>
	<span>{calendar_val}</span>
	<!-- show_eventのボタン -->
	<button on:click={show_event}>show_event</button>
	</div>



	{#if dev_mode === false}
	<div class="right_side">
	<!-- debag用(HTMLと変数をバインドしないとchromeのconsoleでapp.$$.ctxで表示されないため) -->
	name: <input bind:value={NAME} type="text" placeholder="name">
	password: <input bind:value={PASSWORD} type="password" placeholder="password">
	<div>
		DATA1:
		<textarea bind:value={DATA1} placeholder="DATA1" class="link"></textarea>
		DATA2:
		<textarea bind:value={DATA2} placeholder="DATA2" class="link"></textarea>
		<button on:click={fetch_insert_link} class="insert_link">insert_link</button>
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
			</div>
			<ul>
			<li>
			<!-- data1とdata2を一時的に表示用にJSON.stringifyする -->
			<!-- <span>data1: {JSON.parse(item.data_json_str).data1}</span> -->
<span>data1: {JSON.stringify(JSON.parse(item.data_json_str).data1)}</span>
<button on:click={() => init(
	// JSON.parse(hello_fetch_data[0]['data_json_str'])['data1'],
	JSON.parse(item.data_json_str)['data1'],
	true,
	// username
	item['username'],
	)}>init</button>

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
	{/if}
</div>




{#if dev_mode === false}
<div class="doughnut">
	<!-- dataが存在するときだけ表示する -->
	{#if data}
		<Doughnut {data} options={{ responsive: true, 
		plugins: {
		legend: {
			display: false,
			// 'chartArea'が期待する位置に表示されないため、display: falseにしている
			// position: 'chartArea',
			position: 'top',
		}, }}} />
	{/if}
	</div>
{/if}







<!-- <span>{hello_fetch_data}</span> -->
<!-- <span>{test}</span> -->
<!-- <span>{list}</span> -->
<!-- <span>{sample}</span> -->



<main>
	<a href="https://taroyanaka.github.io/svelte2/">this site is https://taroyanaka.github.io/svelte2/</a>
</main>




























<style>
	/* 大きく表示する */
	.edit_mode{
		width: 3rem;
		height: 3rem;
	}
	.checkbox{
		width: 2rem;
		height: 2rem;
	}
	#calendar{
		width: 100%;
		/* height: 20rem; */
		/* zindex -1 */
		z-index: -1;
	}

	/* .coreと.doughnutはpositionで同じ位置に表示してdoughnutをz-indexで後ろに表示 */

	/* left_sideをwidth50%で左側にonline_dataをwidth50%で右側にdisplay flexで左右に分ける  */

.core{
	position: relative;
	display: flex;

}
.left_side, .right_side {
  flex: 1;
}
.doughnut{
	position: absolute;
	top: 0;
	left: 0;
	z-index: -2;
	/* 縦横100% */
	width: 100%;
	height: 100%;
}
/* hrefのテキストの色を緑色にする */
/* a:link { color: green; } */

</style>
	
	
	
	<!-- サービス案:オタク大学(仮 オタク大学.........)  -->
	<!-- 様々なカテゴリの履修科目(to-do list形式?)で表示 -->
	<!-- インプットした進捗度合いを他ユーザーに共有できる -->
	<!-- 例:ハードロックの名盤をアルバム名:グループ名:概要の形式で10枚 等 -->
	<!-- 履修科目はユーザー同士で作ったりできる(gptで生成も可) -->
	<!-- ゲージチャート(ドーナツチャート)とか入れたり進捗の度合いを明示的にしたい -->
	<!-- https://www.chartjs.org/samples/2.6.0/charts/doughnut.html -->