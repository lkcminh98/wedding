"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Navigation, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GROOM_ADDRESS, BRIDE_ADDRESS, LABELS } from "@/lib/constants"

const venues = [
  {
    id: "groom",
    family: LABELS.groomFamily,
    familyName: LABELS.groomFamilyName,
    oldAddress: GROOM_ADDRESS.oldAddress,
    newAddress: GROOM_ADDRESS.newAddress,
    mapUrl: GROOM_ADDRESS.mapUrl,
    embedUrl: GROOM_ADDRESS.embedUrl,
  },
  {
    id: "bride",
    family: LABELS.brideFamily,
    familyName: LABELS.brideFamilyName,
    oldAddress: BRIDE_ADDRESS.oldAddress,
    newAddress: BRIDE_ADDRESS.newAddress,
    mapUrl: BRIDE_ADDRESS.mapUrl,
    embedUrl: BRIDE_ADDRESS.embedUrl,
  },
]

export default function FamilyVenues() {
  const [activeTab, setActiveTab] = useState<"groom" | "bride">("groom")

  const activeVenue = venues.find((v) => v.id === activeTab)!

  return (
    <section className="py-24 md:py-32 px-6 bg-card">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-6">
            {LABELS.venueTitle}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-4">
            {LABELS.venueSubtitle}
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            {LABELS.venueNotice}
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex bg-muted p-1.5 gap-1">
            {venues.map((venue) => (
              <button
                key={venue.id}
                onClick={() => setActiveTab(venue.id as "groom" | "bride")}
                className={`relative px-8 py-3 text-sm tracking-wider uppercase transition-all duration-300 ${
                  activeTab === venue.id
                    ? "text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeTab === venue.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-foreground"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  {venue.family}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-background border border-border overflow-hidden"
          >
            {/* Map */}
            <div className="relative h-72 md:h-80 w-full bg-muted">
              <iframe
                src={activeVenue.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </div>

            {/* Info */}
            <div className="p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 border border-accent/30 rounded-full mb-4">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>

                <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-2">
                  {activeVenue.family}
                </h3>

                <p className="text-sm text-accent font-medium">
                  {activeVenue.familyName}
                </p>
              </div>

              {/* Address Tabs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Old Address */}
                <div className="p-6 bg-muted/30 border border-border/50 text-center">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground"></span>
                    <p className="text-xs tracking-wider uppercase text-muted-foreground font-medium">
                      {LABELS.oldAddress}
                    </p>
                  </div>
                  <address className="not-italic text-foreground/60 leading-relaxed line-through decoration-accent/40 decoration-1">
                    <p>{activeVenue.oldAddress.line1}</p>
                    <p>{activeVenue.oldAddress.line2}</p>
                    <p>{activeVenue.oldAddress.line3}</p>
                  </address>
                </div>

                {/* New Address */}
                <div className="p-6 bg-accent/5 border-2 border-accent/30 text-center relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-background px-3 py-0.5 text-[10px] tracking-wider uppercase font-medium">
                    {LABELS.currentLabel}
                  </div>
                  <div className="inline-flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-accent"></span>
                    <p className="text-xs tracking-wider uppercase text-accent font-medium">
                      {LABELS.newAddress}
                    </p>
                  </div>
                  <address className="not-italic text-foreground leading-relaxed font-medium">
                    <p>{activeVenue.newAddress.line1}</p>
                    <p>{activeVenue.newAddress.line2}</p>
                    <p>{activeVenue.newAddress.line3}</p>
                  </address>
                </div>
              </div>

              <div className="text-center">
                <Button
                  asChild
                  className="bg-foreground text-background hover:bg-foreground/90 px-8"
                >
                  <a
                    href={activeVenue.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <Navigation className="w-4 h-4" />
                    <span className="text-xs tracking-wider uppercase">{LABELS.directions}</span>
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
