<template>
  <div class="list">
    <div style="height:10px;"></div>

    <h5 class="title is-6">
      <p>一人一曲希望楽曲を新規エントリー(NEW ENTRY)してプレイできます。プレイし終わったらまた次の曲をエントリーできますが、プレイ回数が少ない人が優先です。</p>
      <div style="height:10px;"></div>
      <p>新規エントリーとは別に、他の人のセッションに参加(JOIN)は自由にできますが、譲り合いの精神をもってお願いいたします。</p>
      <div style="height:10px;"></div>
      <p>演奏順が決定したら、会場モニターに表示されますので、自分の出番の1曲前にはステージ脇にて準備をお願いいたします。</p>
      <div style="height:10px;"></div>
      <p>演奏の前には指定のステージで、他のメンバーに挨拶＆打ち合わせを！！</p>
      <div style="height:10px;"></div>
      <p>みなさんが主役のイベントです。互いへのリスペクトを忘れず、マナーを守って一緒に楽しいイベントを作りましょう！</p>
      <p>その他不明点もお気軽にお問い合わせください。</p>
    </h5>

              <a class="button"><router-link to="/">
                <i class="fas fa-backward"> HOMEへ戻る</i>
              </router-link></a> 


    <div style="height:20px;"></div>
    <h4 class="is-size-5">エントリー</h4>
    <div style="height:10px;"></div>
    <multiselect
      v-model="selectedStage"
      deselect-label="ステージを選んでください。"
      placeholder="ステージを選ぶ。"
      :options="stage"
      :searchable="true"
      :allow-empty="false"
      :show-labels="false"
    ></multiselect>
    <div style="height:10px;"></div>
    <multiselect
      v-model="selectedParts"
      deselect-label="パートを選んでください。"
      placeholder="パートを選ぶ。"
      :options="parts"
      :searchable="true"
      :allow-empty="false"
      :show-labels="false"
    ></multiselect>
    <div style="height:10px;"></div>
    <multiselect
      v-model="selectedTunes"
      deselect-label="曲を選んでください。"
      placeholder="曲を選ぶ。"
      :options="tunes"
      :searchable="true"
      :allow-empty="false"
      :show-labels="false"
    ></multiselect>
    <div style="height:10px;"></div>
    <multiselect
      v-model="selectedKeys"
      deselect-label="キーを選んでください"
      placeholder="キーを選ぶ。"
      :options="keys"
      :searchable="true"
      :allow-empty="false"
      :show-labels="false"
    ></multiselect>

    <div style="height:20px;"></div>

    <div>
      <a v-if="entrystatus !== 'now_entry'" class="button is-danger" @click="newEntry">NEW ENTRY</a>
      <a v-else>ENTRY中です</a>
    </div>

    <div style="height:30px;"></div>

    <h6 class="is-size-5">ジョイン</h6>
    <div style="height:10px;"></div>

    <multiselect
      v-model="selectedSession"
      deselect-label="セッションを選んでください。"
      track-by="meta"
      label="meta"
      placeholder="セッションを選ぶ。"
      :options="forjoinlist"
      :searchable="true"
      :show-labels="false"
    ></multiselect>
    <div style="height:10px;"></div>
    <multiselect
      v-model="selectedParts"
      deselect-label="パートを選んでください。"
      placeholder="パートを選ぶ。"
      :options="parts"
      :searchable="true"
      :show-labels="false"
    ></multiselect>

    <div style="height:20px;"></div>

    <div>
      <a class="button is-danger" @click="sendJoin">Join！</a>
    </div>

    <div style="height:20px;"></div>

    <h6 class="is-size-7">
      <B>ジョイン可能なセッションはこちら。
        <br>No.0はまだ順番が確定していないセッションで
        <router-link to="/listcon">す。</router-link>
      </B>
    </h6>
    <div style="height:10px;"></div>
    <li
      class="is-size-7"
      v-for="item in forjoinlist"
      style="list-style: none; background-color:#FFFFFF; text-align:left; padding:10px; border-radius: 3px;"
    >
      <a class="item-image">
        <img :src="item.image" width="20" height="20">
      </a>
      <B>No.{{item.sessionOrder}}：</B>
      {{item.entune}} {{item.parts}}.{{item.name}} {{item.stage}} {{item.player1}} {{item.player2}} {{item.player3}} {{item.player4}} {{item.player5}} {{item.player6}} {{item.player7}} {{item.player8}} {{item.player9}}
    </li>

                  <a class="button" ><router-link to="/">
                <i class="fas fa-backward"> HOMEへ戻る</i>
              </router-link></a> 

  </div>
</template>


<script>
import firebase from "firebase";
import Multiselect from "vue-multiselect";

