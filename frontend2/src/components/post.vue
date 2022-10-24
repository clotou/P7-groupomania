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
            <img v-if="likes === 1" src="../../public/thumbs-up-black-icon.webp" alt="thumb-up" class="thumb"
              @click="likedislike()" />
            <img v-else src="../../public/thumbs-up-empty.png" alt="empty-thumb-up" class="thumb" @click="likedislike()" />
          </div>
          <div class="button-side">
            <div>
              <input v-if="userId == post.userId || admin == true" type="button" class="regular-button btn pink-bt"
                value="Modifier" id="openModal" @click="showModal">
            </div>

            <Modal v-show="isModalVisible" @close="closeModal" />

            <input v-if="userId == post.userId || admin == true" type="button" class="regular-button red-bt" id="supprimer"
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
import Modal from '../components/modale.vue';

var retrieveObject = localStorage.getItem('tokenObject');
var tokenObject = JSON.parse(retrieveObject);
var admin = localStorage.getItem('admin');
console.log(admin)

export default {

  name: 'post',
  components: {
    Modal,
  },
  // data() {
  //   return {
  //     isModalVisible: false,
  //   };
  // },
  // methods: {
  //   showModal() {
  //     this.isModalVisible = true;
  //   },
  //   closeModal() {
  //     this.isModalVisible = false;
  //   }
  // },
    data(){
      return{
        allposts: [],
        firstName: "",
        lastName: "",
        admin: localStorage.getItem('admin'),
        title: "",
        date: "",
        imageUrl: "",
        userId: localStorage.getItem('user'),
        likes: 0,
        usersLiked: [],
        isModalVisible: false,
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
    // response.update(response[response.length-1])
    // response.push(res[res.length-1]);
    response.reverse();
    console.log(this.allposts);
    console.log(admin);
},
   methods: {
     reloadPage() {
       window.location.reload();
     },
     showModal() {
       this.isModalVisible = true;
     },
     closeModal() {
       this.isModalVisible = false;
     },
      dateCreated(date) {
        return dayjs(date).locale('fr').format("dddd D MMMM YYYY", "fr");
      },
      updatePost(id,index) {
        this.allposts[index]
        fetch(`http://localhost:3000/api/posts/${id}`, {
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
            admin: this.admin,
            likes: this.likes,
            usersLiked: this.userLiked,
              }),})
        .then(response => {
          console.log(response);
          let reponse = response.data;
          let postObject = JSON.stringify(reponse);
          let user = JSON.parse(this.$localStorage.get("user"));
          token = user.token;
            localStorage.setItem("post", postObject);
            window.location.href = "/home";
            // location.reload(true);
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

