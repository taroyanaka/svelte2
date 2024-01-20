<script>
let name = 'world';
// 同じディレクトリの./billboard_100.jsonを読み込む
import { data } from '../billboard_100.js';
console.log(data);
// dataの[0]を変数に入れる
let songs = data['billboard_data'];

console.log(songs[0]);
// songsの中身の全てのプロパティのkeyとvalueを配列に入れる
// year
// rank
// title
// artist
let a_song = songs[0];
let songs_list = [a_song['year'], a_song['rank'], a_song['title'], a_song['artist']];


</script>

<p>Hello {name}!</p>
<p>Hello {songs_list}!</p>
<!-- <p>Hello {songs}!</p> -->









<style>

</style>