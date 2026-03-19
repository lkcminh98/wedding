"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasStarted = useRef(false);

  const musicUrl =
    "https://dnma3z6c8ojev.cloudfront.net/songs/mp3_files/19170568/original/Beautiful_In_White_-_Shane_Filan_-_Shane_Filan.mp3?e8817609673e6ceae29a01a9b1c7efb2124b11d271a4293e82edb01bac1ab71ab957e3ef17e9cbceb53a3a04562901b879dc01b8efe80b84b4ec68dfc2c0f3694718f51340036c2abb1c0f9c2f2c185f47ef77855d20718eef9ff7aea7661e9fcaddc65c90ce881a5b5578362a336a4476917add3e4cd2d02010dd1afa1422318af10f2d7f";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.3;
    audio.loop = true;

    const startOnInteraction = async () => {
      if (hasStarted.current) return;
      hasStarted.current = true;

      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        hasStarted.current = false;
      }

      // Gỡ listener sau khi đã phát thành công
      window.removeEventListener("click", startOnInteraction);
      window.removeEventListener("touchstart", startOnInteraction);
      window.removeEventListener("keydown", startOnInteraction);
    };

    window.addEventListener("click", startOnInteraction);
    window.addEventListener("touchstart", startOnInteraction);
    window.addEventListener("keydown", startOnInteraction);

    return () => {
      window.removeEventListener("click", startOnInteraction);
      window.removeEventListener("touchstart", startOnInteraction);
      window.removeEventListener("keydown", startOnInteraction);
    };
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        hasStarted.current = true;
      } catch {}
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={musicUrl} preload="auto" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
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
                    Nhạc đám cưới
                  </span>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                    Beautiful In White - Shane Filan
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

        {isPlaying && !isExpanded && (
          <div className="absolute -top-1 -right-1 flex gap-0.5">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-0.5 bg-accent rounded-full"
                animate={{ height: ["4px", "8px", "4px"] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </>
  );
}
