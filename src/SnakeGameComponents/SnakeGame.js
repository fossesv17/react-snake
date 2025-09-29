import { useEffect, useState } from "react"
import Board from "./Board"
import Snake from "./Snake";
import GameContext from "./GameContext";
import { INIT_SNAKE, INIT_DIRECTION, BOARD_SIZE } from "../utils/init";
import { Randint } from "../utils/utils"

export function randomFruit(snake) {
  let position;
  do {
    position = {
      x: Randint(BOARD_SIZE),
      y: Randint(BOARD_SIZE)
    }
  } while (snake.some(snakePart => snakePart.x === position.x && snakePart.y === position.y));
  return position;
}



export default function SnakeGame() {
    const [tick, setTick] = useState(0);
    const [snake, setSnake] = useState(INIT_SNAKE);
    const [direction, setDirection] = useState(INIT_DIRECTION);
    const [fruit, setFruit] = useState(() => randomFruit(INIT_SNAKE));
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    function resetGame() {
      setTick(0);
      setSnake(INIT_SNAKE);
      setScore(0)
      setDirection(INIT_DIRECTION);
      setFruit(randomFruit(INIT_SNAKE));
      setGameOver(false);
    }

    useEffect(() => {
        const interval = setInterval(() => setTick((t) => t + 1), 200);
        return () => clearInterval(interval);    
    },[gameOver]);

    return (
        <GameContext.Provider value={{tick, snake, setSnake, direction, setDirection, fruit, setFruit, score, setScore, gameOver, setGameOver}}>
          <div className="game-container">
            {gameOver && (
              <div className="game-over-container">
                <h2>Game Over</h2>
                <button className="reset-button" onClick={resetGame}>Restart</button>
              </div>
            )}
              <h1>Snake Game</h1>
              <h2>Score: {score}</h2>
              <Snake />
              <Board />
          </div>
        </GameContext.Provider>
    )
}