import { useEffect, useContext } from "react";
import GameContext from "./GameContext";
import { BOARD_SIZE } from "../utils/init";
import { randomFruit } from "./SnakeGame";

export default function Snake() {
    const {tick, setSnake, direction, setDirection, fruit, setFruit, score, setScore, setGameOver } = useContext(GameContext);
    
    useEffect(() => {
        if (tick === 0) return;
        setSnake((prevSnake) => {
            const hd = prevSnake[0];
            let newHead;

            switch (direction) {
                case "UP":
                    newHead = {x: hd.x, y: (hd.y - 1 + BOARD_SIZE) % BOARD_SIZE};
                    break;
                case "RIGHT":
                    newHead = {x: (hd.x + 1) % BOARD_SIZE, y: hd.y};
                    break;
                case "DOWN":
                    newHead = {x: hd.x, y: (hd.y + 1) % BOARD_SIZE};
                    break;
                case "LEFT":
                    newHead = {x: (hd.x - 1 + BOARD_SIZE) % BOARD_SIZE, y: hd.y};
                    break;
                default:
                    newHead = hd;
            }
            
            const snakeCollision = prevSnake.some((snakePart, idx) => idx !== 0 && snakePart.x === newHead.x && snakePart.y === newHead.y);
            if (snakeCollision) {
                setGameOver(true);
                return prevSnake;
            }

            let newSnake;
            if (newHead.x === fruit.x && newHead.y === fruit.y) {
                newSnake = [newHead, ...prevSnake];
                setFruit(randomFruit(newSnake));
                setScore(score + 1);
            } 
            else {
                newSnake = [newHead, ...prevSnake.slice(0, -1)];
            }
            
            return newSnake; 
        })
    },[tick, direction, setSnake])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowUp" && direction !== "DOWN") setDirection("UP");
            if (e.key === "ArrowRight" && direction !== "LEFT") setDirection("RIGHT");
            if (e.key === "ArrowDown" && direction !== "UP") setDirection("DOWN");
            if (e.key === "ArrowLeft" && direction !== "RIGHT") setDirection("LEFT");
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);

    }, [direction, setDirection]);


  return null;
}