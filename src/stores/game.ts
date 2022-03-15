import { defineStore, acceptHMRUpdate } from 'pinia'
import { checkWinner } from 'matrix-winner-decider'

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
      winnerCells: []
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
    },
    isWinnerCell: (state) => {
      return (cellNumber: number): boolean => state.winnerCells.map((position) => (position[0] * state.COLUMNS + position[1]) + 1).includes(cellNumber)
    },
    hasEnded: (state) => state.winnerCells && state.winnerCells.length
  },
  actions: {
    select(cellNumber: number) {
      if (this.cellStatus(cellNumber) === '' && !this.hasEnded) {
        this.board[this.firstSelectableCellInColumn(cellNumber)][(cellNumber - 1) % this.COLUMNS] = this.currentPlayer.mark
        
        this.winnerCells = checkWinner(this.board, this.PLAYERS.map((player) => player.mark), 4)

        if (!this.hasEnded) {
          this.toggleCurrentPlayer()
          this.handleHoverColumn(cellNumber, false)
        }
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
    },
    restart() {
      this.board = [...Array(this.ROWS)].map(() => [...Array(this.COLUMNS)].map(() => ''))
      this.winnerCells = []
      this.currentPlayer = this.PLAYERS[0]
      this.hoveredColumnCells = Array()
    }
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGame, import.meta.hot))
}