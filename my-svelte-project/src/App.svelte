<script>
let dev_mode = true;
// let dev_mode = false;
import {
test_db_init_only_set_name_password_test_mode,
test_db_init_on_start,
test_db_init_on_end,
message_stacker,
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
fetch_hello,
response_handling,
uncheck_list,
fetch_insert_link,
fetch_copy_insert_link,
fetch_delete_link,
fetch_like_increment_or_decrement,
fetch_insert_comment,
fetch_insert_comment_reply,
fetch_delete_comment,
fetch_delete_comment_reply,
fetch_insert_tag,
fetch_get_collect_value_for_test,
fetch_get_tags_for_autocomplete,
remove_error_message,
order_by_column_and_fetch_hello,
order_by_and_fetch_hello,
req_tag_and_fetch_hello,
user_and_fetch_hello,
}  from './all_web_function.js';


	import { onMount } from 'svelte';
	import { afterUpdate } from 'svelte';
	import { Doughnut } from 'svelte-chartjs';
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		ArcElement,
		CategoryScale,
	} from 'chart.js';
	ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

	// validator.jsのインポート
	import { isURL } from 'validator';

	// $: if(fetch_message) {fetch_hello({});console.log("fetch_message");}
	// listが更新されたらhtmlを更新する
	$: {
		console.log(list);
		console.log("listが更新されたらhtmlを更新する");
		// update_data();
		fetch_hello({});
	}

	let calendar_val = null;
	let all_event = null;
// document.addEventListener('DOMContentLoaded', function() {
//     const calendarEl = document.getElementById('calendar');
//     const calendar = new FullCalendar.Calendar(calendarEl, {
//         initialView: 'dayGridMonth',
// 		displayEventTime: false, // イベントの時刻を非表示にする
//     });
//     calendar.render();
// 	calendar_val = calendar;
// });



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
	let sample = [
	"High Voltage: AC/DC",
	"Led Zeppelin IV: Led Zeppelin",
	"Appetite for Destruction: Guns N' Roses",
	"Master of Puppets: Metallica",
	"Back in Black: AC/DC",
	"Paranoid: Black Sabbath",
	"The Dark Side of the Moon: Pink Floyd",
	"Destroyer: KISS",
	"Rumours: Fleetwood Mac",
	"Machine Head: Deep Purple",
	];
let sample2 = [
"Dark & Wild: BTS",
"The Red Summer: Red Velvet",
"WINGS: BTS",
"Reboot: Wonder Girls",
"Square Up: BLACKPINK",
"HYYH 花様年華 (The Most Beautiful Moment in Life) Pt. 2: BTS",
"EXODUS: EXO",
"Odd: SHINee",
"Flight Log: Turbulence: GOT7",
"Love Shot: EXO",
];
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
	let hello_fetch_data = null;

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
	const new_list_obj = (Text) => ({ id: new_id(), text: (Text || new_text), link: 'https://google.com', check: false, check_date: new Date() });
	// Svelteでは、配列を更新するときには、配列自体への参照を変更する必要があります。これは、Svelteが配列の変更を検出するために配列への参照の変更を監視しているからです。
	const add_list = () => list = [...list, new_list_obj()];
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

let tmp_ary=[1,2,3];

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
	var events = calendar_val.getEvents();
    events.forEach(function(event) {
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
			// console.log(
			// 	date.getHours(),
			// 	date.getMinutes(),
			// 	date.getSeconds(),
			// 	event.start.getHours(),
			// 	event.start.getMinutes(),
			// 	event.start.getSeconds(),
			// )
        }
    });
}



// 新しいlistを作る関数
const new_list = () => {
	list = [];
	['new_list'].forEach((V, I) => {
		list = [...list, new_list_obj(V)];
	});
};




	
	// onMount(fetch_hello({}));
	onMount(async () => {
		try {
			// await fetch_hello({});
			// await fetch_get_tags_for_autocomplete();	
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
// init(sample2);

</script>

































<div class="core">
	<div class="left_side">
		<!-- debag用(HTMLと変数をバインドしないとchromeのconsoleでapp.$$.ctxで表示されないため) -->
		<span style="display: none">{all_event}</span>
		<span style="display: none">{calendar_val}</span>
{#if dev_mode === false}
<div>{sample2}</div>
{/if}

{#if dev_mode === false}
	<div id='calendar'></div>
{/if}

	<!-- button -->
	<!-- <button on:click={() => add_event()}>add_event</button> -->
	<!-- <button on:click={() => show_event()}>show_event</button> -->
	<!-- edit_modeのon/offのラジオ -->
	<input type="radio" class="edit_mode" id="edit_mode_on" name="edit_mode" value="on" on:change={() => edit_mode = true} checked={edit_mode} />
	<input type="radio" class="edit_mode" id="edit_mode_off" name="edit_mode" value="off" on:change={() => edit_mode = false} checked={!edit_mode} />
{#if edit_mode}
	<button on:click={() => new_list()}>new_list</button>
{/if}
	<div>{meta_data.desc}</div>
<ul>

	{#each list as item, idx}
		<li class="list-group-item" style="background-color: {item.check ? 'gray' : ''}">
	{#if edit_mode}
	<div>
	<input type="text" value={new_text} on:input={(e) => new_text = e.target.value} />
	<input type="url" value={new_link} on:input={(e) => new_link = e.target.value} />
	<button on:click={() => insert_list(idx)}>insert_list</button>
	</div>
	{/if}
	<span>{idx}</span>
	<a href={item.link}>{item.text}</a>
	{#if edit_mode}<button on:click={() => delete_list(idx)}>delete_list</button>{/if}
{#if edit_mode === false}
<span>{item.check}</span>
<span>{item.check_date}</span>
{/if}
			<!-- edit_modeのon/offで表示を切り替える -->
			{#if edit_mode}
				<input type="text" value={item.text} on:input={(e) => item.text = e.target.value} />
<input type="url" value={item.link} on:input={(e) => item.link = e.target.value} />
			{/if}
			{#if edit_mode === false}
			<input type="checkbox" class="checkbox" id="checkbox1" name="checkbox1" value="1" on:change={() => check_fn(idx)} checked={item.check} />
			{/if}
		</li>
	{/each}
</ul>

{#if edit_mode}
	<input type="text" value={new_text} on:input={(e) => new_text = e.target.value} />
	<input type="url" value={new_link} on:input={(e) => new_link = e.target.value} />
	<button on:click={() => add_list()}>add</button>
{/if}

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



<!-- {JSON.parse(.data_json_str).data1} -->
{#if hello_fetch_data}
{#each JSON.parse(hello_fetch_data[0]['data_json_str'])['data1'] as item, index}
	<div>{item.text}</div>
	<div>{item.link}</div>
{/each}
{/if}



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
