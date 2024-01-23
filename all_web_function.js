// variables.js
let hello_fetch_data = null;


// let DOMAIN_NAME = 'https://spectrum-whip-sulfur.glitch.me/';
const DOMAIN_NAME = 'http://localhost:8000/';




const test_db_init_only_set_name_password_test_mode = async () =>{
	(NAME = 'testuser',PASSWORD = 'duct_mean_fuckst1ck',TEST_MODE = 'TEST_MODE');
}
const test_db_init_on_start = async () =>{
	try {
	(NAME = 'testuser',PASSWORD = 'duct_mean_fuckst1ck',TEST_MODE = 'TEST_MODE');
	RESPONSE = await (await fetch(DOMAIN_NAME+'test_db_init', get_POST_object({ name: NAME, password: PASSWORD, test_mode: TEST_MODE }))).json()
	RESPONSE.result === 'fail' ? (()=>{throw new Error(RESPONSE.error)})() : null;
	} catch (error) {
	ERROR_MESSAGE = error.message;
	}
}
const test_db_init_on_end = async () =>{
	try {
	(NAME = 'testuser',PASSWORD = 'duct_mean_fuckst1ck',TEST_MODE = 'TEST_MODE');
	RESPONSE = await (await fetch(DOMAIN_NAME+'test_db_init', get_POST_object({ name: NAME, password: PASSWORD, test_mode: TEST_MODE }))).json()
	RESPONSE.result === 'fail' ? (()=>{throw new Error(RESPONSE.error)})() : null;
	} catch (error) {
	ERROR_MESSAGE = error.message;
	}
}

const message_stacker = (Data, Expect_result) =>{
	SUCCESS_MESSAGE === 'success'
		? (console.log('OK'), SUCCESS_MESSAGE_STACK.push(['OK', (Data?Data+'は':'') + 'OK']))
		: null;
	ERROR_MESSAGE === Expect_result
		? (console.log('OK'), ERROR_MESSAGE_STACK.push(['OK', Expect_result]))
		: console.log('NG');
}
const test_for_LINK = async (
	{
		Data='SELECT',
		Expect_result='SQLの予約語を含む場合はエラー'
	}
	) =>{
	LINK = Data;
	await fetch_insert_link();
	message_stacker(Data, Expect_result);
}

const test_for_TAG = async (
	{
		Data='test!',
		Param_of_link_id=1,
		Expect_result='記号を含む場合はエラー'
	}
	) =>{
	await fetch_insert_tag(Param_of_link_id, Data);
	message_stacker(Data, Expect_result);
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
	message_stacker(Data, Expect_result);
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
	message_stacker(Data, Expect_result);
}

const test_for_LIKE_INCREMENT_OR_DECREMENT = async (
	{
		Data='',
		Param_of_link_id=1,
		Expect_result='success'
	}
) =>{
	await fetch_like_increment_or_decrement(Param_of_link_id);
	message_stacker(Data, Expect_result);
}

