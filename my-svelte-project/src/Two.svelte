<script>
// const IN_APP = true;
const IN_APP = false;
let ERROR_MESSAGE = '';

// all_list_chain_error_checkはonlineと通信する際に実行する
// offlineのvalidationはinputタグのrequiredやpatternやmax/min length属性を使う
// all_list_chain_error_checkはパッケージングしてserver.js側にもコピペして流用する

let BEFORE_LIST = [];
let AFTER_LIST = [];

let ID = 0;
let DESCRIPTION = 'description text';
let MAIN_LIST = [
	{ id: 1, add_date: ((new Date()).toISOString()), update_date: ((new Date()).toISOString()), },
	{ id: 2, add_date: ((new Date()).toISOString()), update_date: ((new Date()).toISOString()), },
	{ id: 3, add_date: ((new Date()).toISOString()), update_date: ((new Date()).toISOString()), },
	{ id: 4, add_date: ((new Date()).toISOString()), update_date: ((new Date()).toISOString()), },
	{ id: 5, add_date: ((new Date()).toISOString()), update_date: ((new Date()).toISOString()), },
	{ id: 6, add_date: ((new Date()).toISOString()), update_date: ((new Date()).toISOString()), },
	{ id: 7, add_date: ((new Date()).toISOString()), update_date: ((new Date()).toISOString()), },
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

// SUB_LISTはMAIN_LISTとN:1の関係
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
// IMAGE_LISTはSUB_LISTと1:Nの関係
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
	// 更新された内容をall_list_chain_error_check()でエラーチェック。エラーチェックして問題なければLISTを更新する。問題があれば、エラーメッセージを表示し、更新前のLISTに戻す。
	const execute_make_list_chain = () => {
		const MAIN_LIST_WITH_DETAIL_LIST = MAIN_LIST.map((item, index) => {
			let Detail_list = DETAIL_LIST.find(detail_item => detail_item.list_id === item.id);
			let MAIN_LIST_WITH_DETAIL_LIST = {...item, detail_list: Detail_list};
			return MAIN_LIST_WITH_DETAIL_LIST;
		});
		LIST = MAIN_LIST_WITH_DETAIL_LIST.map((item, index) => {
			let sub_list = SUB_LIST.filter(sub_item => sub_item.list_id === item.id);
			let image_list = sub_list.map(sub_item => IMAGE_LIST.filter(image_item => image_item.sub_list_id === sub_item.id));
			let sub_list_with_image = sub_list.map((sub_item, sub_index) => ({...sub_item, image: image_list[sub_index]}));
			let MAIN_LIST_WITH_SUB_LIST = {...item, sub_list: sub_list_with_image};
			return MAIN_LIST_WITH_SUB_LIST;
		});
	};
	try {
		execute_make_list_chain();
	} catch (error) {
		console.log(error);
		console.log(error.message);
		ERROR_MESSAGE = error.message;
	}
}



// listのエラーチェック関数
// const all_list_chain_error_check = (Target_List) => {
// 	const TARGET_LIST = Target_List;
// 	const MAIN_LIST = TARGET_LIST.map(V=>V.detail_list);
// 	const DETAIL_LIST = TARGET_LIST.map(V=>V.detail_list);
// 	const SUB_LIST = TARGET_LIST.map(V=>V.sub_list);
// 	const IMAGE_LIST = TARGET_LIST.map(V=>V.sub_list.image);

