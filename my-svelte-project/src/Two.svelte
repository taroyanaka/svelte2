<script>
//jp en
//名前 name
//詳細	description
//住所	address
//電話番号 phone
//関連URLリスト related_url
//最寄り駅	nearest_station
//休日	holiday
//営業時間 business_hours

    import { bubble } from "svelte/internal";

// const IN_APP = true;
const IN_APP = false;
// server.jsとOne.svelteのvalidationをやる
let ID = 0;
let DESCRIPTION = 'description text';
let MAIN_LIST = [
	{ id: 1, text: "abc", add_date: ((new Date()).toISOString()), update_date: ((new Date()).toISOString()), },
	{ id: 2, text: "def", add_date: ((new Date()).toISOString()), update_date: ((new Date()).toISOString()), },
	{ id: 3, text: "ghi", add_date: ((new Date()).toISOString()), update_date: ((new Date()).toISOString()), },
	{ id: 4, text: "jkl", add_date: ((new Date()).toISOString()), update_date: ((new Date()).toISOString()), },
	{ id: 5, text: "mno", add_date: ((new Date()).toISOString()), update_date: ((new Date()).toISOString()), },
	{ id: 6, text: "pqr", add_date: ((new Date()).toISOString()), update_date: ((new Date()).toISOString()), },
	{ id: 7, text: "stu", add_date: ((new Date()).toISOString()), update_date: ((new Date()).toISOString()), },
];
// DETAIL_LISTはMAIN_LISTと1:1の関係
let DETAIL_LIST = [
	{ list_id: 1, id: 1, name: 'name1', description: 'description1description2description3description4description5description6description7', address: 'address1address2address3address4', phone: 'phone1', related_url_list: ['https://www.google.com/', 'https://twitter.com/', 'https://www.apple.com/'], nearest_station: 'nearest_station1', holiday: 'holiday1', business_hours: 'business_hours1', },
	{ list_id: 2, id: 2, name: 'name3', description: 'description3description4description5description6description7', address: 'address3address4address5address6', phone: 'phone3', related_url_list: ['https://www.google.com/', 'https://twitter.com/', 'https://www.apple.com/'], nearest_station: 'nearest_station3', holiday: 'holiday3', business_hours: 'business_hours3', },
	{ list_id: 3, id: 3, name: 'name4', description: 'description4description5description6description7', address: 'address4address5address6address7', phone: 'phone4', related_url_list: ['https://www.google.com/', 'https://twitter.com/', 'https://www.apple.com/'], nearest_station: 'nearest_station4', holiday: 'holiday4', business_hours: 'business_hours4', },
	{ list_id: 4, id: 4, name: 'name5', description: 'description5description6description7', address: 'address5address6address7address8', phone: 'phone5', related_url_list: ['https://www.google.com/', 'https://twitter.com/', 'https://www.apple.com/'], nearest_station: 'nearest_station5', holiday: 'holiday5', business_hours: 'business_hours5', },
	{ list_id: 5, id: 5, name: 'name7', description: 'description7', address: 'address7address8address9address10', phone: 'phone7', related_url_list: ['https://www.google.com/', 'https://twitter.com/', 'https://www.apple.com/'], nearest_station: 'nearest_station7', holiday: 'holiday7', business_hours: 'business_hours7', },
	{ list_id: 6, id: 6, name: 'name7', description: 'description2description3description4description5description6description7', address: 'address7address8address9address10', phone: 'phone7', related_url_list: ['https://www.google.com/', 'https://twitter.com/', 'https://www.apple.com/'], nearest_station: 'nearest_station7', holiday: 'holiday7', business_hours: 'business_hours7', },
	{ list_id: 7, id: 7, name: 'name7', description: 'description7', address: 'address7address8address9address10', phone: 'phone7', related_url_list: ['https://www.google.com/', 'https://twitter.com/', 'https://www.apple.com/'], nearest_station: 'nearest_station7', holiday: 'holiday7', business_hours: 'business_hours7', },
];

