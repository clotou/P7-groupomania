<template>
  <div id="app">
  </div>
</template>
<script>
import loginform from "./components/loginform.vue";
import signup from  "./components/signupform.vue";
export default {
  name: "App",
  data() {
    return {
    };
  },
  components: {loginform, signup}
};
</script>
