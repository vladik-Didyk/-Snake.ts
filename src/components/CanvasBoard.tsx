import React, {
    useRef,
    useState,
    useEffect,
    useCallback
} from "react";

import {

    makeMove,
    MOVE_DOWN,
    MOVE_LEFT,
    MOVE_RIGHT,
    MOVE_UP,

} from "../store/actions/index.tsx";
//Importing necessary modules
import { useDispatch, useSelector } from "react-redux";
import { IGlobalState } from "../store/reducers";
import {
    clearBoard,
    drawObject,
    generateRandomPosition,
    IObjectBody
} from "../utilities/index.tsx";


export interface ICanvasBoard {
    height: number;
    width: number;
}

export default function CanvasBoard({ height, width }: ICanvasBoard) {
    const dispatch = useDispatch();

    const [isConsumed, setIsConsumed] = useState<boolean>(false);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const snake1 = useSelector((state: IGlobalState) => state.snake);
    const [pos, setPos] = useState<IObjectBody>(
        generateRandomPosition(width - 20, height - 20)
    );
    const disallowedDirection = useSelector(
        (state: IGlobalState) => state.disallowedDirection
    );

    const moveSnake = useCallback(
        (dx = 0, dy = 0, ds: string) => {
            if (dx > 0 && dy === 0 && ds !== "RIGHT") {
                dispatch(makeMove(dx, dy, MOVE_RIGHT));
            }

            if (dx < 0 && dy === 0 && ds !== "LEFT") {
                dispatch(makeMove(dx, dy, MOVE_LEFT));
            }

            if (dx === 0 && dy < 0 && ds !== "UP") {
                dispatch(makeMove(dx, dy, MOVE_UP));
            }

            if (dx === 0 && dy > 0 && ds !== "DOWN") {
                dispatch(makeMove(dx, dy, MOVE_DOWN));
            }
        },
        [dispatch]
    );


    const handleKeyEvents = useCallback(
        (event: KeyboardEvent) => {
            if (disallowedDirection) {
                switch (event.key) {
                    case "w":
                        moveSnake(0, -20, disallowedDirection);
                        break;
                    case "s":
                        moveSnake(0, 20, disallowedDirection);
                        break;
                    case "a":
                        moveSnake(-20, 0, disallowedDirection);
                        break;
                    case "d":
                        event.preventDefault();
                        moveSnake(20, 0, disallowedDirection);
                        break;
                }
            } else {
                if (
                    disallowedDirection !== "LEFT" &&
                    disallowedDirection !== "UP" &&
                    disallowedDirection !== "DOWN" &&
                    event.key === "d"
                )
                    moveSnake(20, 0, disallowedDirection); //Move RIGHT at start
            }
        },
        [disallowedDirection, moveSnake]
    );

    useEffect(() => {
        window.addEventListener("keypress", handleKeyEvents);

        return () => {
            window.removeEventListener("keypress", handleKeyEvents);
        };
    }, [disallowedDirection, handleKeyEvents]);

    useEffect(() => {
        //Generate new object
        if (isConsumed) {
            const posi = generateRandomPosition(width - 20, height - 20);
            setPos(posi);
            setIsConsumed(false);

        }
    }, [isConsumed, pos, height, width, dispatch]);

    useEffect(() => {
        clearBoard(context);

        //Draw on canvas each time
        setContext(canvasRef.current && canvasRef.current.getContext("2d")); //store in state variable
        drawObject(context, snake1, "#91C483"); //Draws snake at the required position
        drawObject(context, [
            pos
        ], "#676FA3"); //Draws fruit randomly
    }, [context])


    return (
        <canvas
            ref={canvasRef}
            style={{
                border: "3px solid black",
            }}
            height={height}
            width={width}
        />
    );
};