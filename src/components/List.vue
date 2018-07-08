<template>
 <div class="list">

    <content class="scrollbar" >
      <h6> <ol>
        <li v-for = "(item, index) in board">{{item.parts}}|{{item.name}}さん＝＞{{item.entune}} key:{{item.key}}@{{item.stage}}ステージ
            </li></ol>
      </h6>
    </content>

　   

<div class="elevation-1" style= "margin:7px; padding:4px;">
    　  <h4>{{ name }}のエントリー内容:{{selectedTunes}}
       </BR>{{selectedKeys}} {{selectedParts}} {{selectedStage}}</h4>
       全エントリー数:{{ Entnum }}
</div>

<div style= "margin:7px">
   
                    <multiselect v-model="selectedStage" deselect-label="ステージを選んでください。" 
                        placeholder="ステージを選んでください。" :options="stage" :searchable="true" :allow-empty="false" :show-labels="false">
                    </multiselect>

                    <multiselect v-model="selectedParts" deselect-label="パートを選んでください。" 
                        placeholder="パートを選んでください。" :options="parts" :searchable="true" :allow-empty="false" :show-labels="false">
                    </multiselect>

                    <multiselect v-model="selectedTunes" deselect-label="曲を選んでください。" 
                        placeholder="曲を選んでください。" :options="tunes" :searchable="true" :allow-empty="false" :show-labels="false">
                    </multiselect>

                    <multiselect v-model="selectedKeys" deselect-label="キーを選んでください" 
                        placeholder="キーを選んでください" :options="keys" :searchable="true" :allow-empty="false" :show-labels="false">
                    </multiselect>


            <div>
            <button v-bind:disabled="isButtonDisabled" class="raised accent" @click="sendMessage" >楽曲エントリー！</button>
            </div>

</div>

    <div class="layout-item">
      <content class="elevation-1">
         <h4> <router-link to="/">HOMEへ戻る</router-link></h4>  
      </content>
    </div>

</div>
  

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
      name: firebase.auth().currentUser.displayName, // 名前
      sendp: null, // 送信メッセージ
      mslist: "",
      board: "",
      selectedStage: null,
      selectedParts: null,
      selectedTunes: null,
      selectedKeys: null,


      stage: ["バンド","アコースティック","どちらでも"],

      parts: ["ボーカル","ギター","ベース","ドラム","キーボード"
      ,"I","I","I"],

      tunes: ["Get Wild/TM NETWORK","I LOVE YOU/クリス・ハート","打上花火/DAOKO","Dragon Night/SEKAI NO OWARI","LOVEマシーン/モーニング娘。"
      ,"I","I","I","I","I","I","I","I","I","I","I","I","I","I","I"
      ,"I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I"],

      keys: ["原キー","+6","+5","+4","+3","+2"
      ,"I","I","I"],

      entune: "",
      Entnum:"",
      artistname: "",
      namelist: [],
      isButtonDisabled: false,
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
    // データベースの変更を購読、最新状態をlistにコピーする


    listen() {     
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
            this.board = list;
            this.Entnum = list.length;
          }


        });

    },

    sendMessage() {
      var artistname = firebase.auth().currentUser.displayName;
      var En = this.Entnum;
      var entryNumber = En+1;
      var selectedStage = this.selectedStage;
      var selectedTunes = this.selectedTunes;
      var selectedParts = this.selectedParts;
      var selectedKeys = this.selectedKeys;

if ( selectedStage == null || selectedTunes == null || selectedParts == null || selectedKeys == null ) {
    this.isButtonDisabled = false;
    alert("全てを選択してください")

}else{
   if (confirm("この内容でエントリーしますか？\n"+selectedStage+"ステージ\n"+selectedTunes+" key"+selectedKeys+"\nパート "+selectedParts)){

      firebase
        .database()
        .ref("entryBoard/"+ entryNumber)
        .set({
          name: artistname,
          parts: selectedParts,
          entune: selectedTunes,
          key: selectedKeys,
          stage: selectedStage,
          entrynumber: entryNumber
        });

        }}
    }
  }
};

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>


</style>