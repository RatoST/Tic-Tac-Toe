import React from 'react';
import Board from './Board';


class GameInfo extends React.Component {
  handleClick(i) {
    const { history, stepNumber } = this.state;
    const hist = history.slice(0, stepNumber + 1);
    const current = hist[hist.length - 1];
    const squares = current.squares.slice();

    this.setState({
      history: hist.concat([{
        squares,
      }]),
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const { history, stepNumber, xIsNext } = this.state;
    const current = history[stepNumber];


    const moves = history.map((step, move) => {
      const desc = move ?
        `Go to move #${move}` :
        'Go to game start';
      return (
        <li key={uuid.v4()}>
          <button type="submit" onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

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
      </div>
    );
  }

}
export default GameInfo;
