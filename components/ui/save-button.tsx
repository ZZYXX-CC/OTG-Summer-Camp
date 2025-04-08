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
  showConfetti = true
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
          "group relative grid overflow-hidden rounded-full px-6 py-2 transition-all duration-200",
          status === "idle"
            ? "hover:bg-pakistan_green-700 hover:text-nyanza-50"
            : "",
          "hover:shadow-lg",
          className
        )}
        style={{ minWidth: "150px" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {status === "idle" && (
          <span>
            <span
              className={cn(
                "shadow-[0_1000px_0_0_rgb(132,204,22,0.9)_inset] dark:shadow-[0_1000px_0_0_rgb(20,83,45,0.9)_inset] spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full",
                "[mask:linear-gradient(black,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,black_360deg)]",
                "before:rotate-[-90deg] before:animate-rotate dark:before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)]",
                "before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%] dark:[mask:linear-gradient(white,_transparent_50%)]",
              )}
            />
          </span>
        )}
        <span
          className={cn(
            "backdrop absolute inset-px rounded-[22px] transition-colors duration-200",
            status === "idle"
              ? "bg-light_green-500/90 group-hover:bg-light_green-500 dark:bg-pakistan_green-800/90 dark:group-hover:bg-pakistan_green-800"
              : "",
          )}
        />
        <span className="z-10 flex items-center justify-center gap-2 text-sm font-medium">
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
        </span>
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