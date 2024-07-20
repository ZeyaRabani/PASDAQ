import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Metadata } from 'next'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function constructMetadata({
  title = 'PANDAQ',
  // description = 'Empowering Your Portfolio with the Future of Finance',
  icons = '/favicon.ico',
  noIndex = false
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    // description,
    openGraph: {
      title,
      // description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      // description,
      creator: '@zeya'
    },
    icons,
    metadataBase: new URL('https://app_url'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
  }
}
