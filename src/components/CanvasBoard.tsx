import React, { useRef, useState, useEffect } from "react";
//Importing necessary modules
import { useDispatch, useSelector } from "react-redux";
import { IGlobalState } from "../store/reducers";
import { clearBoard, drawObject, generateRandomPosition, IObjectBody } from "../utilities/index.tsx";


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