import React from 'react';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

function Top() {
    return (
    <>
    <Grid container spacing={2} alignItems="flex-start" justify="center">
        <Grid item xs={8}>
            <h2> Play </h2>
            <h3> 都道府県穴埋め </h3>
            <ul>
                <li><h4> <Link to="play/?difficulty=easy"> Easy  </Link> </h4></li>
                <li><h4> <Link to="play/?difficulty=normal"> Normal </Link> </h4></li>
                <li><h4> <Link to="play/?difficulty=hard"> Hard </Link> </h4></li>
            </ul>

            <hr></hr>

            <div>
            <h3> これは何 </h3>

            昨今の謎解きの一部の競技シーンでは都道府県を暗記していることで素早く解ける問題があるらしい[要出典]ので，
            都道府県の穴埋め問題をスラスラ解けるようになると嬉しいなという練習用のサイトです<br></br>
            一般的に謎解きを楽しむ分には全く必要のない技能で，将来的にもこの技能が謎解きの水準になることは来ないし，
            何なら某テレビでも2回くらい使われたネタなので既に競技シーンでも必要となることはなさそうな気がしますが, それでもやりたい方は上からどうぞ.

            <h3> 問題形式 </h3>
                共通
                <ul>
                    <li>「さ？？？」 のように一部の平仮名が ? となっている問題が出題されるので，当てはまる都道府県を平仮名で書いて回答します． </li>
                    <li>「と？？」の場合は 「とやま」「とちぎ」のように，解が複数ある問題も存在します </li>
                    <li>47都道府県の内, 46都府県は 「と」「ふ」「けん」をつけないものとしますが，北海道のみは「ほっかいどう」と表記します </li>
                    <li>都道府県の 「頭文字 + 文字数」 がランダムな順に重複なく出題され, 全問解答するまでのタイムと正答率が記録されます.</li>
                </ul>
                Easy
                <ul>
                    <li> 頭文字, 文字数, 解の数 がわかります. 全 35 問が random に出題されます</li>
                </ul>
                Normal
                <ul>
                    <li> 頭文字, 文字数 がわかります. 解の数はわかりません.  全 35 問が random に出題されます</li>
                </ul>
                Hard
                <ul>
                    <li> 頭文字, 文字数 がわかります. 解の数はわかりません. </li>
                    <li> ダミーとして解が存在しない問題が 10 問含む, 全 45 問が random に出題されます</li>
                    <li> 解が存在しない問題は何も入力せずに解答すれば正解となります </li>
                </ul>
            </div>

            <h3> 操作方法 </h3>
            スマートフォンでも一応可能ですが，PC の方が楽です
                <ul>
                    <li> 解を追加する場合 </li> 
                    <ul>
                        <li> 【Add】を押下 (PC の場合は Enter でも可) </li> 
                    </ul>
                    <li> 解答する場合 </li> 
                    <ul>
                        <li> 【Answer】を押下 (PC の場合は Shift + Enter でも可) </li> 
                    </ul>
                </ul>

            <h3> 改善要望 </h3>
            改善要望があれば @smmm4423 に投げるとそのうち改善されるかもしれません
            もしくは PR か Issue たててくれれば対応されるかもしれません

            <h3> 動作確認 </h3>
            だいたい最近の Chrome (on Mac) と Android
        </Grid>
    </Grid>
    </>
    )
}

export default Top
