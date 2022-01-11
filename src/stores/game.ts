import { defineStore, acceptHMRUpdate } from 'pinia'

export const useGame = defineStore('game', {
  state: () => {
    const COLUMNS = 7
    const ROWS = 6
    const PLAYERS = [
      {
        name: 'Player 1',
        mark: 'red',
      },
      {
        name: 'Player 2',
        mark: 'yellow',
      }
    ]

    return {
      COLUMNS: COLUMNS,
      ROWS: ROWS,
      PLAYERS: PLAYERS,
      board: [...Array(ROWS)].map(() => [...Array(COLUMNS)].map(() => '')),
      currentPlayer: PLAYERS[0],
    }
  },
  getters: {
    totalCells: (state) => state.COLUMNS * state.ROWS,
    cellStatus: (state) => {
      return (cellNumber: number) => state.board[Math.floor((cellNumber - 1) / state.COLUMNS)][(cellNumber - 1) % state.COLUMNS]
    },
  },
  actions: {
    select(cellNumber: number) {
      if (this.cellStatus(cellNumber) === '') {
        this.board[Math.floor((cellNumber - 1) / this.COLUMNS)][(cellNumber - 1) % this.COLUMNS] = this.currentPlayer.mark
  
        this.toggleCurrentPlayer()
      }
    },
    toggleCurrentPlayer() {
      this.currentPlayer = this.PLAYERS.filter(player => player.mark !== this.currentPlayer.mark)[0]
    }
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGame, import.meta.hot))
}