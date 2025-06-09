"use client";

import { type ImageProps, default as Image } from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MoveRight, Calendar, MapPin, Medal, Star, Clock, Users, Shield, FileDown } from 'lucide-react'
import { HeroButtons } from './components/HeroButtons'
import MasterFundamentals from './components/MasterFundamentals'
import ProgramDetailsSection from './components/ProgramDetails'
import { ScrollButton } from './components/ScrollButton'
import { BackgroundPaths } from '@/components/ui/background-paths'
import type { StaticImageData } from 'next/image'
import { cn } from "@/lib/utils"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-[800px] bg-gradient-to-b from-pakistan_green-900 to-pakistan_green-800">
        {/* Logo */}
        <div className="absolute top-6 md:top-8 lg:top-10 left-1/2 -translate-x-1/2 z-20 w-[150px] sm:w-[180px] md:w-[200px] lg:w-[220px] h-auto px-4">
          <img
            src="/images/logos.png"
            alt="OTG Football Academy and Mono Liza Sports Centre Logos"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            {/* Desktop Image */}
            <div className="relative w-full h-full hidden md:block">
              <img
                src="/hero-bg.jpg"
                alt="OTG Football Academy coach with young players"
                className="w-full h-full object-cover opacity-70"
                style={{
                  objectPosition: 'center center'
                }}
              />
            </div>
            {/* Mobile Image */}
            <div className="relative w-full h-full block md:hidden">
              <img
                src="/hero-bg.jpg"
                alt="OTG Football Academy training session"
                className="w-full h-full object-cover opacity-70"
                style={{
                  objectPosition: 'center center'
                }}
              />
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-pakistan_green-900/60 to-pakistan_green-800/60" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto h-full flex items-center justify-center pt-32 pb-20 md:pt-36 md:pb-28 lg:pt-40 lg:pb-32">
          <div className="flex flex-col items-center text-center relative z-10">
            <div className="flex gap-6 flex-col text-nyanza-50 max-w-3xl">
              <div>
                <Badge variant="outline" className="bg-light_green-500 text-pakistan_green-900 border-0">
                  Summer Camp 2025 • Ages 6-18 • Aug 4-15
                </Badge>
              </div>
              <div className="flex gap-6 flex-col">
                <h1 className="text-5xl md:text-7xl tracking-tight font-bold">
                  Transform Your Game This Summer
                </h1>
                <p className="text-xl leading-relaxed tracking-tight text-nyanza-200">
                  Experience our comprehensive two-week program featuring football development, multi-sport exposure, life skills workshops, and personal growth training. Limited spots available to ensure personalized attention.
                </p>
              </div>
              <HeroButtons />
            </div>
          </div>
        </div>
      </section>

      {/* Master the Fundamentals Section */}
      <MasterFundamentals />

      {/* Program Details Section */}
      <ProgramDetailsSection />

      {/* Facilities & Activities Section */}
      <section className="relative w-full py-20 bg-gradient-to-br from-pakistan_green-800 to-india_green-800">
        <BackgroundPaths title="World-Class Facilities" />
        <div className="container relative z-20 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-nyanza-50 mb-4">World-Class Facilities</h2>
            <p className="text-xl text-nyanza-200 max-w-2xl mx-auto">
              Train in our state-of-the-art facilities at Mono Liza Sports Centre
            </p>
          </div>
          
          {/* Scrollable Image Gallery */}
          <div className="relative mb-12 overflow-hidden">
            <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
              {[
                {
                  src: "/images/facilities/football-pitch.jpg",
                  alt: "Football training pitch",
                  title: "Main Training Ground"
                },
                {
                  src: "/images/facilities/indoors.jpg",
                  alt: "Rest space",
                  title: "Rest Space"
                },
                {
                  src: "/images/facilities/gym.jpg",
                  alt: "Gym equipment",
                  title: "Modern Gym Facility"
                },
                {
                  src: "/images/facilities/pool.jpg",
                  alt: "Swimming pool",
                  title: "Swimming Pool"
                }
              ].map((image, index) => (
                <div key={index} className="relative flex-none w-[300px] md:w-[400px] snap-start">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      quality={85}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4dHRsdHR4dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR4SEhsdHR4dHR4dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                      className="object-cover"
                      sizes="(max-width: 768px) 300px, 400px"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />
                  <h3 className="absolute bottom-4 left-4 text-xl font-semibold text-white">
                    {image.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Football Pitches",
                description: "Three 5-aside and one 8-aside pitch for various drills and games"
              },
              {
                title: "Swimming Pool",
                description: "5m x 10m pool for swimming instruction and water safety"
              },
              {
                title: "Gym Facilities",
                description: "Modern gym equipment for strength and conditioning"
              },
              {
                title: "Training Areas",
                description: "Dedicated spaces for specific skill development"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-nyanza-50 mb-2">{item.title}</h3>
                <p className="text-nyanza-200">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <ScrollButton />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="cta" className="w-full py-20 bg-nyanza-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="bg-light_green-500 text-pakistan_green-900 border-0 mb-6">
              Limited Spots Available
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-pakistan_green-900 mb-6">
              Ready to Transform Your Football Journey?
            </h2>
            <p className="text-xl text-pakistan_green-700 mb-8 max-w-2xl mx-auto">
              Join us this Summer for an unforgettable football experience. Secure your spot today and take the first step towards becoming a better player.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="gap-2 bg-pakistan_green-800 text-nyanza-50 hover:bg-pakistan_green-700"
                onClick={() => window.location.href = '/register'}
              >
                Register Now <MoveRight className="w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" 
                className="gap-2 border-pakistan_green-800 text-pakistan_green-800 hover:bg-pakistan_green-50"
                onClick={() => {
                  const fileId = '1Ny0JunwOUCN3bDorIRbkP8YtelTTR20L';
                  const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
                  window.open(downloadUrl, '_blank');
                }}
              >
                <FileDown className="w-5 h-5" />
                Download Brochure
              </Button>
            </div>
            <p className="mt-6 text-sm text-pakistan_green-600">
              Have questions? Contact us at <a href="mailto:info@offthegame.com" className="font-semibold hover:text-pakistan_green-800">info@offthegame.com</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}