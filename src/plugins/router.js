import {
  createWebHistory,
  createRouter
} from "vue-router"
import MainActivity from '@/views/activities/main/main.activity.vue';
import SubActivity from '@/views/activities/sub/sub.activity.vue'
import ScrollHandler from '@/plugins/utils/scroll.handler.js'
import Sub from "@/minilanding/sub"

const router = createRouter({
  routes: [{
      path: "/",
      name: "App",
      meta: {
        meta: {
          xPosition: 0,
          yPosition: 0,
        },
      },
      component: MainActivity
    },
    {
      path: "/:subName",
      name: "Sub",
      beforeEnter:(to)=>{
        if(!Object.keys(Sub).includes(to.path.replace('/',''))){
          return {
            name: "App"
          }
        }
      },
      meta: {
        xPosition: 0,
        yPosition: 0,
        sub: true
      },
      component: SubActivity
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      redirect: {
        name: "App"
      }
    }
  ],
  history: createWebHistory(),
});

router.beforeEach((to, from) => {
  if (from.matched.length) {
    from.matched[0].meta.yPosition = ScrollHandler.scrollY;
  }
})

export default router;