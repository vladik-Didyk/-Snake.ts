import React, { useRef, useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    increaseSnake,
    INCREMENT_SCORE,
    makeMove,
    MOVE_DOWN,
    MOVE_LEFT,
    MOVE_RIGHT,
    MOVE_UP,
    scoreUpdates,
    stopGame,
    resetGame,
    RESET_SCORE
} from "../store/actions/index.tsx";

import Instruction from "./Instructions.tsx";


//Importing necessary modules

import { IGlobalState } from "../store/reducers";
import {
    clearBoard,
    drawObject,
    generateRandomPosition,
    IObjectBody,
    hasSnakeCollided,
} from "../utilities/index.tsx";


export interface ICanvasBoard {
    height: number;
    width: number;
}

const HANDLE_KEY_MAP = {
    w: [0, -20],
    a: [-20, 0],
    s: [0, 20],
    d: [20, 0],
    ArrowUp: [0, -20],
    ArrowLeft: [-20, 0],
    ArrowDown: [0, 20],
    ArrowRight: [20, 0]
};

export default function CanvasBoard({ height, width }: ICanvasBoard) {
    const dispatch = useDispatch();

    const [isConsumed, setIsConsumed] = useState<boolean>(false);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

    const snake1 = useSelector((state: IGlobalState) => state.snake);
    const [gameEnded, setGameEnded] = useState<boolean>(false);

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

    //! This is the function which contorl the snake movement
    const handleKeyEvents = useCallback((event: KeyboardEvent) => {
        if (disallowedDirection) {
            const [dx, dy] = HANDLE_KEY_MAP[event.key];
            if (dx !== undefined && dy !== undefined && event.key !== disallowedDirection) {
                moveSnake(dx, dy, disallowedDirection);
            }
        } else if (event.key === "d") {
            // Move RIGHT at start
            moveSnake(20, 0, disallowedDirection);
        }
    }, [disallowedDirection, moveSnake]);


    const resetBoard = useCallback(() => {
        try {
            window.removeEventListener("keypress", handleKeyEvents);
            dispatch(resetGame());
            dispatch(scoreUpdates(RESET_SCORE));
            clearBoard(context);
            drawObject(context, snake1, "#91C483");
            drawObject(
                context,
                [generateRandomPosition(width - 20, height - 20)],
                "#676FA3"
            ); //Draws object randomly
        } catch (e) {
            // handle errors here
        } finally {
            window.addEventListener("keypress", handleKeyEvents);
        }
    }, [context, dispatch, height, snake1, width]);

    useEffect(() => {
        //Generate new object
        if (isConsumed) {
            const posi = generateRandomPosition(width - 20, height - 20);
            setPos(posi);
            setIsConsumed(false);

            //Increase snake size when object is consumed successfully
            dispatch(increaseSnake());
        }

    }, [isConsumed, pos, height, width, dispatch]);


    useEffect(() => {
        //Draw on canvas each time
        setContext(canvasRef.current && canvasRef.current.getContext("2d")); //store in state variable

        clearBoard(context);

        drawObject(context, snake1, "#91C483"); //Draws snake at the required position
        drawObject(context, [pos], "#676FA3"); //Draws fruit randomly

        //When the object is consumed
        if (snake1[0].x === pos?.x && snake1[0].y === pos?.y) {
            setIsConsumed(true);
        }

        if (
            hasSnakeCollided(snake1, snake1[0]) ||
            snake1[0].x >= width ||
            snake1[0].x <= 0 ||
            snake1[0].y <= 0 ||
            snake1[0].y >= height
        ) {
            setGameEnded(true);
            dispatch(stopGame());
            window.removeEventListener("keypress", handleKeyEvents);
        } else setGameEnded(false);

    }, [context, pos, snake1, height, width, dispatch, handleKeyEvents])


    useEffect(() => {
        //Generate new object
        if (isConsumed) {
            const posi = generateRandomPosition(width - 20, height - 20);
            setPos(posi);
            setIsConsumed(false);

            //Increase snake size when object is consumed successfully
            dispatch(increaseSnake());

            //Increment the score
            dispatch(scoreUpdates(INCREMENT_SCORE));
        }
    }, [isConsumed, pos, height, width, dispatch]);

    useEffect(() => {
        window.addEventListener("keypress", handleKeyEvents);
        return () => {
            window.removeEventListener("keypress", handleKeyEvents);
        };
    }, [disallowedDirection, handleKeyEvents]);


    return (
        <>
            <canvas
                ref={canvasRef}
                style={{
                    border: `3px solid ${gameEnded ? "red" : "black"}`,
                }}
                height={height}
                width={width}
            />
            <Instruction resetBoard={resetBoard} />
        </>

    );
};