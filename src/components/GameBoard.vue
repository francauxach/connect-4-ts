<script setup lang="ts">
import Cell from './Cell.vue'
import { useGame } from '../stores/game'

const store = useGame()
</script>

<template>
  <div class="grid w-full max-w-4xl grid-cols-7 gap-4 p-4 bg-blue-700 rounded-lg outline outline-8 outline-blue-800">
    <Cell v-for="cell in store.totalCells" :cell="cell" :key="cell" />
  </div>
</template>
