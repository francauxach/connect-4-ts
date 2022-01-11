import { defineStore, acceptHMRUpdate } from 'pinia'

export const useGame = defineStore('game', {
  state: () => {
    const COLUMNS = 7
    const ROWS = 6

    return {
      COLUMNS: COLUMNS,
      ROWS: ROWS,
      board: [...Array(ROWS)].map(() => [...Array(COLUMNS)].map(() => ''))
    }
  },
  getters: {
    totalCells: (state) => state.COLUMNS * state.ROWS,
    cellStatus: (state) => {
      return (cellNumber: number) => state.board[Math.floor((cellNumber - 1) / state.COLUMNS)][(cellNumber - 1) % state.COLUMNS]
    }
  },
  actions: {
    select(cellNumber: number) {
      this.board[Math.floor((cellNumber - 1) / this.COLUMNS)][(cellNumber - 1) % this.COLUMNS] = 'X'
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGame, import.meta.hot))
}