// 	// listの仕様一覧
// 	// LISTは配列。
// 	// MAIN_LISTは id: 1以上の整数, add_date: iso形式日時, update_date: iso形式日時
// 	// DETAIL_LISTは list_id: 1以上の整数, id: 1以上の整数, name: 1文字以上100文字以内string, description: 1文字以上200文字以内string, address: 1文字以上500文字以内string, phone: 1文字以上50文字以内string(0-9整数と半角ハイフンのみ), related_url_list: 配列(それぞれ1文字以上500文字以内のURL文字列), nearest_station: 1文字以上200文字以内string, holiday: 1文字以上1000文字以内string, business_hours: 1文字以上500文字以内string
// 	// SUB_LISTは list_id: 1以上の整数, id: 1以上の整数, text: 1文字以上500文字以内string, add_date: iso形式日時, update_date: iso形式日時, check_on_off: true or false, check_date: iso形式日時
// 	// IMAGE_LISTは sub_list_id: 1以上の整数, id: 1以上の整数, image_url: 1文字以上500文字以内のURL文字列
// 	// MAIN_LISTとDETAIL_LISTは1:1の関係。親のidと子のlist_idが一致する。親のidが存在しない場合はエラー。子のlist_idが存在しない場合はエラー。
// 	// DETAIL_LISTとSUB_LISTは1:Nの関係。親のlist_idと子のlist_idが一致する。親のlist_idが存在しない場合はエラー。子のlist_idが1つ以上存在しない場合はエラー。
// 	// SUB_LISTとIMAGE_LISTは1:Nの関係。親のidと子のsub_list_idが一致する。親のidが存在しない場合はエラー。子のsub_list_idが1つ以上存在しない場合はエラー。
// 	const check_MAIN_LIST = () => {
// 		// (typeof item.id === 'number' && item.id > 0) && (new Date(item.add_date).toISOString() === item.add_date) && (new Date(item.update_date).toISOString() === item.update_date);
// 		LIST.every(item => {
// 			switch (true) {
// 				case (typeof item.id !== 'number'):
// 					return (()=>{throw new Error('idは数値でなければなりません')})();
// 				case (item.id <= 0):
// 					return (()=>{throw new Error('idは1以上でなければなりません')})();
// 				case (new Date(item.add_date).toISOString() !== item.add_date):
// 					return (()=>{throw new Error('add_dateはiso形式の日時でなければなりません')})();
// 				case (new Date(item.update_date).toISOString() !== item.update_date):
// 					return (()=>{throw new Error('update_dateはiso形式の日時でなければなりません')})();
// 				default:
// 			}
// 		});
// 	};
// 	const check_DETAIL_LIST = () => {
// 		// return (typeof item.list_id === 'number' && item.list_id > 0) && (typeof item.id === 'number' && item.id > 0) && (typeof item.name === 'string' && item.name.length > 0 && item.name.length <= 100) && (typeof item.description === 'string' && item.description.length > 0 && item.description.length <= 200) && (typeof item.address === 'string' && item.address.length > 0 && item.address.length <= 500) && (typeof item.phone === 'string' && item.phone.length > 0 && item.phone.length <= 50) && (Array.isArray(item.related_url_list) && item.related_url_list.every(url_item => typeof url_item === 'string' && url_item.length > 0 && url_item.length <= 500)) && (typeof item.nearest_station === 'string' && item.nearest_station.length > 0 && item.nearest_station.length <= 200) && (typeof item.holiday === 'string' && item.holiday.length > 0 && item.holiday.length <= 1000) && (typeof item.business_hours === 'string' && item.business_hours.length > 0 && item.business_hours.length <= 500);
// 		const detail_list = LIST.map(V=>V.detail_list);
// 		detail_list.every(item => {
// 			switch (true) {
// 				case (typeof item.list_id !== 'number'):
// 					return (()=>{throw new Error('list_idは数値でなければなりません')})();
// 				case (item.list_id <= 0):
// 					return (()=>{throw new Error('list_idは1以上でなければなりません')})();
// 				case (typeof item.id !== 'number'):
// 					return (()=>{throw new Error('idは数値でなければなりません')})();
// 				case (item.id <= 0):
// 					return (()=>{throw new Error('idは1以上でなければなりません')})();
// 				case (typeof item.name !== 'string'):
// 					return (()=>{throw new Error('nameは文字列でなければなりません')})();
// 				case (item.name.length <= 0 || item.name.length > 100):
// 					return (()=>{throw new Error('nameは1文字以上100文字以内')})();
// 				case (typeof item.description !== 'string'):
// 					return (()=>{throw new Error('descriptionは文字列でなければなりません')})();
// 				case (item.description.length <= 0 || item.description.length > 200):
// 					return (()=>{throw new Error('descriptionは1文字以上200文字以内')})();
// 				case (typeof item.address !== 'string'):
// 					return (()=>{throw new Error('addressは文字列でなければなりません')})();
// 				case (item.address.length <= 0 || item.address.length > 500):
// 					return (()=>{throw new Error('addressは1文字以上500文字以内')})();
// 				case (typeof item.phone !== 'string'):
// 					return (()=>{throw new Error('phoneは文字列でなければなりません')})();
// 				case (item.phone.length <= 0 || item.phone.length > 50):
// 					return (()=>{throw new Error('phoneは1文字以上50文字以内')})();
// 				case (!Array.isArray(item.related_url_list)):
// 					return (()=>{throw new Error('related_url_listは配列でなければなりません')})();
// 				case (!item.related_url_list.every(url_item => typeof url_item === 'string' && url_item.length > 0 && url_item.length <= 500)):
// 					return (()=>{throw new Error('related_url_listはそれぞれ1文字以上500文字以内のURL文字列')})();
// 				case (typeof item.nearest_station !== 'string'):
// 					return (()=>{throw new Error('nearest_stationは文字列でなければなりません')})();
// 				case (item.nearest_station.length <= 0 || item.nearest_station.length > 200):
// 					return (()=>{throw new Error('nearest_stationは1文字以上200文字以内')})();
// 				case (typeof item.holiday !== 'string'):
// 					return (()=>{throw new Error('holidayは文字列でなければなりません')})();
// 				case (item.holiday.length <= 0 || item.holiday.length > 1000):
// 					return (()=>{throw new Error('holidayは1文字以上1000文字以内')})();
// 				case (typeof item.business_hours !== 'string'):
// 					return (()=>{throw new Error('business_hoursは文字列でなければなりません')})();
// 				case (item.business_hours.length <= 0 || item.business_hours.length > 500):
// 					return (()=>{throw new Error('business_hoursは1文字以上500文字以内')})();
// 				default:
// 			}
// 		});
// 	};
// 	const check_SUB_LIST = () => {
// 		// (typeof item.list_id === 'number' && item.list_id > 0) && (typeof item.id === 'number' && item.id > 0) && (typeof item.text === 'string' && item.text.length > 0 && item.text.length <= 500) && (new Date(item.add_date).toISOString() === item.add_date) && (new Date(item.update_date).toISOString() === item.update_date) && (typeof item.check_on_off === 'boolean') && (new Date(item.check_date).toISOString() === item.check_date);
// 		SUB_LIST.every(item => {
// 			switch (true) {
// 				case (typeof item.list_id !== 'number'):
// 					return (()=>{throw new Error('list_idは数値でなければなりません')})();
// 				case (item.list_id <= 0):
// 					return (()=>{throw new Error('list_idは1以上でなければなりません')})();
// 				case (typeof item.id !== 'number'):
// 					return (()=>{throw new Error('idは数値でなければなりません')})();
// 				case (item.id <= 0):
// 					return (()=>{throw new Error('idは1以上でなければなりません')})();
// 				case (typeof item.text !== 'string'):
// 					return (()=>{throw new Error('textは文字列でなければなりません')})();
// 				case (item.text.length <= 0 || item.text.length > 10):
// 					return (()=>{throw new Error('textは1文字以上10文字以内')})();
// 				case (new Date(item.add_date).toISOString() !== item.add_date):
// 					return (()=>{throw new Error('add_dateはiso形式の日時でなければなりません')})();
// 				case (new Date(item.update_date).toISOString() !== item.update_date):
// 					return (()=>{throw new Error('update_dateはiso形式の日時でなければなりません')})();
// 				case (typeof item.check_on_off !== 'boolean'):
// 					return (()=>{throw new Error('check_on_offはtrueかfalseでなければなりません')})();
// 				case (new Date(item.check_date).toISOString() !== item.check_date):
// 					return (()=>{throw new Error('check_dateはiso形式の日時でなければなりません')})();
// 				default:
// 			}
// 		});
// 	}
// 	const check_IMAGE_LIST = () => {
// 		// (typeof item.sub_list_id === 'number' && item.sub_list_id > 0) && (typeof item.id === 'number' && item.id > 0) && (typeof item.image_url === 'string' && item.image_url.length > 0 && item.image_url.length <= 500);
// 		IMAGE_LIST.every(item => {
// 			switch (true) {
// 				case (typeof item.sub_list_id !== 'number'):
// 					return (()=>{throw new Error('sub_list_idは数値でなければなりません')})();
// 				case (item.sub_list_id <= 0):
// 					return (()=>{throw new Error('sub_list_idは1以上でなければなりません')})();
// 				case (typeof item.id !== 'number'):
// 					return (()=>{throw new Error('idは数値でなければなりません')})();
// 				case (item.id <= 0):
// 					return (()=>{throw new Error('idは1以上でなければなりません')})();
// 				case (typeof item.image_url !== 'string'):
// 					return (()=>{throw new Error('image_urlは文字列でなければなりません')})();
// 				case (item.image_url.length <= 0 || item.image_url.length > 500):
// 					return (()=>{throw new Error('image_urlは1文字以上500文字以内')})();
// 				default:
// 			}
// 		});
// 	}
// 	// それぞれのリレーションのcheckする関数
// 	const check_all_relation = () => {
// 	// MAIN_LISTとDETAIL_LISTは1:1の関係。親のidと子のlist_idが一致する。親のidが存在しない場合はエラー。子のlist_idが存在しない場合はエラー。
// 	// DETAIL_LISTとSUB_LISTは1:Nの関係。親のlist_idと子のlist_idが一致する。親のlist_idが存在しない場合はエラー。子のlist_idが1つ以上存在しない場合はエラー。
// 	// SUB_LISTとIMAGE_LISTは1:Nの関係。親のidと子のsub_list_idが一致する。親のidが存在しない場合はエラー。子のsub_list_idが1つ以上存在しない場合はエラー。
// 		const check_MAIN_LIST_with_DETAIL_LIST = () => {
// 			MAIN_LIST.every(item => {
// 				let detail_list = DETAIL_LIST.find(detail_item => detail_item.list_id === item.id);
// 				return detail_list ? true : (() => { throw new Error('MAIN_LISTとDETAIL_LISTは1:1の関係です。親のidと子のlist_idが一致する必要があります') })();
// 			});
// 		};

