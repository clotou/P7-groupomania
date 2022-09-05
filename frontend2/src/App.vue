<template>
  <div id="app">
    <router-view />
    <!-- <signinform></signinform> -->
  </div>
</template>
<script>
import signinform from "./components/signinform.vue";
import signupform from  "./components/signupform.vue";
import post from "./components/post.vue";
import publish from "./components/publish.vue";
import home from "./views/home.vue";

export default {
  name: "App",
  data() {
    return {
    };
  },
  components: {signinform, signupform, publish, post,home},
};
</script>
