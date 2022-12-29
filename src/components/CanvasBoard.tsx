import React, { useRef, useState, useEffect } from "react";
//Importing necessary modules
import { useSelector } from "react-redux";
import { clearBoard, drawObject , generateRandomPosition} from "../utilities/index.tsx";


export interface ICanvasBoard {
    height: number;
    width: number;
}

export default function CanvasBoard({ height, width }: ICanvasBoard) {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);


    const snake1 = useSelector((state: IGlobalState) => state.snake);
    const [pos, setPos] = useState<IObjectBody>(
        generateRandomPosition(width - 20, height - 20)
    );

    useEffect(() => {
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