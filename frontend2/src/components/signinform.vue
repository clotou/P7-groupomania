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
              <input type="email" name="email" id="email" required v-model="text" placeholder="  marie.dupont@groupomania.com"/>
              <p id="emailErrorMsg"></p>
            </div>
            <div class="log__form__question">
              <label for="password">Password:</label>
              <input type="password" name="password" id="password" required v-model="text" placeholder="  123ABC!"/>
              <p id="passwordErrorMsg"></p>
            </div>
            <div class="submit-section">
              <div class="log__form__submit--signIn regular-button blue-bt" disabled>
                <input type="submit" value="SingIn" id="signIn"/>
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
    sendSignup() {
        fetch(`http://localhost:3000/api/login`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer${token}`
              },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          }),})
        .then(response => {
          let reponse = response.data;

            let userObject = JSON.stringify(reponse);
            this.$localStorage.set("user", userObject);

            let user = JSON.parse(this.$localStorage.get("user"));
            token = user.token;
            if (user.status == "admin") {
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

