import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./styles.css";

const Puzzle = () => {
  const [pieces, setPieces] = useState([]);
  const [draggedPiece, setDraggedPiece] = useState(null); // used for desktop dragging
  const [selectedPiece, setSelectedPiece] = useState(null); // used for tap-to-select on mobile
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    const arr = Array.from({ length: 9 }, (_, i) => i);
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    setPieces(shuffled);
  }, []);

  // Desktop drag start
  const handleDragStart = (index) => {
    setDraggedPiece(index);
  };

  // Desktop drop (swap)
  const handleDrop = (index) => {
    if (draggedPiece === null) return;
    swapPieces(draggedPiece, index);
    setDraggedPiece(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Mobile: tap to select, then tap target to swap
  const handleTap = (index) => {
    // if nothing selected -> select this
    if (selectedPiece === null) {
      setSelectedPiece(index);
      return;
    }
    // if tapped the same piece -> deselect
    if (selectedPiece === index) {
      setSelectedPiece(null);
      return;
    }
    // else swap selectedPiece with tapped index
    swapPieces(selectedPiece, index);
    setSelectedPiece(null);
  };

  // Common swap logic and solved check
  const swapPieces = (i, j) => {
    const newPieces = [...pieces];
    [newPieces[i], newPieces[j]] = [newPieces[j], newPieces[i]];
    setPieces(newPieces);

    if (newPieces.every((val, idx) => val === idx)) {
      setSolved(true);
    }
  };

  // Prevent touchmove from scrolling while dragging (only while touching puzzle)
  const preventTouchMove = (e) => {
    e.preventDefault();
  };

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
          touchAction: "none", // important for mobile
        }}
        // prevent scrolling while interacting on mobile
        onTouchMove={preventTouchMove}
      >
        {pieces.map((piece, index) => {
          const isSelected = selectedPiece === index;
          return (
            <div
              key={index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
              // touch handlers: tap to select
              onTouchStart={(e) => {
                // small delay to allow native behavior if needed; we simply map to tap
                e.stopPropagation();
                handleTap(index);
              }}
              onClick={() => {
                // fallback for non-touch devices: allow click to select/swap too
                handleTap(index);
              }}
              style={{
                width: "100px",
                height: "100px",
                backgroundImage: `url(${process.env.PUBLIC_URL}/images/puzzle.jpg)`,
                backgroundSize: "300px 300px",
                backgroundPosition: `${-(piece % 3) * 100}px ${-Math.floor(piece / 3) * 100}px`,
                border: isSelected ? "3px solid #ffd6e0" : "1px solid #fff",
                borderRadius: "6px",
                cursor: "grab",
                transition: "transform 0.14s ease, border 0.12s ease, box-shadow 0.12s ease",
                userSelect: "none",
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                WebkitTouchCallout: "none",
                boxShadow: isSelected ? "0 6px 18px rgba(255,75,145,0.15)" : "none",
              }}
            />
          );
        })}
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