// 		const check_DETAIL_LIST_with_SUB_LIST = () => {
// 			DETAIL_LIST.every(item => {
// 				let sub_list = SUB_LIST.filter(sub_item => sub_item.list_id === item.id);
// 				return sub_list.length !== 0 ? true : (() => { throw new Error('DETAIL_LISTとSUB_LISTは1:Nの関係です。親のlist_idと子のlist_idが一致する必要があります') })();
// 			});
// 		};

// 		const check_SUB_LIST_with_IMAGE_LIST = () => {
// 			SUB_LIST.every(item => {
// 				let image_list = IMAGE_LIST.filter(image_item => image_item.sub_list_id === item.id);
// 				return image_list.length !== 0 ? true : (() => { throw new Error('SUB_LISTとIMAGE_LISTは1:Nの関係です。親のidと子のsub_list_idが一致する必要があります') })();
// 			});
// 		};
// 		check_MAIN_LIST_with_DETAIL_LIST();
// 		check_DETAIL_LIST_with_SUB_LIST();
// 		check_SUB_LIST_with_IMAGE_LIST();
// 	};
// 	try {
// 		check_MAIN_LIST();
// 		check_DETAIL_LIST();
// 		check_SUB_LIST();
// 		check_IMAGE_LIST();
// 		check_all_relation();
// 		console.log('エラーチェックは問題ありません');
// 	} catch (error) {
// 		console.log(error);
// 		console.log(error.message);	
// 		ERROR_MESSAGE = error.message;
// 	}

