<!-- ゲージチャート(ドーナツチャート)とか入れたり進捗の度合いを明示的にしたい -->
<!-- https://www.chartjs.org/samples/2.6.0/charts/doughnut.html -->


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


// 白に近い灰色
// #D2D6D9
// #D2D6D9 灰色
// #F7464A 赤
const split_volume = (ary) => ary.map((value) => 10 / ary.length);
// listのcheckがtrueのindexのみ色を変える
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
const any_index_color_list = (ary, index=[], color_code="#F7464A") => ary.map((value, idx) => value['check'] ? color_code : "#D2D6D9");





import { Doughnut } from 'svelte-chartjs';
import {Chart as ChartJS,Title,Tooltip,Legend,ArcElement,CategoryScale,	} from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);





<!-- {#if dev_mode === false}
<div class="doughnut">
	{#if data}
		<Doughnut {data} options={{ responsive: true, 
		plugins: {
		legend: {
			display: false,
			position: 'top',
		}, }}} />
	{/if}
	</div>
{/if} -->







.doughnut{
	position: absolute;
	top: 0;
	left: 0;
	z-index: -2;
	/* 縦横100% */
	width: 100%;
	height: 100%;
}
