<template>
  <div id="app">
    <section class="hero is-warning is-fullheight">
      <div class="hero-head">
        <nav class="navbar is-fixed-top">
          <div class="navbar-brand">
            <a class="navbar-item" href="http://j-pop-jam.com">
              <img src="./assets/logo_jpopjam_rectangle_B.svg" alt>
            </a>
          </div>
        </nav>
      </div>

      <!--
<iframe src="https://docs.google.com/viewer?srcid=1AKCNl6pQUltT3X2-0UGzd2DqmeGMLW7r&pid=explorer&efh=false&a=v&chrome=false&embedded=true" width="100%" height="100%"></iframe>

      Hero content: will be in the middle
      
      
                <div class="column" style="width: 20%; float: left; text-align: center;">
            <div class="navbar-item is-white fas fa-lg">
              <router-link to="/stream">
                <i class="fab fa-youtube is-size-4"></i>
              </router-link>
            </div>
          </div>

                    <div class="column" style="width: 20%; float: left; text-align: center;">
            <div class="navbar-item is-white fas fa-lg">
              <router-link to="/person">
                <i class="far fa-user"></i>
              </router-link>
            </div>
          </div>
          
          -->
      <div class="hero-body">
        <div class="container has-text-centered">
          <router-view/>
        </div>
      </div>
<!--
      <nav class="navbar is-fixed-bottom" style="background-color:#ffdd57;">
        <div class="columns is-multiline is-mobile">
          <div class="column" style="width: 20%; float: left; text-align: center;">
            <div class="navbar-item is-white fas fa-lg">
              <router-link to="/signin">
                <i class="fas fa-home"></i>
              </router-link>
            </div>
          </div>



          <div class="column" style="width: 20%; float: left; text-align: center;">
            <div class="navbar-item is-white fas fa-lg">
              <router-link to="/list">
                <i class="fas fa-align-justify"></i>
              </router-link>
            </div>
          </div>

          <div class="column" style="width: 20%; float: left; text-align: center;">
            <div class="navbar-item is-white fas fa-lg">
              <router-link to="/">
                <i class="fas fa-backward"></i>
              </router-link>
            </div>
          </div>


        </div>
      </nav>

         -->

    </section>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "App",
  data: () => ({
    selectedFile: null,
    preview: "",
    uploadedImage: "",
    loginname: "",
    image: "",
    isButtonDisabled1: false
  })
};
</script>


<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

$widescreen: 650px;
$fullhd: 650px;
// Links

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>