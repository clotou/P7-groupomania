<template>
  <div class="allposts">
    <div class="post">
      <div class="post-block-up" v-for="post in allposts" :key="post._id">
        <div class="name-container">
          <p>{{ post.firstName }} {{ post.lastName }}</p>
          <!-- <p>Marie D</p> -->
        </div>
        <div class="post-container posted-post-spaces">
          <div class="date-container">
            <!-- createdAt ? -->
            <h3>{{ post.date }}</h3>
            <!-- <h3>22/07/22 - 10:20</h3> -->
          </div>
          <div class="title-container">
            <h2 id="title">{{ post.title }}</h2>
            <!-- <h2 id="title">Marc et Antoine du markeitng grillés en pause café</h2> -->
          </div>
          <div class="picture-container">
            <img v-bind:src="post.imageUrl" alt="" class="picpost">
            <!-- <img src="../../public/marcantoine.png" alt="l'image publiée" class="picpost"> -->
          </div>
        </div>

        <div class="post-block-bottom">
          <div class="like-side">
            <!-- <p id="likes">{{post.likes}}</p> -->
            <p id="likes">{{ post.usersLiked.length }}</p>
            <img v-if="likes === 1" src="../../public/thumbs-up-black-icon.webp" alt="thumb-up" class="thumb"
              @click="likedislike()" />
            <img v-else src="../../public/thumbs-up-empty.png" alt="empty-thumb-up" class="thumb" @click="likedislike()" />
          </div>
          <div class="button-side">
            <div>
              <input v-if="userId == _Id || userId.admin == true" type="button" class="regular-button pink-bt" id="modifier"
                value="Modifier" click="updatePost ">
            </div>
            <div>
              <input type="button" class="regular-button red-bt" id="supprimer"
                value="Supprimer" @click="deletePost">
            </div>
          </div>
        </div>
      </div>
          <!-- </div> -->

    </div>
  </div>
</template>

<script>

var retrieveObject = localStorage.getItem('tokenObject');
console.log('retrieveObject: ', JSON.parse(retrieveObject))
var tokenObject = JSON.parse(retrieveObject);
console.log(tokenObject.token);


export default {
    name: 'post',
    data(){
      return{
        allposts: [],
        title: "",
        date: "",
        imageUrl: "",
        userId: "",
        likes: 0,
        usersLiked: [],
       }
    },
  created: async function (){
    const response = await fetch(`http://localhost:3000/api/posts`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${tokenObject.token}`
    },
  })
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (res) {
      console.log(res);
      return res
    })
    this.allposts = response;
    console.log(this.allposts);
},
    methods: {
      updatePost() {
        fetch(`http://localhost:3000/api/posts`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${tokenObject.token}`
              },
          body: JSON.stringify({
            title: this.title,
            date: this.date,
            imageUrl: this.imageUrl,
            userId: this.userId,
            firstName: this.firstName,
            lastName: this.lastName,
            likes: this.likes,
            usersLiked: this.userLiked,
              }),})
        .then(response => {
          console.log(response.data);
          let reponse = response.data;
          let postObject = JSON.stringify(reponse);
          let user = JSON.parse(this.$localStorage.get("user"));
          token = user.token;
            localStorage.setItem("post", postObject);
            window.location.href = "/home";
            location.reload(true);
        })
      },
        deletePost() {
          fetch(`http://localhost:3000/api/posts`, {
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${tokenObject.token}`
                }
        })
            .then(res => {
              return res.json()
            })
            .then(data => console.log(data))
          //       .then(function (res) {
          //       console.log(res);
          //       if (res.ok) {
          //         return res.json();
          //       }
          //     })
          //     .then(function (res) {
          //   console.log(res);
          //   localStorage.delete("post");
          //   alert('Le post a été supprimé')
          //   window.location.href = "/home";
          //   // location.reload(true);
          // })
      },
      dateCreated(date) {
        return dayjs(date).format("dddd D MMMM YYYY", "fr");
      },
      likedislike() {
        if(likes == 1) {
          likes == 0
        } else {
          likes == 1
        }
      }
    }
  }
</script>

