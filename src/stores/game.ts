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
      hoveredColumnCells: Array(),
    }
  },
  getters: {
    totalCells: (state) => state.COLUMNS * state.ROWS,
    cellStatus: (state) => {
      return (cellNumber: number) => state.board[Math.floor((cellNumber - 1) / state.COLUMNS)][(cellNumber - 1) % state.COLUMNS]
    },
    firstSelectableCellInColumn: (state) => {
      return (cellNumber: number) => state.board.map((cell, index) => {
        return {
          cell: cell[(cellNumber - 1) % state.COLUMNS],
          index: index
        }
      }).reverse().filter(cellObj => cellObj.cell === '')[0].index
    }
  },
  actions: {
    select(cellNumber: number) {
      if (this.cellStatus(cellNumber) === '') {
        this.board[this.firstSelectableCellInColumn(cellNumber)][(cellNumber - 1) % this.COLUMNS] = this.currentPlayer.mark
  
        this.toggleCurrentPlayer()
        this.handleHoverColumn(cellNumber, false)
      }
    },
    toggleCurrentPlayer() {
      this.currentPlayer = this.PLAYERS.filter(player => player.mark !== this.currentPlayer.mark)[0]
    },
    handleHoverColumn(cellNumber: number, reset: boolean) {
      this.hoveredColumnCells = reset ? Array() : [...Array(this.ROWS)].map((_, index) => {
        let cellIndex = index * this.COLUMNS + (cellNumber - 1) % this.COLUMNS + 1
        return this.cellStatus(cellIndex) === '' ? cellIndex : null
      })
    }
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGame, import.meta.hot))
}