
import { useEffect, useContext, useRef } from "react"
import GameContext from "./GameContext";
import { BOARD_SIZE, CELL_SIZE } from "../utils/init";


export default function Board() {
    const { snake, fruit } = useContext(GameContext);
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, BOARD_SIZE * CELL_SIZE, BOARD_SIZE * CELL_SIZE);

        ctx.fillStyle = 'green';
        snake.forEach((snakePart) => {
            ctx.fillRect(
                snakePart.x * CELL_SIZE,
                snakePart.y * CELL_SIZE,
                CELL_SIZE,
                CELL_SIZE
            )
        });
        ctx.fillStyle = 'red';
        ctx.fillRect(fruit.x * CELL_SIZE, fruit.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

    }, [snake, fruit])

     
    return (
        <div>
            <canvas 
                ref={canvasRef} 
                width={BOARD_SIZE * CELL_SIZE} 
                height={BOARD_SIZE * CELL_SIZE}
                style={{border : "2px solid black"}}    
            >
            </canvas>   
        </div>
    )
}