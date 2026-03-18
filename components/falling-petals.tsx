"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Petal {
  id: number
  x: number
  delay: number
  duration: number
  size: number
  rotation: number
  type: "petal" | "heart"
}

export default function FallingPetals() {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    const newPetals: Petal[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 8,
      size: 10 + Math.random() * 15,
      rotation: Math.random() * 360,
      type: Math.random() > 0.7 ? "heart" : "petal",
    }))
    setPetals(newPetals)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            top: -30,
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, Math.sin(petal.id) * 100, Math.cos(petal.id) * 50, 0],
            rotate: [petal.rotation, petal.rotation + 360],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {petal.type === "heart" ? (
            <svg
              width={petal.size}
              height={petal.size}
              viewBox="0 0 24 24"
              fill="none"
              className="text-accent/40"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg
              width={petal.size}
              height={petal.size * 1.2}
              viewBox="0 0 20 24"
              className="text-accent/30"
            >
              <ellipse
                cx="10"
                cy="12"
                rx="8"
                ry="10"
                fill="currentColor"
                transform="rotate(-20 10 12)"
              />
              <ellipse
                cx="10"
                cy="12"
                rx="6"
                ry="8"
                fill="rgba(255,255,255,0.3)"
                transform="rotate(-20 10 12)"
              />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  )
}
