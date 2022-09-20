<template>
<!-- formulaire sign in -->
  <section class="form-container" id="signinform">
    <div class="logform-bg">

        <div class="log-links">
            <span class="signIn">SingIn</span> / <span class="log-links--effect"><router-link to="/signup" @click="switchToSignup()">SignUp</router-link></span>
          </div>
          <form method="post" class="log__form" id="signIn-form">
            <div class="log__form__question">
              <label for="email">Email:</label>
              <input type="email" name="email" id="email" required v-model="email" placeholder="  marie.dupont@groupomania.com"/>
              <p id="emailErrorMsg"></p>
            </div>
            <div class="log__form__question">
              <label for="password">Password:</label>
              <input type="password" name="password" id="password" required v-model="password" placeholder="  123ABC!"/>
              <p id="passwordErrorMsg"></p>
            </div>
            <div class="submit-section">
              <div class="log__form__submit--signIn regular-button blue-bt" disabled>
                <input type="button" value="SingIn" id="signIn" @click="sendSignin()"/>
              </div>
            </div>
          </form>
      </div>
  </section>
</template>


<script>
export default {
    name: 'signinform',
    data(){
      return{
        email:"",
        password:""
       }
    },
    methods: {
    switchToSignup() {
      this.mode = "signup";
    },
    sendSignin() {
      let token = "";
      if (this.email == "" || this.password == "") {
        alert(
          "Veuillez saisir votre email et votre mot de passe pour vous connecter"
        );
      } else {
        console.log(this.email)
        fetch(`http://localhost:3000/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer${token}`
              },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          }),})
        .then(function(res) {
          if (res.ok) {
            // console.log(res.json())
            return res.json();
            // return res;
          }
        })
        .then(function(res) {
          let response = res.body;
          // let response = res.body
          // console.log(response);
          // let response = res.json();
          let userObject = JSON.stringify(response);
          // let response = res.body;
          // let userObject = JSON.stringify(response);
          // console.log(userObject);
          console.log(res);
          console.log(res.token);
          console.log(res.userId);

          this.$localStorage.setItem("user", userObject);
          let user = JSON.parse(this.$localStorage.getItem("user"));

          // if(token = user.token) {
          //   window.location.href = "/home";
          // }else{
          //   window.location.href = "/";
          //   alert("Veuillez vous inscrire en cliquant sur signup")
          // };
          console.log(this.email)
          // console.log(this.email)
          token = user.token;
          this.router.push('home')
          // window.location.href = "/home";
          // location.reload(true);
          // if (user.status == "admin") {
          //   window.location.href = "/home";
          //   location.reload(true);
          // } else {
          //   window.location.href = "/home";
          //   location.reload(true);
          // }
        })

        // .catch(function(err) {
        //   response.status(400).json({message: "Probleme d'inscription !"});
        // });

        // .catch(error => response.status(400).json({message: "Probleme d'inscription !"}))
      }
    }
  }
}
</script>

