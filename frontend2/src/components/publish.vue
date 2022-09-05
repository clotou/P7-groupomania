<template>
  <div class="posts">
      <div class="name-container postSpaces">
        <p>Vous</p>
      </div>
      <div class="post-container postSpaces">
        <h2>Écrivez quelque chose ou postez une image</h2>
        <form action="" method="post">
          <div class="textarea-container">
            <textarea
              name="title"
              id="title"
              class="textarea"
              placeholder="Hey... écris quelquechose!"
            >{{title}}</textarea>
          </div>
          <div class="bt-bar">
            <div>
              <button type="submit" class="regular-button" id="annuler">Annuler</button>
            </div>
            <div class="blue-bt">
              <input
                type="submit"
                value="Post"
                id="post"
                class="regular-button"
                @submit.prevent= "sendPost"
              />
            </div>
          </div>
          <div class="bt-bar">
            <div class="picture-bt-container">
              <button class="regular-button picture-bt">
                <h3 class="plus">+</h3>
                <img
                  src="../../public/ICONE PICTURE.png"
                  alt="icone picture"
                  class="icone-picture"
                />
              </button>
              <small>format accepté: png, jpg, jpeg</small>
            </div>
          </div>
        </form>
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
    sendPost() {
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
            likes: this.likes,
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
        }
  }
}
</script>

