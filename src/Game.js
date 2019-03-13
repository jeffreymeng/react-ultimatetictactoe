import React from "react";
import Board from "./Board.js";


class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [{
				boards: Array(9).fill({squares:Array(9).fill(null),winner:null}),
				winner:null
			}],
			xIsNext: true,
			stepNumber: 0

		};

	}


	handleClick(i, board) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const boards = copy(current.boards);
		if (boards[board].squares[i]) {
			return;
		}
		console.log(boards[board]);
		boards[board].winner = calculateWinner(boards[board].squares)

		boards[board].squares[i] = this.state.xIsNext ? "X" : "O";


		this.setState({
			history: history.concat([{
				boards: boards,
				winner:	null
			}]),
			xIsNext: !this.state.xIsNext,
		});
	}

	renderBoard(i, boards) {

		return (<td>
			<Board
				squares={boards[i].squares}
				onClick={(innerIndex, boardIndex) => this.handleClick(innerIndex, boardIndex)}
				board={i}
			/>
		</td>);
	}

	render() {
		const history = this.state.history;
		const current = history[history.length - 1];
		const winner = calculateGameWinner(current);

		const status = winner !== null ? winner + " has won" : this.state.xIsNext ? "X's Turn" : "O's Turn";
		return (
			<div className="game">
				<table>
					<tbody className="game-board">
						<tr className="board-row">

							{this.renderBoard(0, current.boards)}
							{this.renderBoard(1, current.boards)}
							{this.renderBoard(2, current.boards)}

						</tr>
						<tr className="board-row">
							{this.renderBoard(3, current.boards)}
							{this.renderBoard(4, current.boards)}
							{this.renderBoard(5, current.boards)}
						</tr>
						<tr className="board-row">
							{this.renderBoard(6, current.boards)}
							{this.renderBoard(7, current.boards)}
							{this.renderBoard(8, current.boards)}
						</tr>
					</tbody>
				</table>
				<div className="game-info">
					<div> {status} </div>
				</div>
			</div>
		);
	}
}

function calculateWinner(squares) {
	if (squares == null) {
		return null;
	}
	console.log(squares);
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
function calculateGameWinner(board) {
	console.log(board);
	if (board == null) {
		return null;
	}
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
		console.log(JSON.stringify(JSON.parse(board)));
		if (board[a].winner && board[a].winner === board[b].winner && board[a].winner === board[c].winner) {
			return board[a].winner;
		}
	}
	return null;
}
function copy(object) {
	let newCopy;
	let i;

	if (typeof object !== 'object') {
		return object;
	}
	if (!object) {
		return object;
	}

	if ('[object Array]' === Object.prototype.toString.apply(object)) {
		newCopy = [];
		for (i = 0; i < object.length; i += 1) {
			newCopy[i] = copy(object[i]);
		}
		return newCopy;
	}

	newCopy = {};
	for (i in object) {
		if (object.hasOwnProperty(i)) {
			newCopy[i] = copy(object[i]);
		}
	}
	return newCopy;
}

export default Game;