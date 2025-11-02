import React, { useEffect, useState } from "react";
import "./styles.css";

const FallingHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 20 + 20,
      duration: Math.random() * 3 + 3
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="falling-hearts">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="heart"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`
          }}
        >
          💖
        </span>
      ))}
    </div>
  );
};

export default FallingHearts;
