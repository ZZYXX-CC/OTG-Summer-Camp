import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SaveButton } from "@/components/ui/save-button";
import { Card } from "@/components/ui/card";
import { CalendarDays, ChevronRight, ChevronDown } from "lucide-react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";

const scheduleData = [
  {
    day: "Monday",
    sessions: [
      { time: "09:00 - 11:00", level: "Beginners" },
      { time: "14:00 - 16:00", level: "Advanced" },
    ],
  },
  {
    day: "Wednesday",
    sessions: [
      { time: "10:00 - 12:00", level: "Intermediate" },
      { time: "15:00 - 17:00", level: "Elite" },
    ],
  },
  {
    day: "Friday",
    sessions: [
      { time: "09:00 - 11:00", level: "All Levels" },
      { time: "14:00 - 16:00", level: "Performance" },
    ],
  },
];

export function Hero() {
  const scrollToNextSection = () => {
    const objectives = document.getElementById('objectives');
    if (objectives) {
      objectives.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-pakistan_green/90 to-pakistan_green">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      >
        <source src="/videos/football-bg.mp4" type="video/mp4" />
      </video>

      {/* Aurora Effect */}
      <AuroraBackground className="absolute inset-0 opacity-60 mix-blend-soft-light">
        <div className="h-full w-full" />
      </AuroraBackground>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-pakistan_green/30 via-transparent to-pakistan_green/50" />

      {/* Content */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-20 md:grid-cols-2 md:px-6 lg:py-32">
        {/* Left Column - Text Content */}
        <div className="flex flex-col items-start justify-center space-y-6">
          <Badge variant="outline" className="border-nyanza text-nyanza">
            Summer Camp 2025
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-nyanza sm:text-6xl md:text-7xl">
            Elite Football Training
          </h1>
          <p className="max-w-lg text-lg text-nyanza/80">
            Transform your game with professional coaching, state-of-the-art
            facilities, and a comprehensive development program.
          </p>
          <div className="flex gap-4">
            <SaveButton
              text={{
                idle: "Register Now",
                saving: "Register Now",
                saved: "Register Now"
              }}
              className="bg-light_green text-pakistan_green hover:bg-india_green hover:text-nyanza h-11 min-w-[140px] text-base font-semibold"
              onSave={() => {
                // Navigate to registration page or open modal
                console.log("Register clicked");
              }}
              showLoadingState={false}
              showConfetti={false}
            />
            <Button
              variant="outline"
              size="lg"
              className="border-nyanza text-nyanza hover:bg-nyanza hover:text-pakistan_green"
              onClick={scrollToNextSection}
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Right Column - Schedule Card */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md border-nyanza/20 bg-white/5 backdrop-blur-sm">
            <div className="p-6">
              <div className="mb-6 flex items-center gap-2 text-nyanza">
                <CalendarDays className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Training Schedule</h3>
              </div>
              <div className="space-y-6">
                {scheduleData.map((day) => (
                  <div key={day.day} className="space-y-2">
                    <h4 className="font-medium text-nyanza">{day.day}</h4>
                    <div className="space-y-2">
                      {day.sessions.map((session, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-lg border border-nyanza/20 bg-white/5 p-3"
                        >
                          <span className="text-sm text-nyanza/80">
                            {session.time}
                          </span>
                          <Badge
                            variant="outline"
                            className="border-pigment_green bg-pigment_green/10 text-nyanza"
                          >
                            {session.level}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* New Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-50 -translate-x-1/2 transform">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-col items-center gap-3"
        >
          <motion.button
            onClick={scrollToNextSection}
            className="group relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/50 bg-black/30 backdrop-blur-md transition-all hover:border-white hover:bg-black/40"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to next section"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <ChevronDown className="h-8 w-8 text-white" strokeWidth={2.5} />
            </motion.div>
          </motion.button>
          <span className="text-sm font-medium text-white/90">Scroll Down</span>
        </motion.div>
      </div>
    </section>
  );
}