// }
// listのエラーチェック関数
const all_list_chain_error_check = (Target_List) => {
	const TARGET_LIST = Target_List;
	const Main_List = TARGET_LIST.map(V=>V.detail_list);
	const Detail_List = TARGET_LIST.map(V=>V.detail_list);
	const Sub_List = TARGET_LIST.map(V=>V.sub_list);

	// listの仕様一覧
	// LISTは配列。
	// Main_Listは id: 1以上の整数, add_date: iso形式日時, update_date: iso形式日時
	// Detail_Listは list_id: 1以上の整数, id: 1以上の整数, name: 1文字以上100文字以内string, description: 1文字以上200文字以内string, address: 1文字以上500文字以内string, phone: 1文字以上50文字以内string(0-9整数と半角ハイフンのみ), related_url_list: 配列(それぞれ1文字以上500文字以内のURL文字列), nearest_station: 1文字以上200文字以内string, holiday: 1文字以上1000文字以内string, business_hours: 1文字以上500文字以内string
	// Sub_Listは list_id: 1以上の整数, id: 1以上の整数, text: 1文字以上500文字以内string, add_date: iso形式日時, update_date: iso形式日時, check_on_off: true or false, check_date: iso形式日時
	// Image_Listは Sub_List_id: 1以上の整数, id: 1以上の整数, image_url: 1文字以上500文字以内のURL文字列
	// Main_ListとDetail_Listは1:1の関係。親のidと子のlist_idが一致する。親のidが存在しない場合はエラー。子のlist_idが存在しない場合はエラー。
	// Detail_ListとSub_Listは1:Nの関係。親のlist_idと子のlist_idが一致する。親のlist_idが存在しない場合はエラー。子のlist_idが1つ以上存在しない場合はエラー。
	// Sub_ListとImage_Listは1:Nの関係。親のidと子のSub_List_idが一致する。親のidが存在しない場合はエラー。子のSub_List_idが1つ以上存在しない場合はエラー。
	const check_Main_List = () => {
		// (typeof item.id === 'number' && item.id > 0) && (new Date(item.add_date).toISOString() === item.add_date) && (new Date(item.update_date).toISOString() === item.update_date);
		LIST.every(item => {
			switch (true) {
				case (typeof item.id !== 'number'):
					return (()=>{throw new Error('idは数値でなければなりません')})();
				case (item.id <= 0):
					return (()=>{throw new Error('idは1以上でなければなりません')})();
				case (new Date(item.add_date).toISOString() !== item.add_date):
					return (()=>{throw new Error('add_dateはiso形式の日時でなければなりません')})();
				case (new Date(item.update_date).toISOString() !== item.update_date):
					return (()=>{throw new Error('update_dateはiso形式の日時でなければなりません')})();
				default:
			}
		});
	};
	const check_Detail_List = () => {
		// return (typeof item.list_id === 'number' && item.list_id > 0) && (typeof item.id === 'number' && item.id > 0) && (typeof item.name === 'string' && item.name.length > 0 && item.name.length <= 100) && (typeof item.description === 'string' && item.description.length > 0 && item.description.length <= 200) && (typeof item.address === 'string' && item.address.length > 0 && item.address.length <= 500) && (typeof item.phone === 'string' && item.phone.length > 0 && item.phone.length <= 50) && (Array.isArray(item.related_url_list) && item.related_url_list.every(url_item => typeof url_item === 'string' && url_item.length > 0 && url_item.length <= 500)) && (typeof item.nearest_station === 'string' && item.nearest_station.length > 0 && item.nearest_station.length <= 200) && (typeof item.holiday === 'string' && item.holiday.length > 0 && item.holiday.length <= 1000) && (typeof item.business_hours === 'string' && item.business_hours.length > 0 && item.business_hours.length <= 500);
		Detail_List.every(item => {
			switch (true) {
				case (typeof item.list_id !== 'number'):
					return (()=>{throw new Error('list_idは数値でなければなりません')})();
				case (item.list_id <= 0):
					return (()=>{throw new Error('list_idは1以上でなければなりません')})();
				case (typeof item.id !== 'number'):
					return (()=>{throw new Error('idは数値でなければなりません')})();
				case (item.id <= 0):
					return (()=>{throw new Error('idは1以上でなければなりません')})();
				case (typeof item.name !== 'string'):
					return (()=>{throw new Error('nameは文字列でなければなりません')})();
				case (item.name.length <= 0 || item.name.length > 100):
					return (()=>{throw new Error('nameは1文字以上100文字以内')})();
				case (typeof item.description !== 'string'):
					return (()=>{throw new Error('descriptionは文字列でなければなりません')})();
				case (item.description.length <= 0 || item.description.length > 200):
					return (()=>{throw new Error('descriptionは1文字以上200文字以内')})();
				case (typeof item.address !== 'string'):
					return (()=>{throw new Error('addressは文字列でなければなりません')})();
				case (item.address.length <= 0 || item.address.length > 500):
					return (()=>{throw new Error('addressは1文字以上500文字以内')})();
				case (typeof item.phone !== 'string'):
					return (()=>{throw new Error('phoneは文字列でなければなりません')})();
				case (item.phone.length <= 0 || item.phone.length > 50):
					return (()=>{throw new Error('phoneは1文字以上50文字以内')})();
				case (!Array.isArray(item.related_url_list)):
					return (()=>{throw new Error('related_url_listは配列でなければなりません')})();
				case (!item.related_url_list.every(url_item => typeof url_item === 'string' && url_item.length > 0 && url_item.length <= 500)):
					return (()=>{throw new Error('related_url_listはそれぞれ1文字以上500文字以内のURL文字列')})();
				case (typeof item.nearest_station !== 'string'):
					return (()=>{throw new Error('nearest_stationは文字列でなければなりません')})();
				case (item.nearest_station.length <= 0 || item.nearest_station.length > 200):
					return (()=>{throw new Error('nearest_stationは1文字以上200文字以内')})();
				case (typeof item.holiday !== 'string'):
					return (()=>{throw new Error('holidayは文字列でなければなりません')})();
				case (item.holiday.length <= 0 || item.holiday.length > 1000):
					return (()=>{throw new Error('holidayは1文字以上1000文字以内')})();
				case (typeof item.business_hours !== 'string'):
					return (()=>{throw new Error('business_hoursは文字列でなければなりません')})();
				case (item.business_hours.length <= 0 || item.business_hours.length > 500):
					return (()=>{throw new Error('business_hoursは1文字以上500文字以内')})();
				default:
			}
		});
	};
	const check_Sub_List = () => {
		// (typeof item.list_id === 'number' && item.list_id > 0) && (typeof item.id === 'number' && item.id > 0) && (typeof item.text === 'string' && item.text.length > 0 && item.text.length <= 500) && (new Date(item.add_date).toISOString() === item.add_date) && (new Date(item.update_date).toISOString() === item.update_date) && (typeof item.check_on_off === 'boolean') && (new Date(item.check_date).toISOString() === item.check_date);
		Sub_List.forEach(Each_Sub_List=>{
			Each_Sub_List.every(item => {
			switch (true) {
				case (typeof item.list_id !== 'number'):
					return (()=>{throw new Error('list_idは数値でなければなりません')})();
				case (item.list_id <= 0):
					return (()=>{throw new Error('list_idは1以上でなければなりません')})();
				case (typeof item.id !== 'number'):
					return (()=>{throw new Error('idは数値でなければなりません')})();
				case (item.id <= 0):
					return (()=>{throw new Error('idは1以上でなければなりません')})();
				case (typeof item.text !== 'string'):
					return (()=>{throw new Error('textは文字列でなければなりません')})();
				case (item.text.length <= 0 || item.text.length > 10):
					return (()=>{throw new Error('textは1文字以上10文字以内')})();
				case (new Date(item.add_date).toISOString() !== item.add_date):
					return (()=>{throw new Error('add_dateはiso形式の日時でなければなりません')})();
				case (new Date(item.update_date).toISOString() !== item.update_date):
					return (()=>{throw new Error('update_dateはiso形式の日時でなければなりません')})();
				case (typeof item.check_on_off !== 'boolean'):
					return (()=>{throw new Error('check_on_offはtrueかfalseでなければなりません')})();
				case (new Date(item.check_date).toISOString() !== item.check_date):
					return (()=>{throw new Error('check_dateはiso形式の日時でなければなりません')})();
				default:
			}
			})
		});
	}
	const check_Image_List = () => {
		// (typeof item.Sub_List_id === 'number' && item.Sub_List_id > 0) && (typeof item.id === 'number' && item.id > 0) && (typeof item.image_url === 'string' && item.image_url.length > 0 && item.image_url.length <= 500);
		const all_image_ary = TARGET_LIST.map(V=>V.sub_list.map(Each_Sub_List=>Each_Sub_List.image)).flat(2);
		all_image_ary.every(item => {
			switch (true) {
				case (typeof item.sub_list_id !== 'number'):
					return (()=>{throw new Error('sub_list_idは数値でなければなりません')})();
				case (item.sub_list_id <= 0):
					return (()=>{throw new Error('sub_list_idは1以上でなければなりません')})();
				case (typeof item.id !== 'number'):
					return (()=>{throw new Error('idは数値でなければなりません')})();
				case (item.id <= 0):
					return (()=>{throw new Error('idは1以上でなければなりません')})();
				case (typeof item.image_url !== 'string'):
					return (()=>{throw new Error('image_urlは文字列でなければなりません')})();
				case (item.image_url.length <= 0 || item.image_url.length > 500):
					return (()=>{throw new Error('image_urlは1文字以上500文字以内')})();
				default:
			}
		});
	}
	// それぞれのリレーションのcheckする関数
	const check_all_relation = () => {
		// Main_ListとDetail_Listは1:1の関係。親のidと子のlist_idが一致する。親のidが存在しない場合はエラー。子のlist_idが存在しない場合はエラー。
		const check_Main_List_with_Detail_List = () => {
			Main_List.every(item => {
				let detail_list = Detail_List.find(detail_item => detail_item.list_id === item.id);
				return detail_list ? true : (() => { throw new Error('Main_ListとDetail_Listは1:1の関係です。親のidと子のlist_idが一致する必要があります') })();
			});
		};

		// Main_ListとSub_Listは1:Nの関係。親のidと子のlist_idが一致する。親のidが存在しない場合はエラー。子のlist_idが1つ以上存在しない場合はエラー。
		const check_Main_List_with_Sub_List = () => {
			Main_List.every(item => {
				let sub_list = Sub_List.map(Each_Sub_List=>Each_Sub_List.filter(sub_item => sub_item.list_id === item.id)).flat(1);
				return sub_list.length !== 0 ? true : (() => { throw new Error('Main_ListとSub_Listは1:Nの関係です。親のidと子のlist_idが一致する必要があります') })();
			});
		};

		// Sub_ListとImage_Listは1:Nの関係。親のidと子のsub_list_idが一致する。親のidが存在しない場合はエラー。子のsub_list_idが1つ以上存在しない場合はエラー。
		const check_Sub_List_with_Image_List = () => {
			Sub_List.every(item => {
				item.map(Each_Sub_List=>{
					let image_list = Each_Sub_List.image;
					return image_list.length !== 0 ? true : (() => { throw new Error('Sub_ListとImage_Listは1:Nの関係です。親のidと子のsub_list_idが一致する必要があります') })();
				})
			});
		};
		check_Main_List_with_Detail_List();
		check_Main_List_with_Sub_List();
		check_Sub_List_with_Image_List();
	};
	try {
		check_Main_List();
		check_Detail_List();
		check_Sub_List();
		check_Image_List();
		check_all_relation();
		console.log('エラーチェックは問題ありません');
		return true;
	} catch (error) {
		console.log(error);
		console.log(error.message);	
		ERROR_MESSAGE = error.message;
		return false;
	}
}



	

