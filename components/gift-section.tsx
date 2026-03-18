"use client"

import { motion } from "framer-motion"
import { Gift, Heart, CreditCard } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { GROOM_BANK, BRIDE_BANK, GROOM, BRIDE, LABELS } from "@/lib/constants"

const giftInfo = [
  {
    family: LABELS.groomFamily,
    name: GROOM.fullName,
    bank: GROOM_BANK.bankName,
    accountNumber: GROOM_BANK.accountNumber,
    accountName: GROOM_BANK.accountHolder,
  },
  {
    family: LABELS.brideFamily,
    name: BRIDE.fullName,
    bank: BRIDE_BANK.bankName,
    accountNumber: BRIDE_BANK.accountNumber,
    accountName: BRIDE_BANK.accountHolder,
  },
]

export default function GiftSection() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <section className="py-24 md:py-32 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-6">
            {LABELS.giftTitle}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-6">
            {LABELS.giftSubtitle}
          </h2>
          <div className="w-16 h-px bg-accent mx-auto mb-8" />
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {LABELS.giftMessage}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {giftInfo.map((info, index) => (
            <motion.div
              key={info.family}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-card border border-border p-8 text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 border border-accent/30 rounded-full mb-6">
                <Gift className="w-6 h-6 text-accent" />
              </div>

              <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-2">
                {info.family}
              </h3>
              
              <p className="text-sm text-accent font-medium mb-6">
                {info.name}
              </p>

              {/* QR Code */}
              <div className="relative w-48 h-48 mx-auto mb-6 bg-white p-3 border border-border">
                <div className="relative w-full h-full bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Ma QR</p>
                    <p className="text-xs text-muted-foreground">{info.bank}</p>
                  </div>
                </div>
              </div>

              {/* Bank Info */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">{LABELS.bankLabel}</span>
                  <span className="text-foreground font-medium">{info.bank}</span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">{LABELS.accountNumber}</span>
                  <button
                    onClick={() => copyToClipboard(info.accountNumber, index)}
                    className={cn(
                      "text-foreground font-medium hover:text-accent transition-colors flex items-center gap-2",
                      copiedIndex === index && "text-accent"
                    )}
                  >
                    {info.accountNumber}
                    <span className="text-xs text-muted-foreground">
                      {copiedIndex === index ? `(${LABELS.copied})` : `(${LABELS.copyHint})`}
                    </span>
                  </button>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground">{LABELS.accountHolder}</span>
                  <span className="text-foreground font-medium">{info.accountName}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
                  <Heart className="w-3 h-3 text-accent fill-accent" />
                  <span>{LABELS.thankYou}</span>
                  <Heart className="w-3 h-3 text-accent fill-accent" />
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
