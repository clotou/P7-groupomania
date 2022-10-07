<template>
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
                <input type="file" accept="image/jpeg/*"
  @change="uploadImage()">

                <!-- <h3 class="plus">+</h3> -->
                <img
                  src="../../public/ICONE_PICTURE.png"
                  alt="icone picture"
                  class="icone-picture"
                />
              </button>
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


export default {
  name: 'post',
  data(){
    return{
      title: "",
      date: "",
      img: "",
      // imageUrl: "",
      userId: "",
      likes: 0,
      usersLiked: [],
      }
  },
  methods: {
    reload() {
      location.reload(true);
    },
    uploadImage() {
      const file = document.querySelector('input[type=file]').files[0]
      const reader = new FileReader()

      const rawImg = reader.readAsDataURL(file)
      console.log(file)
      console.log(rawImg)
},
    sendPost() {
      var retrieveObject = localStorage.getItem('tokenObject');
      console.log('retrieveObject: ', JSON.parse(retrieveObject))
      var tokenObject = JSON.parse(retrieveObject);
      console.log(tokenObject.token);


      //const option =
      // new FormData()
      //   formData.set('title', this.title)
      //   formData.set('date', new Date())
      //   formData.set('imageUrl', this.file)
      //   formData.set('userId', localStorage.getItem('user'))
      //   formData.set('like', this.likes)
      //   formData.set('unserLiked', this.userLiked);
        // title: this.title,
        // date: new Date(),
        // imageUrl: this.file,
        // userId: localStorage.getItem('user'),
        // likes: this.likes,
        // usersLiked: this.userLiked

      var option = JSON.stringify({
        title: this.title,
        date: new Date(),
        imageUrl: this.file,
        userId: localStorage.getItem('user'),
        likes: this.likes,
        usersLiked: this.userLiked
      });
      console.log(option);


      fetch(`http://localhost:3000/api/posts`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${tokenObject.token}`
        },
        body: option,
      })
      .then(function(res) {
        console.log(res)
        if (res.ok) {
          return res.json();
        }
      })
      .then(function(res) {
        console.log(res)
        let response = res.data;

        let postObject = JSON.stringify(response);
        // console.log(postObject)

        localStorage.setItem("post", postObject);
        let post = localStorage.getItem("post");

        // location.reload(true);
      })
    }
  }
}
</script>

