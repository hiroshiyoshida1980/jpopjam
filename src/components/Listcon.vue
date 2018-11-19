<template>
<div class="listcon">


<h6 class="is-size-7"><B>＜エントリー表＞</B></h6> 
   <li class="is-size-7" v-for = "item in entrylist"　style="list-style: none; background-color:#FFFFFF; text-align:left; padding:10px; border-radius: 3px;">
 
 
  <a class="item-image"><img :src= item.image width="30" height="30"></a> <B>{{item.playtimes}}回Play</B> {{item.entrynumber}}{{item.entune}} {{item.parts}}.{{item.name}} {{item.stage}} {{item.player1}} {{item.player2}} {{item.player3}} {{item.player4}} {{item.player5}} {{item.player6}} {{item.player7}} {{item.player8}} {{item.player9}}:確定順番{{item.sessionOrder}}
  </a></li>
<h6 class="is-size-7"><B>セッションを選択</B></h6> 
<div style="height:10px;"></div>


<multiselect v-model="selectedplSession" deselect-label="セッションを選んでください。" track-by="entrynumber" label="meta"
 placeholder="セッションを選ぶ。" :options="forSelectlist" :searchable="true"  :show-labels="false">
</multiselect>

 <div id="example-1"> <p>今{{ toOrder }}番目まで確定していて,{{ plyor}}番目まで演奏が終わっています。</p></div> 
<a　class="button is-info" style="text-align: left;"  @click="setplaylist">セッション順番を確定</a>  
      <a　class="button is-danger" style="text-align: left;"  @click="sessionfinish">セッションを進める！！</a>  
           
<div style="height:10px;"></div>
<multiselect v-model="selectedplSession3" deselect-label="セッションを選んでください。" track-by="entrynumber" label="meta"
 placeholder="セッションを選ぶ。" :options="entrylist" :searchable="true"  :show-labels="false">
</multiselect>
<a　class="button is-info" style="text-align: left;"  @click="deletePlaylist">セッションを削除</a>  

<a　class="button is-info" style="text-align: left;"  @click="changeStage">ステージを変更</a>  



<multiselect v-model="selectedplSession2" deselect-label="セッションを選んでください。" track-by="entrynumber" label="meta"
 placeholder="順番を入れ替える先のセッションを選ぶ。" :options="entrylist" :searchable="true"  :show-labels="false">
</multiselect>
<a　class="button is-info" style="text-align: left;"  @click="changePlaylist">セッション順を入れ替える</a>  












<div style="height:10px;"></div>
<h6 class="is-size-5">代理コーナー</h6> 
<div style="background-color: lightgray;">

                    <multiselect v-model="selected" deselect-label="一人を選んでください。" track-by="uid" label="name"
                      placeholder="誰の代理？" :options="loginUserList" :searchable="true" :allow-empty="false" :show-labels="false">
                    </multiselect>

<div style="height:20px;"></div> 
<h6 class="is-size-5">代理NEW ENTRY</h6> 
<div style="height:10px;"></div>   


                    <multiselect v-model="selectedStage" deselect-label="ステージを選んでください。" 
                        placeholder="ステージを選ぶ。" :options="stage" :searchable="true" :allow-empty="false" :show-labels="false">
                    </multiselect>
<div style="height:10px;"></div> 
                    <multiselect v-model="selectedParts" deselect-label="パートを選んでください。" 
                        placeholder="パートを選ぶ。" :options="parts" :searchable="true" :allow-empty="false" :show-labels="false">
                    </multiselect>
<div style="height:10px;"></div> 
                    <multiselect v-model="selectedTunes" deselect-label="曲を選んでください。" 
                        placeholder="曲を選ぶ。" :options="tunes" :searchable="true" :allow-empty="false" :show-labels="false">
                    </multiselect>
<div style="height:10px;"></div> 
                    <multiselect v-model="selectedKeys" deselect-label="キーを選んでください" 
                        placeholder="キーを選ぶ。" :options="keys" :searchable="true" :allow-empty="false" :show-labels="false">
                    </multiselect>

<div style="height:20px;"></div>

            <div>
            <a class="button is-danger" @click="newEntry" >代理NEW ENTRY</a>
            </div>



<div style="height:30px;"></div>

<h6 class="is-size-5">代理JOIN </h6> 
<div style="height:10px;"></div>   

