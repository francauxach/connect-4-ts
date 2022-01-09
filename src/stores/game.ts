import { defineStore, acceptHMRUpdate } from 'pinia'

export const useGame = defineStore('game', {
  state: () => {
    return {
      COLUMNS: 7,
      ROWS: 6,
    }
  },
  getters: {
    cellsNumber: (state) => state.COLUMNS * state.ROWS,
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGame, import.meta.hot))
}