const test_sample_exe = async () => {
	await test_db_init_on_start();
	await test_for_LINK({
		Data: 'SELECT',
		Expect_result: 'SQLの予約語を含む場合はエラー'
	});
	await test_for_LINK({
		Data: 'https::///google.co.jp',
		Expect_result: 'URLの形式が正しくありません'
	});
	await test_for_LINK({
		Data: 'https://hogehoge.com/',
		Expect_result: '許可されていないURLです'
	});
	await test_for_LINK({
		Data: 'https://www.yahoo.co.jp/',
		Expect_result: 'OK'
	});
	await test_for_LINK({
		Data: 'https://www.google.co.jp/',
		Expect_result: 'OK'
	});
	await test_for_LINK({
		Data: 'https://www.youtube.com/',
		Expect_result: 'OK'
	});
	await test_for_LINK({
		Data: 'https://www.google.co.jp/',
		Expect_result: '同じlinkが存在します'
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

const fetch_hello = async ({ORDER_BY_PARAM='DESC', ORDER_BY_COLUMN_PARAM='id', REQ_TAG_PARAM, USER_PARAM}) => {
	console.log(ORDER_BY_COLUMN_PARAM, ORDER_BY_PARAM, REQ_TAG_PARAM, USER_PARAM);
	try {
		// console.log(REQ_TAG_PARAM);
const order_by_param = ORDER_BY_PARAM; // ? ORDER_BY_PARAM : 'DESC';
const order_by_column_param = ORDER_BY_COLUMN_PARAM; // ? ORDER_BY_COLUMN_PARAM : 'links.id';
const req_tag_param = REQ_TAG_PARAM; // ? REQ_TAG_PARAM : null;
const user_param = USER_PARAM; // ? USER_PARAM : null;
	const make_get_param = () => {
		const get_param_array = [];
if(order_by_param) {get_param_array.push(`order_by=${order_by_param}`)};
if(order_by_column_param) {get_param_array.push(`order_by_column=${order_by_column_param}`)};
if(req_tag_param) {get_param_array.push(`tag=${req_tag_param}`)};
if(user_param) {get_param_array.push(`user=${user_param}`)};

// if(ORDER_BY_PARAM) {get_param_array.push(`order_by=${ORDER_BY_PARAM}`)};
// if(ORDER_BY_COLUMN_PARAM) {get_param_array.push(`order_by_column=${ORDER_BY_COLUMN_PARAM}`)};
// if(REQ_TAG_PARAM) {get_param_array.push(`tag=${REQ_TAG_PARAM}`)};
// if(USER_PARAM) {get_param_array.push(`user=${USER_PARAM}`)};

		const endpoint = DOMAIN_NAME+'read_all';
		const get_param = get_param_array.join('&');
		return `${endpoint}?${get_param}`;
	};
	const res = await (await fetch(make_get_param())).json();
	if(res.result === 'fail') throw new Error(res.error);
	const pre_result = await (await fetch(make_get_param())).json();
	// pre_resultが空の場合はエラーを投げる
	if(pre_result.length === 0) throw new Error('条件に一致するデータがありませんでした');
	hello_fetch_data = pre_result.message;
	// return pre_result.message;
	} catch (error) {
		console.log(error);
		ERROR_MESSAGE = error.message;
	}
};





const get_POST_object = (BODY_OBJ) => {
	return {
	method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(BODY_OBJ)
	}
};


const response_handling = async (RESPONSE) => {
	try {
	// RESPONSE.status === 400 ? console.log('RESPONSE.status: RESPONSE.status === 400') : null;
	RESPONSE.status === 200 ? SUCCESS_MESSAGE = RESPONSE.result : null;
	(RESPONSE.result === 'fail' || RESPONSE.status === 400) ? (()=>{throw new Error(RESPONSE.message)})() : (await fetch_hello({}));
	} catch (error) {
		(()=>{throw new Error(error.message)})();
	}
}

const uncheck_list = () => {
let res = list.map((item) => ({...item, check: false, check_date: new Date()}))
// console.log(res);
return res;
};
// URLの配列の文字列から始まる場合はtrueを返す関数を1行で
let hoge = null;
const fetch_insert_link = async () => {
	try {
// listのcheckを全部falseにし、change_dateを現在時刻にする
const check_mode = false;
if(check_mode===true){list = uncheck_list};
	// listをlist_validation関数でチェック
	list_validation(list);
	// RESPONSE = await (await fetch(DOMAIN_NAME+'insert_link', get_POST_object({ name: NAME, password: PASSWORD, link: LINK }))).json();
	const DATA_JSON_STR = JSON.stringify({data1: list, data2: meta_data});
	RESPONSE = await (await fetch(DOMAIN_NAME+'insert_link', get_POST_object({ name: NAME, password: PASSWORD, data_json_str: DATA_JSON_STR }))).json();
	await response_handling(RESPONSE);
	} catch (error) {ERROR_MESSAGE = error.message;}
};
// copy insert(他のユーザーのlinkをコピーして自分のlinkとして保存する)
// copyするときはcheckを全部falseでchange_dateを現在時刻にする
const fetch_copy_insert_link = async (Other_User_DATA1, Other_User_DATA2) => {
	try {
	const DATA_JSON_STR = JSON.stringify({data1: Other_User_DATA1, data2: Other_User_DATA2});
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
	try {
	TAG = TAG_PARAM || TAG_VAL.value;
	RESPONSE = await (await fetch(DOMAIN_NAME+'insert_tag', get_POST_object({ name: NAME, password: PASSWORD, link_id: LINK_ID, tag: TAG }))).json();
	await response_handling(RESPONSE);
	} catch (error) {ERROR_MESSAGE = error.message;}
};


const fetch_get_collect_value_for_test = async () => {
	try {
	const RESULT_OF_TEST = await (await fetch(DOMAIN_NAME+'get_collect_value_for_test', get_POST_object({ name: NAME, password: PASSWORD }))).json();
	COLLECT_VALUE = RESULT_OF_TEST.message;
	} catch (error) {
	console.log(error);
	}
};

const fetch_get_tags_for_autocomplete = async () => {
	const json = await (await fetch(DOMAIN_NAME+'get_tags_for_autocomplete', get_POST_object({ name: NAME, password: PASSWORD })))
					.json();
	const RES = await json;
	ALL_TAGS = await RES.message;
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


// export {
// test_db_init_only_set_name_password_test_mode,
// test_db_init_on_start,
// test_db_init_on_end,
// message_stacker,
// test_for_LINK,
// test_for_TAG,
// test_for_COMMENT,
// test_for_COMMENT_REPLY,
// test_for_LIKE_INCREMENT_OR_DECREMENT,
// test_sample_exe,
// test_sample_exe2,
// test_sample_exe3,
// test_sample_exe4,
// test_sample_exe5,
// fetch_hello,
// response_handling,
// uncheck_list,
// fetch_insert_link,
// fetch_copy_insert_link,
// fetch_delete_link,
// fetch_like_increment_or_decrement,
// fetch_insert_comment,
// fetch_insert_comment_reply,
// fetch_delete_comment,
// fetch_delete_comment_reply,
// fetch_insert_tag,
// fetch_get_collect_value_for_test,
// fetch_get_tags_for_autocomplete,
// remove_error_message,
// order_by_column_and_fetch_hello,
// order_by_and_fetch_hello,
// req_tag_and_fetch_hello,
// user_and_fetch_hello,
// };