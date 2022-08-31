<template>
<!-- formulaire sign in -->
  <section class="form-container" id="signinform">
    <div class="logform-bg">
      <div class="log-links">
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
              <div class="log__form__submit--signIn regular-button" disabled>
                <input type="submit" value="SingIn" id="signIn" @click="submit"/>
              </div>
            </div>
          </form>
      </div>
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
    // signin() {
    //     axios.post("http://localhost:3000/api/auth/", {
    //       email: this.email,
    //       password: this.password
    //     })
    //     .then(function (response) {
    //         var statut = response.status;
    //         if (statut === 201 || statut === 200) {
    //         Swal.fire({
    //             text: "Compte créé, veuillez vous connecter.",
    //             footer: "Connexion en cours...",
    //             icon: "success",
    //             timer: 3000,
    //             showConfirmButton: false,
    //             timerProgressBar: true,
    //             willClose: () => { router.push("/signup") }
    //         })
    //         }
    //     })
    //     .catch(function (error) {
    //             const codeError = error.message.split("code ")[1]
    //             let messageError = ""
    //             switch (codeError){
    //                 case "401": messageError = "Adresse email déjà utilisée !";break
    //             }
    //             Swal.fire({
    //                 title: "Une erreur est survenue",
    //                 text: messageError || error.mesage,
    //                 icon: "error",
    //                 timer: 3500,
    //                 showConfirmButton: false,
    //                 timerProgressBar: true
    //             })
    //         });
    // }
  }
}
</script>
