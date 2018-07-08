<template>
 <div class="hello">



    <content class="scrollbar" >
      <li v-for = "item in board">{{item.name}}さんが{{item.to}}にいいね！しました</li>
    </content>

    <div class="layout-item">
    <h4> <router-link to="/list">リスト</router-link></h4> 
 
<div class="elevation-1" style= "margin:7px; padding:4px;">
    　  <h4>{{ name }}がもらったいいね！:{{getapt}}</h4>
    　  <h5>残りポイント:{{apt}}</h5>
</div>



              <multiselect v-model="selected" deselect-label="一人を選んでください。" track-by="name" label="name"
                placeholder="誰にいいねしますか？" :options="options" :searchable="true" :allow-empty="false" :show-labels="false">
              </multiselect>


            <div>
            <button v-bind:disabled="isButtonDisabled" class="raised accent" @click="sendMessage" >いいねを送る！</button>
            </div>




       </div>
  

</div>



  

</template>


<script>
import firebase from "firebase";
import Multiselect from "vue-multiselect";

export default {
  name: "HelloWorld",
    components: { Multiselect },

  data() {
    return {
      list: [], // 最新状態はここにコピーされる
      name: firebase.auth().currentUser.displayName, // 名前
      sendp: null, // 送信メッセージ
      mslist: "",
      board: "",
      selected: null,
      options: [],
      apt: "",
      getapt: "",
      artistname: "",
      namelist: [],
      isButtonDisabled: false,
      entrylink:"<a href=\"https://docs.google.com/forms/d/e/1FAIpQLSc0DDP77MDACU0eiDYml895-kvmfD2LipYD6RB7r8-GH9weMQ/viewform?usp=pp_url&entry.251434219=" + firebase.auth().currentUser.displayName + "\" target=\"_blank\">楽曲エントリー</a>",
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

      signOut: function () {
      firebase.auth().signOut().then(() => {
      alert("ログアウトします");
      this.$router.push('/signin')
      })
    },


    listen() {
      var useruid = firebase.auth().currentUser.uid;
      var name = firebase.auth().currentUser.displayName;
     
      firebase
        .database()
        .ref("loginuser/" + useruid + "/apt")
        .on("value", snapshot => {
          this.apt = snapshot.val();
          if (this.apt > 0) {
            this.isButtonDisabled = false;
          }
        });

      firebase
        .database()
        .ref("loginuser/" + useruid + "/getapt")
        .on("value", snapshot => {
          this.getapt = snapshot.val();
          }
        );


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

       firebase.database().ref("loginuser/").on("value", snapshot => {
          if (snapshot) {
            const rootList = snapshot.val();
            let list = [];
            let otherslist = [];
            let namelist = [];

            Object.keys(rootList).forEach((val, key) => {
              list.push(rootList[val]);
            });

            this.options = list;

            list.some(function(v, i) {
              if (v.name == name) list.splice(i, 1); 
            });

            list.filter(function(item, index) {
              namelist.push(item.name);
            });

            this.namelist = namelist;

          }
        }),

    },

    sendMessage() {
      var artistname = firebase.auth().currentUser.displayName;
      var useruid = firebase.auth().currentUser.uid;
      var toname = this.selected["name"];
      var touid = this.selected["uid"];
      var ap = 1;
      var np = 0;
      var wp = 0;
      var takeap = 0;
      var giveap = 0;

      firebase
        .database()
        .ref("loginuser/" + useruid + "/apt")
        .once("value", snapshot => {
          const nowapt = snapshot.val();
          np = nowapt - ap;

          if (np === 0) {
            alert("いいねがなくなりました！");
            this.isButtonDisabled = true;
          }
        });

      firebase
        .database()
        .ref("loginuser/" + touid + "/getapt")
        .once("value", snapshot => {
          const newapt = snapshot.val();
          wp = newapt + ap;
        });

      firebase
        .database()
        .ref("loginuser/" + useruid)
        .update({
          apt: np
        });

      firebase
        .database()
        .ref("loginuser/" + touid)
        .update({
          getapt: wp
        });

      firebase
        .database()
        .ref("myBoard/")
        .push({
          name: artistname,
          sendp: ap,
          to: toname
        });
    }
  }
};

window.addEventListener(
  "beforeunload",
  function(e) {
    e.returnValue = "閉じますか？";
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
      })
    },
  false
);

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>



</style>