<script>
// server.jsとOne.svelteのvalidationをやる

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


const pre_upload_for_make_json_str = () => {
	const DATA = {list: LIST, desc: DESCRIPTION};
	const DATA_JSON_STR = JSON.stringify({
		DATA
	});
	return DATA_JSON_STR;
};
const pre_download_for_parse_json_str = (Data_Json_Str) => {
	const parsed_Data_Json_Str = JSON.parse(Data_Json_Str);
	const DATA = parsed_Data_Json_Str['DATA'];
	DESCRIPTION = DATA['desc'];
	LIST = DATA['list'];
};
// let DESCRIPTION = '';
// let LIST = [];
let ERROR_OF_COMMENT_REPLY = '';
let ERROR_OF_COMMENT = '';
let ERROR_OF_NAME = '';
let ERROR_OF_PASSWORD = '';
let ERROR_OF_TAG = '';
let HELLO_FETCH_DATA = [];
let DATA_ID_FROM_ONLINE = null;
// let DEV_MODE = true;
let DEV_MODE = false;
let EDIT_MODE = false;
let NEW_TEXT = 'text';
let NEW_LINK = 'https://google.com';
let IS_CALENDAR_VISIBLE = true;
let IS_SHOW_LEFT = true;
let IS_SHOW_RIGHT = true;
const toggle_left_or_right_side = () => {
	// IS_SHOW_LEFTとIS_SHOW_RIGHTが両方true、どちらかだけがtrue、3つの状態がある
	     if (IS_SHOW_LEFT && IS_SHOW_RIGHT){[IS_SHOW_LEFT, IS_SHOW_RIGHT] = [true, false];}
	else if (IS_SHOW_LEFT && !IS_SHOW_RIGHT){[IS_SHOW_LEFT, IS_SHOW_RIGHT] = [false, true];}
	else if (!IS_SHOW_LEFT && IS_SHOW_RIGHT){[IS_SHOW_LEFT, IS_SHOW_RIGHT] = [true, true];}
};
const in_chrome_dev_tool = () => {
	// const obj = await app.$$.ctx;
	// const keys = Object.keys(obj);  // ["a", "b", "c"] // キーの配列を取得
	// const values = Object.values(obj);  // [1, 2, 3] // 値の配列を取得
	// const entries = Object.entries(obj);  // [["a", 1], ["b", 2], ["c", 3]] // キーと値のペアの配列を取得
	// await entries.filter(V=>typeof V[1] === 'function').filter(V=>V[1].name === 'test_db_init_only_set_name_password_test_mode')[0][1]();
};
const all_validation_fn = () => {
	function error_check_name(name) {
		const validate_name_switch = (Name) => {
			switch (true) {
				case Name === '':
				case Name === undefined:
				case Name === null:
					throw new Error('ユーザー名が未入力です');
				case Name.length > 36:
					throw new Error('ユーザー名は36文字以下で入力してください');
				case Name.length < 4:
					throw new Error('ユーザー名は4文字以上で入力してください');
				case Name.includes(' '):
				case Name.includes('　'):
					throw new Error('ユーザー名に空白文字が含まれています');
				default:
					return "OK";
			}
		}
		try {return validate_name_switch(name);	}
		catch (error) {return error.message;}
	}
	function error_check_password(password) {
		const validate_password_switch = (Password) => {
			switch (true) {
				case Password === '':
				case Password === undefined:
				case Password === null:
					throw new Error('パスワードが未入力です');
				case Password.length > 36:
					throw new Error('パスワードは36文字以下で入力してください');
				case Password.length < 4:
					throw new Error('パスワードは4文字以上で入力してください');
				case Password.includes(' '):
				case Password.includes('　'):
					throw new Error('パスワードに空白文字が含まれています');
				default:
					return "OK";
			}
		}
		try {return validate_password_switch(password);
		} catch (error) {return error.message;}
	}

	const error_check_insert_tag = (tag) => {
		const reserved_words = ['SELECT', 'FROM', 'WHERE', 'INSERT', 'DELETE', 'UPDATE', 'DROP', 'ALTER', 'CREATE', 'TABLE', 'INTO', 'VALUES', 'AND', 'OR', 'NOT', 'NULL', 'TRUE', 'FALSE'];
		// 空白を含むかチェックする1行の関数。大文字の空白もチェックする。含まれていたらtrueを返す
		const checkForSpaces = (tag) => [' ', '　'].some((space) => tag.includes(space));
		// 記号が含まれているかチェックする1行の関数。含まれていたらtrueを返す
		const checkForSymbols = (tag) => {
			const symbols = ['-', '#', '!', '$', '@', '%', '^', '&', '*', '(', ')', '_', '+', '|', '~', '=', '`', '{', '}', '[', ']', ':', '"', ';', '\'', '<', '>', '?', ',', '.', '/'];
			return symbols.some((symbol) => tag.includes(symbol));
		};
		switch (true) {
			case tag === undefined: return 'tagが空です'; break;
			case checkForSpaces(tag): return '空白を含む場合はエラー'; break;
			case checkForSymbols(tag): return '記号を含む場合はエラー'; break;
			case tag.length === 0: return '0文字はエラー'; break;
			case tag.length > 7: return '7文字以上はエラー'; break;
			case reserved_words.includes(tag): return 'SQLの予約語を含む場合はエラー'; break;
			default: return 'OK'; break;
		}
	};

        const error_check_insert_comment = (comment, DATA_LIMIT=1000) => {

            const reserved_words = ['SELECT', 'FROM', 'WHERE', 'INSERT', 'DELETE', 'UPDATE', 'DROP', 'ALTER', 'CREATE', 'TABLE', 'INTO', 'VALUES', 'AND', 'OR', 'NOT', 'NULL', 'TRUE', 'FALSE'];
            const checkForSpaces = (comment) => [' ', '　'].some((space) => comment.includes(space));
            // 記号が含まれているかチェックする1行の関数。含まれていたらtrueを返す
            const checkForSymbols = (comment) => {
                const symbols = ['-', '#', '!', '$', '@', '%', '^', '&', '*', '(', ')', '_', '+', '|', '~', '=', '`', '{', '}', '[', ']', ':', '"', ';', '\'', '<', '>', '?', ',', '.', '/'];
                return symbols.some((symbol) => comment.includes(symbol));
            };
            switch (true) {
                case comment === undefined: return 'commentが空の場合はエラー'; break;
                case comment.length > DATA_LIMIT: return 'commentの文字数がdata_limitを超える場合はエラー'; break;
                case comment.length === 0: return '0文字の場合はエラー'; break;
                case checkForSpaces(comment): return '空白を含む場合はエラー'; break;
                case checkForSymbols(comment): return '記号を含む場合はエラー'; break;
                case comment.length > 300: return '300文字以上はエラー'; break;
                case reserved_words.includes(comment): return 'SQLの予約語を含む場合はエラー'; break;
                default: return 'OK'; break;
            }
        }
        const error_check_insert_comment_reply = (comment_reply, DATA_LIMIT) => {

            const reserved_words = ['SELECT', 'FROM', 'WHERE', 'INSERT', 'DELETE', 'UPDATE', 'DROP', 'ALTER', 'CREATE', 'TABLE', 'INTO', 'VALUES', 'AND', 'OR', 'NOT', 'NULL', 'TRUE', 'FALSE'];
            const checkForSpaces = (tag) => [' ', '　'].some((space) => tag.includes(space));
            // 記号が含まれているかチェックする1行の関数。含まれていたらtrueを返す
            const checkForSymbols = (comment_reply) => {
                const symbols = ['-', '#', '!', '$', '@', '%', '^', '&', '*', '(', ')', '_', '+', '|', '~', '=', '`', '{', '}', '[', ']', ':', '"', ';', '\'', '<', '>', '?', ',', '.', '/'];
                return symbols.some((symbol) => comment_reply.includes(symbol));
            };
            switch (true) {
                case comment_reply === undefined: return 'comment_replyが空の場合はエラー'; break;
                case comment_reply.length > DATA_LIMIT: return 'comment_replyの文字数がdata_limitを超える場合はエラー'; break;
                case comment_reply.length === 0: return '0文字の場合はエラー'; break;
                case checkForSpaces(comment_reply): return '空白を含む場合はエラー'; break;
                case checkForSymbols(comment_reply): return '記号を含む場合はエラー'; break;
                case comment_reply.length > 10: return '10文字以上はエラー'; break;
                case reserved_words.includes(comment_reply): return 'SQLの予約語を含む場合はエラー'; break;
                default: return 'OK'; break;
            }
        }
        const error_check_insert_link = (link) => {
            const WHITE_LIST_URL_ARRAY = [
                'https://yanaka.dev/',
                'https://www.yahoo.co.jp/',
                'https://www.google.co.jp/',
                'https://www.youtube.com/',
            ];
            const reserved_words = ['SELECT', 'FROM', 'WHERE', 'INSERT', 'DELETE', 'UPDATE', 'DROP', 'ALTER', 'CREATE', 'TABLE', 'INTO', 'VALUES', 'AND', 'OR', 'NOT', 'NULL', 'TRUE', 'FALSE'];
            const is_url = (url) => (/^(https?):\/\/[^\s/$.?#].[^\s]*$/i).test(url);
            const is_include_WHITE_LIST_URL = (target_url_str) => WHITE_LIST_URL_ARRAY.some((WHITE_LIST_URL) => target_url_str.startsWith(WHITE_LIST_URL));

            !is_url(link) ? console.log('URLの形式が正しくありません') : null;

            switch (true) {
                case link === undefined: return 'linkが空です'; break;
                case reserved_words.includes(link): return 'SQLの予約語を含む場合はエラー'; break;
                case link.length > 2000: return 'URLが長すぎます'; break;
                case !is_url(link): return 'URLの形式が正しくありません'; break;
                case !is_include_WHITE_LIST_URL(link): return '許可されていないURLです'; break;
                default: return 'OK'; break;
            }
        };

        const error_check_insert_data = (data_json_str) => {
            switch (true) {
                case data_json_str === undefined: return 'dataが空です'; break;
                case data_json_str.length > 10000: return 'dataが長すぎます'; break;
                default: return 'OK'; break;
            }
        };
        // all_validation_checking_client_server_bothにそれぞれの関数を入れる
        const all_validation_checking_client_server_both = {
            'validation_insert_tag': error_check_insert_tag,
            'validation_insert_comment': error_check_insert_comment,
            'validation_insert_comment_reply': error_check_insert_comment_reply,
            'validation_insert_link': error_check_insert_link,
            'validation_insert_data': error_check_insert_data,
        };
        // 以下のように利用する
        // all_validation_checking_client_server_both['validation_insert_tag']('test', 10);
////////////////////////////////////////////////// ---------validation--------- /////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	return {
		error_check_name,
		error_check_password,
		error_check_insert_tag,
		error_check_insert_comment,
		error_check_insert_comment_reply,
		error_check_insert_link,
		error_check_insert_data,
	};
};
const {error_check_name,error_check_password, error_check_insert_tag,error_check_insert_comment,error_check_insert_comment_reply,error_check_insert_link,error_check_insert_data,} = all_validation_fn();
const all_web_prop_fn = () => {
	// $: if(fetch_message) {fetch_hello({});console.log("fetch_message");}
let RESPONSE = null;
// let NAME = 'user1';
let NAME = 'user2';
let PASSWORD = 'user_pass2';
let TEST_MODE = 'TEST_MODE';
// let TEST_MODE = 'PRODUCTION_MODE';
// let PASSWORD = 'user_pass1';
let COMMENT = 'comment1';
let COMMENT_REPLY = 'reply1';
let TAG = 'tag1';
let ALL_TAGS = [];
let TAG_VAL = "";
let ORDER_BY = 'ASC';
let ORDER_BY_COLUMN = 'id';
let REQ_TAG = '';
let USER = '';
let ERROR_MESSAGE = "";
let SUCCESS_MESSAGE = '';
let ERROR_MESSAGE_STACK = [];
let SUCCESS_MESSAGE_STACK = [];
let FETCH_TEST_DATA = [{'value': 0},{'value2': 1}];
// let DOMAIN_NAME = 'https://spectrum-whip-sulfur.glitch.me/';
const DOMAIN_NAME = 'http://localhost:8000/';
return {
	RESPONSE,
	NAME,
	PASSWORD,
	TEST_MODE,
	COMMENT,
	COMMENT_REPLY,
	TAG,
	TAG_VAL,
	ORDER_BY,
	ORDER_BY_COLUMN,
	REQ_TAG,
	USER,
	ERROR_MESSAGE,
	SUCCESS_MESSAGE,
	ERROR_MESSAGE_STACK,
	SUCCESS_MESSAGE_STACK,
	FETCH_TEST_DATA,
	ALL_TAGS,
	DOMAIN_NAME,
};
};
let {RESPONSE, NAME, PASSWORD, TEST_MODE, COMMENT, COMMENT_REPLY, TAG, TAG_VAL, ORDER_BY, ORDER_BY_COLUMN, REQ_TAG, USER, ERROR_MESSAGE, SUCCESS_MESSAGE, ERROR_MESSAGE_STACK, SUCCESS_MESSAGE_STACK, FETCH_TEST_DATA, ALL_TAGS, DOMAIN_NAME} = all_web_prop_fn();
const all_fetch_fn = ()  => {
	const get_POST_object = (BODY_OBJ) => {
		console.log(BODY_OBJ);
		return {
		method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(BODY_OBJ)
		}
	};
	// linkのidとusernameが一致するものがある場合はupdateする
	// 一致した場合はupdateで、一致しない場合はinsertになる関数
	// server sideでLink_idとuser_idの一致は確認しているので、ここではupdateのLink_idとuser_idの一致を確認する必要はない
	const fetch_insert_or_update_link = async (Link_id) => {
		try {
			const DATA_JSON_STR = pre_upload_for_make_json_str();
			// Link_idとuser_idが一致するものがある場合はupdateする
			if(Link_id !== undefined  && Link_id !== null){
				console.log('update');
				console.log(ALL_DATA_LIST[ALL_DATA_LIST_INDEX]['list']);
				RESPONSE = await (await fetch(DOMAIN_NAME+'update_link', get_POST_object({ name: NAME, password: PASSWORD, link_id: Link_id, data_json_str: DATA_JSON_STR }))).json();
				await response_handling(RESPONSE);
				return;
			}
			console.log('insert');
			await fetch_insert_link();
		} catch (error) {ERROR_MESSAGE = error.message;}
	};
	const fetch_hello = async ({ORDER_BY_PARAM='DESC', ORDER_BY_COLUMN_PARAM='id', REQ_TAG_PARAM, USER_PARAM}) => {
		try {
		// console.log(REQ_TAG_PARAM);
		ORDER_BY = ORDER_BY_PARAM; // ? ORDER_BY_PARAM : 'DESC';
		ORDER_BY_COLUMN = ORDER_BY_COLUMN_PARAM; // ? ORDER_BY_COLUMN_PARAM : 'links.id';
		REQ_TAG = REQ_TAG_PARAM; // ? REQ_TAG_PARAM : null;
		USER = USER_PARAM; // ? USER_PARAM : null;
		const make_get_param = () => {
			const get_param_array = [];
			if(ORDER_BY) {get_param_array.push(`order_by=${ORDER_BY}`)};
			if(ORDER_BY_COLUMN) {get_param_array.push(`order_by_column=${ORDER_BY_COLUMN}`)};
			if(REQ_TAG) {get_param_array.push(`tag=${REQ_TAG}`)};
			if(USER) {get_param_array.push(`user=${USER}`)};
			const endpoint = DOMAIN_NAME+'read_all';
			const get_param = get_param_array.join('&');
			return `${endpoint}?${get_param}`;
		};
		const res = await (await fetch(make_get_param())).json();
		if(res.result === 'fail') throw new Error(res.error);
		const pre_result = await (await fetch(make_get_param())).json();
		// pre_resultが空の場合はエラーを投げる
		if(pre_result.length === 0) throw new Error('条件に一致するデータがありませんでした');
		HELLO_FETCH_DATA = pre_result.message;
		} catch (error) {
			console.log(error);
			ERROR_MESSAGE = error.message;
		}
	};
	const response_handling = async (RESPONSE) => {
		try {
			console.log(RESPONSE);
// res.status(400).json({status: 400, result: 'fail', message: error.message});
		// RESPONSE.status === 400 ? console.log('RESPONSE.status: RESPONSE.status === 400') : null;
		RESPONSE.status === 200 ? SUCCESS_MESSAGE = RESPONSE.result : null;
		(RESPONSE.result === 'fail' || RESPONSE.status === 400) ? (()=>{throw new Error(RESPONSE.message)})() : (await fetch_hello({}));
		} catch (error) {
			console.log(error.message);
			(()=>{throw new Error(error.message)})();
		}
	}
	// URLの配列の文字列から始まる場合はtrueを返す関数を1行で
	// const is_include_WHITE_LIST_URL = (target_url_str, WHITE_LIST_URL_ARRAY) => WHITE_LIST_URL_ARRAY.some((WHITE_LIST_URL) => target_url_str.startsWith(WHITE_LIST_URL));
	const fetch_insert_link = async (sample_data) => {
		try {
		// listのcheckを全部falseにし、change_dateを現在時刻にする
		const DATA_JSON_STR = pre_upload_for_make_json_str();
		RESPONSE = await (await fetch(DOMAIN_NAME+'insert_link', get_POST_object({ name: NAME, password: PASSWORD, data_json_str: DATA_JSON_STR }))).json();
		console.log(RESPONSE);
		await response_handling(RESPONSE);
		} catch (error) {ERROR_MESSAGE = error.message;}
	};
	// copy insert(他のユーザーのlinkをコピーして自分のlinkとして保存する)
	// copyするときはcheckを全部falseでchange_dateを現在時刻にする
	const fetch_copy_insert_link = async (DATA) => {
		try {
		const DATA_JSON_STR = JSON.stringify(DATA);
		RESPONSE = await (await fetch(DOMAIN_NAME+'insert_link', get_POST_object({ name: NAME, password: PASSWORD, data_json_str: DATA_JSON_STR }))).json();
		await response_handling(RESPONSE);
		} catch (error) {ERROR_MESSAGE = error.message;}
	};
	const fetch_delete_link = async (LINK_ID) => {
		try {
		RESPONSE = await (await fetch(DOMAIN_NAME+'delete_link', get_POST_object({ name: NAME, password: PASSWORD, id: LINK_ID }))).json();
		await response_handling(RESPONSE);
		} catch (error) {ERROR_MESSAGE = error.message;}
	}
	const fetch_like_increment_or_decrement = async (LINK_ID) => {
		try {
		RESPONSE = await (await fetch(DOMAIN_NAME+'like_increment_or_decrement', get_POST_object({ name: NAME, password: PASSWORD, link_id: LINK_ID }))).json()
		await response_handling(RESPONSE);
		} catch (error) {ERROR_MESSAGE = error.message;}
	};
	const fetch_insert_comment = async (Link_id) => {
		try {
		RESPONSE = await (await fetch(DOMAIN_NAME+'insert_comment', get_POST_object({ name: NAME, password: PASSWORD, link_id: Link_id, comment: COMMENT }))).json();
		await response_handling(RESPONSE);
		} catch (error) {ERROR_MESSAGE = error.message;}
	};
	const fetch_delete_comment = async (COMMENT_ID) => {
		try {
		RESPONSE = await (await fetch(DOMAIN_NAME+'delete_comment', get_POST_object({ name: NAME, password: PASSWORD, comment_id: COMMENT_ID }))).json();
		await response_handling(RESPONSE);
		} catch (error) {ERROR_MESSAGE = error.message;}
	}
	const fetch_insert_comment_reply = async (Comment_id) => {
		try {
		RESPONSE = await (await fetch(DOMAIN_NAME+'insert_comment_reply', get_POST_object({ name: NAME, password: PASSWORD, comment_id: Comment_id, comment_reply: COMMENT_REPLY }))).json();
		await response_handling(RESPONSE);
		} catch (error) {ERROR_MESSAGE = error.message;}
	};
	const fetch_delete_comment_reply = async (Comment_reply_id) => {
		try {
		RESPONSE = await (await fetch(DOMAIN_NAME+'delete_comment_reply', get_POST_object({ name: NAME, password: PASSWORD, comment_reply_id: Comment_reply_id }))).json();
		await response_handling(RESPONSE);
		} catch (error) {ERROR_MESSAGE = error.message;}
	};
	const fetch_insert_tag = async (LINK_ID, TAG_PARAM) => {
		console.log("fetch_insert_tag");
		try {
		TAG = TAG_PARAM || TAG_VAL.value;
		RESPONSE = await (await fetch(DOMAIN_NAME+'insert_tag', get_POST_object({ name: NAME, password: PASSWORD, link_id: LINK_ID, tag: TAG }))).json();
		await response_handling(RESPONSE);
		} catch (error) {ERROR_MESSAGE = error.message;}
	};
	const fetch_get_collect_value_for_test = async () => {
		try {
		const RESULT_OF_TEST = await (await fetch(DOMAIN_NAME+'get_collect_value_for_test', get_POST_object({ name: NAME, password: PASSWORD }))).json();
		FETCH_TEST_DATA = RESULT_OF_TEST.message;
		} catch (error) {
		console.log(error);
		}
	};
const fetch_get_tags_for_autocomplete = async () => {
try {
RESPONSE = await (await fetch(DOMAIN_NAME+'get_tags_for_autocomplete', get_POST_object({ name: NAME, password: PASSWORD }))).json();
await response_handling(RESPONSE);
if(RESPONSE.message){
	// ALL_TAGS = RESPONSE.message.map((item) => item.tag);
	ALL_TAGS = RESPONSE.message;
}
// ALL_TAGS = RESPONSE.message;
} catch (error) {ERROR_MESSAGE = error.message;}
};
	const remove_error_message = () => ERROR_MESSAGE = "";
	// <button on:click={() => ORDER_BY_COLUMN === 'links.id' ? ORDER_BY_COLUMN = 'created_at' : ORDER_BY_COLUMN === 'created_at' ? ORDER_BY_COLUMN = 'updated_at' : ORDER_BY_COLUMN = 'links.id'}>ORDER_BY_COLUMN: {ORDER_BY_COLUMN}</button>
	// const fetch_hello = async ({ORDER_BY_PARAM='DESC', ORDER_BY_COLUMN_PARAM='links.id', REQ_TAG_PARAM, USER_PARAM}) => {
	const order_by_column_and_fetch_hello = async () => {
		switch (true) {
			case ORDER_BY_COLUMN === 'id' : ORDER_BY_COLUMN = 'created_at'; break;
			case ORDER_BY_COLUMN === 'created_at' : ORDER_BY_COLUMN = 'updated_at'; break;
			case ORDER_BY_COLUMN === 'updated_at' :  ORDER_BY_COLUMN = 'id'; break;
			default: ORDER_BY_COLUMN = 'id'; break;
		}
		await fetch_hello({
			ORDER_BY_PARAM: ORDER_BY,
			ORDER_BY_COLUMN_PARAM: ORDER_BY_COLUMN,
			REQ_TAG_PARAM: 'TEST',
		});
	};
	const order_by_and_fetch_hello = async () => {
		switch (true) {
			case ORDER_BY === 'ASC' : ORDER_BY = 'DESC'; break;
			case ORDER_BY === 'DESC' :  ORDER_BY = 'ASC'; break;
			default: ORDER_BY_COLUMN = 'DESC'; break;
		}
		await fetch_hello({
			ORDER_BY_PARAM: ORDER_BY,
			ORDER_BY_COLUMN_PARAM: ORDER_BY_COLUMN,
			// REQ_TAG_PARAM: 'TEST',
		});
	};
	const req_tag_and_fetch_hello = async (TAG) => {
		REQ_TAG = TAG;
		await fetch_hello({
			REQ_TAG_PARAM: REQ_TAG,
		});
	};
	const user_and_fetch_hello = async (USER) => {
		const USER_VAL = USER ? USER : 'user1';
		await fetch_hello({
			USER_PARAM: USER_VAL,
		});
	};
	// returnで全ての関数が含まれたオブジェクトを返す
	return {
		get_POST_object,
		fetch_insert_or_update_link,
		fetch_hello,
		fetch_insert_link,
		fetch_delete_link,
		fetch_like_increment_or_decrement,
		fetch_insert_comment,
		fetch_delete_comment,
		fetch_insert_comment_reply,
		fetch_delete_comment_reply,
		fetch_insert_tag,
		fetch_copy_insert_link,
		fetch_get_collect_value_for_test,
		fetch_get_tags_for_autocomplete,
		remove_error_message,
		order_by_column_and_fetch_hello,
		order_by_and_fetch_hello,
		req_tag_and_fetch_hello,
		user_and_fetch_hello,
	};
};
const {get_POST_object,fetch_insert_or_update_link,fetch_hello,fetch_insert_link,fetch_delete_link,fetch_like_increment_or_decrement,fetch_insert_comment,fetch_delete_comment,fetch_insert_comment_reply,fetch_delete_comment_reply,fetch_insert_tag,fetch_copy_insert_link,fetch_get_collect_value_for_test,fetch_get_tags_for_autocomplete,remove_error_message,order_by_column_and_fetch_hello,order_by_and_fetch_hello,req_tag_and_fetch_hello,user_and_fetch_hello,} = all_fetch_fn();
const all_test_fn = ()  => {
	const test_db_init_only_set_name_password_test_mode = async () =>{
    (NAME = 'testuser',PASSWORD = 'duct_mean_fuckst1ck',TEST_MODE = 'TEST_MODE');
    console.log('success');
}
const test_db_init = async (Start_Or_End) =>{
    try {
	console.log(Start_Or_End);
	console.log("test_db_init 1");
    (NAME = 'testuser',PASSWORD = 'duct_mean_fuckst1ck',TEST_MODE = 'TEST_MODE');
	console.log("test_db_init 2");
	if(Start_Or_End === "start"){
		RESPONSE = await (await fetch(DOMAIN_NAME+'test_db_init', get_POST_object({ name: NAME, password: PASSWORD, test_mode: "TEST_MODE" }))).json();

	};
	if(Start_Or_End === "end"){
		RESPONSE = await (await fetch(DOMAIN_NAME+'test_db_init', get_POST_object({ name: NAME, password: PASSWORD, test_mode: "TEST_MODE", test_mode_close: 'TEST_MODE_CLOSE' }))).json();
	};
	console.log("test_db_init 3");
	console.log(RESPONSE);
	await response_handling(RESPONSE);

    // RESPONSE = await (await fetch(DOMAIN_NAME+'test_db_init', get_POST_object({ name: NAME, password: PASSWORD, test_mode: TEST_MODE }))).json();
	// console.log(RESPONSE);
    // RESPONSE.result === 'fail' ? (()=>{throw new Error(RESPONSE.error)})() : null;
    } catch (error) {
    ERROR_MESSAGE = error.message;
    }
}
const test_message_stacker = (Data, Expect_result) =>{
	function add_SUCESS_MESSAGE(New_Data) {
		SUCCESS_MESSAGE_STACK = [...SUCCESS_MESSAGE_STACK, New_Data]
	};
    SUCCESS_MESSAGE === 'success'
        // ? (console.log('OK'), SUCCESS_MESSAGE_STACK.push(['OK', (Data?Data+'は':'') + 'OK']))
        ? (console.log('OK'), add_SUCESS_MESSAGE(['OK', (Data?Data+'は':'') + 'OK'])) : null;
	function add_ERROR_MESSAGE_STACK(New_ERROR) {
		// fruits = [...fruits, newFruit];
		ERROR_MESSAGE_STACK = [...ERROR_MESSAGE_STACK, New_ERROR];
	}
    ERROR_MESSAGE === Expect_result
        // ? (console.log('OK'), ERROR_MESSAGE_STACK.push(['OK', Expect_result]))
        ? (console.log('OK'), add_ERROR_MESSAGE_STACK(["OK", Expect_result]))
			 : console.log('NG');
}
const test_for_LINK = async (
    {
        Data='SELECT',
		Sample=1,
        Expect_result='SQLの予約語を含む場合はエラー'
    }
    ) =>{

	await fetch_insert_link();
    test_message_stacker(Data, Expect_result);
}
const test_for_TAG = async (
    {
        Data='test!',
        Param_of_link_id=1,
        Expect_result='記号を含む場合はエラー'
    }
    ) =>{
    await fetch_insert_tag(Param_of_link_id, Data);
    test_message_stacker(Data, Expect_result);
}

const test_for_COMMENT = async (
    {
        Data=('a'.repeat(51)),
        Param_of_link_id=1,
        Expect_result='commentの文字数がdata_limitを超える場合はエラー'
    }
    ) =>{
    COMMENT = Data;
    await fetch_insert_comment(Param_of_link_id);
    test_message_stacker(Data, Expect_result);
}

const test_for_COMMENT_REPLY = async (
    {
        Data=('a'.repeat(51)),
        Param_of_comment_id=1,
        Expect_result='commentの文字数がdata_limitを超える場合はエラー'
    }
) =>{
    COMMENT_REPLY = Data;
    await fetch_insert_comment_reply(Param_of_comment_id);
    test_message_stacker(Data, Expect_result);
}

const test_for_LIKE_INCREMENT_OR_DECREMENT = async (
    {
        Data='',
        Param_of_link_id=1,
        Expect_result='success'
    }
) =>{
    await fetch_like_increment_or_decrement(Param_of_link_id);
    test_message_stacker(Data, Expect_result);
}

const test_sample_exe = async () => {
    await test_db_init("start");
    await test_for_LINK({
        Data: 'SELECT',
		Sample: 1,
        Expect_result: 'SQLの予約語を含む場合はエラー'
    });
    await test_for_LINK({
        Data: 'SELECT',
		Sample: 2,
        Expect_result: 'SQLの予約語を含む場合はエラー'
    });

    console.log(ERROR_MESSAGE_STACK);
    console.log(SUCCESS_MESSAGE_STACK);
}

const test_sample_exe2 = async () => {
    await test_for_TAG({
        Param_of_link_id: 1,
        Expect_result: '記号を含む場合はエラー'
    });
    await test_for_TAG({
        Data: 'test!',
        Param_of_link_id: 1,
        Expect_result: '記号を含む場合はエラー'
    });
    await test_for_TAG({
        Data: 'test tag',
        Param_of_link_id: 1,
        Expect_result: '空白を含む場合はエラー'
    });
    await test_for_TAG({
        Data: 'testlong',
        Param_of_link_id: 1,
        Expect_result: '7文字以上はエラー'
    });
    await test_for_TAG({
        Data: 'SELECT',
        Param_of_link_id: 1,
        Expect_result: 'SQLの予約語を含む場合はエラー'
    });
    await test_for_TAG({
        Data: 'test',
        Param_of_link_id: 1,
        Expect_result: 'OK'
    });
    // 既に同じタグがついています
    await test_for_TAG({
        Data: 'test',
        Param_of_link_id: 1,
        Expect_result: '既に同じタグがついています'
    });
    // 別のlinkへのtagはエラーにならない
    await test_for_TAG({
        Data: 'test',
        Param_of_link_id: 2,
        Expect_result: 'OK'
    });
    // 既に同じタグがついています
    await test_for_TAG({
        Data: 'test',
        Param_of_link_id: 2,
        Expect_result: '既に同じタグがついています'
    });

    await test_for_TAG({
        Data: 'TEST',
        Param_of_link_id: 1,
        Expect_result: 'OK'
    });

    console.log(ERROR_MESSAGE_STACK);
    console.log(SUCCESS_MESSAGE_STACK);
}

const test_sample_exe3 = async () => {
    // 'commentの文字数がdata_limitを超える場合はエラー'
    // 'should return "commentの文字数がdata_limit(test userは1000)を超える場合はエラー" when comment length is greater than data limit'
    // error_check_insert_comment('a'.repeat(1500), 50);

    await test_for_COMMENT({
        Data: 'a'.repeat(1500),
        Param_of_link_id: 1,
        Expect_result: 'commentの文字数がdata_limit(test userは50)を超える場合はエラー'
    });
    // 'should return "0文字の場合はエラー" when comment length is 0'
    // error_check_insert_comment('', 100);
    await test_for_COMMENT({
        Data: '',
        Param_of_link_id: 1,
        Expect_result: '0文字の場合はエラー'
    });
    // 'should return "空白を含む場合はエラー" when comment contains spaces'
    // error_check_insert_comment('This is a comment with spaces', 100);
    await test_for_COMMENT({
        Data: 'This is a comment with spaces',
        Param_of_link_id: 1,
        Expect_result: '空白を含む場合はエラー'
    });
    // 'should return "記号を含む場合はエラー" when comment contains symbols'
    // error_check_insert_comment('This is a comment with ! symbol', 100);
    await test_for_COMMENT({
        Data: 'This!Symbol',
        Param_of_link_id: 1,
        Expect_result: '記号を含む場合はエラー'
    });
    // 'should return "300文字以上はエラー" when comment length is greater than 300'
    // error_check_insert_comment('a'.repeat(301), 100);
    await test_for_COMMENT({
        Data: 'a'.repeat(301),
        Param_of_link_id: 1,
        Expect_result: '300文字以上はエラー'
    });
    // 'should return "SQLの予約語を含む場合はエラー" when comment contains SQL reserved words'
    // error_check_insert_comment('SELECT * FROM comments', 100);
    await test_for_COMMENT({
        Data: 'SELECT * FROM comments',
        Param_of_link_id: 1,
        Expect_result: 'SQLの予約語を含む場合はエラー'
    });
    // 'should return "OK" when comment is valid'
    // error_check_insert_comment('This is a valid comment', 100);
    await test_for_COMMENT({
        Data: 'ThisIsaValidComment',
        Param_of_link_id: 1,
        Expect_result: 'OK'
    });
}

const test_sample_exe4 = async () => {
    // 'comment_replyが空の場合はエラー'
    // 'comment_replyの文字数がdata_limitを超える場合はエラー'
    await test_for_COMMENT_REPLY({
        Data: 'a'.repeat(1500),
        Param_of_comment_id: 1,
        Expect_result: 'comment_replyの文字数がdata_limit(test userは50)を超える場合はエラー'
    });
    // '0文字の場合はエラー'
    await test_for_COMMENT_REPLY({
        Data: '',
        Param_of_comment_id: 1,
        Expect_result: '0文字の場合はエラー'
    });
    // '記号を含む場合はエラー'
    await test_for_COMMENT_REPLY({
        Data: 'This!Symbol',
        Param_of_comment_id: 1,
        Expect_result: '記号を含む場合はエラー'
    });
    // '空白を含む場合はエラー'
    await test_for_COMMENT_REPLY({
        Data: 'spa ces',
        Param_of_comment_id: 1,
        Expect_result: '空白を含む場合はエラー'
    });
    // '10文字以上はエラー'
    await test_for_COMMENT_REPLY({
        Data: 'a'.repeat(11),
        Param_of_comment_id: 1,
        Expect_result: '10文字以上はエラー'
    });
    // 'SQLの予約語を含む場合はエラー'
    await test_for_COMMENT_REPLY({
        Data: 'SELECT * FROM comments',
        Param_of_comment_id: 1,
        Expect_result: 'SQLの予約語を含む場合はエラー'
    });
    // 'OK'
    await test_for_COMMENT_REPLY({
        Data: 'ValidRep',
        Param_of_comment_id: 1,
        Expect_result: 'OK'
    });
    // 同じユーザーから同じcommentへのreplyが既に存在する場合はエラー
    await test_for_COMMENT_REPLY({
        Data: 'ValidRep',
        Param_of_comment_id: 1,
        Expect_result: '同じユーザーから同じcommentへのreplyが既に存在する場合はエラー'
    });
}

const test_sample_exe5 = async () => {
    // link_idがありません
    await test_for_LIKE_INCREMENT_OR_DECREMENT({
        Param_of_link_id: 1000000000,
        Expect_result: 'link_idがありません'
    });
    // message.response = 'increment_it';
    await test_for_LIKE_INCREMENT_OR_DECREMENT({
        Param_of_link_id: 1,
        Expect_result: 'success'
    });
    // message.response = 'decrement_it';
    await test_for_LIKE_INCREMENT_OR_DECREMENT({
        Param_of_link_id: 1,
        Expect_result: 'success'
    });
    // do like again
    await test_for_LIKE_INCREMENT_OR_DECREMENT({
        Param_of_link_id: 1,
        Expect_result: 'success'
    });
}
return {
test_message_stacker,
test_db_init_only_set_name_password_test_mode,
test_db_init,
test_for_LINK,
test_for_TAG,
test_for_COMMENT,
test_for_COMMENT_REPLY,
test_for_LIKE_INCREMENT_OR_DECREMENT,
test_sample_exe,
test_sample_exe2,
test_sample_exe3,
test_sample_exe4,
test_sample_exe5,
}

};
const {test_message_stacker,test_db_init_only_set_name_password_test_mode,test_db_init,test_for_LINK,test_for_TAG,test_for_COMMENT,test_for_COMMENT_REPLY,test_for_LIKE_INCREMENT_OR_DECREMENT,test_sample_exe,test_sample_exe2,test_sample_exe3,test_sample_exe4,test_sample_exe5,} = all_test_fn();
import { onMount } from 'svelte';
import { afterUpdate } from 'svelte';
import { isURL } from 'validator';
// $: if(fetch_message) {fetch_hello({});console.log("fetch_message");} listが更新されたらhtmlを更新する
$: {
	// console.log(ALL_DATA_LIST[0], "ALL_DATA_LIST[0]が更新されたらhtmlを更新する");
	// console.log(LIST, "LISTが更新されたらhtmlを更新する");

	// LIST = ALL_DATA_LIST[0]['list'];
	// LIST = ALL_DATA_LIST[0]['list'];
	// ALL_DATA_LIST = get_new_ALL_DATA_LIST();
	// console.log(ALL_DATA_LIST, "listが更新されたらhtmlを更新する");
};

onMount(async () => {
	try {
		await fetch_hello({});
		await fetch_get_tags_for_autocomplete();
		// await init_calendar();
		// await init(JSON.parse(HELLO_FETCH_DATA[0]['data_json_str']['data1']));
	} catch (error) {}
});	
afterUpdate(async () => {
	try {
		
		// await fetch_get_tags_for_autocomplete();
	} catch (error) {
		console.log(error);		
	}
});


const init = (item, User_Name) => {
	try {
	// console.log("item", item,"User_Name", User_Name);
	pre_download_for_parse_json_str(item['data_json_str']);
	// console.log("LIST", LIST,"DESCRIPTION", DESCRIPTION,);
	} catch (error) {console.log(error);ERROR_MESSAGE = error.message;}
};
// const all_calendar_fn = () => {
//     let calendar_val = null;
//     let all_event = null;
// 	const toggle_calendar = () => IS_CALENDAR_VISIBLE = !IS_CALENDAR_VISIBLE;
//     const init_calendar = () =>{
//         const calendarEl = document.getElementById('calendar');
//         const calendar = new FullCalendar.Calendar(calendarEl, {
//             initialView: 'dayGridMonth',
//             displayEventTime: false, // イベントの時刻を非表示にする
//         });
//         calendar.render();
//         calendar_val = calendar;
//     }
//     // イベント表示
//     function show_event(){
//             // イベントを一括で取り出す
//         var events = calendar_val.getEvents();
//         events.forEach(function(event) {
//             // console.log('Title: ' + event.title + ', Start: ' + event.start);
//             console.log({"event": event, "event.title": event.title, "event.start": event.start});
//         });
//         all_event = events;
//     }
//     function add_event(Title="+", Date){
//         calendar_val.addEvent({
//             title: Title,
//             allDay: false,
//             start: Date,
//         });
//         show_event();
//     }
//     function delete_event(date){
//         var events = calendar_val.getEvents();
//         events.forEach(function(event) {
//             if(event.start.getFullYear() === date.getFullYear() &&
//             event.start.getMonth() === date.getMonth() &&
//             event.start.getDate() === date.getDate() 
//                 //    秒まで一致しているか
//             &&
//             event.start.getHours() === date.getHours() &&
//             event.start.getMinutes() === date.getMinutes() &&
//             event.start.getSeconds() === date.getSeconds()
//             ){
//                 event.remove();
//             }
//         });
//     }
// 	return {
// 		IS_CALENDAR_VISIBLE,
// 		calendar_val,
// 		all_event,
// 		toggle_calendar,
//         init_calendar,
//         show_event,
//         add_event,
//         delete_event,
//     }
// };
// const {calendar_val,all_event,toggle_calendar,init_calendar,show_event,add_event,delete_event,} = all_calendar_fn();
</script>


<header>
RESPONSE: {JSON.stringify(RESPONSE)}
SUCCESS_MESSAGE_STACK: {JSON.stringify(SUCCESS_MESSAGE_STACK)}
ERROR_MESSAGE_STACK: {JSON.stringify(ERROR_MESSAGE_STACK)}
<!-- <button on:click={() => all_event_check()}>all_event_check</button> -->
<!-- <button on:click={() => test_db_init_only_set_name_password_test_mode()}>test_db_init_only_set_name_password_test_mode</button> -->
<!-- <button on:click={() => test_sample_exe({})}>test_sample_exe</button> -->
<!-- <button on:click={() => test_sample_exe2({})}>test_sample_exe2</button> -->
<!-- <button on:click={() => test_sample_exe3({})}>test_sample_exe3</button> -->
<!-- <button on:click={() => test_sample_exe4({})}>test_sample_exe4</button> -->
<!-- <button on:click={() => test_sample_exe5({})}>test_sample_exe5</button> -->
<!-- <button on:click={() => test_db_init({})}>test_db_init</button> -->
<!-- <button on:click={() => test_db_init("start")}>test_db_init_start</button> -->
<!-- <button on:click={() => test_db_init("end")}>test_db_init_end</button> -->
<!-- <button on:click={() => test_sample_exe({})}>test_sample_exe</button> -->
<!-- <button on:click={() => toggle_left_or_right_side({})}>toggle_left_or_right_side</button> -->
</header>

<main>
<aside class="left_side">
	<div class={IS_SHOW_LEFT ? '' : 'hidden'}>
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
					<button on:click={() => fetch_insert_link({})}>fetch_insert_link</button>
					<button on:click={() => fetch_hello({})}>CLEAR</button>

	</div>
</aside>

<aside class="right_side">
	<div class={IS_SHOW_RIGHT ? '' : 'hidden'}>
	<form>
	<!-- debag用(HTMLと変数をバインドしないとchromeのconsoleでapp.$$.ctxで表示されないため) -->
	name: <input bind:value={NAME} type="text" placeholder="name" autocomplete="username"
	on:input={()=>{
		ERROR_OF_NAME = error_check_name(NAME) ? error_check_name(NAME) : '';
		ERROR_OF_NAME = ERROR_OF_NAME === 'OK' ? "" : error_check_name(NAME);
	}}>
	{ERROR_OF_NAME}
	password: <input bind:value={PASSWORD} type="password" placeholder="password" autocomplete="current-password"
	on:input={()=>{
		ERROR_OF_PASSWORD = error_check_password(PASSWORD) ? error_check_password(PASSWORD) : '';
		ERROR_OF_PASSWORD = ERROR_OF_PASSWORD === 'OK' ? "" : error_check_password(PASSWORD);
	}}>
	{ERROR_OF_PASSWORD}
	</form>
	<div>

<!-- DATA1: <textarea bind:value={DATA1} placeholder="DATA1" class="link"></textarea> -->
<!-- DATA2: <textarea bind:value={DATA2} placeholder="DATA2" class="link"></textarea> -->

<!-- <button on:click={fetch_insert_link} class="insert_link">insert_link</button> -->

		<button on:click={() => fetch_hello({})}>CLEAR</button>
		<button on:click={() => order_by_and_fetch_hello()}>ORDER_BY: {ORDER_BY}</button>
		<button on:click={() => order_by_column_and_fetch_hello()}>ORDER_BY_COLUMN: {ORDER_BY_COLUMN}</button>		
	</div>
	{#each ALL_TAGS as item, index}
	<button on:click={() => req_tag_and_fetch_hello(item.tag)}>{item.tag}</button>
	{/each}
	<ul>
	{#each HELLO_FETCH_DATA as item, index}
		<br>
		<br>

		<li>
			<div>
				{#each item.tags as tags, INDEX}
				<button on:click={() => req_tag_and_fetch_hello(tags)}>{tags}</button>
				{/each}
			</div>

			<div>
	<input bind:this={TAG_VAL} list="autocomplete_list" type="text" bind:value={TAG} placeholder="tag"
		on:input={()=>{
			ERROR_OF_TAG = error_check_insert_tag(TAG) !== 'OK' ? error_check_insert_tag(TAG) : '';
			ERROR_OF_TAG === '' ? fetch_get_tags_for_autocomplete() : null;
		}}
	>
	{ERROR_OF_TAG}
				<datalist>
					{#each ALL_TAGS as item, index}
					<option value={item.tag}>
					{/each}
				</datalist>
				<!-- <button on:click={fetch_insert_tag(item.id)}>fetch_insert_tag</button> -->
				<!-- error_check_insert_tag('test!', '記号を含む場合はエラー'); -->
				<!-- <button on:click={()=> {check_any() ? console.log(1) : console.log(2)}}>fetch_insert_tag</button> -->
<button on:click={()=>{
let res = error_check_insert_tag(TAG);
	res === 'OK' ? fetch_insert_tag(item.id) : console.log(res);
}}>fetch_insert_tag</button>
				<!-- <button on:click={error_check_insert_tag ? fetch_insert_tag(item.id) : null}>fetch_insert_tag</button> -->
			</div>
			<ul>
			<li>
			<!-- data1とdata2を一時的に表示用にJSON.stringifyする -->
			<!-- <span>data1: {JSON.parse(item.data_json_str).data1}</span> -->
<span>data_json_str: {JSON.stringify(JSON.parse(item.data_json_str))}</span>
<button on:click={() => init(
	item,
	item['username'],
	)}>init_from_online</button>
{item.id}
			<!-- <span>data2: {JSON.parse(item.data_json_str).data2}</span> -->
			<!-- <span>data2: {JSON.stringify(JSON.parse(item.data_json_str).data2)}</span> -->
			<button on:click={fetch_delete_link(item.id)}>fetch_delete_link</button>
			<!-- fetch_copy_insert_link 自分自身が所有するlinkの時はボタンを表示しない -->
			{#if item.username !== NAME}
			<button on:click={fetch_copy_insert_link(JSON.parse(item.data_json_str))}>fetch_copy_insert_link</button>
			{/if}

			</li>
			</ul>

			<!-- <div>created_at: {item.created_at}</div> -->
			<!-- <div>updated_at: {item.updated_at}</div> -->
			<!-- <div>user_id: {item.user_id}</div> -->
			<!-- <div>username: {item.username}</div> -->
			<button on:click={() => user_and_fetch_hello(item.username)}>{item.username}</button>
			<!-- <div>like_count: {item.like_count}</div> -->
			<!-- like_countの数だけ😇が表示される -->
			<!-- {#each Array(item.like_count) as item, index} -->
			{#each item.likes as item, index}
			<span>😇</span>
			{/each}
			<button on:click={fetch_like_increment_or_decrement(item.id)}>like_increment_or_decrement</button>
			<div>
				<input type="text" bind:value={COMMENT} placeholder="comment"
					on:input={()=>{
						// const error_check_insert_comment = (comment, DATA_LIMIT) 
						ERROR_OF_COMMENT = error_check_insert_comment(COMMENT) !== 'OK' ? error_check_insert_comment(COMMENT) : '';
					}}
				>
			{ERROR_OF_COMMENT}
			<button on:click={fetch_insert_comment(item.id)}>fetch_insert_comment</button>
			</div>
			<ul class="comment_zone">{#each item.comments_and_replies as comments_and_reply, INDEX}
				<li>
					{comments_and_reply[INDEX]['comment']}
					<button on:click={() => user_and_fetch_hello(comments_and_reply[INDEX]['username'])}>{comments_and_reply[INDEX]['username']}</button>
					<button on:click={fetch_delete_comment(comments_and_reply[INDEX]['id'])}>fetch_delete_comment</button>
				</li>
					<input bind:value={COMMENT_REPLY} type="text" placeholder="comment_reply"
							on:input={()=>{
								ERROR_OF_COMMENT_REPLY = error_check_insert_comment_reply(COMMENT_REPLY) !== 'OK' ? error_check_insert_comment_reply(COMMENT_REPLY) : '';
							}}
						>
					{ERROR_OF_COMMENT_REPLY}
					<button on:click={fetch_insert_comment_reply(comments_and_reply[INDEX]['id'])}>fetch_insert_comment_reply</button>
				<li class="reply_zone">
					<ul>{#each comments_and_reply['comment_replies'] as comment_reply, INDEX}
						<li>
							{comment_reply['reply']}
							<button on:click={() => user_and_fetch_hello(comment_reply['username'])}>{comment_reply['username']}</button>
							<button on:click={fetch_delete_comment_reply(comment_reply['id'])}>fetch_delete_comment_reply</button>
						</li>
					{/each}</ul>
				</li>
	{/each}</ul>
	</li>
	{/each}
	</ul>
	</div>
</aside>
</main>

<!-- <footer>
	<a href="https://taroyanaka.github.io/svelte2/">this site is https://taroyanaka.github.io/svelte2/</a>
</footer> -->




<style>
/* headerタグを配置 */
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  color: #fff;
  /* padding: 1rem; */
  text-align: left;
  z-index: 1000;
  /* headerのheghtを指定 */
  /* height: 20rem; */


}
/* footerタグを配置 */
main {
	display: flex;
	/* mainをheaderの下に配置 */
	margin-top: 15rem;
}
.left_side {
	flex: 1 0 50%;
}
.right_side {
	flex: 1 0 50%;
}
.hidden {
    display: none;
}







</style>
