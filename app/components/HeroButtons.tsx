'use client'

import { Button } from '@/components/ui/button'
import { MoveRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export function HeroButtons() {
  const router = useRouter();

  const handleScroll = () => {
    const objectives = document.getElementById('objectives');
    if (objectives) {
      const offsetTop = objectives.offsetTop;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const handleRegister = () => {
    router.push('/sign-up');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
      <Button 
        size="lg" 
        className={cn(
          "gap-2 bg-light_green-500/90 text-pakistan_green-900",
          "hover:bg-light_green-500 transition-colors",
          "relative overflow-hidden group"
        )}
        onClick={handleRegister}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-light_green-400/0 via-light_green-400/50 to-light_green-400/0 group-hover:translate-x-full -translate-x-full transition-transform duration-500" />
        Register Now <MoveRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
      </Button>
      <Button 
        size="lg" 
        variant="outline" 
        className={cn(
          "gap-2 text-nyanza-50 border-nyanza-50/80",
          "backdrop-blur-sm bg-white/5",
          "hover:bg-white/10 hover:border-nyanza-50 transition-all"
        )}
        onClick={handleScroll}
      >
        Learn More
      </Button>
    </div>
  )
} 