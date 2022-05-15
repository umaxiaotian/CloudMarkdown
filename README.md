# はじめに
MarkdownはQiitaやNortionなど様々なサービスで使える超簡単なテキストフォーマットです。
このMarkdownを使って自分で運営できるナレッジ共有サービス(上記のようなサービス)があってもいいのでは？
と思い、オープンソースで作ってみました。
また、MermaidをMarkdownに組み込みたかったこともありそれも理由の一つです。（Mermaid使えるサービスってそんな多くない）最近増えつつあるのはうれしい

機能としては、以下のようになります。
- ログイン機能
- ユーザー管理機能（作成中...）
- 記事(CRUD)
- いいね

![スクリーンショット 2022-05-15 204224.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/418662/2a9715de-3618-fba4-352d-bc31ad3e69f2.png)

検証サイト
https://cloudmarkdown.umaxiaotian.com/

APIリファレンス
https://cloudmarkdown-api.umaxiaotian.com/docs
## 使用技術
- FastAPI(バックエンド）
- Vue Nuxt.js（フロント）
- Postgresql(データベース)


# 導入
まず大前提に、DockerとDocker-composeがインストールされている必要があります。
※本番稼働させるときなどは、ミドルウェアをそのままOSに乗っけるのがよさそうだが、本記事ではちょろっと試してみよう的なものなので、Dockerで（　＾ω＾）・・・

必要なもの
- Dockerが入ったマシン
- HeidiSQL（好きなデータベースクライアントツールでもおｋ）
### ホストマシン側の作業
- docker-composeのデータを落としてくる
```
git clone https://github.com/umaxiaotian/CloudMarkdown_docker.git Cloudmarkdown
```

そうすると、Cloudmarkdownというフォルダができたはず。。。
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/418662/61fdf2b7-f249-104c-b62c-fdc669816f65.png)

作ったフォルダに移動
```
cd Cloudmarkdown
```

続いて下記のものを落としてくる
- API
- フロント Nuxt.jsフォルダ

必ずAPIのフォルダ名は、「api」　フロントのフォルダ名は、「app」としてください。※下記の通りやればOK
```
git clone https://github.com/umaxiaotian/CloudMarkdown_API.git api
git clone https://github.com/umaxiaotian/CloudMarkdown.git app
```
下のような感じで、ダウンロードが終わるはず。。
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/418662/ec440f7f-ba07-192f-fcd1-111e8e954192.png)


一応今あるフォルダを確認しておく
```
ls -l
```
こんな感じになってればOK!
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/418662/b25cf284-3335-f471-8f82-e779d2e4aa78.png)

docker-compose.ymlがあるパスで下記のコマンドを実行
※ダウンロードにはちょっと時間がかかる・・・CentOSのイメージで作ったからかな（　＾ω＾）
```
docker-compose build
docker-compose up -d
```

コンテナがスタートしたら下記の画像のようになっているはず。
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/418662/a760ce0c-de12-3eb0-deae-be158cbb0293.png)

### DBクライアントでユーザー作成
次は、ホスト側から、HeidiSQL（データべースクライアント）でユーザーを作成します。
docker-compose.ymlを一切いじっていなければ下記でログインできます。
```text
USER: Cloudmarkdown
PASSWORD: Cloudmarkdown
PGPASSWORD: Cloudmarkdown
DB: Cloudmarkdown
HOST:127.0.0.1
```
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/418662/d9e018b3-60a1-7281-5bfc-f82a5e78d379.png)

ログインしたら、
userテーブルを選択し、
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/418662/b0839c04-c3a7-6f37-6523-0dcdc6380e1d.png)


下記のように、テストユーザーを作成します。
今回は、ユーザー名「test」、パスワード「test」で作成しました。
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/418662/813ff638-27c6-ffaf-02ea-27367685f12b.png)

以上で、ホスト側の作業は終了です。
では、再びターミナルに戻って、CloudmarkdownのNuxtをビルドします。

### yarnコマンドを使って検証環境を立てる
下記コマンドで、Nodeコンテナの中に入ります。
このコンテナには、APIと通信するクライアントツールその名もCloudMarkdownが入っています。
```
docker exec -it NodeApp bash
```
入れましたら、いったん中身を確認します。
下記の感じで中身が入っていればOK！
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/418662/001efd12-8112-b3da-7dfe-efe9477c3026.png)

そのディレクトリの位置で.envを作成します。
```
vi .env
```
下記を追加して保存します。
```
EXTRA_FILE_URL=http://localhost:8000
BASE_URL=http://localhost:8000
```
EXTRA_FILE_URL 画像ファイル保存APIパス
BASE_URL 通常のAPIパス

下記で、必要なnodeモジュールをインストールします。
```
yarn install
```

終わりましたら続いて、developモードでnuxtを立ち上げます。

```
yarn dev
```
そしたら、下記のように実行されます。
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/418662/54d54ab0-26d7-1abd-e35b-85a8268d4101.png)


これで、検証環境は立ち上がりましたので
http://localhost:3000
こちらでアクセスできるか試します。

正しく構築できていれば、
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/418662/fbad3c49-0af2-380e-be7b-1f724f56bf78.png)
このように表示されますので、
ログインボタンから先ほど、入力したテストユーザーのアカウント
USER: test
PASS: test
を入力します。

ログイン出来たらこのようになります。
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/418662/c441f7bc-693d-adb2-6d74-24e91068dc07.png)
↓バーが出てくるのがわかりやすいかな。。
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/418662/324c0b44-b5f3-f0b9-448a-11ae0dfabe95.png)

以上で終了です。


# NginxでクライアントアプリケーションCloudmarkdownを公開する
下記のコマンドを実行すると、appフォルダの中にdistというフォルダが作成されますので、それをnginxやApacheでwwwの中に入れてください。
node.jsを入れたりする必要はありません！そのままhtmlファイルを置く感じでおいてもらえればOK！
```
yarn generate
```


# 最後に
追加の要望機能があったり、質問などありましたら私のTwitterまたは、Qiitaにお書きください。
Twitter: https://twitter.com/umarun_j


# CloudMarkdown フロントエンド側
![image](https://user-images.githubusercontent.com/29545778/166156246-a97fd58f-84a5-47c6-b631-98c4b75e707a.png)
![image](https://user-images.githubusercontent.com/29545778/166156254-6f5370e5-ac77-422f-9f64-fba2a1793185.png)
![image](https://user-images.githubusercontent.com/29545778/166156259-8def50e8-60d2-41c4-a2b7-1984beaf163e.png)
