<template>
  <input type="button" class="regular-button btn blue-bt logout-button" value="Déconnecter" id="logout" @click="logout()">
  <div class="publishPost">
      <div class="name-container postSpaces">
        <p>Vous</p>
      </div>
      <div class="post-container postSpaces">
        <h2>Écrivez quelque chose ou postez une image</h2>
        <form action="" method="post" id="form">
          <div class="textarea-container">
            <textarea
              name="title"
              id="title"
              class="textarea"
              placeholder="Hey... écris quelquechose!"
              v-model="title"
            ></textarea>
          </div>
          <div class="bt-bar">
            <div class="picture-bt-container">
              <button class="regular-button picture-bt">
                <input type="file" @change="previewImage" name="imageUrl" id="imageUrl" accept="image/*"/>
                <img
                  src="../../public/ICONE_PICTURE.png"
                  alt="icone picture"
                  class="icone-picture"
                />
              </button>
              <div class="image-preview">
                <img class="preview" :src="imageData">
              </div>

              <small>format accepté: png, jpg, jpeg</small>
            </div>
          </div>
          <div class="bt-bar">
            <div>
              <input type="button" class="regular-button" id="annuler" @click="reload()" value="Annuler">
            </div>
            <div class="blue-bt">
              <input
                type="button"
                value="Post"
                id="post"
                class="regular-button"
                @click="sendPost()"
              />
            </div>
          </div>

        </form>
      </div>
    </div>
</template>

<script>
import { isTemplateNode } from '@vue/compiler-core';
//import { buffer } from 'stream/consumers';
// import axios from 'axios'
//retrieve token
var retrieveObject = localStorage.getItem('tokenObject');
console.log('retrieveObject: ', JSON.parse(retrieveObject))
var tokenObject = JSON.parse(retrieveObject);

//retrieve firstName
var firstName = localStorage.getItem('firstName');
console.log(firstName)
//retrieve lastName
var lastName = localStorage.getItem('lastName');
console.log(lastName)

export default {
  name: 'post',
  data(){
    return{
      title: "",
      date: "",
      imageData: undefined,
      imageUrl: "",
      userId: "",
      firstName: "",
      lastName: "",
      likes: 0,
      usersLiked: [],
      selectedFile: null
      }
  },
  methods: {
    reload() {
      location.reload(true);
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
//     uploadImage() {
//       const file = document.querySelector('input[type=file]').files[0]
//       const reader = new FileReader()

//       const rawImg = reader.readAsDataURL(file)
//       console.log(file)
//       console.log(rawImg)
// },
    sendPost() {

      var image = document.querySelector('input[type="file"]')
      var newDate = new Date();
      var today = newDate.toLocaleDateString("fr");

      var option = {
        title: this.title,
        date: new Date(),
        imageBase64: this.imageData,
        // imageUrlLocal: JSON.stringify(image.files[0]),
        userId: localStorage.getItem('user'),
        firstName: localStorage.getItem('firstName'),
        lastName: localStorage.getItem('lastName'),
        likes: this.likes,
        usersLiked: this.userLiked
      };

      fetch(`http://localhost:3000/api/posts`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${tokenObject.token}`
        },
        body: JSON.stringify(option),
      })
      .then(function(res) {
        console.log(option);
        console.log(res)
        if (res.ok) {
          return res.json();
        }
      })
      .then(function(res) {
        console.log(res)
        let response = res.body;

        let postObject = response;
        console.log(postObject)

        localStorage.setItem("post", postObject);
        let post = localStorage.getItem("post");

        // window.location.href = "/home";
      })
    }
  }
}
</script>

