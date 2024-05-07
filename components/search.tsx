"use client"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import { History } from "lucide-react"
  
  import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
import React from "react"
import Link from "next/link"
import { SurahItem } from "@/types/surah-type"
import { useParams } from "next/navigation"

export const SearchToggle = () => {
    const param = useParams();
    const CurrentLang = param.lang.toString();
    const [open, setOpen] = useState(false)
    const [surah, setSurah] = useState<SurahItem[]>([]);
  
    useEffect(() => {
    fetch("https://api.quran.gading.dev/surah")
      .then(Response => Response.json())
      .then(data => setSurah(data.data))
      const down = (e: KeyboardEvent) => {
        if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setOpen((open) => !open);
        }
      };

      document.addEventListener("keydown", down);
      return () => document.removeEventListener("keydown", down);
    }, [])

    return (
      <>
        <button onClick={() => setOpen(true)}>
          <Search className="h-[1.4rem] w-[1.4rem] mr-2" />
          <span className="sr-only">Search</span>
        </button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>Surah tidak ditemukan.</CommandEmpty>
            <CommandGroup heading="Quran surah">
              {surah.map((item, index) => (
                <Link onClick={() => setOpen(false)} key={index} href={`/${CurrentLang}/${item.name.transliteration[CurrentLang].toLocaleLowerCase().replace(/\s+/g, '-')}/${item.number}`}>
                <CommandItem >
                  <History className="mr-2 h-4 w-4" />
                  <span>{item.name.transliteration[CurrentLang]}</span>
                </CommandItem>
                </Link>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </CommandList>
        </CommandDialog>
      </>
    );
}