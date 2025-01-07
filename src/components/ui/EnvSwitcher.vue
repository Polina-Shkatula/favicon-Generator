<script setup>
import { ref, watch } from 'vue'
import { useEnvironmentStore } from '@/stores/environment'

const environmentStore = useEnvironmentStore()
const isDev = ref(environmentStore.environment === 'dev')

const changeEnvironment = () => {
  const environment = isDev.value ? 'dev' : 'staging'
  environmentStore.setEnvironment(environment)
}

watch(
  () => environmentStore.environment,
  (newEnv) => {
    isDev.value = newEnv === 'dev'
  },
)
</script>

<template>
  <div class="flex justify-end">
    <label
      for="Toggle3"
      class="inline-flex cursor-pointer text-sm text-gray-100 md:text-base lg:text-lg"
    >
      <input
        id="Toggle3"
        type="checkbox"
        name="environment"
        v-model="isDev"
        class="peer hidden"
        @change="changeEnvironment"
      />
      <span
        class="rounded-l-md p-2 dark:bg-gray-700 peer-checked:dark:bg-violet-600"
        :class="{ 'bg-gray-700': isDev, 'bg-violet-600': !isDev }"
      >
        Dev
      </span>
      <span
        class="rounded-r-md p-2 dark:bg-violet-600 peer-checked:dark:bg-gray-700"
        :class="{ 'bg-gray-700': isDev, 'bg-violet-600': !isDev }"
      >
        Stage
      </span>
    </label>
  </div>
</template>

<style scoped></style>
