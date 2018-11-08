import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props){

	return (
			<button
				className={props.hover ? "hover square" : "square"}
				onClick={() => props.onClick()}
				onMouseEnter={() => props.onSquareMouseEnter()}
				onMouseLeave ={() => props.onSquareMouseLeave()}
			>
				{props.value}
			</button>
	);

}

class Board extends React.Component {



	renderSquare(i) {
		return <Square
			value={this.props.squares[i]}
			onClick={() => this.props.onClick(i)}
			onSquareMouseEnter={() => this.props.onSquareMouseEnter(i)}
			onSquareMouseLeave={() => this.props.onSquareMouseLeave(i)}
			hover={this.props.hoveringSquareIndex === i}
		/>;
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
			xIsNext: true,
			stepNumber: 0

		};

	}

	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) === 0,
		});
	}

	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = this.state.xIsNext ? "X" : "O";
		this.setState({
			history: history.concat([{
				squares: squares,
			}]),
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext,
			hoveringButtonIndex:false,
			hoveringSquareIndex:false
		});
	}

	onSquareMouseEnter(i) {
		for (let index = 0; index < this.state.history.length; index ++) {

			if (this.state.history[index].squares[i] != null) {
				this.setState({hoveringButtonIndex:index});
				return;
			}


		};


	}
	onSquareMouseLeave(i) {

		this.setState({hoveringButtonIndex:false});
	}

	onButtonMouseEnter(i) {

		if (i < 1) {
			return;
		}

		for (let index = 0; index < this.state.history[i].squares.length; index ++) {
			if (this.state.history[i - 1].squares[index] !== this.state.history[i ].squares[index]) {
				//if a square in the last state had nothing but the current state has the same square filled, that square was added in this state.
				this.setState({hoveringSquareIndex:index});
				return;

			}
		}



	}
	onButtonMouseLeave(i) {

		this.setState({hoveringSquareIndex:false});
	}


	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);

		const moves = history.map((step, move) => {
			const desc = move ?
				'Go to move #' + move :
				'Go to game start';
			return (
				<li key={move}>
					<button
						onClick={() => this.jumpTo(move)}
						className={move === (this.state.hoveringButtonIndex) ? "hover" : ""}
						onMouseEnter={() => this.onButtonMouseEnter(move)}
						onMouseLeave={() => this.onButtonMouseLeave(move)}
					>{desc}</button>
				</li>
			);
		});

		let status;
		if (winner) {
			status = "Winner: " + winner;
		} else {
			status = "Next player: " + (this.state.xIsNext ? "X" : "O");
		}

		return (
			<div className="game">
				<div className="game-board">
					<Board
						squares={current.squares}
						onClick={(i) => this.handleClick(i)}
						onSquareMouseEnter={(i) => this.onSquareMouseEnter(i)}
						onSquareMouseLeave={(i) => this.onSquareMouseLeave(i)}
						hoveringSquareIndex={this.state.hoveringSquareIndex}
					/>
				</div>
				<div className="game-info">
					<div> {status} </div>
					<ol> {moves} </ol>
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
	document.getElementById("root")
);

