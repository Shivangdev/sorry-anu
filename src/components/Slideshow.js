
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
 process.env.PUBLIC_URL + "/images/image.png",
  process.env.PUBLIC_URL + "/images/1CAFF894-5803-4847-A968-DF92E0172395.jpg",
  process.env.PUBLIC_URL + "/images/tumblr_inline_odfzffYft11sn8dvy_1280.png",
];

export default function Slideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(i => (i + 1) % images.length);
    }, 3000); // slightly smoother timing
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "18px 0"
      }}
    >
      <div
        style={{
          width: "92%",
          maxWidth: 760,
          height: 360,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 8px 30px rgba(15,23,42,0.15)",
          position: "relative"
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${images[index]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              cursor: "pointer"
            }}
            whileHover={{ scale: 1.02 }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
