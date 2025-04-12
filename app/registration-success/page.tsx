"use client";

import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { Download, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BackgroundPaths } from "@/components/ui/background-paths";
import Image from "next/image";

export default function RegistrationSuccess() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-pakistan_green-900 to-pakistan_green-800">
      {/* Flickering Background */}
      <FlickeringGrid 
        className="z-0" 
        color="#228B22" 
        maxOpacity={0.15} 
        squareSize={4} 
        gridGap={4} 
        flickerChance={0.1} 
      />
      
      {/* Background Paths */}
      <div className="z-10 relative">
        <BackgroundPaths title="Registration Complete" />
      </div>
      
      <div className="relative z-20 max-w-md w-full mx-4 p-8 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-2xl shadow-xl border border-nyanza-50/20">

        <div className="text-center">
          <div className="w-16 h-16 bg-light_green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-light_green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-nyanza-50 mb-4">
            Registration Successful!
          </h2>
          <p className="text-nyanza-200 mb-8">
            Thank you for registering for the OTG Football Academy Camp. We've sent you
            a confirmation email with all the details.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className={cn(
                "gap-2 bg-light_green-500/90 text-pakistan_green-900",
                "hover:bg-light_green-500 transition-colors",
                "relative overflow-hidden group"
              )}
              onClick={() => {
                const fileId = '1TgdVfZ3vcXck5zgGiICVxlGz4G_B-ZaR';
                const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
                window.open(downloadUrl, '_blank');
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-light_green-400/0 via-light_green-400/50 to-light_green-400/0 group-hover:translate-x-full -translate-x-full transition-transform duration-500" />
              <Download className="w-5 h-5" />
              Download Brochure
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className={cn(
                "gap-2 text-nyanza-50 border-nyanza-50/80",
                "backdrop-blur-sm bg-white/5",
                "hover:bg-white/10 hover:border-nyanza-50 transition-all"
              )}
              asChild
            >
              <a
                href="https://offthegame.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                Return Home <MoveRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
        
        {/* Child Football Image */}
        <div className="mt-12 flex justify-center">
          <div className="relative w-[250px] h-[250px]">
            <Image 
              src="/images/child-football.png" 
              alt="Child Football Player" 
              width={250} 
              height={250}
              className="relative drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
