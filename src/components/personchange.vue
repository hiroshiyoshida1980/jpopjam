<template>
  <div class="Person">
    <h6 class="is-size-6">
      <B>1.アイコン画像変更</B>
    </h6>
    <div style="height:10px;"></div>

    <div class="file">
      <label class="file-label">
        <input
          type="file"
          class="file-input"
          v-on:change="upload($event.target.files)"
          accept="image/*"
        >
        <span class="file-cta">
          <span class="file-icon">
            <i class="fas fa-upload"></i>
          </span>
          <span class="file-label" v-bind:disabled="isButtonDisabled2">画像ファイルを選ぶ</span>
        </span>
      </label>
    </div>

    <a v-if="isButtonDisabled2">しばらくお待ちください・・</a>

    <div style="height:10px;"></div>

    <div class="item-image">
      <img :src="thumbs" width="100" height="100">
    </div>
    <div style="height:10px;"></div>

    <div class="field">
      <h6 class="is-size-6">
        <B>2.名前を入力してください。</B>
      </h6>
      <div style="height:10px;"></div>
      <p class="control has-icons-left">
        <input class="input" type="text" placeholder="Your Name" v-model="name">
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
      </p>
    </div>

    <h6 class="is-size-6">
      <B>3.PRなどあれば入力してください。</B>
    </h6>
    <div style="height:10px;"></div>
    <textarea class="textarea" placeholder="Your PR" v-model="pr"></textarea>

    <p class="is-size-7">最高200文字程度でお願いします</p>

    <div style="height:20px;"></div>
    <p class="is-size-7">こちらの情報は全員に表示されます。
      <br>※名前は今日1日は変更できません。
    </p>
    <div style="height:20px;"></div>
    <a class="button is-danger" @click="namechange">登録</a>

    <div style="height:20px;"></div>今日の参加者
    <div style="height:20px;"></div>

    <div style="height:100px; width:100%; overflow-y:auto; scrollbar-base-color:#23d160;">
      <li class="is-size-7" v-for="item in options">{{item.name}}さんが参加中</li>
    </div>
    <div style="height:20px;"></div>
    <a class="button">
      <router-link to="/">
        <i class="fas fa-backward">HOMEへ戻る</i>
      </router-link>
    </a>
  </div>
</template>


<script>
import firebase from "firebase";
import Multiselect from "vue-multiselect";
import axios from "axios";

export default {
  name: "personchange",
  components: { Multiselect },

  data() {
    return {
      list: [], // 最新状態はここにコピーされる
      name: "", // 名前
      image: "",
      sendp: null, // 送信メッセージ
      mslist: "",
      board: "",
      selected: null,
      options: [],
      uploadedImage: "",
      apt: "",
      getapt: "",
      artistname: "",
      pr: "",
      namelist: [],
      isButtonDisabled1: false,
      isButtonDisabled2: false,
      pages: [],
      croppa: {},
      pr: "",
      progress: 0,
      isLoading: true,
      cloudinary: {
        uploadPreset: "jpopjamicon",
        apiKey: "729365936866655",
        cloudName: "jpopjam"
      },
      thumb: {
        url: ""
      },
      thumbs: []
    };
  },
  computed: {
    clUrl: function() {
      return `https://api.cloudinary.com/v1_1/${
        this.cloudinary.cloudName
      }/upload`;
    }
  },
  created() {
    // 認証チェック

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.listen();
      }
    });
  },

  methods: {
    listen() {
      var useruid = firebase.auth().currentUser.uid;
      var artistname = this.name;
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
          this.thumbs = snapshot.val();
        });

      firebase
        .database()
        .ref("loginuser/" + useruid + "/pr")
        .on("value", snapshot => {
          this.pr = snapshot.val();
        });

      firebase
        .database()
        .ref("loginuser/")
        .on("value", snapshot => {
          if (snapshot) {
            const rootList = snapshot.val();
            let list = [];
            let otherslist = [];

            Object.keys(rootList).forEach((val, key) => {
              list.push(rootList[val]);
            });

            var nlist = list.filter(function(element) {
              return element.status !== "";
            });

            this.options = nlist;
          }
        });
    },

    upload: function(file) {
      this.isButtonDisabled2 = true;

      const formData = new FormData();
      formData.append("file", file[0]);
      formData.append("upload_preset", this.cloudinary.uploadPreset);
      formData.append("tags", "gs-vue,gs-vue-uploaded");
      // For debug purpose only
      // Inspects the content of formData
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      axios.post(this.clUrl, formData).then(res => {
        this.thumbs = res.data.secure_url;
        var useruid = firebase.auth().currentUser.uid;
        firebase
          .database()
          .ref("loginuser/" + useruid)
          .update({
            image: this.thumbs
          });

        this.isButtonDisabled2 = false;
      });
    },

    namechange: function() {
      var user = firebase.auth().currentUser;
      var useruid = firebase.auth().currentUser.uid;
      var namelist = this.namelist;
      var artistname = this.name;

      if (namelist.indexOf(artistname) >= 0 || artistname == "") {
        alert("名前が他の人と重複しています");
      } else if (
        confirm("この内容で登録しますか？\n" + artistname + "\n" + this.pr)
      ) {
        firebase
          .database()
          .ref("loginuser/" + useruid)
          .update({
            name: this.name,
            image: this.thumbs,
            pr: this.pr
          });

        firebase
          .database()
          .ref("myBoard/")
          .push({
            name: this.name,
            image: this.thumbs,
            messege: this.pr
          });

        this.$router.push("/");
      }
    },

    signOut: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("ログアウトします");
          this.$router.push("/signin");
        });
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>


<style>
.item-image img {
  border-radius: 50%;
  vertical-align: top;
  border: solid 2px rgb(245, 245, 232);
}
.file-cta {
  width: 100%;
  text-align: center;
}
</style>