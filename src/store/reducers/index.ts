// Reducers are functions that return a new global state 
// every time an action is dispatched. 

// They take in the current global state and return the new state based 
// on the action that is dispatched/called.  
// This new state is calculated based on the previous state.

// We should be careful here that we do not perform any side-effects inside this function. 
// We should not alter the global state – 
// rather we should return the updated state as a new object itself. 

// Therefore, the reducer function should be a pure function.

import {
    DOWN,
    INCREASE_SNAKE,
    INCREMENT_SCORE,
    ISnakeCoord,
    LEFT,
    RESET,
    RESET_SCORE,
    RIGHT,
    SET_DIS_DIRECTION,
    UP,
} from '../actions/index.tsx'


export interface IGlobalState {
    snake: ISnakeCoord[] | [];
    disallowedDirection: string;
    score: number;
}

export interface IGlobalState {
    snake: ISnakeCoord[];
    disallowedDirection: string;
    score: number;
}

const initialState: IGlobalState = {
    snake: [
        { x: 580, y: 300 },
        { x: 560, y: 300 },
        { x: 540, y: 300 },
        { x: 520, y: 300 },
        { x: 500, y: 300 },
    ],
    disallowedDirection: '',
    score: 0,
};


type GameAction =
    | { type: typeof RIGHT | typeof LEFT | typeof UP | typeof DOWN; payload: [number, number] }
    | { type: typeof SET_DIS_DIRECTION; payload: string }
    | { type: typeof INCREASE_SNAKE }
    | { type: typeof INCREMENT_SCORE }
    | { type: typeof RESET_SCORE };

const gameReducer = (
    state: IGlobalState = initialState,
    action: GameAction): IGlobalState => {

    switch (action.type) {
        case RIGHT:
        case LEFT:
        case UP:
        case DOWN: {
            let newSnake = [...state.snake];
            newSnake = [{
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

        case INCREASE_SNAKE: {
            const snakeLen = state.snake.length;
            const tail = state.snake[snakeLen - 1];
            const newTail = { x: tail.x - 20, y: tail.y - 20 };
            const newSnake = [...state.snake, newTail];

            return { ...state, snake: newSnake };
        }

        case INCREMENT_SCORE:
            return {
                ...state,
                score: state.score + 1,
            };

        case RESET_SCORE:
            return { ...state, score: 0 };

        default:
            return state;
    }
}

export default gameReducer;