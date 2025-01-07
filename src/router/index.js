import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Editor from '@/pages/Editor.vue'
import Projects from '@/pages/Projects.vue'
import Setting from '@/pages/Setting.vue'
import { ROUTES_PATH } from '@/constants/router.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES_PATH.HOME,
      name: ROUTES_PATH.HOME,
      component: Home,
    },
    {
      path: ROUTES_PATH.EDITOR,
      name: ROUTES_PATH.EDITOR,
      component: Editor,
      props: true,
    },
    {
      path: ROUTES_PATH.PROJECTS,
      name: ROUTES_PATH.PROJECTS,
      component: Projects,
      props: true,
    },
    {
      path: ROUTES_PATH.SETTING,
      name: ROUTES_PATH.SETTING,
      component: Setting,
      props: true,
    },
  ],
})

export default router
