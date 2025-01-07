<script setup>
import { computed } from 'vue'
import { useEnvironmentStore } from '@/stores/environment'

const environmentStore = useEnvironmentStore()
const isDev = computed(() => environmentStore.environment === 'dev')

defineProps({
  onClick: Function,
})
</script>

<template>
  <button
    :class="[
      'rounded-md p-2 text-white',
      isDev ? 'bg-blue-200 hover:bg-blue-500' : 'bg-yellow-500 hover:bg-yellow-700',
    ]"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>
