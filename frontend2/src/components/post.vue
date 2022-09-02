<template>
  <div class="post">
      <div class="post-block-up">
        <div class="name-container postSpaces">
          <!-- <p>{{ post.userId.firstName }} {{ post.userId.lastName }}</p> -->
          <p>Marie D</p>
        </div>
        <div class="post-container posted-post-spaces">
          <div class="date-container">
            <!-- createdAt ? -->
            <!-- <h3>{{ formatDate(date) }}</h3> -->
            <h3>22/07/22 - 10:20</h3>
          </div>
          <div class="title-container">
            <!-- <h2 id="title">{{title}}</h2> -->
            <h2 id="title">Marc et Antoine du markeitng grillés en pause café</h2>
          </div>
          <div class="picture-container">
            <!-- <img v-bind:src="imageUrl" alt="2 persons speaking" class="picpost"> -->
            <img src="../../public/marcantoine.png" alt="l'image publiée" class="picpost">
          </div>
        </div>
      </div>
          <!-- </div> -->
      <div class="post-block-bottom">
        <div class="like-side">
          <!-- <p id="likes">{{like}}</p> -->
          <p id="likes">4</p>
          <img src="../../public/thumbs-up-black-icon.webp" alt="thumb-up" class="thumb">
        </div>
        <div class="button-side">
          <div>
            <button type="submit" class="regular-button pink-bt" id="modifier" >Modifier</button>
          </div>
          <div>
            <button type="submit" class="regular-button red-bt" id="supprimer" >Supprimer</button>
          </div>
        </div>
      </div>
    </div>
</template>
