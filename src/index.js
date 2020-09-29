import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
  
  class Board extends React.Component {
    renderSquare(i) {
      return (
          <Square 
          value={this.props.squares[i]} 
          onClick={() => this.props.onClick(i)}
          />
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
  
  class Game extends React.Component {
      constructor(props) {
          super(props);
          this.state = {
              history: [{
                  squares: Array(9).fill(null),
              }], 
              moveLocations: [],
              stepNumber: 0,
              xIsNext: true,
          };
      }

      handleClick(i) {
          const history = this.state.history.slice(0, this.state.stepNumber + 1);
          const current = history[history.length - 1];
          const squares = current.squares.slice();
          const moveLocations = this.state.moveLocations.slice(0, this.state.stepNumber );
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        console.log("click at location " + i);

        
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            moveLocations: moveLocations.concat(i),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const location = this.state.moveLocations[move - 1];
            let row;
            const col = location % 3 + 1;
            
            if (location < 3) {
                row = 1;
            } else if (location < 6) {
                row = 2;
            } else {
                row = 3;
            }

            const desc = move ? `Go to move # ${move} at row ${row}, col ${col}` : 'Go to game start';



            return (
                <li key={move}>
                    <button className={`default-button ${move + 1 === history.length && 'bold'}`} onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = "Winner: " + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

      return (
        <div className="game">
          <div className="game-board">
            <Board
                squares={current.squares}
                onClick={(i) => this.handleClick(i)} 
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
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );