<script>
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

// $: if(fetch_message) {fetch_hello({});console.log("fetch_message");}
// listが更新されたらhtmlを更新する
$: {
	console.log(list);
	console.log("listが更新されたらhtmlを更新する");
	update_data();
}

let calendar_val = null;
let all_event = null;
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
let hello_fetch_data = [];


// #4D5360 灰色
// #F7464A 赤
const split_volume = (ary) => ary.map((value) => 10 / ary.length);
// listのcheckがtrueのindexのみ色を変える
const any_index_color_list = (ary, index=[], color_code="#F7464A") => ary.map((value, idx) => value['check'] ? color_code : "#4D5360");
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
const test_db_init_on_start = async () =>{
try {
// RESPONSE.result === 'fail' ? (()=>{throw new Error(RESPONSE.error)})() : null;
} catch (error) {
// ERROR_MESSAGE = error.message;
}
}
const sample_init = () => {
	sample.forEach(V=>{
		list = [...list, new_list_obj(V)];
	});
};

sample_init();
	
// onMount(fetch_hello({}));
onMount(async () => {
try {
	// await fetch_hello({});
	// await fetch_get_tags_for_autocomplete();	
} catch (error) {
	console.log(error);		
}
});	
// afterUpdate(fetch_hello);










document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
		// クリックされた日付にイベントを追加
        // dateClick: function(info) {
        //     calendar.addEvent({
        //         title: '新しいイベント',
        //         start: info.dateStr,
        //         allDay: true
        //     });
        // }
    });

    calendar.render();
	calendar_val = calendar;
});

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


</script>

























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

<div id='calendar'></div>

<!-- <span>{hello_fetch_data}</span> -->
<!-- <span>{test}</span> -->
<!-- <span>{list}</span> -->
<!-- <span>{sample}</span> -->


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
</style>



<!-- サービス案:オタク大学(仮 オタク大学.........)  -->
<!-- 様々なカテゴリの履修科目(to-do list形式?)で表示 -->
<!-- インプットした進捗度合いを他ユーザーに共有できる -->
<!-- 例:ハードロックの名盤をアルバム名:グループ名:概要の形式で10枚 等 -->
<!-- 履修科目はユーザー同士で作ったりできる(gptで生成も可) -->
<!-- ゲージチャート(ドーナツチャート)とか入れたり進捗の度合いを明示的にしたい -->
<!-- https://www.chartjs.org/samples/2.6.0/charts/doughnut.html -->