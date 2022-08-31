<template>
  <div id="app">
    <router-view />
    <!-- <signinform></signinform> -->
  </div>
</template>
<script>
import signinform from "./components/signinform.vue";
import signupform from  "./components/signupform.vue";
import home from "./components/home.vue";

export default {
  name: "App",
  data() {
    return {
    };
  },
  components: {signinform, signupform, home}
};
</script>
