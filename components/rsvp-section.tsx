"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { LABELS, WEDDING_DATE } from "@/lib/constants";

export default function RSVPSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    attending: "",
    guests: "",
    attendingVenue: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const SHEET_URL =
    "https://script.google.com/macros/s/AKfycby_ySgnO0y0M69iB9a1o_9Fo3_DKgFtAj4L3_zag6awi7aNFJLbnQoBdndbEHPyIUqALw/exec";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await fetch(SHEET_URL, {
        method: "POST",
        // Dùng text/plain để tránh CORS preflight
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(formData),
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Lỗi gửi dữ liệu:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 md:py-32 px-6 bg-card">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-6">
            {LABELS.rsvpTitle}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-4">
            {LABELS.rsvpSubtitle}
          </h2>
          <p className="text-sm text-muted-foreground">
            {`Vui lòng xác nhận trước ngày 1 tháng ${WEDDING_DATE.monthDisplay} năm ${WEDDING_DATE.yearDisplay}`}
          </p>
        </motion.div>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-background border border-border"
          >
            <div className="font-serif text-2xl md:text-3xl text-foreground mb-4">
              {LABELS.rsvpSuccess}
            </div>
            <p className="text-muted-foreground">{LABELS.rsvpSuccessMessage}</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-8"
            aria-busy={isLoading}
          >
            <fieldset
              disabled={isLoading}
              className={
                isLoading ? "opacity-70 pointer-events-none" : "space-y-4"
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 space-y-3">
                <div className="space-y-3">
                  <Label
                    htmlFor="name"
                    className="text-xs tracking-wider uppercase text-muted-foreground"
                  >
                    {LABELS.fullName}
                  </Label>
                  <Input
                    id="name"
                    placeholder="Nhập họ và tên"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-background border-border focus:border-foreground/30 h-12"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="phone"
                    className="text-xs tracking-wider uppercase text-muted-foreground"
                  >
                    {LABELS.phoneNumber}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Nhập số điện thoại"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="bg-background border-border focus:border-foreground/30 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-xs tracking-wider uppercase text-muted-foreground">
                  Quý khách có thể tham dự không?
                </Label>
                <RadioGroup
                  value={formData.attending}
                  onValueChange={(value) =>
                    setFormData({ ...formData, attending: value })
                  }
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Label
                    htmlFor="yes"
                    className={cn(
                      "flex-1 flex items-center justify-center gap-3 p-4 border cursor-pointer transition-colors",
                      formData.attending === "yes"
                        ? "border-foreground bg-foreground/5"
                        : "border-border hover:border-foreground/30",
                    )}
                  >
                    <RadioGroupItem value="yes" id="yes" />
                    <span className="text-sm">Vui vẻ nhận lời</span>
                  </Label>

                  <Label
                    htmlFor="no"
                    className={cn(
                      "flex-1 flex items-center justify-center gap-3 p-4 border cursor-pointer transition-colors",
                      formData.attending === "no"
                        ? "border-foreground bg-foreground/5"
                        : "border-border hover:border-foreground/30",
                    )}
                  >
                    <RadioGroupItem value="no" id="no" />
                    <span className="text-sm">Rất tiếc không thể</span>
                  </Label>
                </RadioGroup>
              </div>

              {formData.attending === "yes" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:mb-4 mb-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="guests"
                        className="text-xs tracking-wider uppercase text-muted-foreground"
                      >
                        {LABELS.numberOfGuests}
                      </Label>
                      <Input
                        id="guests"
                        type="number"
                        min="1"
                        max="10"
                        placeholder="Bao gồm cả bạn"
                        value={formData.guests}
                        onChange={(e) =>
                          setFormData({ ...formData, guests: e.target.value })
                        }
                        className="bg-background border-border focus:border-foreground/30 h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="attendingVenue"
                        className="text-xs tracking-wider uppercase text-muted-foreground"
                      >
                        {LABELS.attendingEvent}
                      </Label>
                      <select
                        id="attendingVenue"
                        value={formData.attendingVenue}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            attendingVenue: e.target.value,
                          })
                        }
                        className="w-full h-12 px-3 bg-background border border-border focus:border-foreground/30 text-foreground text-sm"
                      >
                        <option value="">Chọn tiệc tham dự</option>
                        <option value="Nhà trai">Tiệc nhà trai</option>
                        <option value="Nhà gái">Tiệc nhà gái</option>
                        <option value="Cả hai">Cả hai</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="space-y-2 mt-2">
                <Label
                  htmlFor="message"
                  className="text-xs tracking-wider uppercase text-muted-foreground"
                >
                  {LABELS.wishes}
                </Label>
                <Textarea
                  id="message"
                  placeholder={LABELS.wishesPlaceholder}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="bg-background border-border focus:border-foreground/30 min-h-30 resize-none"
                />
              </div>

              <div className="text-center pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/90 px-12 h-14 text-xs tracking-[0.2em] uppercase"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner className="mr-2" /> Đang gửi...
                    </>
                  ) : (
                    LABELS.submitRsvp
                  )}
                </Button>
              </div>
            </fieldset>
          </motion.form>
        )}
      </div>
    </section>
  );
}