let SUB_LIST = [
	{ list_id: 1, id: 1, text: "ABC", add_date: ((new Date()).toISOString()), update_date: ((new Date()).toISOString()), check_on_off: false, check_date: ((new Date()).toISOString()) },
	{ list_id: 1, id: 2, text: "DEF", add_date: ((new Date()).toISOString()), update_date: ((new Date()).toISOString()), check_on_off: false, check_date: ((new Date()).toISOString()) },
	{ list_id: 2, id: 3, text: "GHI", add_date: ((new Date()).toISOString()), update_date: ((new Date()).toISOString()), check_on_off: false, check_date: ((new Date()).toISOString()) },
	{ list_id: 3, id: 4, text: "JKL", add_date: ((new Date()).toISOString()), update_date: ((new Date()).toISOString()), check_on_off: false, check_date: ((new Date()).toISOString()) },
	{ list_id: 4, id: 5, text: "MNO", add_date: ((new Date()).toISOString()), update_date: ((new Date()).toISOString()), check_on_off: false, check_date: ((new Date()).toISOString()) },
	{ list_id: 5, id: 6, text: "PQR", add_date: ((new Date()).toISOString()), update_date: ((new Date()).toISOString()), check_on_off: false, check_date: ((new Date()).toISOString()) },
	{ list_id: 6, id: 7, text: "STU", add_date: ((new Date()).toISOString()), update_date: ((new Date()).toISOString()), check_on_off: false, check_date: ((new Date()).toISOString()) },
	{ list_id: 6, id: 8, text: "VWX", add_date: ((new Date()).toISOString()), update_date: ((new Date()).toISOString()), check_on_off: false, check_date: ((new Date()).toISOString()) },
	{ list_id: 6, id: 9, text: "YZ", add_date: ((new Date()).toISOString()), update_date: ((new Date()).toISOString()), check_on_off: false, check_date: ((new Date()).toISOString()) },
	{ list_id: 7, id: 10, text:"123", add_date: ((new Date()).toISOString()), update_date: ((new Date()).toISOString()), check_on_off: false, check_date: ((new Date()).toISOString()) },
];

