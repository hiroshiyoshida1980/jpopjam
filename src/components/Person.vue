<template>
<div class="Person">

<div style="height:10px;"></div> 
<h6 class="is-size-6"><B>1.アイコン画像を登録してください。</B></h6> 
<div style="height:10px;"></div>
<div>


<croppa v-model="croppa"
         :width="200"
         :height="200"
         :quality="1"
         :show-remove-button="true"
    remove-button-color="red"
        :show-loading="true"
        placeholder="画像を設定"
        :placeholder-font-size="10"
 >
         
 </croppa></div> 
 
  

  <div v-if="isLoading">
  <a class="item-image"><img :src="image" width="35" height="35"></a>
  <a class="button is-light" @click="upload" >
        <i class="fas fa-upload"></i>UPLOAD</a></a>
      <p　class="is-size-7">左のアイコンに反映されない場合は何度かやり直してください。</p>
</div>
<div v-else>
  <a class="button is-loading">
  </i>Loading</a>
  </div>

<div style="height:20px;"></div>

<div class="field">
<h6 class="is-size-6"><B>2.名前を入力してください。</B></h6> 
<div style="height:10px;"></div>
  <p class="control has-icons-left">
    <input class="input" type="text" placeholder="Your Name" v-model="name">
    <span class="icon is-small is-left">
      <i class="fas fa-user"></i>
    </span>
    
  </p>
</div>
            

<h6 class="is-size-6"><B>3.PRなどあれば入力してください。</B></h6> 
<div style="height:10px;"></div>
 <textarea class="textarea" placeholder="Your PR" v-model="pr"></textarea>

    <p　class="is-size-7">最高200文字程度でお願いします</p>

<div style="height:20px;"></div>
<p　class="is-size-7">こちらの情報は全員に表示されます。</BR>今日1日は変更できません。</p>
        <a class="button is-danger" @click="namechange">登録</a>





<div style="height:20px;"></div> 
今日の参加者
<div style="height:20px;"></div>  

<div style="height:100px; width:100%; overflow-y:auto; scrollbar-base-color:#23d160;">
<li class="is-size-7" v-for = "item in options">{{item.name}}さんが参加中</li>

</div>

</div>
  
</template>


<script>



import firebase from "firebase";
import Multiselect from "vue-multiselect";
import axios from 'axios'

export default {
  name: "Person",
    components: { Multiselect },

  data() {
    return {
      list: [], // 最新状態はここにコピーされる
      name: "", // 名前
      image:"",
      sendp: null, // 送信メッセージ
      mslist: "",
      board: "",
      selected: null,
      options: [],
      uploadedImage: '',
      apt: "",
      getapt: "",
      artistname: "",
      pr: "",
      namelist: [],
      isButtonDisabled1: false,
      pages: [],
      croppa: {},
      pr:"",
      progress:0,
      isLoading: true,
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
       var artistname = this.name;
       firebase
        .database()
        .ref("loginuser/" + useruid + "/name")
        .on("value", snapshot => {
          this.name = snapshot.val(); });

      firebase
        .database()
        .ref("loginuser/" + useruid + "/image")
        .on("value", snapshot => {
          this.image = snapshot.val(); });

      firebase
        .database()
        .ref("loginuser/" + useruid + "/pr")
        .on("value", snapshot => {
          this.pr = snapshot.val(); });

       firebase.database().ref("loginuser/").on("value", snapshot => {

          if (snapshot) {
            const rootList = snapshot.val();
            let list = [];
            let otherslist = [];

            Object.keys(rootList).forEach((val, key) => {
              list.push(rootList[val]);
            });

        var nlist = list.filter(function (element) {
        return element.status !== "";

         });

            this.options = nlist;

          

          }
        })

    },
    
    onFileTypeMismatch (file) {
      alert('jpg, gif, png　形式でアップして下さい。')
    },
    onFileSizeExceed (file) {
      alert('ファイルは2mb以下でアップロードして下さい。')
    },

     setUpload(){
     this.isButtonDisabled1 = false;
     },

     upload() {
       var imageUrl =this.image;
       var useruid = firebase.auth().currentUser.uid;
      if (!this.croppa.hasImage()) {
        alert('no image to upload')
        return
      }

      var self = this;
      this.isLoading = false;

      this.croppa.generateBlob((blob) => {
      var fileName = blob.name;
                    var storageRef = firebase.storage().ref('thumb/'+useruid);
                    var uploadTask = storageRef.put(blob);

                    uploadTask.on('state_changed', function(snapshot){
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    
                    
                    if (progress == 100){

                      var storage = firebase.storage();
                      var gsReference = storage.refFromURL('gs://jpopjam0813.appspot.com/thumb/thumb_'+useruid)
                      gsReference.getDownloadURL().then(function(url) {
                                 
                                 firebase
                                .database()
                                .ref("loginuser/" + useruid)
                                .update({
                                  image: url,
                                });
                                
                     function setimage(){
                     self.image = url;
                     self.isLoading = true;
                     alert('upload完了')
                     }

                     setTimeout(setimage(),7000);
                           
                           

                      }).catch(function(error) {
                          alert("エラーになりました。もう一度UPLOADを押して下さい")
                      }); 
                    }
  
                                        })
   
                        })


                        },





namechange: function () {
    

            var user = firebase.auth().currentUser;
            var useruid = firebase.auth().currentUser.uid;
            var namelist = this.namelist;
             var artistname = this.name;


if(namelist.indexOf(artistname)>=0||artistname == ""){


       alert("名前が他の人と重複しています");

}else if(confirm("この内容で登録しますか？\n"+artistname+"\n"+this.pr)){



              firebase
              .database()
              .ref("loginuser/" + useruid)
              .update({
                name: this.name,
                image:this.image,
                pr: this.pr
         
              });

       firebase
        .database()
        .ref("myBoard/")
        .push({
          name: this.name,
          image: this.image,
          messege : "参加しました！!" + this.pr 
        });



          this.$router.push('/')

}
        





     },

      signOut: function () {
      firebase.auth().signOut().then(() => {
      alert("ログアウトします");
      this.$router.push('/signin')
      })
    },





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


</style>