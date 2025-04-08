"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Check, Sparkles } from "lucide-react"
import confetti from "canvas-confetti"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"


interface SaveButtonProps {
  text?: {
    idle?: string
    saving?: string
    saved?: string
  }
  className?: string
  onSave?: () => Promise<void> | void
  showLoadingState?: boolean
  showConfetti?: boolean
  onSuccess?: () => void
}

export function SaveButton({ 
  text = {
    idle: "Save",
    saving: "Saving...",
    saved: "Saved!"
  },
  className,
  onSave,
  showLoadingState = true,
  showConfetti = true,
  onSuccess
}: SaveButtonProps) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle")
  const [bounce, setBounce] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const handleSave = async () => {
    if (status === "idle") {
      if (!showLoadingState) {
        if (onSave) {
          onSave()
        }
        return
      }

      setStatus("saving")
      try {
        if (onSave) {
          await onSave()
        } else {
          // Simulation of saving if onSave is not provided
          await new Promise(resolve => setTimeout(resolve, 2000))
        }
        setStatus("saved")
        setBounce(true)
        if (showConfetti) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#00ffff", "#ff00ff"],
            shapes: ["star", "circle"],
          })
        }
        
        // Call onSuccess callback if provided
        if (onSuccess) {
          onSuccess()
        }

        setTimeout(() => {
          setStatus("idle")
          setBounce(false)
        }, 2000)
      } catch (error) {
        setStatus("idle")
        console.error("Save failed:", error)
      }
    }
  }

  const buttonVariants = {
    idle: {
      backgroundColor: isDark ? "rgb(20, 83, 45)" : "rgb(132, 204, 22)", // pakistan_green-800 : light_green-500
      color: isDark ? "rgb(236, 253, 245)" : "rgb(20, 83, 45)", // nyanza-50 : pakistan_green-800
      scale: 1,
    },
    saving: {
      backgroundColor: "rgb(22, 101, 52)", // pakistan_green-700
      color: "rgb(236, 253, 245)", // nyanza-50
      scale: 1,
    },
    saved: {
      backgroundColor: "rgb(132, 204, 22)", // light_green-500
      color: "rgb(20, 83, 45)", // pakistan_green-800
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.2,
        times: [0, 0.5, 1],
      },
    },
  }

  const sparkleVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },
  }

  return (
    <div className="relative">
      <motion.button
        onClick={handleSave}
        animate={showLoadingState ? status : undefined}
        variants={buttonVariants}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:text-accent-foreground h-11 rounded-md px-8 gap-2 border-pakistan_green-800 text-pakistan_green-800 hover:bg-pakistan_green-50",
          className
        )}
        style={{ minWidth: "150px" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {showLoadingState && (
          <AnimatePresence mode="wait">
            {status === "saving" && (
              <motion.span
                key="saving"
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.3,
                  rotate: { repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" },
                }}
              >
                <Loader2 className="w-4 h-4" />
              </motion.span>
            )}
            {status === "saved" && (
              <motion.span
                key="saved"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <Check className="w-4 h-4" />
              </motion.span>
            )}
          </AnimatePresence>
        )}
        <motion.span
          key={status}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {status === "idle" ? text.idle : status === "saving" ? text.saving : text.saved}
        </motion.span>
      </motion.button>
      <AnimatePresence>
        {bounce && showConfetti && (
          <motion.div
            className="absolute top-0 right-0 -mr-1 -mt-1"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={sparkleVariants}
          >
            <Sparkles className="w-6 h-6 text-light_green-400 dark:text-light_green-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 