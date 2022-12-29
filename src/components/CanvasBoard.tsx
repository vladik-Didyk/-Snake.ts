import React, { useRef, useState, useEffect } from "react";

export interface ICanvasBoard {
    height: number;
    width: number;
}

export default function CanvasBoard({ height, width }: ICanvasBoard) {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        //Draw on canvas each time
        setContext(canvasRef.current && canvasRef.current.getContext("2d")); //store in state variable
    }, [context]);


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