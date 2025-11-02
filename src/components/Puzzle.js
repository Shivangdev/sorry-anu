import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./styles.css";

const Puzzle = () => {
  const [pieces, setPieces] = useState([]);
  const [draggedPiece, setDraggedPiece] = useState(null);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    const arr = Array.from({ length: 9 }, (_, i) => i);
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    setPieces(shuffled);
  }, []);

  const handleDragStart = (index) => {
    setDraggedPiece(index);
  };

  const handleDrop = (index) => {
    const newPieces = [...pieces];
    const temp = newPieces[index];
    newPieces[index] = newPieces[draggedPiece];
    newPieces[draggedPiece] = temp;
    setPieces(newPieces);

    if (newPieces.every((val, i) => val === i)) {
      setSolved(true);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="puzzle-section" style={{ textAlign: "center", marginTop: "50px" }}>
      <h2 style={{ color: "#ff66b3", marginBottom: "20px" }}>Can you solve this? 🧩</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gridTemplateRows: "repeat(3, 100px)",
          gap: "2px",
          justifyContent: "center",
        }}
      >
        {pieces.map((piece, index) => (
          <div
            key={index}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            style={{
              width: "100px",
              height: "100px",
              backgroundImage: "url('/images/puzzle.jpg')", // make sure puzzle.jpg exists in public/images
              backgroundSize: "300px 300px",
              backgroundPosition: `${-(piece % 3) * 100}px ${-Math.floor(piece / 3) * 100}px`,
              border: "1px solid #fff",
              borderRadius: "6px",
              cursor: "grab",
              transition: "transform 0.2s ease",
              userSelect: "none",
            }}
          />
        ))}
      </div>

      {solved && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            marginTop: "25px",
            color: "#ff4d6d",
            fontSize: "18px",
            lineHeight: 1.6,
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <p><strong>“Thank you, Anu 💖”</strong></p>
          <p>
            You pieced it all together — just like I hope we can.  
            Every piece you placed back feels like one more reason I should never
            have hurt you in the first place.
          </p>
          <p>
            I know this puzzle can’t undo what happened, but it’s my small way of
            showing how much I care — not through words, but through something I made,
            piece by piece, just like us.
          </p>
          <p>
            If you’ve come this far, it means you still care — and that means more to me
            than you’ll ever know.  
            I’m sorry for every mistake. I promise to do better, to listen more, and to
            never take you for granted again.
          </p>
          <p style={{ marginTop: 10, fontWeight: "bold" }}>
            You didn’t just solve a puzzle today — you completed my heart. 💞
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Puzzle;
