import React from 'react';

let status; 

    if (winner) {
      status = `Winner: ${winner}`;
    } else if (stepNumber === 9) {
      status = 'It\'s a draw';
    } else {
      status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }
    return (
        <div></div>
    )

    


export default GameInfo;
