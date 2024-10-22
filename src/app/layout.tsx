import './globals.css'
import { cn, constructMetadata } from '@/lib/utils'
import { WalletProvider } from '@/context/WalletContext'
import { ThemeProvider } from '@/components/theme-provider'
import Navbar from '@/components/Navbar'
import { Toaster } from '@/components/ui/sonner'
import ScrollToTopBtn from '@/components/ScrollToTopBtn'

export const metadata = constructMetadata();

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body className={cn('min-h-screen bg-background antialiased font-sansSerif')}>
        <WalletProvider>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
            <Navbar />
            <main className='pt-16'>
              {children}
            </main>
            <ScrollToTopBtn />
            <Toaster richColors closeButton />
          </ThemeProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
