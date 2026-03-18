"use client"

import { motion } from "framer-motion"
import { LABELS, LOVE_STORY } from "@/lib/constants"

export default function CoupleSection() {
  return (
    <section className="py-24 md:py-32 px-6 bg-card">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-6">
            {LABELS.loveStory}
          </p>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-8 text-balance">
            {LOVE_STORY.title}
          </h2>

          <div className="w-16 h-px bg-accent mx-auto mb-10" />

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
            {LOVE_STORY.paragraph1}
          </p>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {LOVE_STORY.paragraph2}
          </p>
        </motion.div>

        {/* Decorative Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 pt-12 border-t border-border"
        >
          <blockquote className="font-serif text-xl md:text-2xl italic text-foreground/80">
            {`"${LOVE_STORY.quote}"`}
          </blockquote>
          <cite className="block mt-4 text-xs tracking-[0.3em] uppercase text-muted-foreground not-italic">
            {`— ${LOVE_STORY.quoteAuthor}`}
          </cite>
        </motion.div>
      </div>
    </section>
  )
}
