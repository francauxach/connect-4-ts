<script setup lang="ts">
import { useGame } from './stores/game'
import GameBoard from './components/GameBoard.vue'

const store = useGame()
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen bg-sky-800">
    <GameBoard />
    <div class="flex justify-center w-full mt-10">
      <button class="px-6 py-3 text-center uppercase transition-colors rounded text-slate-300 bg-sky-400/20 font-mochi hover:bg-sky-900" @click="store.restart()">Restart</button>
    </div>
  </div>
</template>