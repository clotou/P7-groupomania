<template>
  <div id="post">
      <div class="post-block-up" v-for="post in posts" :key="post.idPOST">
        <div class="name-container postSpaces">
          <p>{{ post.userId.firstName }} {{ post.userId.lastName }}</p>
          <!-- <p>Marie D</p> -->
        </div>
        <div class="post-container posted-post-spaces">
          <div class="date-container">
            <!-- createdAt ? -->
            <h3>{{post.created_at.fromNow()}}</h3>
            <!-- <h3>22/07/22 - 10:20</h3> -->
          </div>
          <div class="title-container">
            <h2 id="title">{{post.title}}</h2>
            <!-- <h2 id="title">Marc et Antoine du markeitng grillés en pause café</h2> -->
          </div>
          <div class="picture-container">
            <img v-bind:src="post.imageUrl" alt="2 persons speaking" class="picpost">
            <!-- <img src="../../public/marcantoine.png" alt="l'image publiée" class="picpost"> -->
          </div>
        </div>
      </div>
          <!-- </div> -->
      <div class="post-block-bottom">
        <div class="like-side">
          <p id="likes">{{like}}</p>
          <!-- <p id="likes">4</p> -->
          <img src="../../public/thumbs-up-black-icon.webp" alt="thumb-up" class="thumb">
        </div>
        <div class="button-side">
          <div>
            <button type="submit" class="regular-button pink-bt" id="modifier" @submit.prevent= "updatePost">Modifier</button>
          </div>
          <div>
            <button type="submit" class="regular-button red-bt" id="supprimer"  @submit.prevent= "deletePost">Supprimer</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
    name: 'post',
    data(){
      return{
        title: "",
        date: "",
        imageUrl: "",
        userId: "",
        likes: 0,
        usersLiked: [],
       }
    },
    methods: {
    updatePost() {
        fetch(`http://localhost:3000/api/posts`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer${token}`
              },
          body: JSON.stringify({
            title: this.title,
            date: this.date,
            imageUrl: this.imageUrl,
            userId: this.userId,
            likes: this.like,
            usersLiked: this.userLiked,
              }),})
        .then(response => {
          let reponse = response.data;

            let postObject = JSON.stringify(reponse);
            this.$localStorage.set("post", postObject);

            let user = JSON.parse(this.$localStorage.get("user"));
            token = user.token;
            if (user.status == "admin" || this.userId == post.userId) {
              window.location.href = "/home";
              location.reload(true);
            } else {
              window.location.href = "/home";
              location.reload(true);
            }
          })
        },
        deletePost() {
        fetch(`http://localhost:3000/api/posts`, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer${token}`
              },
          body: JSON.stringify({
            title: this.title,
            date: this.date,
            imageUrl: this.imageUrl,
            userId: this.userId,
            likes: this.like,
            usersLiked: this.userLiked,
              }),})
        .then(response => {
          let reponse = response.data;

            let postObject = JSON.stringify(reponse);
            this.$localStorage.delete("post", postObject);

            let user = JSON.parse(this.$localStorage.get("user"));
            token = user.token;
            if (user.status == "admin" || this.userId == post.userId) {
              window.location.href = "/home";
              location.reload(true);
            } else {
              window.location.href = "/home";
              location.reload(true);
            }
          })
        }
  }
}
</script>

