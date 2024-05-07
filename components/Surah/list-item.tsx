"use client"
import { SurahItem } from "@/types/surah-type"
import { CheckIcon, ChevronsUpDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react";

export const ItemList = ({ data, currentIndex, surahData, surahId, CurrentLang } : { data: SurahItem[], currentIndex: number, surahData: SurahItem[], surahId: number, CurrentLang: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button onClick={() => setIsOpen(!isOpen)} className="relative w-full cursor-default rounded-lg bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-700 py-1 pl-8 pr-8 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-sm">
                            <span className="block truncate">{surahData[currentIndex].name.transliteration[CurrentLang]}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronsUpDown className="h-4 w-4 text-gray-400"/>
                            </span>
                        </button>
                        {isOpen && (
                            <ul className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md  bg-white text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                {data.map((item) => (
                                <li
                                    key={item.number}
                                    className={`relative cursor-default select-none hover:bg-cyan-200 text-gray-900 ${item.number === surahId ? 'font-semibold' : ''}`}
                                    >
                                <Link href={`/${CurrentLang}/${item.name.transliteration[CurrentLang].toLocaleLowerCase()}/${item.number}`} className="block cursor-pointer px-3 py-2">
                                {item.name.transliteration[CurrentLang]}
                                </Link>
                                {item.number === surahId && (
                                <CheckIcon className="w-5 h-5 text-gray-900 absolute right-2 top-1/2 transform -translate-y-1/2" />
                                )}
                        </li>
                ))}
        </ul>
        )}
        </>
    )
}