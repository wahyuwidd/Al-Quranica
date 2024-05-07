import { SurahItem } from "@/types/surah-type"
import Link from "next/link"
import imgAlQuran from '@/public/assets/main/al-quran.png'
import imgHandPraying from '@/public/assets/main/hand-praying.png'
import imgAsmaulHusna from '@/public/assets/main/asmaul-husna.png'
import imgJuzAmma from '@/public/assets/main/juz-amma.png'
import { getDictionary } from "@/app/[lang]/dictionaries";
import Image from "next/image"

export const SurahHome = async ({ surahs, CurrentLang }: { surahs: SurahItem[], CurrentLang: string }) => {
    const dict = await getDictionary(CurrentLang);
    const selectedSurahs = ['Yasin', 'Ar-Rahman', 'Al-Hijr', 'An-Nahl', 'At-Tin', 'Al-Kahf'];
    const selectedSurahLinks = surahs
    .filter(item => selectedSurahs.includes(item.name.transliteration[CurrentLang]))
    .map((item, index) => (
        <Link
        key={index}
        href={`/${CurrentLang}/${item.name.transliteration[CurrentLang].toLocaleLowerCase().replace(/\s+/g, '-')}/${item.number}`}
        className="transition-colors hover:text-white duration-300 inline-flex px-2.5 py-1 rounded-lg relative text-sm md:text-base text-purple-800 bg-purple-100 hover:bg-purple-800"
        >
        {item.name.transliteration[CurrentLang]}
        </Link>
    ));
    
    return (
        <>
        <div className="container max-w-screen-lg mx-auto relative py-8">
            <div className="relative mb-4 top-0 z-10 py-2 md:py-4 bg-purple-100/95 dark:bg-neutral-900/85 rounded-2xl">
                <div className="flex flex-row justify-around">
                    <Link href={"/" + CurrentLang} className="items-center justify-center text-center rounded-xl md:rounded-3xl ">
                        <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-2xl ">
                            <Image src={imgAlQuran.src} alt={'al-quran'} width={100} height={100} />
                        </div>
                        <h2 className="text-xs md:text-sm ">Al Quran</h2>
                    </Link>
                    <Link href={CurrentLang+"/doa"} className="items-center justify-center text-center rounded-xl md:rounded-3xl ">
                        <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-2xl ">
                            <Image src={imgHandPraying.src} alt={'hand-praying'} width={100} height={100} />
                        </div>
                        <h2 className="text-xs md:text-sm">{dict.doa}</h2>
                    </Link>
                    <Link href={CurrentLang+"/asmaul-husna"} className="items-center justify-center text-center rounded-xl md:rounded-3xl ">
                        <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-2xl ">
                            <Image src={imgAsmaulHusna.src} alt={'juz-amma'} width={100} height={100} />
                        </div>
                        <h2 className="text-xs md:text-sm">99 AS</h2>
                    </Link>
                    <Link href={CurrentLang+"/juz-amma"} className="items-center justify-center text-center rounded-xl md:rounded-3xl ">
                        <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-2xl ">
                            <Image src={imgJuzAmma.src} alt={'juz-amma'} width={100} height={100} />
                        </div>
                        <h2 className="text-xs md:text-sm">Juz Amma</h2>
                    </Link>
                </div>
            </div>
            <div className="mb-5 mx-auto text-center space-x-2 md:space-x-3 space-y-2 md:space-y-3">
                {selectedSurahLinks}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {surahs.map((item, index) => (
                    <Link href={`/${CurrentLang}/${item.name.transliteration[CurrentLang].toLocaleLowerCase().replace(/\s+/g, '-')}/${item.number}`} key={index}>
                <div className="relative flex group items-center p-4 rounded-2xl border border-neutral-100 dark:border-neutral-700/70 bg-purple-50 dark:bg-neutral-900 hover:bg-purple-50 hover:border-purple-500 dark:hover:bg-purple-900 dark:hover:border-purple-400 h-full">
                    <div className="flex-shrink-0">
                        <div className="relative w-8 rounded-xl flex items-center justify-center">
                        <span className="text-xl font-bold">{index + 1}</span>
                    </div>
                </div>
                <div className="flex flex-col flex-grow ms-4">
                    <h2 className="nui-card-title block font-semibold text-sm sm:text-lg">{item.name.transliteration[CurrentLang]   }</h2>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{item.name.translation[CurrentLang] + " ∙ " + item.numberOfVerses}</span>
                </div>
                <div className="flex-shrink-0">
                    <i className="icon-3 text-lg text-grey-600 dark:text-white">{item.name.short }</i>
                </div>
            </div>
                    </Link>
            ))}
            </div>
        </div>
        </>
    )
}