<template>
  <div class="signin">
<div style="height:10px;"></div>
     <div class="field">
        <div class="control has-icons-left has-icons-right">
          <input v-model="username" class="input" type="email" placeholder="Email input">
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="password" placeholder="Password" v-model="password">
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>

    <a class="button is-danger" @click="signIn" v-bind:disabled="isButtonDisabled1"><i class="fas fa-lock"></i> ログイン<a v-show = "isButtonDisabled1">中:しばらくお待ちください・・ </a></a>

<div style="height:20px;"></div>

      <router-link to="/signup"><B>はじめてですか？？</B>＞新規登録はこちら。</router-link>

<div style="height:40px;"></div> 
<figure class="image is-3by2">
  <img src="../assets/40498866_2365495676810770_5434302028048236544_o.jpg">
</figure>


          <div style="height:20px;"></div>

          <div class="card">
            <div class="card-image">
            </div>
            <div class="card-content">
              <div class="media">

                <div class="media-content">
                  
               </div>
              </div>

    <div class="content">
<p class="title is-5">東京で一番POPな</BR>ジャムセッション。</p>

                <h6>
                2018/10/2
                オープン18:00  スタート18:30</BR></BR>
                《プレイヤー価格》</BR></BR>
                前売 / 2400円 ＋1drink(600円) </BR></BR>
                当日 / 2900円 ＋1drink(600円)</BR></BR>
                《リスナー価格》</BR></BR>
                1500円+2ticket(1200円) ticketはドリンクor フードが選べます。</BR>

                </h6>
                【ホストバンド】
<br>
Gt&Agt. 宮本 憲 ( Hommesock,朝岡周&Jack Band etc...)<br>
Gt&Agt. 藤田 義雄 (HANZI BAND, GUSH etc... )<br>
Key&Vo. 田中 綾美 (Fish, Carunavacation etc...)<br>
Ba. 原田 ソウ (Hommesock,朝岡周&Jack Band, GUSH etc...)<br>
Ds. 大津 惇 (Hommesock, 朝岡周&Jack Band, GUSH etc...)<br>
Per&Ds. 森 拓也<br>
Vo&Gt. 吉田 博<br>
Vo. Akitoshi-KamberLand (GUSH -The Groove Usher-)<br>
                <h6>
<br>
                     <p class="subtitle is-6"><a href="http://www.under-dl.jp">@渋谷アンダーディアラウンジ</a></p>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.5006910085476!2d139.699077351384!3d35.66467163838903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188caf55adcd53%3A0x128646a2bc544d4a!2sUNDER+DEER+LOUNGE!5e0!3m2!1sja!2sjp!4v1536632175236" width="100%" height="200" frameborder="0" style="border:0" allowfullscreen></iframe>
                
                <br>  <br>
                      <a href="https://www.facebook.com/events/1847609011994076/">詳細はfacebookページでも。</a>  <br> <br><h3>
                      <a href="https://docs.google.com/forms/d/e/1FAIpQLSdIdMcyp7xij0JVh36AFmY_Jl81TuZpsXd8ZUYO0OjMgsE3UQ/viewform?usp=sf_link">>予約はこちら</a>
                      <br> </h3>
                </h6>
    </div>
  </div>
</div>

          <div style="height:20px;"></div>

          <div class="card">
            <div class="card-image">
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img src="../assets/mic.svg" alt="Placeholder image">
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-5">楽曲リスト</p>
                   <p class="title is-7">(キー、構成などは変わる可能性があります)</p>
                </div>
              </div>

    <div class="content">

