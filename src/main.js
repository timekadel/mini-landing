import Vue, {
  createApp
} from 'vue'

import './index.css'
import './assets/tailwind.css'
import EvaIcons from 'vue-eva-icons'

import App from './App.vue'

import Toolbar from "@/views/components/toolbar.component.vue";
import ScrollUp from "@/views/components/scrollup.component.vue";
import Section from "@/views/components/section.component.vue";
import Footer from "@/views/components/footer.component.vue";

import Router from '@/plugins/router.js'
import utils from '@/plugins/utils';
import axios from 'axios'


Vue.configureCompat({ RENDER_FUNCTION: false })


Vue.use(EvaIcons)
const app = createApp(App)
app.component('appToolbar', Toolbar)
.component('appScrollup', ScrollUp)
.component('appSection', Section)
.component('appFooter',Footer)
app.config.globalProperties.$utils = utils;
app.config.globalProperties.$http = axios;
app.use(Router)
app.mount('#app');