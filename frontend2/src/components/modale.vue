<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          Modifiez votre post!
        </slot>
        <button type="button" class="btn-close" @click="$emit('close')">
          x
        </button>
      </header>

      <slot name="body">
        <form action="" method="put" id="form">
          <div class="textarea-container">
            <textarea name="title" id="title" class="textarea" placeholder=""
              v-model="title">{{ title }}</textarea>
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
        <div>
          <input type="button" class="regular-button" id="annulerUpdate" @click="$emit('close')" value="Annuler">
        </div>
        <div class="blue-bt">
          <input type="button" value="Mettre à jour" id="postUpdate" class="regular-button" @click="updatePost(post._id)" />
        </div>
      </slot>


    </div>
  </div>
</template>

<script>
var retrieveObject = localStorage.getItem('tokenObject');
var tokenObject = JSON.parse(retrieveObject);

var option = {
        title: localStorage.getItem('title'),
        date: new Date(),
        imageUrlLocal: "/Users/clotildelacaille/Downloads/miceplace-min.png",
        userId: localStorage.getItem('user'),
        firstName: localStorage.getItem('firstName'),
        lastName: localStorage.getItem('lastName'),
        likes: localStorage.getItem('likes'),
        usersLiked: localStorage.getItem('usersLiked')
      };


export default {
  name: 'Modal',
  data() {
    return {
      // allposts: [],
      // firstName: "",
      // lastName: "",
      // admin: null,
      //date: "",
      id: this.id,
      title: this.title,
      imageUrl: this.imageUrl,
      // userId: localStorage.getItem('user'),
      // likes: 0,
      // usersLiked: [],
      // isModalVisible: false,
    };
  },
  // created: async function () {
  //   const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-type': 'application/json',
  //       'Authorization': `Bearer ${tokenObject.token}`
  //         // Simple PUT request with a JSON body using fetch

  //         .then(response => response.json())
  //         .then(data => (this.updatedAt = data.updatedAt))
  //     },
  // })
//},


  methods: {
    close() {
      this.$emit('close');
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
      updatePost(id, index) {
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
          }),
        })
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
  },
  };
</script>
