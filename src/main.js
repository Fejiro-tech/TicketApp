import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCircleUser, faTicketAlt, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faCircleUser, faTicketAlt, faEdit, faTrash)

const app = createApp(App)

app.use(Vue3Toastify, {
  autoClose: 3000,
  position: 'top-center',
  hideProgressBar: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'light'
})

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.mount('#app')

