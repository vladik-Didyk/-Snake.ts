// This file consists of constants
//that represents actions that our application 
//can perform and dispatch to the Redux store. 
//An example of such an action constant l
//ooks like this:

export const MOVE_RIGHT = "MOVE_RIGHT"


//With payload
export const moveRight = (data: string) => ({
	type: MOVE_RIGHT,
	payload: data
});