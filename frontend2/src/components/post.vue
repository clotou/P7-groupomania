<template>
  <div class="allposts">
    <div class="post">
      <div class="post-block-up" v-for="(post, index) in allposts" :key="post._id">
        <div class="name-container">
          <p>{{ post.firstName }} {{ post.lastName }}</p>
        </div>
        <div class="post-container posted-post-spaces">
          <div class="date-container">
            <h3>{{ dateCreated(post.date) }}</h3>
          </div>
          <div class="title-container">
            <h2 id="title">{{ post.title }}</h2>
          </div>
          <div v-if="post.imageBase64" class="picture-container">

            <img v-bind:src="post.imageBase64" alt="" class="picpost">

          </div>
        </div>

        <div class="post-block-bottom">
          <div class="like-side">

            <p id="likes">{{ post.usersLiked.length }}</p>

            <div v-if="post.usersLiked.indexOf(userId) >= 0"
              @click="likedislike(post._id, 0)">
              <img src="../../public/thumbs-up-black-icon.webp" alt="thumb-up" class="thumb"/>
            </div>
            <div v-else @click="likedislike(post._id, 1)">
              <img src="../../public/thumbs-up-empty.png" alt="empty-thumb-up" class="thumb"/>
            </div>
          </div>
          <div class="button-side">
            <div>
              <input v-if="(admin == 'true') || (userId == post.userId)" type="button" class="regular-button btn pink-bt"
                value="Modifier" id="openModal" @click="showModal(post)">
            </div>

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
        <form action="" method="put" id="form" ref="updateForm">
          <div class="textarea-container">
            <textarea name="title" id="title" class="textarea" placeholder="" v-model="currentPost.title"></textarea>
          </div>
          <div class="bt-bar">
<div class="picture-bt-container">
  <button class="regular-button picture-bt">
    <input type="file" @change="previewImage" name="imageUrl" id="imageUPdate" accept="image/*"/>
    <img src="../../public/ICONE_PICTURE.png" alt="icone picture" class="icone-picture"/>
  </button>
  <small>format accepté: png, jpg, jpeg</small>
  <div class="image-preview">
    <img class="preview" :src="imageData" />
  </div>
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

            <input v-if="(admin=='true') || (userId == post.userId)" type="button" class="regular-button red-bt" id="supprimer"
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

var retrieveObject = localStorage.getItem('tokenObject');
var tokenObject = JSON.parse(retrieveObject);
var admin = localStorage.getItem('admin');

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
        imageData: undefined,
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
      return res
    })
    this.allposts = response;
    response.reverse();
},
   methods: {
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
     previewImage(event) {
       // Reference to the DOM input element
       var input = event.target;
       // Ensure that you have a file before attempting to read it
       if (input.files && input.files[0]) {
         // create a new FileReader to read this image and convert to base64 format
         var reader = new FileReader();
         // Define a callback function to run, when FileReader finishes its job
         reader.onload = (e) => {
           // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
           // Read image as base64 and set to imageData
           this.imageData = e.target.result;
         };
         // Start the reader job - read file as a data url (base64 format)
         reader.readAsDataURL(input.files[0]);
       }
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
            imageBase64: this.imageData,
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
     async sendPost() {
       try {
         var option = {
           title: this.title,
           date: new Date(),
           imageBase64: this.imageData,
           userId: localStorage.getItem("user"),
           firstName: localStorage.getItem("firstName"),
           lastName: localStorage.getItem("lastName"),
           likes: this.likes,
           usersLiked: this.userLiked,
         };
         let response = await fetch(`http://localhost:3000/api/posts`, {
           method: "POST",
           headers: {
             "Content-type": "application/json",
             Authorization: `Bearer ${tokenObject.token}`,
           },
           body: JSON.stringify(option),
         });
         console.log(response);
         let post = response;
       } catch (e) {
         console.log("ERROR : ", e);
       }
     },
     async likedislike(postId, like) {
       try {
         var option = {
           userId: localStorage.getItem("user"),
           likes: like,
         };
         let response = await fetch(`http://localhost:3000/api/posts/${postId}/like`, {
           method: "POST",
           headers: {
             "Content-type": "application/json",
             Authorization: `Bearer ${tokenObject.token}`,
           },
           body: JSON.stringify(option),
         });
         for (const post of this.allposts) {
          if(post._id == postId) {
            if(like == 1) {
              post.usersLiked.push(this.userId);
            } else {
              const userLikedIndex=post.usersLiked.indexOf(this.userId);
              post.usersLiked.splice(userLikedIndex,1);
            }
          }
         }
       } catch (e) {
         console.log("ERROR : ", e);
       }
     },
    }
  }
</script>

