'use client';

import { Button } from '@/components/ui/button'
import { MoveRight } from 'lucide-react'

export function ScrollButton() {
  return (
    <Button 
      size="lg" 
      className="gap-2 bg-pakistan_green-800 text-nyanza-50 hover:bg-pakistan_green-700"
      onClick={() => {
        document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      Join Us <MoveRight className="w-5 h-5" />
    </Button>
  )
} 