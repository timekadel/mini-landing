import {
  createWebHistory,
  createRouter
} from "vue-router"
import MainActivity from '@/views/activities/main/main.activity.vue';

export default createRouter({
  routes: [
    {path: "/", name: "App", component: MainActivity},
    {path: "/:catchAll(.*)", name: "NotFound", redirect:{name: "App"}}
  ],
  history: createWebHistory(),
});