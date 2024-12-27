# webpro_06
2024年10月29日
## このプログラムについて
webpro_06 | 説明
-|-
app5.js | プログラム本体
views/show.ejs | メッセージの表示画面
views/luck.ejs | 運勢の表示画面
views/icon.ejs | 画像の表示画面
views/janken.ejs | じゃんけんの開始画面
views/coin.ejs | コイントスの選択画面
views/gacga.ejs | ガチャの開始画面
views/selcoin.ejs | スライダーによるコイントスの開始画面

## app5.jsについて

###  起動方法
ソースコードを示している場合、それを実行する。
1. Node.jsをインストールする
1. ローカルリポジトリを作成する
```c
git clone https://github.com/KugeRiku/webpro_06.git
cd webpro_06
```
3. パッケージをインストール
```c
npm install
```
4. アプリケーションを起動
```c
node app5.js
```
5. アプリケーションがポート8080で動作しているので、以下のURLにアクセスする
```
http://localhost:8080/<任意のパス>
```

### 編集したファイルのgit管理
ソースコードを示している場合、それを実行する．
1. 変更をステージに追加
```
git add .
```
2. 変更をコミットする
```
git commit -m "変更内容を説明するメッセージ"
```
3. リモートリポジトリにプッシュする
```
git push origin main
```

### 機能の説明と使用手順
#### 1 挨拶機能　(/hello1, /hello2)
説明: 挨拶のメッセージが表示される
使用手順: 
1. ブラウザで http://localhost:8080/hello1 または http://localhost:8080/hello2 にアクセス。
1. 「Hello world」「Bon jour」という挨拶メッセージが表示される。

#### 2 画像表示機能　(/icon)
説明: Appleのロゴ画像を表示する。
使用手順: 
1. ブラウザで http://localhost:8080/icon にアクセス。
1. Appleロゴが画面に表示する。

#### 3 おみくじ機能　(/luck)
説明: ランダムに生成した値に応じて、運勢を表示する。
使用手順: 
1. ブラウザで http://localhost:8080/luck にアクセス。
1. ランダムな運勢結果が画面に表示される。

#### 4 ジャンケン　(/janken)
説明: 自分が入力した手とコンピュータの手を比較し、じゃんけんの勝敗を判定する。
使用手順: 
1. ブラウザで http://localhost:8080/janken にアクセス。
1. コンピュータの手と勝敗が表示され、勝ち数と試合数が更新される。

#### 5 コイントス (/coin)
説明: 表または裏をボタンで選択し、ランダムに生成した値に応じて選択される表裏と比較して正解数を記録する。
使用手順: 
1. ブラウザで http://localhost:8080/coin にアクセス。
1. ランダムな結果が表示され、正解数と試行数が更新される。

#### 6 ガチャ (/gacha)
説明: ランダムに生成された数値に応じて、ガチャ結果を表示する。
使用手順: 
1. ブラウザで http://localhost:8080/gacha にアクセス。
1. ガチャ結果が画面に表示される。

#### 7 コイントス (/selcoin)
説明: 表または裏をスライダーで選択し、ランダムに生成した値に応じて選択される表裏と比較して正解数を記録する。
使用手順: 
1. ブラウザで http://localhost:8080/selcoin にアクセス。
1. ランダムな結果が表示され、正解数と試行数が更新される。


