<script>
// const IN_APP = true;
const IN_APP = false;
// server.jsとOne.svelteのvalidationをやる
let ID = 0;
let DESCRIPTION = 'description text';
let LIST = [
	{ id: 1, text: "abc", add_date: ((new Date()).toISOString()), update_date: ((new Date()).toISOString()), check_on_off: false, check_date: ((new Date()).toISOString()) },
	{ id: 2, text: "def", add_date: ((new Date()).toISOString()), update_date: ((new Date()).toISOString()), check_on_off: false, check_date: ((new Date()).toISOString()) },
];
let IS_EDITING_DESCRIPTION = false;
let SELECTED_ITEM_ID = null;
const all_list_fn = () => {
	let A_OR_D = "asc";
	// checkboxのON/OFFでcheck_dateを更新する関数(check_on_offのtrue/falseを切り替え、check_dateを更新する)
	let check_date_update = (Id_To_Check) => LIST = LIST.map(item => item.id === Id_To_Check ? {...item, check_on_off: !item.check_on_off, check_date: (new Date()).toISOString()} : item);
	const change_sort = () => A_OR_D = A_OR_D === "asc" ? "desc" : "asc";
	const sort_by_id = () => (change_sort(), LIST = LIST.sort((a, b) => A_OR_D === "asc" ? a.id - b.id : b.id - a.id));
	const sort_by_text = () => (change_sort(), LIST = LIST.sort((a, b) => A_OR_D === "asc" ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text)));
	const sort_by_add_date = () => (change_sort(), LIST = LIST.sort((a, b) => A_OR_D === "asc" ? a.add_date.localeCompare(b.add_date) : b.add_date.localeCompare(a.add_date)));
	const sort_by_update_date = () => (change_sort(), LIST = LIST.sort((a, b) => A_OR_D === "asc" ? a.update_date.localeCompare(b.update_date) : b.update_date.localeCompare(a.update_date)));
	const sort_by_check_date = () => (change_sort(), LIST = LIST.sort((a, b) => A_OR_D === "asc" ? a.check_date.localeCompare(b.check_date) : b.check_date.localeCompare(a.check_date)));

	const id_init = () => ID = 0;
	const description_init = () => DESCRIPTION = "";
	const list_init = () => LIST = [{ id: 0, text: "", add_date: ((new Date()).toISOString()), update_date: ((new Date()).toISOString()), check_on_off: false, check_date: ((new Date()).toISOString()) }];
	const make_new_blank_list = () => (id_init(), description_init(), list_init());
	
	const make_new_id = () => LIST.length > 0 ? LIST[LIST.length - 1].id + 1 : 1;
	const add_list = (Text="abc", Add_Date=((new Date()).toISOString()), Update_Date=((new Date()).toISOString()), Check_Date=((new Date()).toISOString()),) => LIST = [...LIST, { id: make_new_id(), text: Text, add_date: Add_Date, update_date: Update_Date, check_on_off: false, check_date: Check_Date }];
	const remove_list = (Id_To_Remove) => LIST = LIST.filter(item => item.id !== Id_To_Remove);
	const edit_list = (Id_To_Edit, event) => LIST = LIST.map(item => item.id === Id_To_Edit ? {...item, text: event.target.value, update_date: (new Date()).toISOString()} : item);
	let toggle_details = (Item_Id) => SELECTED_ITEM_ID = SELECTED_ITEM_ID === Item_Id ? null : Item_Id;
	const edit_description = (event) => DESCRIPTION = event.target.value;
	return {
		check_date_update,
		sort_by_id,
		sort_by_text,
		sort_by_add_date,
		sort_by_update_date,
		sort_by_check_date,
		make_new_blank_list,
		add_list,
		remove_list,
		edit_list,
		toggle_details,
		edit_description,
	};
};
const {
		sort_by_id,
		sort_by_text,
		sort_by_add_date,
		sort_by_update_date,
		sort_by_check_date,
		make_new_blank_list,
		add_list,
		remove_list,
		edit_list,
		edit_description,
} = all_list_fn();
let {
	check_date_update,
	toggle_details,
} = all_list_fn();
const overwrite_fn_for_web = () => {
	check_date_update = async (Id_To_Check) => {
		LIST = LIST.map(item => item.id === Id_To_Check ? {...item, check_on_off: !item.check_on_off, check_date: (new Date()).toISOString()} : item);
		await fetch_insert_or_update_link(ID);
	}
	toggle_details = async (Item_Id) => {
		SELECTED_ITEM_ID = SELECTED_ITEM_ID === Item_Id ? null : Item_Id;
		await fetch_insert_or_update_link(ID);
	}
};
IN_APP ? overwrite_fn_for_web() : null;

</script>



<div class="one_pack">
	<div><button on:click={make_new_blank_list}>Make New Blank List</button></div>
	{JSON.stringify(LIST)}
	<button on:click={sort_by_id}>Sort by ID</button>
	<button on:click={sort_by_text}>Sort by Text</button>
	<button on:click={sort_by_add_date}>Sort by Add Date</button>
	<button on:click={sort_by_update_date}>Sort by Update Date</button>
	<button on:click={sort_by_check_date}>Sort by Check Date</button>
	{#if ID !== 0}<div class="id"><span>ID: {ID}</span></div>{/if}
	<div class="description">
	<span>DESCRIPTION: {DESCRIPTION}</span>
	{#if IS_EDITING_DESCRIPTION === true}
		<input type="text" bind:value={DESCRIPTION} on:input={(e) => edit_description(e)} class="without_click" />
	{/if}
	<button on:click={()=> toggle_EDITING_DESCRIPTION()} class="detail_button">▶️</button>
	</div>
	<br class="space">
	
	{#each LIST as item, index}
	<div class="each_item">
		<div>
			ID: {item.id}
			TEXT: {item.text}
<!-- 年 月　日 時 分　秒　形式で列挙 -->
<!-- add_date: {new Date(item.add_date).getFullYear()}/{new Date(item.add_date).getMonth() + 1}/{new Date(item.add_date).getDate()} {new Date(item.add_date).getHours()}:{new Date(item.add_date).getMinutes()} {new Date(item.add_date).getSeconds()}<br> -->
<!-- update_date: {new Date(item.update_date).getFullYear()}/{new Date(item.update_date).getMonth() + 1}/{new Date(item.update_date).getDate()} {new Date(item.update_date).getHours()}:{new Date(item.update_date).getMinutes()} {new Date(item.update_date).getSeconds()}<br> -->
check_date: {new Date(item.check_date).getFullYear()}/{new Date(item.check_date).getMonth() + 1}/{new Date(item.check_date).getDate()} {new Date(item.check_date).getHours()}:{new Date(item.check_date).getMinutes()} {new Date(item.check_date).getSeconds()}<br>


			<button on:click={()=> toggle_details(item.id)} class="detail_button">▶️</button>
			<!-- check_date_update button check_on_offがtrueならchecked -->
			<input type="checkbox" on:change={() => check_date_update(item.id)} bind:checked={item.check_on_off} />
		</div>
		<div style="display: {SELECTED_ITEM_ID === item.id ? 'block' : 'none'};">
			<input type="text" bind:value={item['text']} on:input={(e) => edit_list(item.id, e)} class="without_click" />
			<div>Add Date: {item['add_date']}</div>
			<div>Update Date: {item['update_date']}</div>
			<button on:click={()=> remove_list(item.id)}>Remove</button>
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