<template>
  <div class="stream">
    <div class="youtube">
      <youtube :video-id="videoId" :player-vars="playerVars" ref="youtube"></youtube>
    </div>

    <div class="comment">
      <div
        style="height:150px; width:100%; overflow-y:auto; text-align:left; padding:10px; border-radius: 3px;"
      >
        <li class="is-size-6" v-for="item in board" style="list-style: none;">
          <a class="item-image" @click="isImageModalActive = true">
            <img :src="item.image" width="30" height="30">
          </a>
          <B>{{item.name}} :</B>
          <a v-html="item.messege">{{item.messege}}</a>
        </li>
      </div>
    </div>

    <div style="height:10px;"></div>

    <multiselect
      style="background-color: transparent;"
      v-model="selected"
      deselect-label="一人を選んでください。"
      track-by="uid"
      label="name"
      placeholder="誰にいいねしますか？"
      :options="options"
      :searchable="true"
      :allow-empty="false"
      :show-labels="false"
    ></multiselect>

    <div style="height:10px;"></div>

    <div class="columns is-mobile">
      <div class="column">
        <a
          class="button is-danger is-rounded is-small"
          v-bind:disabled="isButtonDisabled1"
          @click="sendMessage"
        >
          <i class="fas fa-heart">20</i>
        </a>
      </div>
      <div class="column">
        <a
          class="button is-success is-rounded is-small"
          v-bind:disabled="isButtonDisabled2"
          @click="sendMessage2"
        >
          <i class="fas fa-heart">10</i>
        </a>
      </div>

      <div class="column">
        <a
          class="button is-outlined is-rounded is-small"
          v-bind:disabled="isButtonDisabled3"
          @click="sendMessage3"
        >
          <i class="fas fa-heart">5</i>
        </a>
      </div>

      <div class="column">
        <a
          class="button is-light is-rounded is-small"
          v-bind:disabled="isButtonDisabled4"
          @click="sendMessage4"
        >
          <i class="fas fa-heart">1</i>
        </a>
      </div>
    </div>

    <input class="input" type="text" placeholder="chat-いろんなコメントください!" v-model="messege">

    <div style="height:10px;"></div>
    <a class="button is-light" style="text-align: left;" @click="sendMessage5">送信</a>
    <div style="height:30px;"></div>

    <h6 class="is-size-7">
      <B>
        今日プレイした人たちに
        <i class="fas fa-heart"></i>やメッセージを！
      </B>
    </h6>
    <div style="height:20px;"></div>

    <h6 class="is-size-7">
      <B>＜順番表＞</B>
    </h6>
    <div style="height:5px;"></div>
    <ul>
      <li
        class="is-size-7"
        v-for="item in flist"
        style="list-style: none; background-color:#FFFFFF; text-align:left; padding:10px; border-radius: 3px;"
      >
        <a class="item-image">
          <img :src="item.image" width="20" height="20">
        </a>
        <B>No.{{item.sessionOrder}}：</B>
        {{item.entune}} {{item.name}} {{item.stage}} {{item.player1}} {{item.player2}} {{item.player3}} {{item.player4}} {{item.player5}} {{item.player6}} {{item.player7}} {{item.player8}} {{item.player9}}
      </li>
    </ul>
    <h6 class="is-size-7">
      <B>Now</B>
    </h6>
    <ul>
      <li
        class="is-size-7"
        v-for="item in clist"
        style="list-style: none; background-color:#FFFFFF; text-align:left; padding:10px; border-radius: 3px;"
      >
        <a class="item-image">
          <img :src="item.image" width="20" height="20">
        </a>
        <B>No.{{item.sessionOrder}}：</B>
        {{item.entune}} {{item.name}} {{item.stage}} {{item.player1}} {{item.player2}} {{item.player3}} {{item.player4}} {{item.player5}} {{item.player6}} {{item.player7}} {{item.player8}} {{item.player9}}
      </li>
    </ul>

    <nav class="level is-mobile">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">もらったいいね！</p>
          <p class="title">{{getapt}}</p>
        </div>
      </div>

      <div class="level-item has-text-centered">
        <div>
          <p class="heading">{{ name }}</p>
          <div class="item-image">
            <img :src="image" width="35" height="35">
          </div>
        </div>
      </div>

      <div class="level-item has-text-centered">
        <div>
          <p class="heading">残りポイント</p>
          <p class="title">{{apt}}</p>
        </div>
      </div>
    </nav>
  </div>
</template>


<script>
import firebase from "firebase";
import Multiselect from "vue-multiselect";
import InfiniteLoading from "vue-infinite-loading";

