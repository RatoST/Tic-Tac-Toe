import React from 'react';
import PropTypes from 'prop-types';

function Square(props) {
  return (
    <button type="submit" className="square" onClick={props.onClick}>
      {props.value}
    </button>
    //<button type="submit" className="square" onClick={props.onClick}>{props.value}
  );
}

Square.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.number,
};


class Board extends React.Component {
  renderSquare(i) {
    const { squares, onClick } = this.props;
    return (
      <Square value={squares[i]} onClick={() => onClick(i)} />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

Board.propTypes = {
  onClick: PropTypes.func,
  squares: PropTypes.number,
};

export default Board;
