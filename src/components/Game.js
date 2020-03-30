import React from 'react'
import uuid from 'uuid'
import Board from './Board'
// import GameInfo from './GameInfo';

class Game extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true
    }
    this.calculateWinner = this.calculateWinner.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.jumpTo = this.jumpTo.bind(this)
  }

  calculateWinner (squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  handleClick (i) {
    const { history, stepNumber, xIsNext } = this.state
    const hist = history.slice(0, stepNumber + 1)
    const current = hist[hist.length - 1]
    const squares = current.squares.slice()

    if (this.calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = xIsNext ? 'X' : '0'
    this.setState({
      history: hist.concat([{
        squares
      }]),
      stepNumber: hist.length,
      xIsNext: !xIsNext
    })
  }

  jumpTo (step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }

  render () {
    const { history, stepNumber, xIsNext } = this.state
    const current = history[stepNumber]
    const winner = this.calculateWinner(current.squares)

    const moves = history.map((step, move) => {
      const desc = move
        ? `Go to move #${move}`
        : 'Go to game start'
      return (
        <li key={uuid.v4()}>
          <button type="submit" onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status

    if (winner) {
      status = `Winner: ${winner}`
    } else if (stepNumber === 9) {
      status = 'It\'s a draw'
    } else {
      status = `Next player: ${xIsNext ? 'X' : 'O'}`
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        {/* <div>
          <GameInfo history={history}
            stepNumber={stepNumber}
            xIsNext={xIsNext}
            winner={winner}
            handleClick={jumpTo}

          />
        </div> */}
      </div>
    )
  }
}

export default Game
