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
