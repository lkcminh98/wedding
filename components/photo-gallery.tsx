"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Heart } from "lucide-react";
import { PHOTOS, LABELS } from "@/lib/constants";

const isPhotoGalleryComingSoon = true;

const photos = PHOTOS.map((photo, index) => ({
  src: photo.src,
  alt: photo.caption,
  caption: photo.caption,
}));

export default function PhotoGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % photos.length);
    }
  };

  const goPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
    }
  };

  return (
    <section className="py-24 md:py-32 px-4 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-card to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-card to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 border border-accent/30 rounded-full mb-8"
          >
            <Heart className="w-6 h-6 text-accent" />
          </motion.div>

          <p className="text-xs tracking-[0.4em] text-muted-foreground uppercase mb-6">
            {LABELS.photoGallery}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 text-balance">
            {LABELS.photoGallerySubtitle}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
            {LABELS.photoQuote}
          </p>
        </motion.div>

        {isPhotoGalleryComingSoon ? (
          <div className="py-20 border border-dashed border-muted rounded-2xl bg-muted/40 text-center">
            <p className="text-5xl font-bold tracking-widest text-foreground">
              Coming soon
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Album ảnh đang được hoàn thiện, vui lòng quay lại sau nhé!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {/* Large featured photo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="col-span-12 md:col-span-7 relative cursor-pointer group"
              onClick={() => openLightbox(0)}
              onMouseEnter={() => setHoveredIndex(0)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative h-[350px] md:h-[500px] overflow-hidden">
                <Image
                  src={photos[0].src}
                  alt={photos[0].alt}
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: hoveredIndex === 0 ? 1 : 0,
                    y: hoveredIndex === 0 ? 0 : 20,
                  }}
                  className="absolute bottom-0 left-0 right-0 p-6 md:p-8"
                >
                  <p className="font-serif text-xl md:text-2xl text-background">
                    {photos[0].caption}
                  </p>
                </motion.div>
              </div>
              <div className="absolute top-4 left-4 px-3 py-1 bg-background/90 text-foreground text-xs tracking-wider uppercase">
                01
              </div>
            </motion.div>

            {/* Stacked photos */}
            <div className="col-span-12 md:col-span-5 flex flex-col gap-4 md:gap-6">
              {[1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="relative cursor-pointer group flex-1"
                  onClick={() => openLightbox(i)}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="relative h-[170px] md:h-full min-h-[170px] overflow-hidden">
                    <Image
                      src={photos[i].src}
                      alt={photos[i].alt}
                      fill
                      className="object-cover transition-all duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: hoveredIndex === i ? 1 : 0,
                        y: hoveredIndex === i ? 0 : 20,
                      }}
                      className="absolute bottom-0 left-0 right-0 p-4 md:p-6"
                    >
                      <p className="font-serif text-lg text-background">
                        {photos[i].caption}
                      </p>
                    </motion.div>
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1 bg-background/90 text-foreground text-xs tracking-wider uppercase">
                    0{i + 1}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom row - three equal photos */}
            {[3, 4, 5].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (i - 2) * 0.1 }}
                viewport={{ once: true }}
                className="col-span-12 sm:col-span-6 md:col-span-4 relative cursor-pointer group"
                onClick={() => openLightbox(i)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative h-[280px] md:h-[320px] overflow-hidden">
                  <Image
                    src={photos[i].src}
                    alt={photos[i].alt}
                    fill
                    className="object-cover transition-all duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: hoveredIndex === i ? 1 : 0,
                      y: hoveredIndex === i ? 0 : 20,
                    }}
                    className="absolute bottom-0 left-0 right-0 p-4 md:p-6"
                  >
                    <p className="font-serif text-lg text-background">
                      {photos[i].caption}
                    </p>
                  </motion.div>
                </div>
                <div className="absolute top-4 left-4 px-3 py-1 bg-background/90 text-foreground text-xs tracking-wider uppercase">
                  0{i + 1}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Decorative quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16 md:mt-20"
        >
          <p className="font-serif text-xl md:text-2xl text-foreground/60 italic max-w-2xl mx-auto">
            {`"${LOVE_STORY_QUOTE}"`}
          </p>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 text-background/80 hover:text-background transition-colors z-10"
              onClick={closeLightbox}
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation */}
            <button
              className="absolute left-4 md:left-8 text-background/60 hover:text-background transition-colors p-2 z-10"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
            >
              <ChevronLeft className="w-10 h-10 md:w-14 md:h-14" />
            </button>

            {/* Image container */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl h-[70vh] md:h-[85vh] mx-16"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[selectedIndex].src}
                alt={photos[selectedIndex].alt}
                fill
                className="object-contain"
                priority
              />

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <p className="font-serif text-xl md:text-2xl text-background/90">
                  {photos[selectedIndex].caption}
                </p>
                <p className="text-sm text-background/50 mt-2">
                  {selectedIndex + 1} / {photos.length}
                </p>
              </div>
            </motion.div>

            <button
              className="absolute right-4 md:right-8 text-background/60 hover:text-background transition-colors p-2 z-10"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
            >
              <ChevronRight className="w-10 h-10 md:w-14 md:h-14" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
              {photos.map((_, i) => (
                <button
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === selectedIndex
                      ? "bg-background w-6"
                      : "bg-background/40 hover:bg-background/60"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(i);
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const LOVE_STORY_QUOTE =
  "Yêu là khi mọi khoảnh khắc bên nhau đều trở nên vĩnh cửu";
