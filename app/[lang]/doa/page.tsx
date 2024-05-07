import { ListDoa } from "@/lib/doa/data"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getDictionary } from "../dictionaries";
import meta  from '@/metadata.json'
import { Metadata } from "next";

type Props = {
    params: { [lang: string]: string };
  };

 export const metadata: Metadata = {
    title: `Kumpulan doa doa Lengkap Arab, Latin, beserta Terjemahan | ${meta.name}`,
    description: `${meta.description}`,
    
  };

const DoaPage = async ({ params: { lang } }: Props) => {
    const data = ListDoa
    const dict = await getDictionary(lang);
    return(
    <>
        <div className=" z-10 sticky top-0 bg-neutral-50/95 dark:bg-neutral-800/95 py-2 lg:py-5 border-b border-neutral-100 dark:border-neutral-700 mb-2">
            <div className="max-w-screen-lg mx-auto px-5">
                <div className="flex justify-between items-center space-x-2">
                    <Link href={"/" + lang}>
                        <div className="flex items-center justify-center leading-none text-base font-medium">
                                <ArrowLeft color="#a855f7" size={20} />
                            <span className="ml-2 hidden md:block">
                                {lang === 'en' ? 'Home' : 'Beranda'}
                            </span>
                        </div>
                    </Link>
                    <div className="w-50 py-3 px-4 border border-purple-100 dark:border-purple-800 bg-purple-50 text-purple-500 dark:text-purple-300 dark:bg-purple-900 rounded-full flex items-center justify-center leading-none text-sm">
                        {dict.doa}
                    </div>
                    <div className="flex items-center justify-center leading-none text-base font-medium">
                    </div>
                </div>
            </div>
        </div>
        <div className="container max-w-screen-lg mx-auto mt-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {data.map((item, index) => (
                    <Link key={index} href={lang === 'en' ? item.link.en : item.link.id}className="line-clamp-1">
                    <div className="relative flex group items-center rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 hover:bg-purple-50 hover:border-purple-500 dark:hover:bg-purple-900 dark:hover:border-purple-400  h-14 md:h-16 lg:h-20">
                        <div className="relative w-12 rounded-s-2xl flex items-center justify-center h-full bg-purple-50 text-purple-500 dark:bg-purple-900 dark:text-purple-300">
                            <span className="text-xl font-bold">
                                {index + 1}
                            </span>
                        </div>
                        <div className="flex flex-col flex-grow ms-4">
                            <h2 className="block font-semibold text-sm sm:text-lg">
                                {lang === 'en' ? item.title.en : item.title.id}
                            </h2>
                            <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 ">
                                {lang === 'en' ? item.read.en : item.read.id}
                            </span>
                        </div>
                    </div>
                </Link>
                ))}
            </div>
        </div>
    </>
    )
}

export default DoaPage