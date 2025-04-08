"use client";

import * as React from "react";
import { 
  Dumbbell, 
  Waves as Pool, 
  Goal as Football,
  MoveRight,
  Info, 
  Shield, 
  Users, 
  Clock, 
  Calendar, 
  CalendarDays 
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DotPattern } from "@/components/ui/dot-pattern";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

interface ProgramDetailProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  details: {
    time?: string;
    schedule?: string;
    ages?: string;
    safety?: string;
  };
  modalContent: {
    overview: string;
    schedule: string;
    ageGroups: string[];
    safety: string[];
  };
}

interface FacilityCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  details: {
    overview: string;
    features: string[];
    schedule: string;
  };
}

function ProgramDetailCard({
  title,
  description,
  icon,
  details,
  modalContent,
}: ProgramDetailProps) {
  return (
    <Card className="w-full rounded-lg overflow-hidden bg-white/90 dark:bg-zinc-800/90 border-pakistan_green-300 hover:border-pakistan_green-400 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 hover:bg-nyanza-100 dark:hover:bg-zinc-700">
      <CardHeader className="border-b border-pakistan_green-100 dark:border-pakistan_green-900">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-pakistan_green-200 text-pakistan_green-900 dark:bg-pakistan_green-900 dark:text-pakistan_green-100 shadow-sm">
            {icon}
          </div>
          <CardTitle className="text-xl font-semibold text-pakistan_green-900 dark:text-nyanza-50">{title}</CardTitle>
        </div>
        <CardDescription className="text-base text-pakistan_green-800 dark:text-nyanza-200">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            {details.time && (
              <div className="flex flex-row gap-3">
                <Clock className="w-5 h-5 mt-0.5 text-pakistan_green-800" />
                <div className="flex flex-col">
                  <p className="font-medium text-pakistan_green-900 dark:text-nyanza-100">Training Hours</p>
                  <p className="text-sm text-pakistan_green-700 dark:text-nyanza-300">{details.time}</p>
                </div>
              </div>
            )}
            {details.schedule && (
              <div className="flex flex-row gap-3">
                <Calendar className="w-5 h-5 mt-0.5 text-pakistan_green-800" />
                <div className="flex flex-col">
                  <p className="font-medium text-pakistan_green-900 dark:text-nyanza-100">Schedule</p>
                  <p className="text-sm text-pakistan_green-700 dark:text-nyanza-300">{details.schedule}</p>
                </div>
              </div>
            )}
            {details.ages && (
              <div className="flex flex-row gap-3">
                <Users className="w-5 h-5 mt-0.5 text-pakistan_green-800" />
                <div className="flex flex-col">
                  <p className="font-medium text-pakistan_green-900 dark:text-nyanza-100">Age Range</p>
                  <p className="text-sm text-pakistan_green-700 dark:text-nyanza-300">{details.ages}</p>
                </div>
              </div>
            )}
            {details.safety && (
              <div className="flex flex-row gap-3">
                <Shield className="w-5 h-5 mt-0.5 text-pakistan_green-800" />
                <div className="flex flex-col">
                  <p className="font-medium text-pakistan_green-900 dark:text-nyanza-100">Safety</p>
                  <p className="text-sm text-pakistan_green-700 dark:text-nyanza-300">{details.safety}</p>
                </div>
              </div>
            )}
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full gap-2 border-pakistan_green-300 text-pakistan_green-900 hover:bg-pakistan_green-50 hover:text-pakistan_green-900 dark:border-nyanza-800 dark:text-nyanza-100 dark:hover:bg-nyanza-950"
              >
                View Program Details <Info className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-white dark:bg-zinc-900 border-pakistan_green-200">
              <div className="flex flex-col gap-2">
                <div
                  className="flex size-11 shrink-0 items-center justify-center rounded-full bg-pakistan_green-200 text-pakistan_green-900 dark:bg-pakistan_green-900 dark:text-pakistan_green-100 shadow-sm"
                  aria-hidden="true"
                >
                  {icon}
                </div>
                <DialogHeader>
                  <DialogTitle className="text-left text-xl font-semibold text-pakistan_green-900 dark:text-nyanza-50">{title}</DialogTitle>
                  <DialogDescription className="text-left text-base text-pakistan_green-800 dark:text-nyanza-200">
                    Complete program information and schedule
                  </DialogDescription>
                </DialogHeader>
              </div>

              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-pakistan_green-900 dark:text-nyanza-100">Program Overview</h4>
                  <p className="text-sm text-pakistan_green-700 dark:text-nyanza-300">{modalContent.overview}</p>
                </div>
                
                <Separator className="bg-pakistan_green-200 dark:bg-nyanza-800" />
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-pakistan_green-800" />
                    <h4 className="text-sm font-medium text-pakistan_green-900 dark:text-nyanza-100">Training Schedule</h4>
                  </div>
                  <p className="text-sm text-pakistan_green-700 dark:text-nyanza-300">
                    {modalContent.schedule}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-pakistan_green-800" />
                    <h4 className="text-sm font-medium text-pakistan_green-900 dark:text-nyanza-100">Age Groups</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {modalContent.ageGroups.map((age, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        className="bg-pakistan_green-100 text-pakistan_green-900 hover:bg-pakistan_green-200 dark:bg-nyanza-900 dark:text-nyanza-100"
                      >
                        {age}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-pakistan_green-800" />
                    <h4 className="text-sm font-medium text-pakistan_green-900 dark:text-nyanza-100">Safety & Requirements</h4>
                  </div>
                  <ul className="text-sm text-pakistan_green-700 dark:text-nyanza-300 space-y-1 list-disc pl-4">
                    {modalContent.safety.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}

function FacilityCard({
  title,
  description,
  icon,
  image,
  details,
}: FacilityCardProps) {
  return (
    <Card className="group relative w-full rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 backdrop-blur-sm border-pakistan_green-100">
      {/* Base gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-nyanza-100/90 to-pakistan_green-100/95 dark:from-zinc-900/95 dark:via-zinc-800/90 dark:to-pakistan_green-950/95 z-0" />
      
      {/* Subtle noise texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')] opacity-20 mix-blend-overlay z-10" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW9wYWNpdHk9IjAuMTUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40 mix-blend-soft-light z-20" />
      
      {/* Depth shadow */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5 z-30" />
      
      <div className="relative aspect-[4/3] w-full overflow-hidden z-40">
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/70" />
        <img 
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Age/Duration Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <Badge 
            variant="outline" 
            className="bg-white/90 text-pakistan_green-900 border-0 backdrop-blur-sm shadow-sm"
          >
            {details.schedule.split('.')[0]}
          </Badge>
        </div>

        {/* Title and Description Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-semibold mb-2 drop-shadow-md">{title}</h3>
          <p className="text-white/90 text-sm line-clamp-2 drop-shadow-md">{description}</p>
        </div>
      </div>

      {/* Features Preview */}
      <div className="relative p-6 z-40">
        <div className="flex flex-wrap gap-2 mb-4">
          {details.features.slice(0, 3).map((feature, index) => (
            <Badge 
              key={index}
              variant="secondary"
              className="bg-pakistan_green-100/90 text-pakistan_green-900 hover:bg-pakistan_green-200/90 backdrop-blur-sm shadow-sm"
            >
              {feature}
            </Badge>
          ))}
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              className="w-full bg-pakistan_green-800 text-nyanza-50 hover:bg-pakistan_green-900 transition-colors"
            >
              Read More <MoveRight className="w-4 h-4 ml-2" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[90vh] bg-white dark:bg-zinc-900 border-pakistan_green-200 rounded-t-[20px] px-4 pb-8 pt-6">
            <div className="max-w-3xl mx-auto">
              {/* Drag indicator */}
              <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-8" />
              <div className="flex flex-col gap-2">
                <div
                  className="flex size-11 shrink-0 items-center justify-center rounded-full bg-pakistan_green-200 text-pakistan_green-900 dark:bg-pakistan_green-900 dark:text-pakistan_green-100"
                  aria-hidden="true"
                >
                  {icon}
                </div>
                <SheetHeader>
                  <SheetTitle className="text-left text-xl font-semibold text-pakistan_green-900 dark:text-nyanza-50">{title}</SheetTitle>
                  <SheetDescription className="text-left text-base text-pakistan_green-800 dark:text-nyanza-200">
                    Complete program information and schedule
                  </SheetDescription>
                </SheetHeader>
              </div>

              <div className="space-y-6 mt-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-pakistan_green-900 dark:text-nyanza-100">Overview</h4>
                  <p className="text-sm text-pakistan_green-700 dark:text-nyanza-300">{details.overview}</p>
                </div>
                
                <Separator className="bg-pakistan_green-200 dark:bg-nyanza-800" />
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-pakistan_green-900 dark:text-nyanza-100">Key Features</h4>
                  <ul className="text-sm text-pakistan_green-700 dark:text-nyanza-300 space-y-1 list-disc pl-4">
                    {details.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-pakistan_green-900 dark:text-nyanza-100">Schedule & Structure</h4>
                  <p className="text-sm text-pakistan_green-700 dark:text-nyanza-300">
                    {details.schedule}
                  </p>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </Card>
  );
}

function ProgramDetailsSection() {
  const programs: ProgramDetailProps[] = [
    {
      title: "Training Hours",
      description: "Structured daily sessions for optimal skill development",
      icon: <Clock className="w-5 h-5" />,
      details: {
        time: "8:00 AM to 1:00 PM",
        schedule: "Monday to Friday",
      },
      modalContent: {
        overview: "Our program runs daily sessions designed to maximize skill development while ensuring proper rest and recovery.",
        schedule: "Morning sessions from 8:00 AM to 1:00 PM, Monday through Friday. Each session includes structured training, breaks, and cool-down periods.",
        ageGroups: ["6-9 years", "10-13 years", "14-18 years"],
        safety: [
          "Regular hydration breaks every 30-45 minutes",
          "Professional supervision at all times",
          "Age-appropriate training intensity",
        ],
      },
    },
    {
      title: "Duration",
      description: "Intensive two-week program with comprehensive training",
      icon: <CalendarDays className="w-5 h-5" />,
      details: {
        time: "2 Weeks",
        schedule: "Intensive Training",
      },
      modalContent: {
        overview: "A focused two-week intensive program combining football training, physical conditioning, and skill development.",
        schedule: "Full daily program with rotating activities including football drills, swimming, and gym sessions.",
        ageGroups: ["6-9 years", "10-13 years", "14-18 years"],
        safety: [
          "Structured progression of activities",
          "Regular assessment of player development",
          "Balanced training load across the program",
        ],
      },
    },
    {
      title: "Age Groups",
      description: "Tailored training for different age and skill levels",
      icon: <Users className="w-5 h-5" />,
      details: {
        ages: "6-18 Years",
        schedule: "Grouped by Age & Skill",
      },
      modalContent: {
        overview: "Age-specific training groups ensure appropriate development and challenge levels for all participants.",
        schedule: "Groups rotate through different activities throughout the day, with age-appropriate modifications.",
        ageGroups: ["6-9 years", "10-13 years", "14-18 years"],
        safety: [
          "Age-appropriate equipment and drills",
          "Skill-based group assignments",
          "Individual progress tracking",
        ],
      },
    },
    {
      title: "Safety First",
      description: "Professional supervision and certified coaching staff",
      icon: <Shield className="w-5 h-5" />,
      details: {
        safety: "Certified Coaches",
        schedule: "First Aid On-site",
      },
      modalContent: {
        overview: "Safety is our top priority, with comprehensive measures and professional supervision throughout all activities.",
        schedule: "Continuous monitoring and support during all training sessions.",
        ageGroups: ["6-9 years", "10-13 years", "14-18 years"],
        safety: [
          "Certified coaches and first aid personnel",
          "Regular equipment safety checks",
          "Emergency response protocols in place",
          "Proper warm-up and cool-down procedures",
        ],
      },
    },
  ];

  const facilities: FacilityCardProps[] = [
    {
      title: "Football Training",
      description: "Technical and tactical development sessions",
      icon: <Football className="w-5 h-5" />,
      image: "/images/football.jpg",
      details: {
        overview: "Our comprehensive football training program focuses on developing both technical skills and tactical understanding. Each session is carefully structured to improve individual abilities while promoting team play and game awareness.",
        features: [
          "Advanced ball mastery drills",
          "Tactical gameplay scenarios",
          "Position-specific training",
          "Small-sided games",
          "Match analysis sessions"
        ],
        schedule: "Technical and tactical sessions. Progressive training for all skill levels."
      }
    },
    {
      title: "Swimming Sessions",
      description: "Recovery and cross-training activities",
      icon: <Pool className="w-5 h-5" />,
      image: "/images/swimming.jpg",
      details: {
        overview: "Swimming sessions are integrated into our program as both a recovery activity and a way to build overall fitness. The low-impact nature of swimming helps prevent injury while improving cardiovascular endurance.",
        features: [
          "Active recovery exercises",
          "Water resistance training",
          "Cardiovascular conditioning",
          "Muscle recovery sessions",
          "Supervised pool activities"
        ],
        schedule: "Recovery and fitness sessions. Balanced with main training program."
      }
    },
    {
      title: "Gym Workouts",
      description: "Age-appropriate strength and conditioning",
      icon: <Dumbbell className="w-5 h-5" />,
      image: "/images/gym.jpg",
      details: {
        overview: "Our gym program is carefully designed for young athletes, focusing on proper form, body weight exercises, and appropriate resistance training. All sessions are supervised by qualified youth fitness instructors.",
        features: [
          "Age-appropriate exercises",
          "Core strength development",
          "Flexibility training",
          "Injury prevention work",
          "Speed and agility drills"
        ],
        schedule: "Structured strength sessions. Tailored to each age group."
      }
    }
  ];

  return (
    <section className="relative w-full py-20 bg-gradient-to-br from-nyanza-50 via-nyanza-100 to-nyanza-200 overflow-hidden">
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
      <div className="container mx-auto px-4 relative z-30">
        <div className="flex text-center justify-center items-center gap-4 flex-col mb-12">
          <Badge 
            variant="outline" 
            className="bg-pakistan_green-200 text-pakistan_green-900 border-0 font-medium"
          >
            Training Activities
          </Badge>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-4xl tracking-tight max-w-xl text-center font-semibold text-pakistan_green-900 dark:text-nyanza-50">
              Complete Training Program
            </h2>
            <p className="text-lg leading-relaxed tracking-tight text-pakistan_green-800 dark:text-nyanza-200 max-w-xl text-center">
              A balanced mix of football training, recovery, and conditioning
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility, index) => (
            <FacilityCard 
              key={index} 
              {...facility} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProgramDetailsSection as unknown as typeof ProgramDetailsSection; 