<script setup lang="ts">
import Cell from './Cell.vue'
</script>

<template>
  <div class="grid w-full max-w-4xl grid-cols-7 gap-4 p-4 bg-blue-700">
    <Cell v-for="position in 42" :position="position" :key="position" />
  </div>
</template>
