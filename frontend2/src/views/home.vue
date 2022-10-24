<template>
<!-- home -->
  <div class="wall">
    <publish></publish>
  <!-- line -->
    <div class="line-container">
      <hr>
    </div>
    <post></post>
    <modale v-show="isModalVisible" @close="closeModal"></modale>

  </div>
</template>

<script>
  import post from "../components/post.vue"
  import publish from "../components/publish.vue"
  import modale from "../components/modale.vue"


  export default {
    name: "home",
    components:{
      publish,
      post,
      modale
    },
  data() {
    return {
      isModalVisible: false,
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  }
}
</script>
