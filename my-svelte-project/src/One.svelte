<script>
let DESC = 'desc text';
let isEditingDesc = false; // Flag to track whether DESC is being edited

let LIST = [
	{ id: 1, text: "abc", add_date: ((new Date()).toISOString()), update_date: ((new Date()).toISOString()) },
	{ id: 2, text: "def", add_date: ((new Date()).toISOString()), update_date: ((new Date()).toISOString()) },
];

let selectedItemId = null;

const add_list = (Text = "abc", Add_Date = ((new Date()).toISOString()), Update_Date = ((new Date()).toISOString())) => {
	const newId = LIST.length > 0 ? LIST[LIST.length - 1].id + 1 : 1;

	LIST = [
	...LIST,
	{
		id: newId,
		text: Text,
		add_date: Add_Date,
		update_date: Update_Date,
	},
	];
}

const remove_list = (idToRemove) => {
	LIST = LIST.filter(item => item.id !== idToRemove);
}

const edit_list = (idToEdit, event) => {
	const newText = event.target.value;
	LIST = LIST.map(item => {
	if (item.id === idToEdit) {
		return {
		...item,
		text: newText,
		update_date: (new Date()).toISOString(),
		};
	} else {
		return item;
	}
	});
}

const toggleDetails = (itemId) => {
	console.log("toggleDetails");
	selectedItemId = selectedItemId === itemId ? null : itemId;
}
const edit_desc = (event) => DESC = event.target.value;
</script>



<div class="desc">
<span>DESC: {DESC}</span>
{#if isEditingDesc === true}
	<input type="text" bind:value={DESC} on:input={(e) => edit_desc(e)} class="without_click" />
{/if}
<button on:click={()=> isEditingDesc = !isEditingDesc} class="detail_button">▶️</button>
</div>
<br class="space">

{#each LIST as item, index}
<div class="each_item">
	<div>
		ID: {item.id}
		TEXT: {item.text}
		<button on:click={()=>toggleDetails(item.id)} class="detail_button">▶️</button>
	</div>
	<div style="display: {selectedItemId === item.id ? 'block' : 'none'};">
		<input type="text" bind:value={item['text']} on:input={(e) => edit_list(item.id, e)} class="without_click" />
		<div>Add Date: {item['add_date']}</div>
		<div>Update Date: {item['update_date']}</div>
		<button on:click={() => remove_list(item.id)}>Remove</button>
		<button on:click={()=> toggleDetails(item.id)} class="detail_button">▶️</button>
	</div>
</div>
<br class="space">
{/each}
<button on:click={() => add_list()}>add_list</button>






	
<style>
	.detail_button{
		display: inline;
		font-size: 0.8rem;
	}
	.desc{
		font-size: 2rem;
	max-height: 100%;
	max-width: 100%;
	background-color: peachpuff;		
	}
	.each_item {
	font-size: 2rem;
	max-height: 100%;
	max-width: 100%;
	background-color: gray;
	}
	.space{
	height: 0.5rem;
	}
</style>