let IMAGE_LIST = [
{sub_list_id: 1, id: 1,  image_url: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",},
{sub_list_id: 2, id: 2,  image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Apple_logo_grey.svg/202px-Apple_logo_grey.svg.png",},
{sub_list_id: 3, id: 3,  image_url: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",},
{sub_list_id: 4, id: 4,  image_url: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",},
{sub_list_id: 5, id: 5,  image_url: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",},
{sub_list_id: 6, id: 6,  image_url: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",},
{sub_list_id: 7, id: 7,  image_url: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",},
{sub_list_id: 8, id: 8,  image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Apple_logo_grey.svg/202px-Apple_logo_grey.svg.png",},
{sub_list_id: 9, id: 9,  image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/320px-Amazon_Web_Services_Logo.svg.png",},
{sub_list_id: 10,id: 10, image_url: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",},

{sub_list_id: 1, id: 11,  image_url: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",},
{sub_list_id: 2, id: 12,  image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Apple_logo_grey.svg/202px-Apple_logo_grey.svg.png",},
{sub_list_id: 3, id: 13,  image_url: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",},
{sub_list_id: 4, id: 14,  image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/320px-Amazon_Web_Services_Logo.svg.png",},
{sub_list_id: 5, id: 15,  image_url: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",},
{sub_list_id: 6, id: 16,  image_url: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",},
{sub_list_id: 7, id: 17,  image_url: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",},
{sub_list_id: 8, id: 18,  image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Apple_logo_grey.svg/202px-Apple_logo_grey.svg.png",},
{sub_list_id: 9, id: 19,  image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/320px-Amazon_Web_Services_Logo.svg.png",},
{sub_list_id: 10,id: 20, image_url: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",},

{sub_list_id: 1, id: 21,  image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/320px-Amazon_Web_Services_Logo.svg.png",},
];
let LIST = [];
const make_list_chain = () => {
	const MAIN_LIST_WITH_DETAIL_LIST = MAIN_LIST.map((item, index) => {
		let detail_list = DETAIL_LIST.find(detail_item => detail_item.list_id === item.id);
		let MAIN_LIST_WITH_DETAIL_LIST = {...item, ...detail_list};
		return MAIN_LIST_WITH_DETAIL_LIST;
	});
	LIST = MAIN_LIST_WITH_DETAIL_LIST.map((item, index) => {
		let sub_list = SUB_LIST.filter(sub_item => sub_item.list_id === item.id);
		let image_list = sub_list.map(sub_item => IMAGE_LIST.filter(image_item => image_item.sub_list_id === sub_item.id));
		let sub_list_with_image = sub_list.map((sub_item, sub_index) => ({...sub_item, image: image_list[sub_index]}));
		let MAIN_LIST_WITH_SUB_LIST = {...item, sub_list: sub_list_with_image};
		return MAIN_LIST_WITH_SUB_LIST;
	});
}
make_list_chain();
let SELECTED_ITEM_ID = null;
const edit_sub_list_text = (sub_list_id, event) => {
	let sub_list = SUB_LIST.find(sub_item => sub_item.id === sub_list_id);
	sub_list.text = event.target.value;
}
const toggle_details = (Item_Id) => (SELECTED_ITEM_ID = SELECTED_ITEM_ID === Item_Id ? null : Item_Id);
const check_sub_list = (sub_list_id) => {
	LIST = LIST.map(item => {
		let sub_list = item.sub_list.map(sub_item => {
			if(sub_item.id === sub_list_id){
				sub_item.check_on_off = !sub_item.check_on_off;
				sub_item.check_date = ((new Date()).toISOString());
			}
			return sub_item;
		});
		return {...item, sub_list: sub_list};
	});
}
</script>



<div class="one_pack">
	<!-- {JSON.stringify(LIST)} -->
	{#each LIST as item, index}
		<div class="one_item">
			<!-- DETAIL表示 -->
list_id: {item.list_id}
id: {item.id}
name: {item.name}
description: {item.description}
address: {item.address}
phone: {item.phone}
related_url_list: {item.related_url_list}
nearest_station: {item.nearest_station}
holiday: {item.holiday}
business_hours: {item.business_hours}

			<div class="one_item_text">{item.text}</div>
			{#each item.sub_list as sub_item, sub_index}
				<!-- checkboxをtrueにしたらbackground-colorをgrayにする -->
				<span style="background-color: {sub_item.check_on_off ? 'gray' : 'white'};">
				{sub_item.text}
				{#each sub_item.image as image_item, image_index}
					<img src={image_item.image_url} class="image_resize" alt="image_url" />
				{/each}
				<button on:click={()=> toggle_details(sub_item.id)} class="detail_button">▶️</button>
				{#if SELECTED_ITEM_ID === sub_item.id}
					<input type="text" bind:value={sub_item.text} on:input={(e) => edit_sub_list_text(sub_item.id, e)} class="without_click" />
				{/if}
				<input type="checkbox" on:change={() => check_sub_list(sub_item.id)} bind:checked={sub_item.check_on_off} />
				</span>
			{/each}
		</div>
	{/each}
	{#if ID !== 0}<div class="id"><span>ID: {ID}</span></div>{/if}


	<!-- {#if SHOW_ANY === true}
		<input type="text" bind:value={DESCRIPTION} on:input={(e) => edit_description(e)} class="without_click" />
	{/if} -->


	<!-- {#if ID !== 0}<div class="id"><span>ID: {ID}</span></div>{/if}
	{#if SHOW_ANY === true}
		<input type="text" bind:value={DESCRIPTION} on:input={(e) => edit_description(e)} class="without_click" />
	{/if}
	{#each LIST as item, index}
		<input type="checkbox" on:change={() => check_date_update(item.id)} bind:checked={item.check_on_off} />
		<div style="display: {SELECTED_ITEM_ID === item.id ? 'block' : 'none'};">
			<input type="text" bind:value={item['text']} on:input={(e) => edit_list(item.id, e)} class="without_click" />
			<button on:click={()=> toggle_details(item.id)} class="detail_button">▶️</button>
		</div>
	{/each} -->
</div>






<style>
	.image_resize{
		width: 2rem;
		height: 2rem;
	}
</style>