<template>
  <div class="min-h-screen flex flex-col bg-gray-900 text-white">
    <div class="grow">
      <router-view />
    </div>

    <Footer v-if="!hideFooter" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Footer from './components/layout/Footer.vue'

const route = useRoute()

const hideFooter = computed(() => ['/login', '/signup'].includes(route.path))
</script>
