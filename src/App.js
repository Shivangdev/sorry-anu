import React, { useEffect, useRef } from "react";
import Message from "./components/Message";
import Slideshow from "./components/Slideshow";
import Puzzle from "./components/Puzzle";
import FallingHearts from "./components/FallingHearts";
import "./components/styles.css";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

function App() {
  const audioRef = useRef(null);

  useEffect(() => {
    const handleInteraction = () => {
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.play().catch(() => {});
      }
      window.removeEventListener("click", handleInteraction);
    };

    window.addEventListener("click", handleInteraction);
  }, []);

  return (
    <div className="app-wrapper">
      {/* 🎵 Background Music */}
      <audio ref={audioRef} autoPlay loop muted>
        <source src="/images/Iraaday.mp3" type="audio/mpeg" />
      </audio>

      {/* 🎉 Confetti */}
      <Confetti width={window.innerWidth} height={window.innerHeight} />

      {/* 💖 Falling Hearts */}
      <FallingHearts />

      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Message />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <Slideshow />
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <Puzzle />
        </motion.div>
      </div>
    </div>
  );
}

export default App;
