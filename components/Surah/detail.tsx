import { SurahItem } from "@/types/surah-type"
import { getAllSurah } from "@/lib/surah/data";
import { ArrowLeft, ChevronLeft, ChevronRight, ChevronsUpDown, CheckIcon } from "lucide-react"
import Link from "next/link";
import { ItemList } from "./list-item";

export const  SurahDetail = async ({ surahId, CurrentLang } : { surahId: number, CurrentLang: string }) => {

    const data = await getAllSurah() as SurahItem[]
    const surahData = data as SurahItem[]
    const currentIndex = data.findIndex(item => item.number === surahId);
    
    const prevData = currentIndex > 0 ? data[currentIndex - 1] : null;
    const nextData = currentIndex < data.length - 1 ? data[currentIndex + 1] : null;
        return (
        <div className=" z-10 sticky top-[70px] bg-neutral-50/95 dark:bg-neutral-800/95 py-2 lg:py-5 border-b border-neutral-100 dark:border-neutral-700 mb-10">
            <div className="max-w-screen-lg mx-auto px-5">
            <div className="flex justify-between items-center">
                <Link href={`/${CurrentLang}`}>
                <div className="flex items-center justify-center leading-none text-base font-medium">
                    <ArrowLeft color="#a855f7" size={20} />
                    <span className="ml-2 hidden md:block">{CurrentLang === "id" ? "Daftar Surah" : "List of Surah"}</span>
                </div>
                </Link>
                <div className="flex-col">
                <div className="grid grid-cols-2 gap-1">
                    <Link
                    href={
                        prevData
                        ? `/${CurrentLang}/${prevData.name.transliteration[CurrentLang].toLocaleLowerCase()}/${
                            prevData.number
                            }`
                        : "/" + CurrentLang
                    }
                    >
                    <div className="py-2 px-2 md:px-4 border border-neutral-100 dark:border-neutral-700 bg-white dark:bg-neutral-900 rounded-s-full flex items-center justify-start leading-none text-sm font-medium">
                        {prevData ? (
                        <>
                            <ChevronLeft
                            className="w-5 h-5 text-purple-500 mr-1 md:mr-2 stroke-current"
                            size={20}
                            />{" "}
                            {prevData.name.transliteration[CurrentLang]}
                        </>
                        ) : (
                            <ChevronLeft className="w-5 h-5 text-purple-500 mr-1 md:mr-2 stroke-current" size={20}/> 
                        )}
                    </div>
                    </Link>
                    <Link
                    href={
                        nextData
                        ? `/${CurrentLang}/${nextData.name.transliteration[CurrentLang].toLocaleLowerCase()}/${
                            nextData.number
                            }`
                        : "/" + CurrentLang
                    }
                    >
                    <div className="py-2 px-2 md:px-4 border border-neutral-100 dark:border-neutral-700 bg-white dark:bg-neutral-900 rounded-e-full flex items-center justify-end leading-none text-sm font-medium">
                        {nextData ? (
                        <>
                            {nextData.name.transliteration[CurrentLang]}{" "}
                            <ChevronRight
                            className="w-5 h-5 text-purple-500 ml-1 md:ml-2 stroke-current"
                            size={20}
                            />
                        </>
                        ) : (
                            <ChevronRight
                            className="w-5 h-5 text-purple-500 ml-1 md:ml-2 stroke-current"
                            size={20}
                            />
                        )}
                    </div>
                    </Link>
                </div>
                <div className="flex justify-center items-center space-x-2 mt-2">
                    <div className="w-auto">
                    <div className="relative mt-1">
                        <ItemList data={data} currentIndex={currentIndex} surahData={surahData} surahId={surahId} CurrentLang={CurrentLang}/>
                    </div>
                    </div>
                    <div className="w-auto">
                    <div className="relative mt-1">
                        <button className="relative w-full cursor-default rounded-lg bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-700 py-1 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-sm">
                            <span className="block truncate">1</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronsUpDown className="h-4 w-4 text-gray-400"/>
                            </span>
                        </button>
                    </div>
                    </div>
                </div>
                </div>
                <div className="flex items-center justify-center leading-none text-base font-medium"></div>
            </div>
            </div>
        </div>
        );
}