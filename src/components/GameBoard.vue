<script setup lang="ts">
import Cell from './Cell.vue'
import { useGame } from '../stores/game'

const store = useGame()
</script>

<template>
  <div class="grid w-full max-w-4xl grid-cols-7 gap-4 p-4 bg-blue-700">
    <Cell v-for="cell in store.totalCells" :status="store.cellStatus(cell)" :key="cell" @select="store.select(cell)" />
  </div>
</template>
