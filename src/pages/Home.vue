<script setup>
import ImageUploader from '@/components/ui/ImageUploader.vue'
import EnvSwitcher from '@/components/ui/EnvSwitcher.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col px-4 md:px-8 lg:px-16">
    <header class="flex items-center justify-between py-4">
      <h1 class="text-2xl font-semibold md:text-4xl">Favicon Generator</h1>
      <EnvSwitcher />
    </header>
    <ImageUploader />
  </div>
</template>

<style scoped></style>
