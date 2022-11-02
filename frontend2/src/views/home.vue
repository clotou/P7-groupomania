<template>
<!-- home -->
  <div class="wall">
    <publish @created="refreshPosts"></publish>
  <!-- line -->
    <div class="line-container">
      <hr>
    </div>
    <post ref="post"></post>
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
    },
    methods: {
      refreshPosts() {
        this.$refs.post.loadPosts()
      }
    }
}
</script>
