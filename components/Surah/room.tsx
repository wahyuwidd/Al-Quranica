'use client'
import { NumberArabic } from "@/lib/surah/utils"
import { SurahItem } from "@/types/surah-type"
import { MoreVertical, Play, Copy, X, SkipForward, SkipBack, ChevronUp } from "lucide-react"
import { useEffect, useState } from "react"
import MediaPlayer from "./media-player"
import ActionSurah from "./action"

export const SurahRoom = ({data, CurrentLang}: {data: SurahItem, CurrentLang: string}) => {
    const surahData = data
    let pre = ""
    if(surahData.preBismillah != null) {
        pre = surahData.preBismillah.text.arab
    }
    
    return(
        <>
            <div className="text-center space-y-2 mb-5">
                <span className="surah-icon icon-2 text-2xl lg:text-3xl -mr-1 text-grey-800 dark:text-white">
                    {surahData.name.long}
                </span>
                <div className="mb-10">
                    <h1 className="text-lg md:text-xl lg:text-1xl font-semibold">
                        {surahData.name.transliteration[CurrentLang]}
                    </h1>
                    <span className="font-normal block text-xs lg:text-sm text-neutral-500 dark:text-neutral-400">
                        {surahData.revelation.id} ∙ {surahData.numberOfVerses}
                    </span>
                </div>
            </div>
            <div className="text-center mt-8 md:mt-10">
                <span className="surah-icon icon-115 text-3xl lg:text-3`xl text-grey-800 dark:text-white">
                    {pre}
                </span>
            </div>
            <div className="max-w-screen-lg mx-auto mt-8">
                {surahData.verses.map((item, index) => (
                    <div key={index} className="last:border-none border-b border-neutral-300 dark:border-neutral-800 py-5 px-3 md:px-5 flex ">
                    <ActionSurah item={ item } data={surahData} />
                    <div className="flex-grow flex flex-col ms-2 text-lg rounded-xl sm:ms-3 sm:text-base dark:border-neutral-700">
                        <div className="flex flex-col space-y-3">
                            <span className="text-3xl lg:text-3xl leading-relaxed lg:leading-relaxed text-right">
                            {item.text.arab}
                                <span className="text-cyan-500 dark:text-cyan-300">{NumberArabic(item.number.inSurah)}</span>
                            </span>
                            <span className="block text-md lg:text-lg text-purple-500 mb-3 sm:mt-3 sm:mb-4 dark:text-purple-300">
                            {item.number.inSurah}. {item.text.transliteration.en} 
                            </span>
                            <span className="block text-md lg:text-lg text-neutral-700 dark:text-neutral-300">
                            {item.number.inSurah}.  {item.translation[CurrentLang]}
                            </span>
                        </div>
                    </div>
                </div>
                ))}
                
            </div>
            <div className="mb-20"></div>
        </>
    )
}