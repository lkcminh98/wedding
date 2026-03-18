"use client"

import { motion } from "framer-motion"
import { CalendarDays, Clock, MapPin, Utensils } from "lucide-react"
import { useEffect, useState } from "react"
import { WEDDING_DATE, EVENT_TIMES, LABELS, getWeddingDateISO } from "@/lib/constants"

const events = [
  {
    icon: CalendarDays,
    title: LABELS.weddingDay,
    details: [`${WEDDING_DATE.dayOfWeek}, ${WEDDING_DATE.dayDisplay} tháng ${WEDDING_DATE.monthDisplay}`, `Năm ${WEDDING_DATE.yearDisplay}`],
  },
  {
    icon: Clock,
    title: LABELS.vuQuy,
    details: [EVENT_TIMES.vuQuyLabel, LABELS.atBrideHome],
  },
  {
    icon: Utensils,
    title: LABELS.reception,
    details: [`${EVENT_TIMES.brideReceptionLabel} - ${LABELS.brideReception}`, `${EVENT_TIMES.groomReceptionLabel} - ${LABELS.groomReception}`],
  },
  {
    icon: MapPin,
    title: LABELS.ceremony,
    details: [EVENT_TIMES.groomCeremonyLabel, LABELS.atGroomHome],
  },
]

export default function EventDetails() {
  return (
    <section className="py-24 md:py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-6">
            {LABELS.eventDetails}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-foreground">
            {LABELS.weddingSchedule}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-8 bg-card border border-border"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 border border-foreground/20 rounded-full mb-6">
                <event.icon className="w-5 h-5 text-foreground/70" />
              </div>

              <h3 className="font-serif text-lg md:text-xl text-foreground mb-4">
                {event.title}
              </h3>

              {event.details.map((detail, i) => (
                <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                  {detail}
                </p>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <CountdownTimer />
        </motion.div>
      </div>
    </section>
  )
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const weddingDateISO = getWeddingDateISO()
    const weddingDate = new Date(weddingDateISO)

    const updateCountdown = () => {
      const now = new Date()
      const difference = weddingDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [])

  const timeUnits = [
    { value: timeLeft.days, label: LABELS.days },
    { value: timeLeft.hours, label: LABELS.hours },
    { value: timeLeft.minutes, label: LABELS.minutes },
    { value: timeLeft.seconds, label: LABELS.seconds },
  ]

  if (!mounted) {
    return (
      <div className="inline-flex flex-wrap justify-center gap-6 md:gap-10">
        {timeUnits.map((unit) => (
          <div key={unit.label} className="text-center">
            <div className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-2">
              --
            </div>
            <div className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="inline-flex flex-wrap justify-center gap-6 md:gap-10">
      {timeUnits.map((unit) => (
        <div key={unit.label} className="text-center">
          <div className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-2">
            {unit.value.toString().padStart(2, "0")}
          </div>
          <div className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  )
}
