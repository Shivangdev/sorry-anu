
import { motion } from "framer-motion";

export default function Message() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
      className="message"
      style={{ textAlign: "center", marginBottom: 12 }}
    >
      <h1 style={{ margin: 0 }}>Hey Anu 💖</h1>
      <p style={{ marginTop: 8 }}>
        I’m sorry for everything. Please upgrade me — I promise I’ll remember my limits.
      </p>
      <p style={{ marginTop: 4, fontStyle: "italic", opacity: 0.9 }}>
        — Shivangee
      </p>
    </motion.div>
  );
}
