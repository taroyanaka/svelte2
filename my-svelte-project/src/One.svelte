<script>
let DESCRIPTION = 'description text';
let IS_EDITING_DESCRIPTION = false;
let LIST = [
	{ id: 1, text: "abc", add_date: ((new Date()).toISOString()), update_date: ((new Date()).toISOString()) },
	{ id: 2, text: "def", add_date: ((new Date()).toISOString()), update_date: ((new Date()).toISOString()) },
];
let SELECTED_ITEM_ID = null;
let A_OR_D = "asc";
const change_sort = () => A_OR_D = A_OR_D === "asc" ? "desc" : "asc";
const sort_by_id = () => (change_sort(), LIST = LIST.sort((a, b) => A_OR_D === "asc" ? a.id - b.id : b.id - a.id));
const sort_by_text = () => (change_sort(), LIST = LIST.sort((a, b) => A_OR_D === "asc" ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text)));
const sort_by_add_date = () => (change_sort(), LIST = LIST.sort((a, b) => A_OR_D === "asc" ? new Date(a.add_date) - new Date(b.add_date) : new Date(b.add_date) - new Date(a.add_date)));
const sort_by_update_date = () => (change_sort(), LIST = LIST.sort((a, b) => A_OR_D === "asc" ? new Date(a.update_date) - new Date(b.update_date) : new Date(b.update_date) - new Date(a.update_date)));
const make_new_id = () => LIST.length > 0 ? LIST[LIST.length - 1].id + 1 : 1;
const add_list = (Text="abc", Add_Date=((new Date()).toISOString()), Update_Date=((new Date()).toISOString())) => LIST = [...LIST, { id: make_new_id(), text: Text, add_date: Add_Date, update_date: Update_Date, },];
const remove_list = (Id_To_Remove) => LIST = LIST.filter(item => item.id !== Id_To_Remove);
const edit_list = (Id_To_Edit, event) => LIST = LIST.map(item => item.id === Id_To_Edit ? {...item, text: event.target.value, update_date: (new Date()).toISOString()} : item);
const toggle_details = (Item_Id) => SELECTED_ITEM_ID = SELECTED_ITEM_ID === Item_Id ? null : Item_Id;
const edit_description = (event) => DESCRIPTION = event.target.value;
</script>



<div class="one_pack">
	<button on:click={sort_by_id}>Sort by ID</button>
	<button on:click={sort_by_text}>Sort by Text</button>
	<button on:click={sort_by_add_date}>Sort by Add Date</button>
	<button on:click={sort_by_update_date}>Sort by Update Date</button>
	<div class="description">
	<span>DESCRIPTION: {DESCRIPTION}</span>
	{#if IS_EDITING_DESCRIPTION === true}
		<input type="text" bind:value={DESCRIPTION} on:input={(e) => edit_description(e)} class="without_click" />
	{/if}
	<button on:click={()=> IS_EDITING_DESCRIPTION = !IS_EDITING_DESCRIPTION} class="detail_button">▶️</button>
	</div>
	<br class="space">
	
	{#each LIST as item, index}
	<div class="each_item">
		<div>
			ID: {item.id}
			TEXT: {item.text}
			<button on:click={()=>toggle_details(item.id)} class="detail_button">▶️</button>
		</div>
		<div style="display: {SELECTED_ITEM_ID === item.id ? 'block' : 'none'};">
			<input type="text" bind:value={item['text']} on:input={(e) => edit_list(item.id, e)} class="without_click" />
			<div>Add Date: {item['add_date']}</div>
			<div>Update Date: {item['update_date']}</div>
			<button on:click={() => remove_list(item.id)}>Remove</button>
			<button on:click={()=> toggle_details(item.id)} class="detail_button">▶️</button>
		</div>
	</div>
	<br class="space">
	{/each}
	<button on:click={() => add_list()}>add_list</button>
</div>






<style>
	.detail_button{
		display: inline;
		font-size: 0.8rem;
	}
	.description{
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