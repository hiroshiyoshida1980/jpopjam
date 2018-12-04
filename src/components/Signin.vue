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
    <div v-if="isLoading">
      <a class="button is-danger" @click="signIn" v-bind:disabled="isButtonDisabled1">
        <i class="fas fa-lock"></i> ログイン
        <a v-show="isButtonDisabled1">中:しばらくお待ちください・・</a>
      </a>
    </div>
    <div v-else>
      <a class="button is-danger is-loading">Loading</a>
    </div>

    <div style="height:20px;"></div>

    <router-link to="/signup">
      <B>はじめてですか？？</B>＞新規登録エントリーはこちら。
    </router-link>

    <div style="height:40px;"></div>
    <figure class="image is-3by2">
      <img src="../assets/40498866_2365495676810770_5434302028048236544_o.jpg">
    </figure>

    <div style="height:20px;"></div>

    <div class="card">
      <div class="card-image"></div>
      <div class="card-content">
        <div class="media">
          <div class="media-content"></div>
        </div>

        <div class="content">
          <p class="title is-5">東京で一番POPな
            <br>ジャムセッション。
          </p>

          <h6>
            2018/12/6 (木)
            オープン18:00 スタート18:30
            <br>
            <br>《プレイヤー価格》
            <br>
            <br>前売 / 2400円 ＋1drink(600円)
            <br>
            <br>当日 / 2900円 ＋1drink(600円)
            <br>
            <br>《リスナー価格》
            <br>
            <br>1500円+2ticket(1200円) ticketはドリンクor フードが選べます。
            <br>
          </h6>【ホストバンド】
          <br>Gt&Agt. 宮本 憲 ( Hommesock,朝岡周&Jack Band etc...)
          <br>Gt&Agt. 藤田 義雄 (HANZI BAND, GUSH etc... )
          <br>Key&Vo. 田中 綾美 (Fish, Carunavacation etc...)
          <br>Ba. 原田 ソウ (Hommesock,朝岡周&Jack Band, GUSH etc...)
          <br>Ds. 大津 惇 (Hommesock, 朝岡周&Jack Band, GUSH etc...)
          <br>Per&Ds. 森 拓也
          <br>Vo&Gt. 吉田 博
          <br>Vo. Akitoshi-KamberLand (GUSH -The Groove Usher-)
          <br>
          <h6>
            <br>
            <p class="subtitle is-6">
              <a href="http://www.under-dl.jp">@渋谷アンダーディアラウンジ</a>
            </p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.5006910085476!2d139.699077351384!3d35.66467163838903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188caf55adcd53%3A0x128646a2bc544d4a!2sUNDER+DEER+LOUNGE!5e0!3m2!1sja!2sjp!4v1536632175236"
              width="100%"
              height="200"
              frameborder="0"
              style="border:0"
              allowfullscreen
            ></iframe>

            <br>
            <br>
            <a href="https://www.facebook.com/events/1847609011994076/">詳細はfacebookページでも。</a>
            <br>
            <br>
            <h3>
              <a
                class="button is-danger is-large"
                href="https://docs.google.com/forms/d/e/1FAIpQLSdIdMcyp7xij0JVh36AFmY_Jl81TuZpsXd8ZUYO0OjMgsE3UQ/viewform?usp=sf_link"
              >>予約はこちら</a>
              <br>
            </h3>
          </h6>
        </div>
      </div>
    </div>

    <div style="height:20px;"></div>

    <div class="card">
      <div class="card-image"></div>
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
          AM 11:00/HY
          <br>Automatic/宇多田ヒカル
          <br>Baby I Love You/TEE
          <br>Choo Choo TRAIN/EXILE
          <br>Dragon Night/SEKAI NO OWARI
          <br>Everything/MISIA
          <br>First Love/宇多田ヒカル
          <br>Get Wild/TM NETWORK
          <br>GLAMOROUS SKY/中嶋美嘉
          <br>HANABI/Mr.Children
          <br>I LOVE YOU/クリス・ハート
          <br>I LOVE YOU/尾崎豊
          <br>LA・LA・LA LOVE SONG/久保田利伸
          <br>LOVEマシーン/モーニング娘。
          <br>R.Y.U.S.E.I /三代目J Soul Brothers
          <br>STAY TUNE/Suchmos
          <br>STORY/AI
          <br>SWEET MEMORIES/松田聖子
          <br>ultra soul/B'z
          <br>WINDING ROAD/絢香×コブクロ
          <br>YAH YAH YAH/CHAGE and ASKA
          <br>愛をこめて花束を/SuperFly
          <br>糸/中島みゆき
          <br>打上花火/DAOKO
          <br>カブトムシ/AIKO
          <br>奏/スキマスイッチ
          <br>キセキ/Green
          <br>くちばしにチェリー/エゴラッピン
          <br>恋するフォーチュンクッキー/AKB48
          <br>恋/星野源
          <br>今夜はブギーバック/小沢健二 featuring スチャダラパー
          <br>残酷な天使のテーゼ/高橋洋子
          <br>接吻/ORIGINAL LOVE
          <br>そばかす/JUDY AND MARY
          <br>小さな恋のうた/モンゴル800
          <br>つつみ込むように.../MISIA
          <br>天体観測/BUMP OF CHICKEN
          <br>何度でも/DREAMS COME TRUE
          <br>ハナミズキ/一青窈
          <br>ハピネス/AI
          <br>ひまわりの約束/秦基博
          <br>丸の内サディステック/椎名林檎
          <br>三日月/絢香
          <br>夜空ノムコウ/SMAP
          <br>ロビンソン/スピッツ
          <br>SWEET MEMORIES / 松田聖子
          <br>接吻 / ORIGINAL LOVE
          <br>小さな恋の歌 / MONGOL800
          <br>
          <br>
          <br>本気で音楽を愛する全ての人達が、
          <br>「J-POP」を奏で、分かち合う。
          <br>オープンマイク／ジャムセッション！
          <br>
          <br>⭐︎10月のNewトピック⭐︎・JPOP JAMをよりインターナショナルへ！
          <br>→これまでの楽曲リストの曲が、英詞でも歌えるようになります！
          <br>(5曲ほど計画中です)
          <br>
          <br>・『アコースティックステージ』継続！
          <br>→素晴らしいホストメンバー(Agt & Per)が加わり
          <br>より贅沢なステージへ！^^
          <br>
          <br>・『リスナー価格』 継続！
          <br>→「単純にリスナーとして遊びに来たい」という方のために、
          <br>[1500円+2ticket]の料金設定が出来ました！
          <br>今までよりもお得に、
          <br>UDLの美味しいお酒&お食事をお楽しみ下さい^^
          <br>
          <br>・新いいねシステム改良中！
          <br>→携帯端末から素敵なプレーヤーにいいねが出来る「新システム」を継続して改良中です。
          より一層リスナー&プレーヤーのワクワクを刺激する「エンターテイメントなセッション」へ！
          <br>新曲も追加。
          「ロマンスの神様」 広瀬香美
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/AgfUewgwPOw"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          冬と言えばゲレンデ！？そんな世代のあなたに、カラオケでも絶対盛り上がるハイトーンなこの曲。音楽的には曲中で2回も転調するという、難しい曲ですが、どんなアレンジになるでしょうか！
          「白い恋人達 」桑田佳祐
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/gEX21myCfU8"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          若い世代にも人気の冬の名バラード。男子としてはこの曲を素敵に歌い上げて女の子にアピールしたい？本当にいい曲なのでJ-POPバラードの教科書としてコピーしてみるのもおすすめですよ。
          「プレイバックPart2」山口百恵
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/4Cx8gyCcA7c"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          歌謡曲が若い世代にも人気になっている昨今、アイドルの歴史の中でも伝説と言える存在、山口百恵の曲が初めて入りました！キメも多いのでまたこれ盛り上がりそうですねー！だれかバチバチに決めてかっこよく歌ってください！
          <br>
          <br>
          <br>■実は歌に自信があるのに、一人でカラオケに行くだけでいいの？
          <br>
          <br>→歌に特別な思いを持ったあなた。
          <br>
          <br>遠くからステージを見てるだけじゃなく、
          <br>せっかくなら色んな人と一緒に演奏してみませんか？
          <br>
          <br>■忘れかけた情熱を取り戻せ
          <br>
          <br>→かつては本気で音楽にのめり込んだのに、
          <br>今では仕事に追われて音楽を忘れてしまいがちなあなた。
          <br>
          <br>ココで楽器を鳴らして情熱を取り戻しませんか？
          <br>
          <br>■洋楽のセッションもいいけど
          <br>
          <br>→日本独自のカルチャーとしての
          <br>「J-POP」で「ジャムる」ことで見えて来る
          <br>東京渋谷発、世界へ向けた「新しいセッション文化」を
          <br>一緒につくりませんか？？
          <br>
          <br>-
          <br>
          <br>『J-POP JAM』とは
          <br>あなたの音楽活動がもっとひろがる場所。
          <br>
          <br>誰もが知ってるJPOPの名曲30曲から好きな曲を選んで、
          <br>その場で一緒に演奏するイベント。
          <br>
          <br>・シンガーが歌いたい曲を
          <br>ホストバンドと楽器奏者がサポートして演奏してもいいし、
          <br>
          <br>・楽器奏者がプレイしたい曲を
          <br>歌えるシンガーを募って演奏してもOK。
          <br>
          <br>→その場限りで生まれる
          <br>[出会い]と[音楽の科学反応]を
          <br>
          <br>みんなで楽しもう！
          <br>
          <br>不安があってもプロのバンドが支えます。
          <br>
          <br>今までありそうでなかった
          <br>
          <br>《JPOP限定のジャムセッション》
          <br>
          <br>[楽譜]も用意されているので、
          <br>腕に自信のあるミュージシャンは
          <br>プロ、アマ問わず大歓迎！
          <br>
          <br>
          <br>【ルール説明】
          <br>
          <br>１. スマホで楽曲エントリー
          <br>
          <br>→自分の名前、パート(Vo. Gt. など)をエントリー。
          <br>わからない、持っていなくてもスタッフがサポートします。
          <br>※観覧のみもOK
          <br>
          <br>２. ジャムタイム！
          <br>
          <br>→様々な参加者と一緒にJ-POPを歌い演奏します
          <br>
          <br>３.『いいねポイント』でコミュニケーション
          <br>
          <br>→素敵なミュージシャンに、
          <br>『いいねポイント』を送信して楽しもう！
          <br>【J-POP JAMの特長】
          <br>
          <br>■楽曲は、１曲３分
          <br>
          <br>→より多くの方と演奏して頂くために
          <br>基本の目安を『1曲 / 約3分』の長さにしています。
          <br>
          <br>
          <br>
          <br>【コンテンツ】
          <br>
          <br>
          <br>■ベスト「いいねスト」賞、表彰タイム
          <br>
          <br>→その日最も『いいね』を集めた人を表彰します。
          <br>J-POP JAMから「Sweetなプレゼント」を贈呈！
          <br>
          <br>■プチGUSHAAAN TIME
          <br>
          <br>→参加者全員で5曲選び、リレー形式で続けて演奏します。
          <br>まさに生バンドDJタイム！
          <br>
          <br>
          <br>【最後に】
          <br>
          <br>『J-POP JAM』にかける熱い想いを綴りました。
          <br>
          <a href="https://liveartist.info/forjpj/">https://liveartist.info/forjpj/</a>
          <br>
          <br>皆様と一緒にJ-POPを奏でられることを
          <br>心より楽しみにしております！
          <br>
          <br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Signin",
  data: function() {
    return {
      username: "",
      password: "",
      isButtonDisabled1: false,
      isLoading: true
    };
  },
  methods: {
    signIn: function() {
      this.isLoading = false;

      firebase
        .auth()
        .signInWithEmailAndPassword(this.username, this.password)
        .then(
          user => {
            var useruid = firebase.auth().currentUser.uid;

            firebase
              .database()
              .ref("loginuser/" + useruid + "/status")
              .once("value", snapshot => {
                if (snapshot.val() == "") {
                  firebase
                    .database()
                    .ref("loginuser/" + useruid)
                    .update({
                      apt: 100,
                      played: 0,
                      status: "not_entry"
                    })

                  this.$router.push("/person")
                } else {
                  this.$router.push("/")
                }
              })
          },
          err => {
            alert("ログインに失敗しました")
            this.isLoading = true;
          }
        )
    }
  }
};
</script>

<style>
</style>