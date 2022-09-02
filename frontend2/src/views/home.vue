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
  import publish from "../components/publish.vue"
  import post from "../components/post.vue"

  export default {
    name: "home",
    components:{
      publish,
      post
    }
  }
</script>
