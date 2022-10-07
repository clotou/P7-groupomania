<template>
<!-- home -->
  <div class="wall">
    <publish></publish>
  <!-- line -->
    <div class="line-container">
      <hr>
    </div>
    <post></post>
  </div>
</template>

<script>
  import post from "../components/post.vue"
  import publish from "../components/publish.vue"


  export default {
    name: "home",
    components:{
      publish,
      post
    }
  }
</script>
