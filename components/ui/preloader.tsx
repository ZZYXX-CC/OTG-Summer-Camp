'use client';

import { useEffect, useState } from 'react';
import { Spinner } from './spinner';
import { motion, AnimatePresence } from 'framer-motion';

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the document is loaded
    if (document.readyState === 'complete') {
      setIsLoading(false);
    } else {
      window.addEventListener('load', () => setIsLoading(false));
      return () => window.removeEventListener('load', () => setIsLoading(false));
    }
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-pakistan_green-900/90 to-pakistan_green-800/90 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <Spinner variant="infinite" className="text-nyanza-50 w-16 h-16" />
            <p className="text-nyanza-50 text-lg font-medium">Loading...</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
