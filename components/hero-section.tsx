"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BRIDE, GROOM, WEDDING_DATE, LABELS } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/floral-arrangement.jpg"
          alt="Hoa cuoi"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      {/* Decorative Frame */}
      <div className="absolute inset-8 md:inset-16 lg:inset-24 border border-foreground/10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xs md:text-sm tracking-[0.4em] uppercase text-muted-foreground mb-8"
        >
          {LABELS.weddingInvitation}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">
            {LABELS.bride}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-foreground tracking-wide">
            {BRIDE.fullName}
          </h1>
          <div className="flex items-center justify-center gap-6 my-6">
            <div className="h-px w-16 md:w-24 bg-foreground/30" />
            <span className="font-serif text-2xl md:text-3xl italic text-accent">
              &
            </span>
            <div className="h-px w-16 md:w-24 bg-foreground/30" />
          </div>
          <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">
            {LABELS.groom}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-foreground tracking-wide">
            {GROOM.fullName}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xs md:text-sm tracking-[0.3em] uppercase text-muted-foreground mt-12 mb-4"
        >
          {LABELS.inviteMessage1}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xs md:text-sm tracking-[0.2em] uppercase text-muted-foreground"
        >
          {LABELS.inviteMessage2}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground">
            {`${LABELS.weddingDatePrefix} ${WEDDING_DATE.dayDisplay} tháng ${WEDDING_DATE.monthDisplay} ${LABELS.weddingDateSuffix} ${WEDDING_DATE.yearDisplay}`}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {`(${LABELS.lunarDatePrefix} ${WEDDING_DATE.lunarDay} tháng ${WEDDING_DATE.lunarMonth} ${LABELS.lunarDateSuffix} ${WEDDING_DATE.lunarYear})`}
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border border-foreground/30 rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-foreground/50 rounded-full" />
          </motion.div>
        </motion.div> */}
      </div>
    </section>
  );
}