<multiselect v-model="selectedSession" deselect-label="セッションを選んでください。" track-by="meta" label="meta"
 placeholder="セッションを選ぶ。" :options="entrylist" :searchable="true"  :show-labels="false">
                    </multiselect>
<div style="height:10px;"></div>
                    <multiselect v-model="selectedParts" deselect-label="パートを選んでください。" 
                        placeholder="パートを選ぶ。" :options="parts" :searchable="true" :show-labels="false">
                    </multiselect>

<div style="height:20px;"></div>

            <div>
            <a class="button is-danger" @click="sendJoin" >Join！</a>
            </div>


<div style="height:20px;"></div>

<div style="height:10px;"></div>
   <li class="is-size-7" v-for = "item in entrylist"　style="list-style: none; background-color:#FFFFFF; text-align:left; padding:10px; border-radius: 3px;">
  <a class="item-image"><img :src= item.image width="20" height="20"></a> <B>No.{{item.sessionOrder}}：</B> {{item.entune}} {{item.parts}}.{{item.name}} {{item.stage}} {{item.player1}} {{item.player2}} {{item.player3}} {{item.player4}} {{item.player5}} {{item.player6}} {{item.player7}} {{item.player8}} {{item.player9}}
  </a></li>

<div style="height:50px;"></div>
</div>

<input class="input" v-model="videoId" type="text" placeholder="videoId">
    <div>
            <a class="button is-danger" @click="sendvideoId" >sendvideoId</a>
            </div>
 
 <a　class="button is-light" style="text-align: left;"  @click="sendReset">全ポイントリセット</a>  

  </div>

</div>
 

</template>


<script>
import firebase from "firebase";
import Multiselect from "vue-multiselect";

