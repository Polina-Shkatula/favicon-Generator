import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useEnvironmentStore = defineStore('environmentStore', () => {
  const environment = ref('dev')

  const setEnvironment = (env) => {
    environment.value = env
    document.body.classList.remove('bg-dev', 'bg-staging')
    document.body.classList.add(`bg-${env}`)
  }
  return { environment, setEnvironment }
})
