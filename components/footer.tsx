"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { BRIDE, GROOM, WEDDING_DATE, WEDDING_SOCIAL, LABELS } from "@/lib/constants"

export default function Footer() {
  return (
    <footer className="py-16 px-6 bg-background border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Monogram */}
          <div className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            {BRIDE.displayName} <span className="text-accent">&</span> {GROOM.displayName}
          </div>

          <div className="w-12 h-px bg-border mx-auto mb-6" />

          <p className="text-sm text-muted-foreground mb-2">
            {`${WEDDING_DATE.dayDisplay} tháng ${WEDDING_DATE.monthDisplay} năm ${WEDDING_DATE.yearDisplay}`}
          </p>

          <p className="text-sm text-muted-foreground mb-8">
            {LABELS.vietnam}
          </p>

          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>{LABELS.madeWith}</span>
            <Heart className="w-3 h-3 text-accent fill-accent" />
            <span>{LABELS.forGuests}</span>
          </div>

          <p className="mt-8 text-xs text-muted-foreground/60">
            {WEDDING_SOCIAL.hashtag}
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
