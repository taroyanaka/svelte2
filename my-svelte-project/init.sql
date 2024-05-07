-- q_as link_id, id, question, answer, created_at, updated_at
-- f_i_bs link_id, id, fill, sentence, created_at, updated_at
-- i_t_ns link_id, id, label, uri, created_at, updated_at

-- sqlite3で全てのテーブルとそのデータを削除するクエリ
DROP TABLE IF EXISTS user_permission;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS links;
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS links_tags;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS comment_replies;

-- ja: データ制限量
-- en: Data limit

-- ユーザーの権限のテーブル。カラムはIDはと名前と作成日と更新日を持つ。IDは自動的に増加する
-- カラムの中には、一般ユーザー、ゲストユーザーがある
-- ゲストユーザーはreadだけできる。一般ユーザーはread,write,deleteができる
CREATE TABLE user_permission (
  id INTEGER PRIMARY KEY,

  permission TEXT NOT NULL,
  readable INTEGER NOT NULL,
  writable INTEGER NOT NULL,
  deletable INTEGER NOT NULL, 
  likable INTEGER NOT NULL,
  commentable INTEGER NOT NULL,
  data_limit INTEGER NOT NULL,

  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL
);

-- ユーザーのテーブル。カラムはIDはと名前とパスワードと作成日と更新日を持つ。IDは自動的に増加する
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_permission_id INTEGER NOT NULL,
  username TEXT NOT NULL,
  userpassword TEXT NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY (user_permission_id) REFERENCES user_permission(id)
);

-- linksというブログのようなサービスのテーブル。IDは自動的に増加する。userのIDを外部キーとして持つ
CREATE TABLE links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  link TEXT NOT NULL,

  -- data_type TEXT NOT NULL, -- 'q_a', 'f_i_b', 'i_t_n',
  data_json_str TEXT NOT NULL, -- JSON string

  user_id INTEGER NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- likesというブログの高評価ボタンのようなサービスのテーブル。IDは自動的に増加する。linkのIDを外部キーとして持つ
CREATE TABLE likes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  link_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY (link_id) REFERENCES links(id)
);

-- linksとtagsの中間テーブル
CREATE TABLE links_tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  link_id INTEGER NOT NULL,
  tag_id INTEGER NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL
);

-- tagsというブログのタグのようなサービスのテーブル。IDは自動的に増加する。links_tagsを外部キーとして持つ
CREATE TABLE tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tag TEXT NOT NULL
);

CREATE TABLE comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  link_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  comment TEXT NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY (link_id) REFERENCES links(id)
);

CREATE TABLE comment_replies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  comment_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  reply TEXT NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY (comment_id) REFERENCES comments(id)
);



-- user_permissionにレコード挿入する
INSERT INTO user_permission (id, permission,
readable,
writable,
deletable,
likable,
commentable,
data_limit,
created_at, updated_at) VALUES (1, 'guest', 1, 0, 0, 0, 0,
200,
DATETIME('now'), DATETIME('now'));
INSERT INTO user_permission (id, permission,
readable,
writable,
deletable,
likable,
commentable,
data_limit,
created_at, updated_at) VALUES (2, 'user', 1, 1, 1, 1, 1,
40000,
DATETIME('now'), DATETIME('now'));

INSERT INTO user_permission (id, permission,
readable,
writable,
deletable,
likable,
commentable,
data_limit,
created_at, updated_at) VALUES (3, 'pro', 1, 1, 1, 1, 1,
400000,
DATETIME('now'), DATETIME('now'));

INSERT INTO user_permission (id, permission,
readable,
writable,
deletable,
likable,
commentable,
data_limit,
created_at, updated_at) VALUES (4, 'test', 1, 1, 1, 1, 1,
1000,
DATETIME('now'), DATETIME('now'));


-- usersにデータをレコード挿入する
INSERT INTO users (user_permission_id, username, userpassword, created_at, updated_at) VALUES (1, 'GUEST', 'GUEST_PASS', DATETIME('now'), DATETIME('now'));
INSERT INTO users (user_permission_id, username, userpassword, created_at, updated_at) VALUES (2, 'user1', 'user_pass1', DATETIME('now'), DATETIME('now'));
INSERT INTO users (user_permission_id, username, userpassword, created_at, updated_at) VALUES (2, 'user2', 'user_pass2', DATETIME('now'), DATETIME('now'));
INSERT INTO users (user_permission_id, username, userpassword, created_at, updated_at) VALUES (3, 'pro1', 'pro_pass1', DATETIME('now'), DATETIME('now'));
INSERT INTO users (user_permission_id, username, userpassword, created_at, updated_at) VALUES (4, 'testuser', 'duct_mean_fuckst1ck', DATETIME('now'), DATETIME('now'));



