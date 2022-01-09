<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ position: number }>()

const status = ref(0)

function select () {
    status.value = status.value === 1 ? 2 : 1
}
</script>

<template>
  <div class="w-24 h-24 mx-auto border-8 border-blue-800 rounded-full cursor-pointer bg-slate-600" @click="select">
    <div class="flex items-center justify-center w-full h-full text-4xl text-white rounded-full select-none" :class="{'border-6': status !== 0, 'bg-red-600 border-red-700': status === 1, 'bg-yellow-400 border-yellow-500': status === 2}">
        {{ position }}
    </div>
  </div>
</template>
