import { getAllAsmaulHusna } from "@/lib/asmaul-husna/data"
import { AsmaulHusnaType } from "@/types/asmaul-husna-type"
import { ArrowLeft } from "lucide-react"
import { Metadata } from "next";
import Link from "next/link"
import meta  from '@/metadata.json'

type Props = {
    params: { [lang: string]: string };
  };
  

  export const metadata: Metadata = {
    title: `Asmaul Husna Arab, Latin, beserta Terjemahan | ${meta.name}`,
    description: `${meta.description}`,
    
  };
  
const AsmaulHusnaPage = async ({ params: { lang } }: Props)  => {
    const data = await getAllAsmaulHusna() as AsmaulHusnaType[]
    const keyLang = 'translation_' + lang
    return(
        <>
        <div className=" z-10 sticky top-[70px] bg-neutral-50/95 dark:bg-neutral-800/95 py-2 lg:py-5 border-b border-neutral-100 dark:border-neutral-700 mb-2">
            <div className="max-w-screen-lg mx-auto px-5">
                <div className="flex justify-between items-center space-x-2">
                    <Link href={"/" + lang}>
                        <div className="flex items-center justify-center leading-none text-base font-medium">
                                <ArrowLeft color="#a855f7" size={20} />
                            <span className="ml-2 hidden md:block">
                                Beranda
                            </span>
                        </div>
                    </Link>
                    <div className="w-50 py-3 px-4 border border-purple-100 dark:border-purple-800 bg-purple-50 text-purple-500 dark:text-purple-300 dark:bg-purple-900 rounded-full flex items-center justify-center leading-none text-sm">
                        Asmaul Husna
                    </div>
                    <div className="flex items-center justify-center leading-none text-base font-medium">

                    </div>
                </div>
            </div>
        </div>
            <div className="container max-w-screen-lg mx-auto relative py-8">
                <div className="grid grid-cols-2 lg:grid-cols-5 justify-around">
                    {data.map((item, index) => (
                        <div key={index} className="relative flex group items-center ">
                            <div className="flex flex-col flex-grow ms-4 p-3 text-center">
                                <h2 className="block font-semibold text-sm sm:text-lg">{item.arabic}</h2>
                                <h3 className="text-xs font-semibold mt-1">{item.latin}</h3>
                                <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{item[keyLang]}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div></>
    )
}

export default AsmaulHusnaPage