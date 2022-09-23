<template>
  <div class="publishPost">
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
              v-model="title"
            ></textarea>
          </div>
          <div class="bt-bar">
            <div>
              <button type="submit" class="regular-button" id="annuler" @click="reload()">Annuler</button>
            </div>
            <div class="blue-bt">
              <input
                type="submit"
                value="Post"
                id="post"
                class="regular-button"
                @click="sendPost()"
              />
            </div>
          </div>
          <div class="bt-bar">
            <div class="picture-bt-container">
              <button class="regular-button picture-bt">
                <input type="file" value="+">
                <!-- <h3 class="plus">+</h3> -->
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
      reload() {
        location.reload(true);
      },
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
          usersLiked: this.userLiked
        }),
      })
      .then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function(res) {
        let response = res.body;

        let postObject = JSON.stringify(response);

        console.log(this.title)

        localStorage.setItem("post", postObject);
        let post = localStorage.getItem("post");

        token = user.token;
        post.userId = _Id
        location.reload(true);
      })
    }
  }
}
</script>