## フローチャート
/hello1, /hello2について
```mermaid
flowchart TD

start["開始"]
checkRoute{"ルートは？"}
setMessages1["メッセージ1とメッセージ2を設定 (ルート: /hello1)"]
setMessages2["メッセージ1とメッセージ2を設定 (ルート: /hello2)"]
renderShow["'show.ejs'を表示"]
e["終了"]

start --> checkRoute
checkRoute -->|/hello1| setMessages1
checkRoute -->|/hello2| setMessages2
setMessages1 --> renderShow
setMessages2 --> renderShow
renderShow --> e
```
/iconについて
```mermaid
flowchart TD

start["開始"] --> setImage["画像ファイル名: './public/Apple_logo_black.svg'<br>代替テキスト: 'Apple Logo'"]
setImage --> renderIcon["'icon.ejs'を表示<br>filenameとaltを埋め込む"]
renderIcon --> end1["終了"]
```
/luckについて
```mermaid
flowchart TD

start["開始"] --> generateRandom["1～6の乱数を生成"]
generateRandom --> checkLuck{"乱数は？"}
checkLuck -->|1| setGreatLuck["運勢: '大吉'"]
checkLuck -->|2| setMediumLuck["運勢: '中吉'"]
checkLuck -->|それ以外| setOtherLuck["運勢: ''"]
setGreatLuck --> renderLuck
setMediumLuck --> renderLuck
setOtherLuck --> renderLuck
renderLuck["'luck.ejs'を表示<br>luckとnumberを埋め込む"] --> end1["終了"]
```
/jankenについて
```mermaid
flowchart TD

start["開始"] --> getQuery["手（hand）、勝数（win）、試合数（total）を取得"]
getQuery --> generateRandomJanken["1～3の乱数を生成"]
generateRandomJanken --> determineCpu{"乱数は？"}
determineCpu -->|1| setCpuGu["CPUの手: 'グー'"]
determineCpu -->|2| setCpuChoki["CPUの手: 'チョキ'"]
determineCpu -->|3| setCpuPa["CPUの手: 'パー'"]
setCpuGu --> judgeResult
setCpuChoki --> judgeResult
setCpuPa --> judgeResult
judgeResult{"手の判定"} -->|引き分け| setDraw["結果: '引き分け'"]
judgeResult -->|勝ち| setWin["結果: '勝ち'<br>勝数を+1"]
judgeResult -->|負け| setLose["結果: '負け'"]
setDraw --> updateTotal
setWin --> updateTotal
setLose --> updateTotal
updateTotal["試合数を+1"] --> renderJanken
renderJanken["'janken.ejs'を表示<br>your, cpu, judgement, win, totalを埋め込む"] --> end1["終了"]
```
/coinについて
```mermaid
flowchart TD

startCoin([開始])
processCoinSelect["選択を取得<br>クエリから'オモテ'または'ウラ'"]
processCoinRandom["ランダム値生成<br>1 or 2"]
processCoinResult["結果判定<br>選択とランダム値を比較<br>'アタリ'または'ハズレ'"]
updateCoinCounters["正解数と総試行数を更新"]
renderCoin["'coin.ejs'をレンダリング"]
endCoin([終了])

startCoin --> processCoinSelect
processCoinSelect --> processCoinRandom
processCoinRandom --> processCoinResult
processCoinResult --> updateCoinCounters
updateCoinCounters --> renderCoin
renderCoin --> endCoin
```
/gachaについて
```mermaid
flowchart TD

startGacha([開始])
processGachaRandom["ランダム値生成<br>1-10"]
processGachaResult["結果判定<br>1: 'スーパーレア'<br>2-4: 'レア'<br>5-10: 'ノーマル'"]
renderGacha["'gacha.ejs'をレンダリング"]
endGacha([終了])

startGacha --> processGachaRandom
processGachaRandom --> processGachaResult
processGachaResult --> renderGacha
renderGacha --> endGacha
```
/selcoinについて
```mermaid
flowchart TD

startSelcoin([開始])
processSelcoinSelect["選択を取得<br>クエリから'オモテ'または'ウラ'"]
processSelcoinRandom["ランダム値生成<br>0 or 1"]
processSelcoinResult["結果判定<br>選択とランダム値を比較<br>'アタリ'または'ハズレ'"]
updateSelcoinCounters["正解数と総試行数を更新"]
renderSelcoin["'selcoin.ejs'をレンダリング"]
endSelcoin([終了])

startSelcoin --> processSelcoinSelect
processSelcoinSelect --> processSelcoinRandom
processSelcoinRandom --> processSelcoinResult
processSelcoinResult --> updateSelcoinCounters
updateSelcoinCounters --> renderSelcoin
renderSelcoin --> endSelcoin
```