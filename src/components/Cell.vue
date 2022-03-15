<script setup lang="ts">
import { useGame } from '../stores/game'

defineProps<{ cell: number }>()

const store = useGame()
</script>

<template>
  <div class="w-24 h-24 mx-auto text-transparent transition border-8 border-blue-800 rounded-full cursor-pointer bg-slate-400/20 backdrop-blur-sm" @click="store.select(cell)" @mouseenter="store.handleHoverColumn(cell, false)" @mouseleave="store.handleHoverColumn(cell, true)" :class="{'border-slate-300': store.hoveredColumnCells.includes(cell)}">
    <div class="flex items-center justify-center w-full h-full text-5xl font-bold transition rounded-full select-none font-mochi text-bold" :class="{'border-6': store.cellStatus(cell), 'bg-red-600 border-red-700 text-red-700': store.cellStatus(cell) === 'red', 'bg-yellow-400 border-yellow-500 text-yellow-500': store.cellStatus(cell) === 'yellow'}">
      {{ store.cellStatus(cell) ? 4 : '' }}
    </div>
  </div>
</template>