-- 以下のようなデータを作るテーブルを定義したい
-- {
--     "id": 1,
--     "add_date": "2024-05-06T13:13:27.414Z",
--     "update_date": "2024-05-06T13:13:27.414Z",
--     "detail_list": {
--         "list_id": 1,
--         "id": 1,
--         "name": "name1",
--         "description": "description1description2description3description4description5description6description7",
--         "address": "address1address2address3address4",
--         "phone": "phone1",
--         "related_url_list": [
--             "https://www.google.com/",
--             "https://twitter.com/",
--             "https://www.apple.com/"
--         ],
--         "nearest_station": "nearest_station1",
--         "holiday": "holiday1",
--         "business_hours": "business_hours1"
--     },
--     "sub_list": [
--         {
--             "list_id": 1,
--             "id": 1,
--             "text": "ABC",
--             "add_date": "2024-05-06T13:13:27.414Z",
--             "update_date": "2024-05-06T13:13:27.414Z",
--             "check_on_off": false,
--             "check_date": "2024-05-06T13:13:27.414Z",
--             "image": [
--                 {
--                     "sub_list_id": 1,
--                     "id": 1,
--                     "image_url": "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
--                 },
--                 {
--                     "sub_list_id": 1,
--                     "id": 11,
--                     "image_url": "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
--                 },
--                 {
--                     "sub_list_id": 1,
--                     "id": 21,
--                     "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/320px-Amazon_Web_Services_Logo.svg.png"
--                 }
--             ]
--         },
--         {
--             "list_id": 1,
--             "id": 2,
--             "text": "DEF",
--             "add_date": "2024-05-06T13:13:27.414Z",
--             "update_date": "2024-05-06T13:13:27.414Z",
--             "check_on_off": false,
--             "check_date": "2024-05-06T13:13:27.414Z",
--             "image": [
--                 {
--                     "sub_list_id": 2,
--                     "id": 2,
--                     "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Apple_logo_grey.svg/202px-Apple_logo_grey.svg.png"
--                 },
--                 {
--                     "sub_list_id": 2,
--                     "id": 12,
--                     "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Apple_logo_grey.svg/202px-Apple_logo_grey.svg.png"
--                 }
--             ]
--         }
--     ]
-- }

CREATE TABLE lists (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  add_date DATETIME NOT NULL,
  update_date DATETIME NOT NULL,
  detail_list TEXT NOT NULL,
  sub_list TEXT NOT NULL
);

CREATE TABLE sub_lists (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  list_id INTEGER NOT NULL,
  text TEXT NOT NULL,
  add_date DATETIME NOT NULL,
  update_date DATETIME NOT NULL,
  check_on_off INTEGER NOT NULL,
  check_date DATETIME NOT NULL,
  image TEXT NOT NULL
);

CREATE TABLE detail_lists (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  list_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  related_url_list TEXT NOT NULL,
  nearest_station TEXT NOT NULL,
  holiday TEXT NOT NULL,
  business_hours TEXT NOT NULL
);

CREATE TABLE images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sub_list_id INTEGER NOT NULL,
  image_url TEXT NOT NULL
);

CREATE TABLE related_url_lists (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  detail_list_id INTEGER NOT NULL,
  url TEXT NOT NULL
);

-- lists sub_lists detail_lists images related_url_listsにレコードを入れる
INSERT INTO lists (id, add_date, update_date, detail_list, sub_list) VALUES (1, DATETIME('now'), DATETIME('now'), '1', '1');
INSERT INTO sub_lists (id, list_id, text, add_date, update_date, check_on_off, check_date, image) VALUES (1, 1, 'ABC', DATETIME('now'), DATETIME('now'), 0, DATETIME('now'), '1');
INSERT INTO sub_lists (id, list_id, text, add_date, update_date, check_on_off, check_date, image) VALUES (2, 1, 'DEF', DATETIME('now'), DATETIME('now'), 0, DATETIME('now'), '2');
INSERT INTO detail_lists (id, list_id, name, description, address, phone, related_url_list, nearest_station, holiday, business_hours) VALUES (1, 1, 'name1', 'description1description2description3description4description5description6description7', 'address1address2address3address4', 'phone1', 'https://www.google.com/,https://twitter.com/,https://www.apple.com/', 'nearest_station1', 'holiday1', 'business_hours1');
INSERT INTO images (id, sub_list_id, image_url) VALUES (1, 1, 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg');
INSERT INTO images (id, sub_list_id, image_url) VALUES (2, 1, 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg');
INSERT INTO images (id, sub_list_id, image_url) VALUES (3, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/320px-Amazon_Web_Services_Logo.svg.png');
INSERT INTO images (id, sub_list_id, image_url) VALUES (4, 2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Apple_logo_grey.svg/202px-Apple_logo_grey.svg.png');
INSERT INTO images (id, sub_list_id, image_url) VALUES (5, 2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Apple_logo_grey.svg/202px-Apple_logo_grey.svg.png');
INSERT INTO related_url_lists (id, detail_list_id, url) VALUES (1, 1, 'https://www.google.com/');
INSERT INTO related_url_lists (id, detail_list_id, url) VALUES (2, 1, 'https://twitter.com/');
INSERT INTO related_url_lists (id, detail_list_id, url) VALUES (3, 1, 'https://www.apple.com/');
