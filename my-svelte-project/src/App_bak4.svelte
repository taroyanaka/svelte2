<script>
let name = 'world';
// 同じディレクトリの./billboard_100.jsonを読み込む
import { data } from '../billboard_100.js';
let songs = data['billboard_data'];
console.log(songs[0]);
// let a_song = songs[0];
// let songs_list = [a_song['year'], a_song['rank'], a_song['title'], a_song['artist']];
let outer_list = [];
let list_a = [];
// 最大のid+1(listが空の時は0)
const new_id = () => list_a.length ? Math.max(...list_a.map((item) => item.id)) + 1 : 0;
const new_list_obj = (Text) => ({ id: new_id(), text: Text, link: 'https://google.com', check: false, check_date: new Date() });
let categolized_list = [];
categolized_list = songs.reduce((acc, cur, i) => {
	// 同じyearのものをまとめる
	acc[cur['year']] = acc[cur['year']] ? [...acc[cur['year']], cur] : [cur];
	return acc;
}, {});
// categolized_listをlistに変換してouter_listに入れる
// 形式は[{list: {text: '[title] [artist]'}, meta_data: {desc: 'year'}}]
for (let year in categolized_list) {
	for (let song of categolized_list[year]) {
		let song_list_obj = { list: { text:
				song['rank'] + " " +
				song['title'].replace(/"/g, '') + ' - ' +
				song['artist']
			}, meta_data: { desc: song['year'] } };
		outer_list.push(song_list_obj);
	}
}
</script>





<!-- <p>{categolized_list}</p> -->
<!-- <p>{name}!</p> -->
<!-- <p>{songs_list}!</p> -->

{#each outer_list as song, idx}
<div>
	<span>{song['list']['text']}</span>
	<span>{"  "}</span>
	<span>{song['meta_data']['desc']}</span>
</div>
{/each}
<!-- <p>{outer_list}</p> -->


<style>
</style>