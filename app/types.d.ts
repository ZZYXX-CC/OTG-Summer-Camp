/// <reference types="next" />
/// <reference types="next/image-types/global" />

import type { ImageProps as NextImageProps } from 'next/image'

declare module 'next/image' {
  interface ImageProps extends NextImageProps {
    style?: React.CSSProperties
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
} 