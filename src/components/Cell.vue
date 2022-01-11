<script setup lang="ts">
defineProps<{ status: string }>()
defineEmits(['select'])
</script>

<template>
  <div class="w-24 h-24 mx-auto border-8 border-blue-800 rounded-full cursor-pointer bg-slate-400/20 backdrop-blur-sm" @click="$emit('select')">
    <div class="flex items-center justify-center w-full h-full text-4xl text-white rounded-full select-none" :class="{'border-6': status !== '', 'bg-red-600 border-red-700': status === 'X', 'bg-yellow-400 border-yellow-500': status === 'O'}">
        {{ status }}
    </div>
  </div>
</template>