AM 11:00/HY</BR>Automatic/宇多田ヒカル</BR>Baby I Love You/TEE</BR>Choo Choo TRAIN/EXILE</BR>Dragon Night/SEKAI NO OWARI</BR>Everything/MISIA</BR>First Love/宇多田ヒカル</BR>Get Wild/TM NETWORK</BR>GLAMOROUS SKY/中嶋美嘉</BR>HANABI/Mr.Children</BR>I LOVE YOU/クリス・ハート</BR>I LOVE YOU/尾崎豊</BR>LA・LA・LA LOVE SONG/久保田利伸</BR>LOVEマシーン/モーニング娘。</BR>R.Y.U.S.E.I /三代目J Soul Brothers</BR>STAY TUNE/Suchmos</BR>STORY/AI</BR>SWEET MEMORIES/松田聖子</BR>ultra soul/B'z</BR>WINDING ROAD/絢香×コブクロ</BR>YAH YAH YAH/CHAGE and ASKA</BR>愛をこめて花束を/SuperFly</BR>糸/中島みゆき</BR>打上花火/DAOKO</BR>カブトムシ/AIKO</BR>奏/スキマスイッチ</BR>キセキ/Green</BR>くちばしにチェリー/エゴラッピン</BR>恋するフォーチュンクッキー/AKB48</BR>恋/星野源</BR>今夜はブギーバック/小沢健二 featuring スチャダラパー</BR>残酷な天使のテーゼ/高橋洋子</BR>接吻/ORIGINAL LOVE</BR>そばかす/JUDY AND MARY</BR>小さな恋のうた/モンゴル800</BR>つつみ込むように.../MISIA </BR>天体観測/BUMP OF CHICKEN</BR>何度でも/DREAMS COME TRUE</BR>ハナミズキ/一青窈</BR>ハピネス/AI</BR>ひまわりの約束/秦基博</BR>丸の内サディステック/椎名林檎</BR>三日月/絢香</BR>夜空ノムコウ/SMAP</BR>ロビンソン/スピッツ</BR>SWEET MEMORIES / 松田聖子</BR>接吻 / ORIGINAL LOVE</BR>小さな恋の歌 / MONGOL800</BR></BR></BR>
本気で音楽を愛する全ての人達が、</BR>「J-POP」を奏で、分かち合う。</BR>オープンマイク／ジャムセッション！
</BR></BR>⭐︎10月のNewトピック⭐︎・JPOP JAMをよりインターナショナルへ！</BR>
→これまでの楽曲リストの曲が、英詞でも歌えるようになります！</BR>(5曲ほど計画中です)</BR></BR>
・『アコースティックステージ』継続！</BR>→素晴らしいホストメンバー(Agt & Per)が加わり</BR>より贅沢なステージへ！^^</BR></BR>
・『リスナー価格』 継続！</BR>→「単純にリスナーとして遊びに来たい」という方のために、</BR>
[1500円+2ticket]の料金設定が出来ました！</BR>今までよりもお得に、</BR>
UDLの美味しいお酒&お食事をお楽しみ下さい^^</BR></BR>・新いいねシステム改良中！</BR>
→携帯端末から素敵なプレーヤーにいいねが出来る「新システム」を継続して改良中です。
より一層リスナー&プレーヤーのワクワクを刺激する「エンターテイメントなセッション」へ！</BR></BR>
</BR></BR>
■実は歌に自信があるのに、一人でカラオケに行くだけでいいの？</BR></BR>→歌に特別な思いを持ったあなた。</BR></BR>遠くからステージを見てるだけじゃなく、</BR>せっかくなら色んな人と一緒に演奏してみませんか？</BR></BR>■忘れかけた情熱を取り戻せ</BR></BR>→かつては本気で音楽にのめり込んだのに、</BR>今では仕事に追われて音楽を忘れてしまいがちなあなた。</BR></BR>ココで楽器を鳴らして情熱を取り戻しませんか？</BR></BR>■洋楽のセッションもいいけど</BR></BR>→日本独自のカルチャーとしての</BR>「J-POP」で「ジャムる」ことで見えて来る </BR>東京渋谷発、世界へ向けた「新しいセッション文化」を</BR>一緒につくりませんか？？</BR></BR>-</BR></BR>『J-POP JAM』とは</BR>あなたの音楽活動がもっとひろがる場所。</BR></BR>誰もが知ってるJPOPの名曲30曲から好きな曲を選んで、</BR>その場で一緒に演奏するイベント。</BR></BR>・シンガーが歌いたい曲を</BR>ホストバンドと楽器奏者がサポートして演奏してもいいし、</BR></BR>・楽器奏者がプレイしたい曲を</BR>歌えるシンガーを募って演奏してもOK。</BR></BR>→その場限りで生まれる</BR>[出会い]と[音楽の科学反応]を</BR></BR>みんなで楽しもう！</BR></BR>不安があってもプロのバンドが支えます。</BR></BR>今までありそうでなかった</BR></BR>《JPOP限定のジャムセッション》</BR></BR>[楽譜]も用意されているので、</BR>腕に自信のあるミュージシャンは</BR>プロ、アマ問わず大歓迎！</BR></BR></BR>【ルール説明】</BR></BR>１. スマホで楽曲エントリー</BR></BR>→自分の名前、パート(Vo. Gt. など)をエントリー。</BR>わからない、持っていなくてもスタッフがサポートします。</BR>※観覧のみもOK</BR></BR>２. ジャムタイム！</BR></BR>→様々な参加者と一緒にJ-POPを歌い演奏します</BR></BR>
３.『いいねポイント』でコミュニケーション</BR></BR>→素敵なミュージシャンに、</BR>『いいねポイント』を送信して楽しもう！</BR>【J-POP JAMの特長】</BR></BR>■楽曲は、１曲３分</BR></BR>→より多くの方と演奏して頂くために</BR>基本の目安を『1曲 / 約3分』の長さにしています。</BR></BR></BR></BR>【コンテンツ】</BR></BR></BR>■ベスト「いいねスト」賞、表彰タイム</BR></BR>→その日最も『いいね』を集めた人を表彰します。</BR>J-POP JAMから「Sweetなプレゼント」を贈呈！</BR></BR>■プチGUSHAAAN TIME</BR></BR>→参加者全員で5曲選び、リレー形式で続けて演奏します。</BR>まさに生バンドDJタイム！</BR></BR></BR>【最後に】</BR></BR>『J-POP JAM』にかける熱い想いを綴りました。</BR><a href="http://liveartist.info/forjpj/">http://liveartist.info/forjpj/</a></BR></BR>皆様と一緒にJ-POPを奏でられることを</BR>心より楽しみにしております！</BR></BR>
    </div>
  </div>
</div>

</div>
</template>

<script>
import firebase from 'firebase'


export default {
  name: 'Signin',
  data: function () {
    return {
      username: '',
      password: '',
      isButtonDisabled1: false,

    }
  },
  methods: {
    



    signIn: function () {

    
 

      firebase.auth().signInWithEmailAndPassword(this.username, this.password).then(
        user => {

        var useruid = firebase.auth().currentUser.uid;

                    firebase.database()
                            .ref("loginuser/" + useruid +"/status")
                            .once("value", snapshot => {

            if(snapshot.val() == "" ){

            firebase
              .database()
              .ref("loginuser/" + useruid)
              .update({
                apt: 100,
                played: 0,
                status:"not_entry"
              });


            this.$router.push('/person') 
              }else{
            this.$router.push('/') 
              }
                            }
                            )

                },
                err => {
                
          
         alert("ログインに失敗しました");
        }
      )
    },

 

  }
}
</script>

<style>

</style>