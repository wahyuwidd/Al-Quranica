import "./globals.css";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import meta from '@/metadata.json';
import { Metadata } from "next";
import favicon from '@/app/[lang]/favicon.ico'

export const metadata: Metadata = {
  title: `${meta.name}`,
  description: `${meta.description}`,
  icons: {
    icon: `${favicon.src}`,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-neutral-50 dark:bg-neutral-950">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <div className="mt-[73px]">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
