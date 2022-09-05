import { createApp } from 'vue'
// import { createStore } from 'vuex'
import App from './App.vue'
import '../public/css/style.css'
import router from "./router/index"

createApp(App).use(router).mount('#app')

new Vue({
  el: '#app',
  render(h) { return h(App) }
})

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')

// createApp(App).mount('#app')

// // const app = createApp(App)

// const store = createStore({
//   state () {
//     return {
//       count: 0
//     }
//   },
//   mutations: {
//     increment (state) {
//       state.count++
//     }
//   }
// })

// const app = createApp({ App/* your root component */ })

// // Install the store instance as a plugin
// app.use(store)
