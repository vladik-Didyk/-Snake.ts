// Reducers are functions that return a new global state 
// every time an action is dispatched. 

// They take in the current global state and return the new state based 
// on the action that is dispatched/called.  
// This new state is calculated based on the previous state.

// We should be careful here that we do not perform any side-effects inside this function. 
// We should not alter the global state – 
// rather we should return the updated state as a new object itself. 

// Therefore, the reducer function should be a pure function.

import { RIGHT, LEFT, UP, DOWN, SET_DIS_DIRECTION, ISnakeCoord } from '../actions/index.tsx'

interface ISnakeCoord {
    x: number;
    y: number;
}

export interface IGlobalState {
    snake: ISnakeCoord[] | [];
    disallowedDirection: string;
    score: number;
}

const globalState: IGlobalState = {
    //Postion of the entire snake
    snake: [
        { x: 580, y: 300 },
        { x: 560, y: 300 },
        { x: 540, y: 300 },
        { x: 520, y: 300 },
        { x: 500, y: 300 },
    ],
    disallowedDirection: "",
    score: 0,
};


export default function gameReducer(state = globalState, action: any) {
    switch (action.type) {

        case RIGHT:
        case LEFT:
        case UP:
        case DOWN: {
            let newSnake = [...state.snake];
            newSnake = [{
                //New x and y coordinates
                x: state.snake[0].x + action.payload[0],
                y: state.snake[0].y + action.payload[1],
            }, ...newSnake];
            newSnake.pop();

            return {
                ...state,
                snake: newSnake,
            };
        }
        case SET_DIS_DIRECTION:
            return { ...state, disallowedDirection: action.payload };

        default:
            return state;
    }
}
