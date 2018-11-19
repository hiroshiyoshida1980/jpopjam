<template>
<div class="Tunes">

  <div style="height:500px; width:100%; overflow-y:auto; padding:10px; border-radius: 3px;">
  <li class="is-size-6" v-for = "item in flist"　style="list-style: none; background-color:#FFFFFF	; text-align:left; padding:10px; margin:1px; border-radius: 3px;">
 
  <a class="item-image"><img :src= item.image width="30" height="30"></a><B> No.{{item.sessionOrder}}：</B> {{item.entune}} {{item.parts}}.{{item.name}} <br>{{item.stage}}{{item.player1}} {{item.player2}} {{item.player3}} {{item.player4}} {{item.player5}} {{item.player6}} {{item.player7}} {{item.player8}} {{item.player9}}
  </a></li>

<h6 class="is-size-6"><B>NOW</B></h6> 
<ul>
<li class="is-size-5" v-for = "item in clist"　style="list-style: none; background-color:#FFFFFF; text-align:left; padding:10px; border-radius: 3px;">
 
<div class="item-image" style="float: left; pading:5px; height:50px; width:50px;" ><img :src= item.image width="40" height="40"></div><h6 class="is-size-5" style="padding:1px;"><B> No.{{item.sessionOrder}}： {{item.entune}}</B>
<B>     {{item.parts}}.{{item.name}}</B></h6> <br> {{item.pr}}
<br> <B>{{item.stage}} {{item.player1}} {{item.player2}} {{item.player3}} {{item.player4}} {{item.player5}} {{item.player6}} {{item.player7}} {{item.player8}} {{item.player9}}</B>
</a></li>
</ul> 

  </div>

<div style="height:100px;"></div>
<h6 class="is-size-6"><B>いろいろつぶやいてね。</B></h6> 
  <div style="height:300px; width:100%; overflow-y:auto; background-color:#FFFFFF; text-align:left; padding:10px; border-radius: 3px;">
   <li class="is-size-6" v-for = 'item in board' style="list-style: none;">
  <a class="item-image"><img :src= item.image width="30" height="30"></a><B>  {{item.name}} : </B><a v-html="item.messege">{{item.messege}}</a>
  </li>
  </div>



<div style="height:400px;"></div>

<h6 class="is-size-4"><B>＜いいネスト＞</B></h6> 
<div style="height:450px;  overflow-y:auto;" >
<ul>
<li v-for = "(item, index) in toplist" style="list-style: none; background-color:#FFFFFF; padding:10px; border-radius: 3px;">

<a class="item-image" ><img :src= item.image width="50" height="50"></a> <h6 class="is-size-4">{{item.name}} :{{item.getapt}}いいね！</h6> 
</li>
</ul> 
</div>



</div>
 

</template>


<script>
import firebase from "firebase";
import Multiselect from "vue-multiselect";

export default {
  name: "Tunes",
  components: { Multiselect },

  data() {
    return {
      list: [],
      mslist: "",
      eboard: "",
      entrylist: [],
      finlist: [],
      finnumber: 0,
      selectedSession: [],
      selectedplSession: [],
      selectedPersonpr: [],
      selectedParts: null,
      entune: "",
      plyor: 0,
      selectedsess: "",
      selectedPerson: [],
      options: [],
      en1: "",
      artistname: "",
      notbr: "",
      isButtonDisabled: false,
      show: true,
      toOrder: [],
      finname: "",
      image: "",
      allentrylist: [],
      sortedbanndlist: [],
      sortedacolist: [],
      toplist: [],
      point: "",
      iine: "",
      playt: "",
      clist: [],
      flist: [],
      nlist: [],
      slist: [],
      parts: ["Vo", "Gt", "Ba", "Dr", "Kb", "Per", "cho", "Ins"]
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
      firebase
        .database()
        .ref("myBoard/")
        .on("value", snapshot => {
          if (snapshot) {
            const rootList = snapshot.val();
            let list = [];

            Object.keys(rootList).forEach((val, key) => {
              list.push(rootList[val]);
            });
            this.board = list.reverse();
          }
        });

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

            this.options = nlist;
          }
        });

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
          }

          this.toOrder = this.finlist.length;
        });

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

            var glist = elist.filter(function(element) {
              return element.sessionOrder == 0;
            });

            this.entrylist = glist;
          }
        });
    },

    sendJoin() {
      var selectedsession = this.selectedSession["meta"];
      var selectedsessionId = this.selectedSession["entrynumber"];
      var selectedParts = this.selectedParts;
      var artistname = this.selectedPerson["name"];
      var useruid = this.selectedPerson["uid"];
      var image = this.selectedPerson["image"];
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

      if (
        selectedsession == null ||
        selectedParts == null ||
        artistname == null
      ) {
        this.isButtonDisabled = false;

        alert("すべてを選択してください");
      } else {
        if (
          confirm(
            "この内容でジョイン？\n" +
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

          this.selectedSession = null;
          this.selectedParts = null;
          this.selectedPerson = null;
        }
      }
    },

    seloneperson() {
      var selperson = this.selectedPerson;
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

    sessionfinish() {
      var playdname = "";
      var Order = this.toOrder;
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