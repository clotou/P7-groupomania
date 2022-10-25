<template>
  <div class="allposts">
    <div class="post">
      <div class="post-block-up" v-for="(post, index) in allposts" :key="post._id">
        <div class="name-container">
          <p>{{ post.firstName }} {{ post.lastName }}</p>
          <!-- <p>Marie D</p> -->
        </div>
        <div class="post-container posted-post-spaces">
          <div class="date-container">
            <!-- createdAt ? -->
            <h3>{{ dateCreated(post.date) }}</h3>
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
            <div v-if="likes === 1"
              @click="likedislike(userId, usersLiked)">
              <img src="../../public/thumbs-up-black-icon.webp" alt="thumb-up" class="thumb" />
          </div>
            <div v-else @click="likedislike(userId, usersLiked)" >
              <img src="../../public/thumbs-up-empty.png" alt="empty-thumb-up" class="thumb" />
            </div>
          </div>

          <div class="button-side">
            <div>
              <input v-if="admin || (userId == post.userId)" type="button" class="regular-button btn pink-bt"
                value="Modifier" id="openModal" @click="showModal(post)">
            </div>

            <!-- <Modal v-show="isModalVisible" @close="closeModal"/> -->
<!-- début de la modale-->
<div v-show="isModalVisible">
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          Modifiez votre post!
        </slot>
        <button type="button" class="btn-close" @click="isModalVisible=false">
          x
        </button>
      </header>

      <slot name="body">
        <form action="" method="put" id="form">
          <div class="textarea-container">
            <textarea name="title" id="title" class="textarea" placeholder="" v-model="currentPost.title"></textarea>
          </div>
          <div class="bt-bar">
            <div class="picture-bt-container">
              <button class="regular-button picture-bt">
                <input type="file" name="imageUrl" id="imageUrl" />
                <img src="../../public/ICONE_PICTURE.png" alt="icone picture" class="icone-picture" />
              </button>
              <small>format accepté: png, jpg, jpeg</small>
            </div>
          </div>
        </form>
      </slot>

      <slot name="footer" class="bt-bar">
        <div class="blue-bt">
          <input type="button" value="Mettre à jour" id="postUpdate" class="regular-button"
            @click="updatePost(currentPost)" />
        </div>
      </slot>

    </div>
  </div>
</div>

            <input v-if="admin || (userId == post.userId)" type="button" class="regular-button red-bt" id="supprimer"
              value="Supprimer" @click="deletePost(post._id)">
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as dayjs from 'dayjs'
import 'dayjs/locale/fr'
import { VueElement } from 'vue';

var retrieveObject = localStorage.getItem('tokenObject');
var tokenObject = JSON.parse(retrieveObject);
var admin = localStorage.getItem('admin');
console.log(admin)

export default {

  name: 'post',
    data(){
      return{
        allposts: [],
        firstName: "",
        lastName: "",
        admin: localStorage.getItem('admin'),
        title: "",
        date: "",
        // imageBase64: buffer,
        imageUrl: "",
        userId: localStorage.getItem('user'),
        likes: 0,
        usersLiked: [],
        isModalVisible: false,
        currentPost: {},
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
    response.reverse();
    console.log(this.allposts);
    console.log(admin);
},
   methods: {
     logout() {
       localStorage.removeItem('user');
       window.location.href = "http://localhost:5173/";
     },
     reloadPage() {
       window.location.reload();
     },
     showModal(post) {
       this.currentPost = post;
       console.log("THE POST", post._id)
       this.isModalVisible = true;
     },
     closeModal() {
       this.isModalVisible = false;
       console.log($emit('close'))
     },
      dateCreated(date) {
        return dayjs(date).locale('fr').format("dddd D MMMM YYYY", "fr");
      },
     updatePost(currentPost) {
        fetch(`http://localhost:3000/api/posts/${currentPost._id}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${tokenObject.token}`
              },
          body: JSON.stringify({
            title: currentPost.title,
            imageUrl: currentPost.imageUrl,
              }),})
        .then(response => {
          console.log(response);
          let reponse = response.data;
          let postObject = JSON.stringify(reponse);

            window.location.href = "/home";
        })
      },

      deletePost(id, index) {
        console.log(index);
        if (confirm("Êtes vous sure de vouloir supprimer ce post?")) {
          fetch(`http://localhost:3000/api/posts/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${tokenObject.token}`
                },
        })
            .then(res => {
              return res.json()

            })
            .then(data => console.log(data))
            this.allposts.splice(index, 1);
        }
      },
     likedislike(userId, usersLiked) {
      console.log(id);
      console.log(post.usersLiked);
      console.log(post.likes);
       if(likes == 0) {
         post.usersLiked.add(id);
         post.likes == 1
       } else if (likes == 1){
         var idIndex = post.usersLiked.indexOf(id);
         delete post.usersLiked[idIndex]
       }
     },
    }
  }
</script>

