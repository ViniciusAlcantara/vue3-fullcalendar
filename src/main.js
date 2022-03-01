import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'

const app = createApp(App).use(store)

app.use(Quasar, quasarUserOptions) // add quasar ui components
app.use(VueAxios, axios) // add axios http calls

app.provide('axios', app.config.globalProperties.axios) // provide 'axios'

app.mount('#app')