make_list_chain();

let listChanged = 0; // 追加した状態変数
$: {
	// all_list_chain_error_check();
	// console.log(listChanged);
    if (listChanged) {
		// get_all_sub_item_text();
        // make_list_chain();
    }
}


let SELECTED_ITEM_ID = null;
let SUB_ITEM_TEXT = '';
const edit_sub_list_text = (sub_list_id, event) => {
	try {
		console.log("edit_sub_list_text");
		BEFORE_LIST = JSON.parse(JSON.stringify(LIST));
		AFTER_LIST = JSON.parse(JSON.stringify(LIST)).map(item => {
			let sub_list = item.sub_list.map(sub_item => {
				if(sub_item.id === sub_list_id){
					sub_item.text = event.target.value;
				}
				return sub_item;
			});
			return {...item, sub_list: sub_list};
		});
		all_list_chain_error_check(AFTER_LIST) ? null : (()=>{throw new Error('エラ〜です')})();
		// all_list_chain_error_checkでエラーがある場合はerrorをcatchして、エラーメッセージを表示し、BEFORE_LISTに戻し、問題がなければLISTを更新する
		LIST = JSON.parse(JSON.stringify(AFTER_LIST));



	} catch (error) {
		console.log(error);
		console.log(error.message);
		ERROR_MESSAGE = error.message;
		LIST = BEFORE_LIST;
	}

}
const toggle_details = (Item_Id) => {
	(SELECTED_ITEM_ID = SELECTED_ITEM_ID === Item_Id ? null : Item_Id);
	// Item_Idに一致するsub_listのtextをSUB_ITEM_TEXTに格納する
	SUB_ITEM_TEXT = LIST.map(item => {
		let sub_list = item.sub_list.map(sub_item => {
			if(sub_item.id === Item_Id){
				return sub_item.text;
			}
		});
		return sub_list;
	}).flat(1).filter(V=>V)[0];
};
const check_sub_list = (sub_list_id) => {
	console.log("check_sub_list");
	BEFORE_LIST = JSON.parse(JSON.stringify(LIST));
	AFTER_LIST = LIST.map(item => {
		let sub_list = item.sub_list.map(sub_item => {
			if(sub_item.id === sub_list_id){
				sub_item.check_on_off = !sub_item.check_on_off;
				sub_item.check_date = ((new Date()).toISOString());
			}
			return sub_item;
		});
		return {...item, sub_list: sub_list};
	});
	// AFTER_LISTをエラーチェックして、問題があればエラーメッセージを表示し、BEFORE_LISTに戻し、問題がなければLISTを更新する
	try {
		all_list_chain_error_check(AFTER_LIST);
		LIST = JSON.parse(JSON.stringify(AFTER_LIST));
		listChanged++;
	} catch (error) {
		console.log(error);
		console.log(error.message);
		ERROR_MESSAGE = error.message;
		LIST = JSON.parse(JSON.stringify(BEFORE_LIST));

	}
}

