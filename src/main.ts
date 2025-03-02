import { createApp } from 'vue'
import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'

import App from './App.vue'
import './assets/main.css'

const vfm = createVfm()

createApp(App).use(vfm).mount('#app')
