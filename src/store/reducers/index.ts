// Reducers are functions that return a new global state 
// every time an action is dispatched. 
// They take in the current global state and return the new state based 
// on the action that is dispatched/called.  
// This new state is calculated based on the previous state.

// We should be careful 
// here that we do not perform any side-effects inside this function. 
// We should not alter the global state – 
// rather we should return the updated state as a new object itself. 

// Therefore, the reducer function should be a pure function.

const GlobalState = {
    data: ""
};

export default function gameReducer (state = GlobalState, action)  {
    switch (action.type) {
        case "MOVE_RIGHT":
            /**
             * Perform a certain set of operations
             */
            return {
                ...state, data: action.payload
            };

        default:
            return state;
    }
}