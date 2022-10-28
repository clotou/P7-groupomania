<template>
  <input
    type="button"
    class="regular-button btn blue-bt logout-button"
    value="Déconnecter"
    id="logout"
    @click="logout()"
  />
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
              <input
                type="file"
                @change="previewImage"
                name="imageUrl"
                id="imageUrl"
                accept="image/*"
              />
              <img
                src="../../public/ICONE_PICTURE.png"
                alt="icone picture"
                class="icone-picture"
              />
            </button>
            <small>format accepté: png, jpg, jpeg</small>
            <div class="image-preview">
              <img class="preview" :src="imageData" />
            </div>
          </div>
        </div>
        <div class="bt-bar">
          <div>
            <input
              type="button"
              class="regular-button gray-bt"
              id="annuler"
              @click="reload()"
              value="Annuler"
            />
          </div>
          <div>
            <input
              type="button"
              value="Post"
              id="post"
              class="regular-button blue-btn"
              @click="sendPost()"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { isTemplateNode } from "@vue/compiler-core";
//import { buffer } from 'stream/consumers';
// import axios from 'axios'
//retrieve token
var retrieveObject = localStorage.getItem("tokenObject");
// console.log("retrieveObject: ", JSON.parse(retrieveObject));
var tokenObject = JSON.parse(retrieveObject);

//retrieve firstName
var firstName = localStorage.getItem("firstName");
// console.log(firstName);
//retrieve lastName
var lastName = localStorage.getItem("lastName");
// console.log(lastName);

export default {
  name: "post",
  data() {
    return {
      title: "",
      date: "",
      imageData: undefined,
      userId: "",
      firstName: "",
      lastName: "",
      likes: 0,
      usersLiked: [],
      selectedFile: null,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('user');
      window.location.href = "http://localhost:5173/";
    },
    reload() {
      location.reload(true);
    },
    previewImage(event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
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
        window.location.href = "/home";
      } catch (e) {
        console.log("ERROR : ", e);
      }
    },
  },
};
</script>
