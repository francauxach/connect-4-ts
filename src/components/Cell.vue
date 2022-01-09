<script setup lang="ts">
defineProps<{ position: number }>()
</script>

<template>
  <div class="flex items-center justify-center w-24 h-24 mx-auto bg-white border-8 border-blue-800 rounded-full cursor-pointer">
    {{ position }}
  </div>
</template>
