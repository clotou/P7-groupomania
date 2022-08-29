<template>
<!-- formulaire sign up -->
  <section class="form-container" id="signupform">
    <div class="logform-bg">
      <div class="log-links">
        <div class="log-links">
            <span class="log-links--effect">SingIn</span> / <span class="log-links--effect">SignUp</span>
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
    name: 'signup',
    data(){
      return{
        firstName:"",
        lastName:"",
        email:"",
        password:""
       }
    }
}
</script>
