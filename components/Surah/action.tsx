import { SurahItem, Verse } from "@/types/surah-type";
import { ChevronUp, Copy, MoreVertical, Play, SkipBack, SkipForward, X } from "lucide-react"
import { useEffect, useRef, useState } from "react";
import MediaPlayer from "./media-player";

const ActionSurah = ({item, data}:{item: Verse, data: SurahItem}) => {
    const [openItemId, setOpenItemId] = useState(null);
    const [openPlayer, setOpenPlayer] = useState(null);

    const handleClick = (itemId:any) => {
        setOpenItemId(itemId === openItemId ? null : itemId);
    };
    
    const handleItemClick = (itemId:any) => {
        console.log(itemId);
        setOpenPlayer(itemId === openPlayer ? null : itemId);
        setOpenItemId(null);
    };

    function copyTextToClipboard(text:any) {
        const el = document.createElement('textarea');
        el.value = text;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }
    
    function handleCopyText(text: any) {
        try {
            copyTextToClipboard(text);
            setOpenItemId(null);
        } catch (error) {
            console.error('Error copying text: ', error);
        }
    }
    
    return (
        <>
        <div className="Action">
                        <div className="flex flex-col space-y-2.5 rtl:space-x-reverse items-center">
                            <div className="inline-block text-left">
                                <button onClick={() => handleClick(item.number.inSurah)} className="text-neutral-500 dark:text-neutral-400 flex items-center justify-center rounded-full  h-8 w-8 hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:outline-none">
                                    <MoreVertical className="h-5 w-5"/>
                                </button>
                                {openItemId === item.number.inSurah && (
                                <div className="copy-button absolute origin-top-right end-100 w-56 mt-2 bg-white dark:bg-neutral-900 rounded-2xl divide-y divide-neutral-100 shadow-lg ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-10 focus:outline-none transform opacity-100 scale-100">
                                    <div className="px-1 py-3 text-sm text-neutral-600 dark:text-neutral-300">
                                        {/* <ReactPlayer url={item.audio.primary} controls={true} /> */}
                                        {/* <MediaPlayer src={item.audio.primary} /> */}
                                        {/* <button onClick={() => handleItemClick(item.audio.primary)} className="flex items-center rounded-xl w-full px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate ">
                                            <Play className="h-4 w-4"/>
                                            <span className="ms-3">Putar Ayat</span>
                                        </button> */}
                                        <button onClick={() => handleCopyText(item.translation.id)} className="flex items-center rounded-xl w-full px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate ">
                                            <Copy className="h-4 w-4"/>
                                            <span className="ms-3">Copy Text</span>
                                        </button>
                                    </div>
                                    
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
        {openPlayer && (
            <>
                <MediaPlayer item={item} data={data}/>
            </>
        )}
        
    </>
    )
}

export default ActionSurah