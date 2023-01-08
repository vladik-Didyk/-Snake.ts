// This file consists of constants
//that represents actions that our application 
//can perform and dispatch to the Redux store. 
//An example of such an action constant l
//ooks like this:

export const MOVE_RIGHT = "MOVE_RIGHT"
export const MOVE_LEFT = "MOVE_LEFT"
export const MOVE_UP = "MOVE_UP"
export const MOVE_DOWN = "MOVE_DOWN"

export const RIGHT = "RIGHT";
export const LEFT = "LEFT";
export const UP = "UP";
export const DOWN = "DOWN";

export const SET_DIS_DIRECTION = "SET_DIS_DIRECTION"

export interface ISnakeCoord {
	x: number;
	y: number;
}


export const setDisDirection = (direction: string) => ({
	type: SET_DIS_DIRECTION,
	payload: direction
});

export const makeMove = (dx: number, dy: number, move: string) => ({
	type: move,
	payload: [dx, dy]
});

