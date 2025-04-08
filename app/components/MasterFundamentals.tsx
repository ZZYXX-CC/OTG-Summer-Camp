import React from "react";
import { Star, Medal, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { DotPattern } from "@/components/ui/dot-pattern";
import { GlowEffect } from "@/components/ui/glow-effect";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import Image from "next/image";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="group relative">
      {/* Glow Effect */}
      <GlowEffect
        colors={['#0C4B1C', '#33FF57', '#90EE90', '#228B22']}
        mode="breathe"
        blur="medium"
        scale={1.05}
        duration={4}
      />
      
      {/* Animated metallic border effect */}
      <div className="absolute -inset-[1px] rounded-xl animate-border-shimmer metallic-glow"></div>
      
      <div className="relative flex items-start gap-4 rounded-xl bg-gradient-to-br from-pakistan_green-900 to-pakistan_green-800 p-6 transition-all duration-300 card-inner-shadow">
        {/* 3D Metallic Icon Container */}
        <div className="relative size-12 shrink-0 rounded-lg bg-gradient-to-br from-pakistan_green-800 to-pakistan_green-700 shadow-lg">
          {/* Metallic highlight effect */}
          <div className="absolute inset-0 rounded-lg icon-highlight opacity-50"></div>
          
          {/* Icon wrapper with 3D effect */}
          <div className="relative size-full p-2.5 icon-3d">
            <div className="relative size-full text-lime-400 transform hover:scale-105 transition-transform duration-200">
              {icon}
            </div>
          </div>
        </div>
        
        <div className="relative">
          <h3 className="text-xl font-semibold text-nyanza-50 mb-2">{title}</h3>
          <p className="text-nyanza-200">{description}</p>
        </div>
      </div>
    </div>
  );
};

const MasterFundamentals = () => {
  const features = [
    {
      icon: (
        <div className="w-full h-full relative">
          {/* Main icon with 3D effect */}
          <Star className="w-full h-full absolute inset-0 text-lime-400 drop-shadow-[0_2px_3px_rgba(163,230,53,0.3)]" />
          {/* Bottom layer for depth */}
          <Star className="w-full h-full absolute inset-0 text-pakistan_green-900/40 transform translate-y-[2px]" />
          {/* Highlight layer */}
          <Star className="w-full h-full absolute inset-0 text-lime-300/20 transform -translate-y-[1px]" />
        </div>
      ),
      title: "Core Skills",
      description: "Intensive drills focusing on passing accuracy, first touch, dribbling, and shooting precision",
    },
    {
      icon: (
        <div className="w-full h-full relative">
          <Medal className="w-full h-full absolute inset-0 text-lime-400 drop-shadow-[0_2px_3px_rgba(163,230,53,0.3)]" />
          <Medal className="w-full h-full absolute inset-0 text-pakistan_green-900/40 transform translate-y-[2px]" />
          <Medal className="w-full h-full absolute inset-0 text-lime-300/20 transform -translate-y-[1px]" />
        </div>
      ),
      title: "Physical Conditioning",
      description: "Tailored exercises to improve speed, agility, balance, strength, and stamina",
    },
    {
      icon: (
        <div className="w-full h-full relative">
          <Calendar className="w-full h-full absolute inset-0 text-lime-400 drop-shadow-[0_2px_3px_rgba(163,230,53,0.3)]" />
          <Calendar className="w-full h-full absolute inset-0 text-pakistan_green-900/40 transform translate-y-[2px]" />
          <Calendar className="w-full h-full absolute inset-0 text-lime-300/20 transform -translate-y-[1px]" />
        </div>
      ),
      title: "Daily Training",
      description: "Structured sessions from 8:00 AM to 1:00 PM, Monday to Friday for two weeks",
    },
  ];

  return (
    <section id="objectives" className="relative w-full py-20 bg-gradient-to-br from-nyanza-50 via-nyanza-100 to-nyanza-200 overflow-hidden">
      {/* Flickering Grid Background */}
      <FlickeringGrid
        className="absolute inset-0 z-0"
        squareSize={4}
        gridGap={6}
        color="#228B22"
        maxOpacity={0.1}
        flickerChance={0.1}
      />
      
      <DotPattern
        className="absolute inset-0 z-10 [mask-image:radial-gradient(1000px_circle_at_50%_50%,white,transparent)] opacity-50"
        width={24}
        height={24}
        cx={3}
        cy={3}
        cr={1.5}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/20 z-20" />
      <div className="container mx-auto relative z-30">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          <div className="flex flex-col space-y-6">
            <Badge variant="outline" className="w-fit bg-light_green-500 text-pakistan_green-900 border-0">
              Training Program
            </Badge>
            <h2 className="text-4xl font-bold text-pakistan_green-900">
              Master the Fundamentals
            </h2>
            <p className="text-xl text-pakistan_green-700">
              Our Easter Camp is meticulously planned for noticeable progress in every aspect of your game
            </p>
            <div className="relative w-full aspect-[4/3] md:aspect-[16/9]">
              <img
                src="/kid-jump.png"
                alt="Young football player jumping during training"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MasterFundamentals; 