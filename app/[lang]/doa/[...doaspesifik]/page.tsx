'use client'
import { ListDoa } from "@/lib/doa/data"
import { DoaType } from "@/types/doa-type"
import { ArrowLeft, MoreVertical } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import meta  from '@/metadata.json'

const Page = ({ params }: { params: { doaspesifik: string } }) => {
    const param = useParams();
    const titleDoa = params.doaspesifik.toString();
    console.log(titleDoa);
    
    const Lang = param.lang.toString();
    const [dataDoa, SetdataDoa] = useState<DoaType[]>([]);
    const [title, setTitle] = useState(`Kumpulan doa ${titleDoa.replace(/-/g, ' ')} Arab, Latin, beserta Terjemahan | ${meta.name}`);
    const data = ListDoa
    const dataPage = data.find(item => item.slug.en === titleDoa || item.slug.id === titleDoa);
    useEffect(() => {
        const fetchData = async () => {
            fetch(`http://localhost:3000/api/doa/${titleDoa}`)
            .then(res => res.json())
            .then(data => SetdataDoa(data))
            .catch(err => console.log(err))
        }
        fetchData()
    }, [titleDoa])

    return(
    <>
        <title>{title}</title>
        <div className=" z-10 sticky top-[70px] bg-neutral-50/95 dark:bg-neutral-800/95 py-2 lg:py-5 border-b border-neutral-100 dark:border-neutral-700 mb-2">
            <div className="max-w-screen-lg mx-auto px-5">
                <div className="flex justify-between items-center space-x-2">
                    <Link href={'/'+ Lang + '/doa'}>
                        <div className="flex items-center justify-center leading-none text-base font-medium">
                                <ArrowLeft color="#a855f7" size={20} />
                            <span className="ml-2 hidden md:block">
                                {Lang === 'en' ? 'Home' : 'Beranda'}
                            </span>
                        </div>
                    </Link>
                    <div className="w-50 py-3 px-4 border border-purple-100 dark:border-purple-800 bg-purple-50 text-purple-500 dark:text-purple-300 dark:bg-purple-900 rounded-full flex items-center justify-center leading-none text-sm">
                        {Lang === 'en' ? "Prayer" : "Doa"}
                    </div>
                    <div className="flex items-center justify-center leading-none text-base font-medium">
                    </div>
                </div>
            </div>
        </div>
        <div className="text-center space-y-2 mb-5">
            <div className="mb-10">
                <h1 className="text-xl md:text-1xl lg:text-2xl font-semibold">
                    {/* Kumpulan Doa {titleDoa.charAt(0).toUpperCase() + titleDoa.slice(1)} */}
                    {Lang === 'en' ? 'List of ' + dataPage?.title.en : 'Kumpulan ' + dataPage?.title.id}
                </h1>
                <span className="font-normal block text-xs lg:text-sm text-neutral-500 dark:text-neutral-400">
                    {Lang === 'en' ? dataPage?.read.en : dataPage?.read.id}
                </span>
            </div>
        </div>
        <div className="max-w-screen-lg mx-auto mt-5">
            {dataDoa.map((item, index)=> (
                <><div className="text-center mt-10 mb-6">
                    <span className="font-normal block text-sm lg:text-base text-neutral-500 dark:text-neutral-300">
                        <span className="font-normal block text-sm lg:text-base text-neutral-500 dark:text-neutral-300">
                            {index + 1}/{dataDoa.length}
                        </span>
                        <h1 className="text-lg md:text-xl lg:text-1xl font-semibold">
                            {Lang === "en" ? item.en_judul : item.judul}
                        </h1>
                    </span>
                </div><div className="last:border-none border-b border-neutral-100 dark:border-neutral-800 py-5 px-3 md:px-5 ">
                        <div className="flex">
                            <div className="action">
                                <div className="flex flex-col space-y-2.5 rtl:space-x-reverse items-center">
                                    <div className="inline-block">
                                        <div className="inline-block text-left">
                                            <button className="text-neutral-500 dark:text-neutral-400 flex items-center justify-center rounded-full  h-8 w-8 hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:outline-none">
                                                {/* <MoreVertical /> */}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-grow flex flex-col ms-2 text-lg rounded-xl sm:ms-3 sm:text-base dark:border-neutral-700">
                                <div className="flex flex-col space-y-3">
                                    <span className="__className_6952f9 text-4xl lg:text-5xl leading-relaxed lg:leading-relaxed text-right">
                                        {item.arab}
                                    </span>
                                    <span className="block text-md lg:text-lg text-purple-500 mb-3 sm:mt-3 sm:mb-4 dark:text-purple-300">
                                        {item.latin}
                                    </span>
                                    <span className="block text-md lg:text-lg text-neutral-700 dark:text-neutral-300">
                                        {Lang === 'en' ?  item.en : item.indo }
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div></>
            ))}
        </div>
    </>
    )
}

export default Page