export default {
  name: "stream",
  components: { Multiselect, InfiniteLoading },
  data() {
    return {
      videoId: "XOzGU9hQptU",
      playerVars: {
        autoplay: 1,
        controls: 0
      },
      list: [], // 最新状態はここにコピーされる
      name: "", // 名前
      image: "",
      sendp: null, // 送信メッセージ
      mslist: "",
      board: "",
      show: true,

      selected: null,
      options: [],
      apt: "",
      getapt: "",
      artistname: "",
      namelist: [],
      isButtonDisabled1: false,
      isButtonDisabled2: false,
      isButtonDisabled3: false,
      isButtonDisabled4: false,
      messege: "",
      finlist: [],
      clist: [],
      flist: [],
      isImageModalActive: false
    };
  },

  created() {
    // 認証チェック

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.listen()
      } else {
        console.log("ログインしていない状態")
      }
    })
  },

  computed: {
    player() {
      return this.$refs.youtube.player;
    }
  },

  methods: {
    signOut: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("ログアウトします")
          this.$router.push("/signin")
        })
    },

    listen() {
      var useruid = firebase.auth().currentUser.uid;

      firebase
        .database()
        .ref("videoId/ID")
        .on("value", snapshot => {
          this.videoId = snapshot.val()
          this.player.playVideo()
          console.log(this.videoId)
        })

      firebase
        .database()
        .ref("loginuser/" + useruid + "/name")
        .on("value", snapshot => {
          this.name = snapshot.val()
        })

      firebase
        .database()
        .ref("loginuser/" + useruid + "/image")
        .on("value", snapshot => {
          this.image = snapshot.val()
        })

      firebase
        .database()
        .ref("loginuser/" + useruid + "/apt")
        .on("value", snapshot => {
          this.apt = snapshot.val()
          if (this.apt > 0) {
            this.isButtonDisabled4 = false;
          }
        })

      firebase
        .database()
        .ref("loginuser/" + useruid + "/getapt")
        .on("value", snapshot => {
          this.getapt = snapshot.val()
        })

      firebase
        .database()
        .ref("myBoard/")
        .on("value", snapshot => {
          if (snapshot) {
            const rootList = snapshot.val()
            let list = [];

            Object.keys(rootList).forEach((val, key) => {
              list.push(rootList[val])
            })
            this.board = list.reverse()
          }
        })

      firebase
        .database()
        .ref("loginuser/")
        .on("value", snapshot => {
          if (snapshot) {
            const rootList = snapshot.val()
            let list = [];
            let otherslist = [];
            let namelist = [];
            var artistname = this.name;

            Object.keys(rootList).forEach((val, key) => {
              list.push(rootList[val])
            })

            list.some(function(v, i) {
              if (v.name == artistname) list.splice(i, 1)
            })

            var nlist = list.filter(function(element) {
              return element.status !== "";
            })

            this.options = nlist;

            list.filter(function(item, index) {
              namelist.push(item.name)
            })

            this.namelist = namelist;
          }
        })

      firebase
        .database()
        .ref("entryBoard/")
        .on("value", snapshot => {
          if (snapshot) {
            const srootList = snapshot.val()
            let slist = [];

            Object.keys(srootList).forEach((val, key) => {
              slist.push(srootList[val])
            })

            var nlist = slist.filter(function(elem) {
              return elem.sessionOrder > 0;
            })

            var finlist = nlist.sort(function(a, b) {
              if (a.sessionOrder > b.sessionOrder) return 1;
              if (a.sessionOrder < b.sessionOrder) return -1;
              return 0;
            })

            this.finlist = finlist;

            var clist = finlist.filter(function(element) {
              return element.sessionStatus == "coming";
            })
            this.clist = clist;

            var flist = finlist.filter(function(element) {
              return element.sessionStatus == "finished";
            })
            this.flist = flist;
            this.plyor = flist.length;
          }

          this.toOrder = this.finlist.length;
        })
    },

    sendMessage() {
      var artistname = this.name;
      var useruid = firebase.auth().currentUser.uid;
      var toname = this.selected["name"];
      var touid = this.selected["uid"];
      var ap = 20;
      var np = 0;
      var wp = 0;
      var takeap = 0;
      var giveap = 0;

      firebase
        .database()
        .ref("loginuser/" + useruid + "/apt")
        .once("value", snapshot => {
          const nowapt = snapshot.val()
          np = nowapt - ap;
        })

      if (np < 0) {
        this.isButtonDisabled1 = true;
        alert("ポイントが足りません！")
      } else {
        firebase
          .database()
          .ref("loginuser/" + touid + "/getapt")
          .once("value", snapshot => {
            const newapt = snapshot.val()
            wp = newapt + ap;
          })

        firebase
          .database()
          .ref("loginuser/" + useruid)
          .update({
            apt: np
          })

        firebase
          .database()
          .ref("loginuser/" + touid)
          .update({
            getapt: wp
          })

        firebase
          .database()
          .ref("myBoard/")
          .push({
            image: this.image,
            name: artistname,
            sendp: ap,
            to: toname,
            messege: toname + "に" + '<i class="fas fa-heart"></i>' + ap
          })
      }
    },

    sendMessage2() {
      var artistname = this.name;
      var useruid = firebase.auth().currentUser.uid;
      var toname = this.selected["name"];
      var touid = this.selected["uid"];
      var ap = 10;
      var np = 0;
      var wp = 0;
      var takeap = 0;
      var giveap = 0;

      firebase
        .database()
        .ref("loginuser/" + useruid + "/apt")
        .once("value", snapshot => {
          const nowapt = snapshot.val()
          np = nowapt - ap;
        })

      if (np < 0) {
        this.isButtonDisabled1 = true;
        this.isButtonDisabled2 = true;
        alert("ポイントが足りません！")
      } else {
        firebase
          .database()
          .ref("loginuser/" + touid + "/getapt")
          .once("value", snapshot => {
            const newapt = snapshot.val()
            wp = newapt + ap;
          })

        firebase
          .database()
          .ref("loginuser/" + useruid)
          .update({
            apt: np
          })

        firebase
          .database()
          .ref("loginuser/" + touid)
          .update({
            getapt: wp
          })

        firebase
          .database()
          .ref("myBoard/")
          .push({
            image: this.image,
            name: artistname,
            sendp: ap,
            to: toname,
            messege: toname + "に" + '<i class="fas fa-heart"></i>' + ap
          })
      }
    },

    sendMessage3() {
      var artistname = this.name;
      var useruid = firebase.auth().currentUser.uid;
      var toname = this.selected["name"];
      var touid = this.selected["uid"];
      var ap = 5;
      var np = 0;
      var wp = 0;
      var takeap = 0;
      var giveap = 0;

      firebase
        .database()
        .ref("loginuser/" + useruid + "/apt")
        .once("value", snapshot => {
          const nowapt = snapshot.val()
          np = nowapt - ap;
        })

      if (np < 0) {
        this.isButtonDisabled1 = true;
        this.isButtonDisabled2 = true;
        this.isButtonDisabled3 = true;
        alert("ポイントが足りません！")
      } else {
        firebase
          .database()
          .ref("loginuser/" + touid + "/getapt")
          .once("value", snapshot => {
            const newapt = snapshot.val()
            wp = newapt + ap;
          })

        firebase
          .database()
          .ref("loginuser/" + useruid)
          .update({
            apt: np
          })

        firebase
          .database()
          .ref("loginuser/" + touid)
          .update({
            getapt: wp
          })

        firebase
          .database()
          .ref("myBoard/")
          .push({
            image: this.image,
            name: artistname,
            sendp: ap,
            to: toname,
            messege: toname + "に" + '<i class="fas fa-heart"></i>' + ap
          })
      }
    },

    sendMessage4() {
      var artistname = this.name;
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
          const nowapt = snapshot.val()
          np = nowapt - ap;
        })
      if (np < 0) {
        alert("ポイントがなくなりました！")
        this.isButtonDisabled1 = true;
        this.isButtonDisabled2 = true;
        this.isButtonDisabled3 = true;
        this.isButtonDisabled4 = true;
      } else {
        firebase
          .database()
          .ref("loginuser/" + touid + "/getapt")
          .once("value", snapshot => {
            const newapt = snapshot.val()
            wp = newapt + ap;
          })

        firebase
          .database()
          .ref("loginuser/" + useruid)
          .update({
            apt: np
          })

        firebase
          .database()
          .ref("loginuser/" + touid)
          .update({
            getapt: wp
          })

        firebase
          .database()
          .ref("myBoard/")
          .push({
            image: this.image,
            name: artistname,
            sendp: ap,
            to: toname,
            messege: toname + "に" + '<i class="fas fa-heart"></i>' + ap
          })
      }
    },

    sendMessage5() {
      var artistname = this.name;
      var messege = this.messege;
      firebase
        .database()
        .ref("myBoard/")
        .push({
          image: this.image,
          name: artistname,
          messege: messege
        })
      this.messege = "";
    }
  }
};

window.addEventListener(
  "beforeunload",
  function(e) {
    e.returnValue = "閉じますか？";
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.$router.push("/signin")
      })
  },
  false
)
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
.item-image img {
  border-radius: 50%;
  vertical-align: top;
  border: solid 2px rgb(245, 245, 232)
}

.youtube {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
}
.youtube iframe {
  position: absolute;
  top: 0;
  right: 0;
  width: 100% !important;
  height: 100% !important;
}
</style>