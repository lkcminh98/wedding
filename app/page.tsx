import HeroSection from "@/components/hero-section"
import CoupleSection from "@/components/couple-section"
import PhotoGallery from "@/components/photo-gallery"
import EventDetails from "@/components/event-details"
import FamilyVenues from "@/components/family-venues"
import VenueSection from "@/components/venue-section"
import GiftSection from "@/components/gift-section"
import RSVPSection from "@/components/rsvp-section"
import Footer from "@/components/footer"
import MusicPlayer from "@/components/music-player"
import FallingPetals from "@/components/falling-petals"

export default function WeddingInvitation() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <FallingPetals />
      <HeroSection />
      <CoupleSection />
      <PhotoGallery />
      <EventDetails />
      <FamilyVenues />
      <VenueSection />
      {/* <GiftSection /> */}
      <RSVPSection />
      <Footer />
      <MusicPlayer />
    </main>
  )
}
