"use client"
 
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { useState, useEffect } from "react"
 
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if(!mounted) {
    return <>{children}</>
  }
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}