"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { LABELS } from "@/lib/constants"

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showPrompt, setShowPrompt] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const musicUrl = "https://dnma3z6c8ojev.cloudfront.net/songs/mp3_files/19170568/original/Beautiful_In_White_-_Shane_Filan_-_Shane_Filan.mp3?e8817609673e6ceae29a01a9b1c7efb2124b11d271a4293e82edb01bac1ab71ab957e3ef17e9cbceb53a3a04562901b879dc01b8efe80b84b4ec68dfc2c0f3694718f51340036c2abb1c0f9c2f2c185f47ef77855d20718eef9ff7aea7661e9fcaddc65c90ce881a5b5578362a336a4476917add3e4cd2d02010dd1afa1422318af10f2d7f"

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3
      audioRef.current.loop = true
    }
  }, [])

  const togglePlay = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        try {
          await audioRef.current.play()
          setIsPlaying(true)
        } catch {
          // Autoplay was prevented
        }
      }
      setShowPrompt(false)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <>
      <audio ref={audioRef} src={musicUrl} preload="auto" />

      {/* Initial prompt */}
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-24 right-6 z-40"
          >
            <div className="bg-card border border-border px-4 py-3 rounded-lg shadow-lg max-w-[220px]">
              <p className="text-sm text-foreground font-serif">
                {LABELS.musicPrompt}
              </p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={togglePlay}
                  className="px-3 py-1 bg-accent text-accent-foreground text-xs rounded hover:bg-accent/80 transition-colors"
                >
                  {LABELS.yes}
                </button>
                <button
                  onClick={() => setShowPrompt(false)}
                  className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded hover:bg-muted/80 transition-colors"
                >
                  {LABELS.no}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating music control */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 z-50"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <motion.div
          className="flex items-center gap-2 bg-card/95 backdrop-blur-sm border border-border rounded-full shadow-lg overflow-hidden"
          animate={{ width: isExpanded ? "auto" : "48px" }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={togglePlay}
            className="w-12 h-12 flex items-center justify-center text-foreground hover:text-accent transition-colors relative"
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-8 h-8 rounded-full border-2 border-accent animate-ping opacity-20" />
                </span>
              </>
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="flex items-center gap-2 pr-4 overflow-hidden"
              >
                <div className="flex flex-col min-w-[100px]">
                  <span className="text-xs font-serif text-foreground whitespace-nowrap">
                    Nhac Cuoi
                  </span>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                    Piano Lang Man
                  </span>
                </div>

                <button
                  onClick={toggleMute}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Music visualizer bars */}
        {isPlaying && !isExpanded && (
          <div className="absolute -top-1 -right-1 flex gap-0.5">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-0.5 bg-accent rounded-full"
                animate={{
                  height: ["4px", "8px", "4px"],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </>
  )
}
