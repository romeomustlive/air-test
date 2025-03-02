import './assets/main.css'
import 'vue-final-modal/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createVfm } from 'vue-final-modal'

const vfm = createVfm()

createApp(App).use(vfm).mount('#app')
