<template>
<!-- formulaire signup -->
<section class="form-container" id="signupform">
      <div class="logform-bg">
        <div class="log-links">
          <span class="log-links--effect"><router-link to="/" @click="switchToSignin()">SingIn</router-link></span> / <span class="signUp">SignUp</span>
        </div>
        <form v-on:submit.prevent="signup">
          <div class="log__form__question">
            <label for="lastName">Nom:</label>
            <input type="text" name="lastName" id="lastName" required v-model="lastName" placeholder="  Dupont" pattern="^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]+$"/>
            <p id="lastNameErrorMsg"></p>
          </div>
          <div class="log__form__question">
            <label for="firstName">Prénom:</label>
            <input type="text" name="firstName" id="firstName" required v-model="firstName" placeholder="  Marie" pattern="^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]+$"/>
            <p id="firstNameErrorMsg">
              <!-- ici est un message d'erreur -->
            </p>
          </div>
          <div class="log__form__question">
            <label for="email">Email:</label>
            <input type="email" name="email" id="email" required v-model="email" placeholder="  marie.dupont@groupomania.com" pattern="^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"/>
            <p id="emailErrorMsg"></p>
          </div>
          <div class="log__form__question">
            <label for="password">Password:</label>
            <input type="password" name="password" id="password" required v-model="password" placeholder="  123ABC!"/>
            <p id="passwordErrorMsg"></p>
          </div>
          <div class="submit-section">
            <div class="log__form__submit--signIn regular-button blue-bt" disabled>
              <input type="submit" value="SingUp" id="signUp" @click="sendSignup()"/>
            </div>
          </div>
        </form>
      </div>
    </section>
</template>


<script>
export default {
  name: 'signupform',
  data(){
    return{
      firstName: "",
      lastName: "",
      email:"",
      password:""
    }
  },
  methods: {
    switchToSignin() {
      this.mode = "signin";
    },
    sendSignup() {
      console.log(this.firstName)
      if (this.firstName == "" || this.lastName == "" || this.email == "" || this.password == "") {
        alert(
          "Veuillez saisir vos coordonnées pour créer un compte"
        );
      } else {
      fetch(`http://localhost:3000/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
        }),
      })
      .then(response => {
        console.log(this.firstName)
        console.log(this.lastName)
        let reponse = response.data;
        // let userObject = JSON.stringify(reponse);
        // this.$localStorage.set("user", userObject);

// retrieve the firstName

        localStorage.setItem('firstName', this.firstName);
//retrieve the lastName
        localStorage.setItem('lastName', this.lastName);
        // var lastName = response.lastName;
        // console.log(lastName);

        // var lastNameObject = { lastName };
        // localStorage.setItem('lastNameObject', JSON.stringify(lastNameObject));

        // console.log(response.lastName);

        // localStorage.setItem("lastName", response.lastName);
        // let user = JSON.parse(this.$localStorage.get("user"));
        // token = user.token;

        window.location.href = "/";



        // if (user.status == "admin") {
        //   window.location.href = "/home";
        //   location.reload(true);
        // } else {
        //   window.location.href = "/home";
        //   location.reload(true);
        // }
      })
    }
    }
  }
}
</script>
