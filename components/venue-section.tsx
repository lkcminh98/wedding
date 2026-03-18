"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function VenueSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/venue.jpg"
          alt="Địa điểm tổ chức"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase text-background/70 mb-6">
            Lời Mời
          </p>
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-background mb-8 text-balance">
            Trân Trọng Kính Mời
          </h2>

          <div className="w-16 h-px bg-background/40 mx-auto mb-10" />

          <p className="text-base md:text-lg text-background/90 leading-relaxed max-w-2xl mx-auto mb-8">
            Với tất cả lòng biết ơn và sự trân trọng, hai gia đình chúng tôi xin kính mời 
            quý khách đến chung vui trong ngày trọng đại của Bích và Minh. Sự hiện diện 
            của quý khách sẽ là niềm vinh hạnh và hạnh phúc lớn lao của chúng tôi.
          </p>

          <p className="text-base md:text-lg text-background/80 leading-relaxed max-w-2xl mx-auto">
            Rất mong được đón tiếp quý khách!
          </p>
        </motion.div>

        {/* Time reminder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 pt-12 border-t border-background/20"
        >
          <h3 className="font-serif text-xl md:text-2xl text-background mb-4">
            Lưu Ý
          </h3>
          <p className="text-sm text-background/70 max-w-xl mx-auto">
            Xin vui lòng xác nhận tham dự trước ngày 1 tháng 9 năm 2026 để chúng tôi 
            chuẩn bị tiếp đón chu đáo nhất.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
