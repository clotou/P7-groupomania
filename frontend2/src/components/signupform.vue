<template>
<!-- formulaire signup -->
<section class="form-container" id="loginform">
      <div class="logform-bg">
        <div class="log-links">
          <span class="log-links--effect"><router-link to="/" @click="switchToSignin()">SingIn</router-link></span> / <span class="signUp">SignUp</span>
        </div>
        <form method="post" class="log__form" id="signUp-form" @submit.prevent = "envoi">
          <div class="log__form__question">
            <label for="lastName">Nom:</label>
            <input type="text" name="lastName" id="lastName" required v-model="text" placeholder="  Dupont" pattern="^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]+$"/>
            <p id="lastNameErrorMsg"></p>
          </div>
          <div class="log__form__question">
            <label for="firstName">Prénom:</label>
            <input type="text" name="firstName" id="firstName" required v-model="text" placeholder="  Marie" pattern="^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]+$"/>
            <p id="firstNameErrorMsg">
              <!-- ici est un message d'erreur -->
            </p>
          </div>
          <div class="log__form__question">
            <label for="email">Email:</label>
            <input type="email" name="email" id="email" required v-model="text" placeholder="  marie.dupont@groupomania.com" pattern="^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"/>
            <p id="emailErrorMsg"></p>
          </div>
          <div class="log__form__question">
            <label for="password">Password:</label>
            <input type="password" name="password" id="password" required v-model="text" placeholder="  123ABC!"/>
            <p id="passwordErrorMsg"></p>
          </div>
          <div class="submit-section">
            <div class="log__form__submit--signUp regular-button blue-bt">
              <input type="submit" value="SingUp" id="signUp" @click="submit"/>
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
    // signup() {
    //     axios.post("http://localhost:3000/api/auth/signup", {
    // firstName: this.firstName,
    // lastName: this.lastName,
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
