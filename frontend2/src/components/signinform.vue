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
              <div class="log__form__submit--signIn">
                <input  class="log-links regular-button blue-btn" type="button" value="SingIn" id="signIn" @click="sendSignin()"/>
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
        password:"",
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
        fetch(`http://localhost:3000/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer${token}`
              },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          })
        })
        .then(function(res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then(function(res) {
          let response = res.body;
          var token = res.token;

          var tokenObject = { token };
          localStorage.setItem('tokenObject', JSON.stringify(tokenObject));
          localStorage.setItem("user", res.userId);
          localStorage.setItem("firstName", res.userFirstName);
          localStorage.setItem("lastName", res.userLastName);
          localStorage.setItem("admin", res.userAdmin)

          window.location.href = "/home";
        })

        .catch(error => response.status(400).json({message: "Probleme d'inscription !"}))
      }
    }
  }
}
</script>