</script>



<div class="one_pack">
	ERROR_MESSAGE: {ERROR_MESSAGE}
	<button on:click={()=> all_list_chain_error_check()}>all_list_chain_error_check</button>
	{#each LIST as item, index}
	<div class="one_item">
		<div>ID: {item.id}</div>
		list_id: {item.detail_list.list_id}
		id: {item.detail_list.id}
		name: {item.detail_list.name}
		description: {item.detail_list.description}
		address: {item.detail_list.address}
		phone: {item.detail_list.phone}
		related_url_list: 
		{#each item.detail_list.related_url_list as related_url_item, related_url_index}
			<a href={related_url_item} target="_blank">{related_url_item}</a>
		{/each}
		nearest_station: {item.detail_list.nearest_station}
		holiday: {item.detail_list.holiday}
		business_hours: {item.detail_list.business_hours}

			<div class="one_item_text">
			{#each item.sub_list as sub_item, sub_index}
				<!-- checkboxをtrueにしたらbackground-colorをgrayにする -->
				<span style="background-color: {sub_item.check_on_off ? 'gray' : 'white'};">
				{sub_item.text}
				{#each sub_item.image as image_item, image_index}
					<img src={image_item.image_url} class="image_resize" alt="image_url" />
				{/each}
				<button on:click={()=> toggle_details(sub_item.id)} class="detail_button">▶️</button>
				{#if SELECTED_ITEM_ID === sub_item.id}
					<input type="text" bind:value={SUB_ITEM_TEXT} on:input={(e) => edit_sub_list_text(sub_item.id, e)} class="without_click" required pattern=".{1,10}" minlength="1" maxlength="10"  title="1_10 characters" />
				{/if}
				<input type="checkbox" on:change={() => check_sub_list(sub_item.id)} />
				</span>
			{/each}
			</div>
	</div>
	<br>
	<br>
	{/each}

	{JSON.stringify(LIST)}<br><br><br>
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