export default {
  name: "Listcon",
  components: { Multiselect },

  data() {
    return {
      list: [],
      mslist: "",
      eboard: "",
      entrylist: [],
      videoId: "XOzGU9hQptU",
      finlist: [],
      finnumber: 0,
      selectedSession: [],
      selectedplSession: [],
      selectedplSession2: [],
      selectedplSession3: [],
      selectedPersonpr: [],
      selectedParts: null,
      entune: "",
      plyor: [],
      selectedsess: "",
      selectedPerson: [],
      loginUserList: [],
      en1: "",
      artistname: "",
      notbr: "",
      isButtonDisabled: false,
      show: true,
      toOrder: [],
      finname: "",
      image: "",
      sortedbanndlist: [],
      sortedacolist: [],
      toplist: [],
      point: "",
      iine: "",
      playt: "",
      clist: [],
      flist: [],
      nlist: [],
      forSelectlist: [],
      slist: [],
      parts: ["Vo", "Gt", "Ba", "Dr", "Kb", "Per", "cho", "Ins"],
      list: [], // 最新状態はここにコピーされる
      name: "", // 名前
      board: "",
      selected: null,
      selectedStage: null,
      selectedParts: null,
      selectedTunes: null,
      selectedKeys: null,
      stageselecter: "Band",
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
        "LOVEマシーン/モーニング娘。",
        "R.Y.U.S.E.I /三代目J Soul Brothers",
        "STAY TUNE/Suchmos",
        "STORY/AI",
        "SWEET MEMORIES/松田聖子",
        "ultra soul/B'z",
        "WINDING ROAD/絢香×コブクロ",
        "YAH YAH YAH/CHAGE and ASKA",
        "愛をこめて花束を/SuperFly",
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
        "接吻/ORIGINAL LOVE",
        "そばかす/JUDY AND MARY",
        "小さな恋のうた/モンゴル800",
        "つつみ込むように.../MISIA ",
        "天体観測/BUMP OF CHICKEN",
        "何度でも/DREAMS COME TRUE",
        "ハナミズキ/一青窈",
        "ハピネス/AI",
        "ひまわりの約束/秦基博",
        "丸の内サディステック/椎名林檎",
        "三日月/絢香",
        "夜空ノムコウ/SMAP",
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
      entrystatus: []
    };
  },

  created() {
    // 認証チェック

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (
          firebase.auth().currentUser.uid !== "Ml4EpV5ElZh7sks4I57pSpk9ott1"
        ) {
          this.$router.push("/");
        }

        console.log("ログイン状態.");
        this.listen();
      } else {
        console.log("ログインしていない状態");
      }
    });
  },

  methods: {
    // データベースの変更を購読、最新状態をlistにコピーする

    listen() {
      // ログインユーザーのリスト

      firebase
        .database()
        .ref("loginuser/")
        .on("value", snapshot => {
          if (snapshot) {
            const rootList = snapshot.val();
            let list = [];

            Object.keys(rootList).forEach((val, key) => {
              list.push(rootList[val]);
            });

            var nlist = list.filter(function(element) {
              return element.status !== "";
            });

            this.loginUserList = nlist;
          }
        });

      // いいネストポイント獲得ランク

      firebase
        .database()
        .ref("loginuser/")
        .on("value", snapshot => {
          if (snapshot) {
            const rootList = snapshot.val();
            let list = [];

            Object.keys(rootList).forEach((val, key) => {
              list.push(rootList[val]);
            });

            var nlist = list.filter(function(element) {
              return element.status !== "";
            });

            var toplist = nlist.sort(function(a, b) {
              if (a.getapt > b.getapt) return -1;
              if (a.getapt < b.getapt) return 1;
              return 0;
            });

            this.toplist = toplist;
          }
        });

      // 順番確定後のリスト
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

            this.slist = slist;

            var nlist = slist.filter(function(elem) {
              return elem.sessionOrder > 0;
            });

            var finlist = nlist.sort(function(a, b) {
              if (a.sessionOrder > b.sessionOrder) return 1;
              if (a.sessionOrder < b.sessionOrder) return -1;
              return 0;
            });

            this.finlist = finlist;

            var clist = finlist.filter(function(element) {
              return element.sessionStatus == "coming";
            });
            this.clist = clist;

            var flist = finlist.filter(function(element) {
              return element.sessionStatus == "finished";
            });
            this.flist = flist;
            this.plyor = flist.length;
            console.log(this.plyor);
          }

          this.toOrder = this.finlist.length;
        });

      // 未確定セッション

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

            var elist = list.sort(function(a, b) {
              if (a.playtimes > b.playtimes) return 1;
              if (a.playtimes < b.playtimes) return -1;
              return 0;
            });

            var ylist = elist.filter(function(element) {
              return element.sessionStatus !== "deleted";
            });

            var glist = ylist.filter(function(element) {
              return element.sessionStatus == "coming";
            });

            this.entrylist = glist;

            var forSelectlist = glist.filter(function(element) {
              return element.sessionOrder <= 0;
            });

            this.forSelectlist = forSelectlist;
          }
        });
    },

    sendvideoId() {
      var videoId = this.videoId;
      var result = videoId.replace( 'https://youtu.be/', '' );
      firebase
        .database()
        .ref("videoId/")
        .set({
          ID: result
        });
    },

    setplaylist() {
      var Order = this.toOrder;
      var entrysesskey = this.selectedplSession["entrynumber"];
      var entrysessmeta = this.selectedplSession["meta"];
      var np = 0;

      firebase
        .database()
        .ref("entryBoard/" + entrysesskey)
        .update({
          sessionOrder: Order + 1
        });

      firebase
        .database()
        .ref("myBoard/")
        .push({
          image:
            "https://firebasestorage.googleapis.com/v0/b/jpopjam0813.appspot.com/o/thumb%2Flogo_jpopjam_square_coler.png?alt=media&token=5595b0f7-7ed7-42cf-901f-85894121573d",
          messege: entrysessmeta + "が" + (Order + 1) + "番に決定しました！"
        });

      this.selectedplSession = null;
    },

    deletePlaylist() {
      if (confirm("本当に削除しますか？")) {
        var entrysesskey = this.selectedplSession3["entrynumber"];
        var entrysessmeta = this.selectedplSession3["meta"];
        var np = 0;

        firebase
          .database()
          .ref("entryBoard/" + entrysesskey)
          .update({
            sessionOrder: 0,
            sessionStatus: "deleted"
          });

        firebase
          .database()
          .ref("myBoard/")
          .push({
            image:
              "https://firebasestorage.googleapis.com/v0/b/jpopjam0813.appspot.com/o/thumb%2Flogo_jpopjam_square_coler.png?alt=media&token=5595b0f7-7ed7-42cf-901f-85894121573d",
            messege: entrysessmeta + "がエントリーを取り消しました"
          });

        this.selectedplSession = null;
      }
    },

    changeStage() {
      if (confirm("本当にステージを変更しますか？")) {
        var entrysesskey = this.selectedplSession3["entrynumber"];
        var entrysessstage = this.selectedplSession3["stage"];
        var entrysessmeta = this.selectedplSession3["meta"];

        if (entrysessstage == "Band") {
          firebase
            .database()
            .ref("entryBoard/" + entrysesskey)
            .update({
              stage: "Aco"
            });

          firebase
            .database()
            .ref("myBoard/")
            .push({
              image:
                "https://firebasestorage.googleapis.com/v0/b/jpopjam0813.appspot.com/o/thumb%2Flogo_jpopjam_square_coler.png?alt=media&token=5595b0f7-7ed7-42cf-901f-85894121573d",
              messege: entrysessmeta + "がAcoステージへ変更になりました。"
            });
        } else {
          firebase
            .database()
            .ref("entryBoard/" + entrysesskey)
            .update({
              stage: "Band"
            });

          firebase
            .database()
            .ref("myBoard/")
            .push({
              image:
                "https://firebasestorage.googleapis.com/v0/b/jpopjam0813.appspot.com/o/thumb%2Flogo_jpopjam_square_coler.png?alt=media&token=5595b0f7-7ed7-42cf-901f-85894121573d",
              messege: entrysessmeta + "がBandステージへ変更になりました。"
            });
        }

        this.selectedplSession = null;
      }
    },

    changePlaylist() {
      if (confirm("本当に入れ替えしますか？")) {
        var entrysesskey = this.selectedplSession3["entrynumber"];
        var entrysessOrder = this.selectedplSession3["sessionOrder"];
        var entrysessmeta = this.selectedplSession3["meta"];
        var toentrysesskey = this.selectedplSession2["entrynumber"];
        var toentrysessOrder = this.selectedplSession2["sessionOrder"];
        var toentrysessmeta = this.selectedplSession2["meta"];

        firebase
          .database()
          .ref("entryBoard/" + entrysesskey)
          .update({
            sessionOrder: toentrysesskey
          });

        firebase
          .database()
          .ref("entryBoard/" + toentrysesskey)
          .update({
            sessionOrder: entrysesskey
          });

        firebase
          .database()
          .ref("myBoard/")
          .push({
            image:
              "https://firebasestorage.googleapis.com/v0/b/jpopjam0813.appspot.com/o/thumb%2Flogo_jpopjam_square_coler.png?alt=media&token=5595b0f7-7ed7-42cf-901f-85894121573d",
            messege:
              entrysessmeta +
              "と" +
              toentrysessmeta +
              "の順番が入れ替わりました"
          });

        this.selectedplSession3 = null;
        this.selectedplSession2 = null;
      }
    },

    sessionfinish() {
      var po = this.plyor;
      var nowplaynumber = po + 1;
      var np = 0;

      firebase
        .database()
        .ref("entryBoard/")
        .orderByChild("sessionOrder")
        .startAt(nowplaynumber)
        .endAt(nowplaynumber)
        .once("value", function(snapshot) {
          const rootList = snapshot.val();
          let list = [];

          Object.keys(rootList).forEach((val, key) => {
            firebase
              .database()
              .ref("loginuser/" + rootList[val].artistuid + "/played")
              .once("value", snapshot => {
                const nowplayedtimes = snapshot.val();
                np = nowplayedtimes + 1;
              });

            firebase
              .database()
              .ref("loginuser/" + rootList[val].artistuid)
              .update({
                status: "not_entry",
                played: np
              });

            firebase
              .database()
              .ref("entryBoard/" + rootList[val].entrynumber)
              .update({
                sessionStatus: "finished"
              });
          });
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

      var useruid = this.selected["uid"];
      var artistname = this.selected["name"];
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
              artistname +
              "\n" +
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
      var useruid = this.selected["uid"];
      var selectedsession = this.selectedSession["meta"];
      var artistname = this.selected["name"];
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
              artistname +
              "\n" +
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
    },

    sendReset() {
      if (confirm("本当にポイント、プレイ回数をリセットしますか？")) {
        firebase
          .database()
          .ref("loginuser/")
          .on("value", snapshot => {
            if (snapshot) {
              const rootList = snapshot.val();
              let list = [];

              Object.keys(rootList).forEach((val, key) => {
                firebase
                  .database()
                  .ref("loginuser/" + val)
                  .update({
                    getapt: 0,
                    apt: 0,
                    played: 0,
                    status: ""
                  });
              });
            }
          });
      }
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
.item-image img {
  border-radius: 50%;
  vertical-align: top;
}
</style>