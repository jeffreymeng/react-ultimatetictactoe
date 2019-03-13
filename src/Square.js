import React from "react";

function Square(props){

	return (
		<button
			className={(props.hover ? "hover square" : "square") + " " + (props.value === "X" ? "blue" : "red") + " " + props.bgColor}
			onClick={() => props.onClick()}
		>
			{props.value}
		</button>
	);

}

export default Square;