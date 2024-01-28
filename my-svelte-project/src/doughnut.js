<!-- ゲージチャート(ドーナツチャート)とか入れたり進捗の度合いを明示的にしたい -->
<!-- https://www.chartjs.org/samples/2.6.0/charts/doughnut.html -->







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
