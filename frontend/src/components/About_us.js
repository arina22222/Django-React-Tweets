import React, { useState, useEffect } from 'react';

const generateFood = () => {
    return { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) };
  };

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 5, y: 5 }]);
  const [food, setFood] = useState(generateFood());
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);



  const moveSnake = (snake, direction) => {
    const head = { ...snake[0] };

    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
      default:
        break;
    }

    return [head, ...snake.slice(0, -1)];
  };

  const checkCollision = (snake) => {
    const [head, ...body] = snake;
    return body.some((segment) => segment.x === head.x && segment.y === head.y);
  };

  const checkOutOfBounds = (snake) => {
    const [head] = snake;
    return head.x < 0 || head.y < 0 || head.x >= 10 || head.y >= 10;
  };

  const checkFood = (snake, food) => {
    const [head] = snake;
    return head.x === food.x && head.y === food.y;
  };

  const updateGame = () => {
    if (!gameOver) {
      const newSnake = moveSnake(snake, direction);
      if (checkCollision(newSnake) || checkOutOfBounds(newSnake)) {
        setGameOver(true);
      } else {
        setSnake(newSnake);
        if (checkFood(newSnake, food)) {
          setFood(generateFood());
          setSnake([...newSnake, {}]);
        }
      }
    }
  };

  useEffect(() => {
    const gameInterval = setInterval(updateGame, 300);
    return () => clearInterval(gameInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver, snake]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          setDirection('UP');
          break;
        case 'ArrowDown':
          setDirection('DOWN');
          break;
        case 'ArrowLeft':
          setDirection('LEFT');
          break;
        case 'ArrowRight':
          setDirection('RIGHT');
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

const renderBoard = () => {
  const board = [];
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const isSnakeSegment = snake.some((segment) => segment.x === x && segment.y === y);
      const isFood = food.x === x && food.y === y;

      if (isSnakeSegment) {
        board.push(<div key={`${x}-${y}`} className="snake-segment" />);
      } else if (isFood) {
        board.push(<div key={`${x}-${y}`} className="food" />);
      } else {
        board.push(<div key={`${x}-${y}`} className="empty" />);
      }
    }
  }
  return board;
};

  return (
    <div className="snake-game">
      {gameOver ? (
        <div className="game-over-message">Game Over! Try Again?</div>
      ) : (
        <div className="game-board">{renderBoard()}</div>
      )}
    </div>
  );
};

export default SnakeGame;
