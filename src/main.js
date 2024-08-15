import './assets/global.css'
import './assets/dark.css'
import './assets/light.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