export default {
  name: "List",
  components: { Multiselect },

  data() {
    return {
      list: [], // 最新状態はここにコピーされる
      name: "", // 名前
      board: "",
      selectedStage: null,
      selectedParts: null,
      selectedTunes: null,
      selectedKeys: null,
      selectedSession: [],
      stageselecter: "Band",
      entrylist: [],
      stage: ["お任せ(推奨)", "Band", "Aco"],

      parts: ["Vo", "Gt", "Ba", "Dr", "Kb", "Per", "cho", "Ins"],

      tunes: [
        "AM 11:00/HY",
        "Automatic/宇多田ヒカル",
        "Baby I Love You/TEE",
        "Choo Choo TRAIN/EXILE",
        "Dragon Night/SEKAI NO OWARI",
        "Everything/MISIA",
        "First Love/宇多田ヒカル",
        "Get Wild/TM NETWORK",
        "GLAMOROUS SKY/中嶋美嘉",
        "HANABI/Mr.Children",
        "I LOVE YOU/クリス・ハート",
        "I LOVE YOU/尾崎豊",
        "LA・LA・LA LOVE SONG/久保田利伸",
        "Lemon/米津玄師",
        "LOVEマシーン/モーニング娘。",
        "R.Y.U.S.E.I /三代目J Soul Brothers",
        "STAY TUNE/Suchmos",
        "STORY/AI",
        "SWEET MEMORIES/松田聖子",
        "ultra soul/B'z",
        "WINDING ROAD/絢香×コブクロ",
        "YAH YAH YAH/CHAGE and ASKA",
        "愛をこめて花束を/SuperFly",
        "愛を伝えたいだとか/あいみょん",
        "糸/中島みゆき",
        "打上花火/DAOKO",
        "カブトムシ/AIKO",
        "奏/スキマスイッチ",
        "キセキ/Green",
        "くちばしにチェリー/エゴラッピン",
        "恋するフォーチュンクッキー/AKB48",
        "恋/星野源",
        "今夜はブギーバック/小沢健二 featuring スチャダラパー",
        "残酷な天使のテーゼ/高橋洋子",
        "白い恋人達/桑田佳祐",
        "接吻/ORIGINAL LOVE",
        "そばかす/JUDY AND MARY",
        "小さな恋のうた/モンゴル800",
        "つつみ込むように.../MISIA ",
        "天体観測/BUMP OF CHICKEN",
        "何度でも/DREAMS COME TRUE",
        "ハナミズキ/一青窈",
        "ハピネス/AI",
        "ひまわりの約束/秦基博",
        "プレイバックPart2/山口百恵",
        "丸の内サディステック/椎名林檎",
        "三日月/絢香",
        "夜空ノムコウ/SMAP",
        "ロマンスの神様/広瀬香美",
        "ロビンソン/スピッツ"
      ], //  tunes: ["CHALA HEAD CHALA/影山ヒロノブ","ペガサス幻想/MAKE UP","微笑みの爆弾/馬渡松子","残酷な天使のテーゼ/高橋祥子","Can Do/グランロデオ","イマジネーション/スパイエアー","EGNITE/藍井エイル","Catch the Moment/LiSA","Brave Shine/Aimer","世界が終わるまでは/WANDS","ようこそジャパリパークへ/けものフレンズ","Butter-fly/和田光司","アンバランスなKISSをして/高橋ひろ","ライオン/シェリル＆ランカ","打ち上げ花火/DAOKO 米津玄師","炎のキン肉マン/串田アキラ","君の知らない物語/supercell","君が好きだと叫びたい/BAAD","ゆずれない願い/田村直美","めざせポケモンマスター！/松本梨香","GETWILD/TM NETWORK"],
      keys: [
        "原キー",
        "+6",
        "+5",
        "+4",
        "+3",
        "+2",
        "+1",
        "-1",
        "-2",
        "-3",
        "-4",
        "-5",
        "-6"
      ],
      entune: "",
      Entnum: "",
      artistname: "",
      namelist: [],
      isButtonDisabled: false,
      listcon: false,
      forjoinlist: [],
      entrystatus: []
    };
  },

  created() {
    // 認証チェック

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("ログイン状態.");
        this.listen();
      } else {
        console.log("ログインしていない状態");
      }
    });
  },

  methods: {
    listen() {
      var useruid = firebase.auth().currentUser.uid;

      firebase
        .database()
        .ref("loginuser/" + useruid + "/status")
        .on("value", snapshot => {
          this.entrystatus = snapshot.val();
        });

      firebase
        .database()
        .ref("loginuser/" + useruid + "/name")
        .on("value", snapshot => {
          this.name = snapshot.val();
        });

      firebase
        .database()
        .ref("loginuser/" + useruid + "/image")
        .on("value", snapshot => {
          this.image = snapshot.val();
        });

      firebase
        .database()
        .ref("entryBoard/")
        .on("value", snapshot => {
          if (snapshot) {
            const srootList = snapshot.val();
            let slist = [];

            Object.keys(srootList).forEach((val, key) => {
              slist.push(srootList[val]);
            });

            var flist = slist.sort(function(a, b) {
              if (a.sessionOrder > b.sessionOrder) return 1;
              if (a.sessionOrder < b.sessionOrder) return -1;
              return 0;
            });

            var glist = flist.filter(function(element) {
              return element.sessionStatus == "coming";
            });

            this.forjoinlist = glist;
            var bandlist = [];
            var acolist = [];

            bandlist = glist.filter(function(element1) {
              return element1.stage === "Band";
            });

            acolist = glist.filter(function(element2) {
              return element2.stage === "Aco";
            });

            if (bandlist.length > acolist.length) {
              this.stageselecter = "Aco";
            } else {
              this.stageselecter = "Band";
            }
          }
        });
    },

    newEntry() {
      firebase
        .database()
        .ref("entryBoard/")
        .on("value", snapshot => {
          if (snapshot) {
            const rootList = snapshot.val();
            let list = [];
            Object.keys(rootList).forEach((val, key) => {
              list.push(rootList[val]);
            });

            this.Entnum = list.length;
          }
        });

      var useruid = firebase.auth().currentUser.uid;
      var artistname = this.name;
      var played = 0;
      var playtimes = played;
      var image = "";
      var pr = "";

      firebase
        .database()
        .ref("loginuser/" + useruid + "/played")
        .once("value", snapshot => {
          played = snapshot.val();
        });

      firebase
        .database()
        .ref("loginuser/" + useruid + "/image")
        .once("value", snapshot => {
          image = snapshot.val();
        });

      firebase
        .database()
        .ref("loginuser/" + useruid + "/name")
        .on("value", snapshot => {
          artistname = snapshot.val();
        });

      firebase
        .database()
        .ref("loginuser/" + useruid + "/pr")
        .on("value", snapshot => {
          pr = snapshot.val();
        });

      var En = this.Entnum;
      var entryNumber = En + 1;

      if (this.selectedStage == "お任せ(推奨)") {
        var selectedStage = this.stageselecter;
      } else {
        var selectedStage = this.selectedStage;
      }

      var selectedKeys = this.selectedKeys;
      var selectedTunes = this.selectedTunes;
      var selectedParts = this.selectedParts;

      if (
        selectedStage == null ||
        selectedTunes == null ||
        selectedParts == null ||
        selectedKeys == null
      ) {
        this.isButtonDisabled = false;

        alert("全てを選択してください");
      } else {
        if (
          confirm(
            "この内容でエントリーしますか？\n\n" +
              selectedStage +
              "ステージ\n" +
              selectedTunes +
              " key" +
              selectedKeys +
              "\nパート " +
              selectedParts +
              "\n ※ 一度エントリーすると基本変更はできません！\nどうしても変更の場合はスタッフまで。"
          )
        ) {
          firebase
            .database()
            .ref("entryBoard/" + entryNumber)
            .set({
              playtimes: played,
              meta:
                selectedTunes +
                "." +
                selectedKeys +
                "." +
                selectedParts +
                "." +
                artistname,
              entrynumber: entryNumber,
              stage: selectedStage,
              entune: selectedTunes + "." + selectedKeys,
              image: image,
              parts: selectedParts,
              artistuid: useruid,
              name: artistname,
              sessionOrder: 0,
              sessionStatus: "coming",
              pr: pr
            });

          firebase
            .database()
            .ref("myBoard/")
            .push({
              image: image,
              name: artistname,
              messege: selectedParts + ">" + selectedTunes + "をエントリー！"
            });

          firebase
            .database()
            .ref("loginuser/" + useruid)
            .update({
              status: "now_entry"
            });

          alert("順番が確定するまでお待ちください！楽しんで！");
          this.selectedTunes = null;
          this.selectedParts = null;
        }
      }
    },

    sendJoin() {
      var useruid = firebase.auth().currentUser.uid;
      var selectedsession = this.selectedSession["meta"];
      var artistname = this.name;
      var selectedsessionId = this.selectedSession["entrynumber"];
      var selectedParts = this.selectedParts;
      var image = "";

      firebase
        .database()
        .ref("loginuser/" + useruid + "/image")
        .once("value", snapshot => {
          image = snapshot.val();
        });

      var selper = 0;

      firebase
        .database()
        .ref("entryBoard/" + selectedsessionId)
        .on("value", snapshot => {
          if (snapshot) {
            const rootList = snapshot.val();
            let list = [];

            Object.keys(rootList).forEach((val, key) => {
              var result = val.match(/player./);

              if (result != null) {
                list.push(rootList[val]);
              }
            });

            selper = list.length;
          }
        });
      var selp = selper + 1;
      var selplayernumbername = "player" + selp;
      var selplayernumberuid = "p_uid" + selp;
      if (selectedsession == null || selectedParts == null) {
        this.isButtonDisabled = false;

        alert("すべてを選択してください");
      } else {
        if (
          confirm(
            "この内容でエントリーしますか？\n" +
              selectedsession +
              "\n" +
              selectedParts
          )
        ) {
          firebase
            .database()
            .ref("entryBoard/" + selectedsessionId)
            .update({
              [selplayernumbername]: selectedParts + "." + artistname,
              [selplayernumberuid]: useruid
            });

          firebase
            .database()
            .ref("myBoard/")
            .push({
              image: image,
              name: artistname,
              messege:
                selectedsession + "に" + selectedParts + "でJOINしました！"
            });

          alert("順番が確定するまでお待ちください！楽しんで！");
          this.selectedSession = null;
          this.selectedParts = null;
        }
      }
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
@import "./node_modules/bulma/bulma.sass";
#list {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #020202;
}

li {
  margin-bottom: 5px;
}
</style>