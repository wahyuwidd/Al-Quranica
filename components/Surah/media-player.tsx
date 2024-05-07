import { SurahItem, Verse } from '@/types/surah-type';
import { ChevronUp, Play, Pause, SkipBack, SkipForward, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const MediaPlayer = ({ item, data }:{item: Verse, data: SurahItem}) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(new Audio(item.audio.primary));
  
    useEffect(() => {
      const audio = audioRef.current;
      audio.play();
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));
      audio.addEventListener('ended', () => setIsPlaying(false));
      audio.addEventListener('play', () => setIsPlaying(true));
      audio.addEventListener('pause', () => setIsPlaying(false)); 
      return () => {
      audio.pause(); // Pause and reset the audio when unmounting or changing src
      audio.currentTime = 0;
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', () => setIsPlaying(false));
      audio.removeEventListener('play', () => setIsPlaying(true));
      audio.removeEventListener('pause', () => setIsPlaying(false));
      };
    }, [item.audio.primary]);

    
  
    const updateTime = () => {
    const audio = audioRef.current;
    setCurrentTime(audio.currentTime);
    };
  
    const togglePlay = () => {
      const audio = audioRef.current;
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        // Reset currentTime when audio changes
        setCurrentTime(0);
        audioRef.current.load();
      }, [item]);
  
    const formatTime = (time:any) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
  
    const formatPercentage = (time:any) => {
        return ((time / duration) * 100).toFixed(2) + '%';
      };

    return (
    <><div style={{ display: 'block' }} className="fixed bottom-0 inset-x-0 flex z-50">
    <div className="relative bg-white dark:bg-neutral-800 w-full flex flex-col px-2 sm:px-3 z-0 - nc-google-shadow translate-y-0">
        <button className="w-[26px] h-6 flex lg:hidden items-center justify-center absolute z-20 right-0 -top-3">
            <div className="w-6 h-6 bg-white dark:bg-neutral-800 flex items-center justify-center  rounded-full - nc-google-shadow">
                <ChevronUp className="h-4 w-4" />
            </div>
        </button>
        <div className="absolute w-full inset-x-0 bottom-full">
            <input type="range" min={0} max={0.999999} className="slider absolute z-10 opacity-0 inset-0 h-full w-full cursor-pointer" />
            <div style={{ width: '100%' }} className="absolute start-0 top-1/2 h-0.5 min-w-0 transform -translate-y-1/2 transition-all rounded-full bg-purple-500/30  will-change-contents"></div>
            <div style={{ width: `calc(${formatPercentage(currentTime)} - 12px)` }} className="absolute h-0.5 min-w-0 start-0 top-1/2 transform -translate-y-1/2 rounded-full bg-purple-500 z-0">
                <span className="absolute -end-3 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-purple-500"></span>
            </div>
        </div>
        <div className="h-16 sm:h-20 w-full flex justify-between">
            <div className="mr-2 flex items-center flex-grow lg:flex-shrink-0 lg:basis-52 overflow-hidden">
                <a className="relative h-14 sm:h-16 flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse ps-12 overflow-hidden" href="#">
                    <div className="absolute start-0 w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center transition-transform nui-animation-spin rounded-full ">
                        <div className="flex justify-center items-center bg-primary-500 w-full h-full rounded-full shadow-md">
                            <i className="surah-icon icon-1 -ml-1 text-center text-sm lg:text-xl text-white dark:text-white stroke-current">
                                <img src="https://storage.nu.or.id/storage/post/16_9/big/41_1643884503.jpg" alt="" />
                            </i>
                        </div>
                    </div>
                    <div className="flex-grow overflow-hidden">
                        <span className="text-xs lg:text-sm">Putar Surah</span>
                        <h3 className="text-sm sm:text-base font-medium truncate mt-1">{data.name.transliteration.id} · {item.number.inSurah} / {data.numberOfVerses}</h3>
                    </div>
                </a>
                <div className="hidden xl:flex flex-shrink-0 px-6 space-x-2.5 rtl:space-x-reverse"></div>
            </div>
            <div className="hidden lg:flex flex-shrink-0 px-5 items-center justify-center">
                <div className="flex flex-grow space-x-2 items-center text-neutral-500 dark:text-neutral-300 justify-evenly max-w-xs xl:max-w-md">
                    <div className="w-12"></div>
                    <button className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-700/80 transition-colors">
                        <SkipBack className="w-6 h-6" />
                    </button>
                    <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full text-purple-500 dark:text-purple-300 bg-purple-50/70 hover:bg-purple-200/70 dark:bg-purple-700/40 dark:hover:bg-purple-700/80 cursor-pointer transition-colors">
                    <button onClick={togglePlay} className="w-6 h-6">
                        {isPlaying ? <Pause /> : <Play />}
                    </button>
                    </div>
                    <button className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-700/80 transition-colors">
                        <SkipForward className="w-6 h-6" />
                    </button>
                </div>
            </div>
            <div className="ms-2 flex-shrink-0 lg:basis-52 lg:flex-grow flex items-center justify-end">
                <div className="hidden lg:flex items-center justify-end text-neutral-500 dark:text-neutral-300">
                    <button>
                        {/* w-5 h-5 flex-shrink-0 */}
                    </button>
                    <div className="ms-3.5 relative w-24 flex-shrink-0">
                        <input type="range" min={0} max={0.999999} className="absolute z-10 opacity-0 inset-0 h-1 w-full cursor-pointer " />
                        <div style={{ width: '100%' }} className="absolute start-0 top-1/2 h-0.5 min-w-0 w-full -translate-y-1/2 rounded-full bg-neutral-300 dark:bg-neutral-500"></div>
                        <div style={{ width: `calc(${formatPercentage(currentTime)} - 12px)` }} className="absolute h-0.5 min-w-0 start-0 top-1/2 -translate-y-1/2 rounded-full bg-purple-500">
                            <span className="absolute -end-1 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                        </div>
                    </div>
                </div>
                <div className="ms-5 me-3 hidden lg:flex items-center justify-center flex-shrink-0 text-xs tracking-widest">
                    <div className="flex-shrink-0 truncate min-w-[40px] text-end">
                        {formatTime(currentTime)}
                    </div> /
                    <div className="flex-shrink-0 truncate min-w-[40px]">
                        {formatTime(duration)}
                    </div>
                </div>
                <div className="flex-shrink-0 flex lg:hidden items-center justify-center w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-700/40 text-purple-500 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-700/80 cursor-pointer ">
                    <button onClick={togglePlay} className="w-6 h-6 md:w-8 md:h-8">
                        {isPlaying ? <Pause /> : <Play />}
                    </button>
                </div>
                <button className="flex-shrink-0 flex items-center justify-center rounded-full focus:outline-none focus:shadow-outline hover:bg-neutral-100 dark:hover:bg-neutral-700/80 w-10 h-10 md:w-12 md:h-12">
                    <X onClick={() => 'hidden'} className="w-6 h-6" />
                </button>
            </div>
        </div>
    </div>
</div><div className="mb-20"></div></>
    //   <div>
    //     <button onClick={togglePlay}>
    //       {isPlaying ? 'Pause' : 'Play'}
    //     </button>
    //     <div>
    //       <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
    //     </div>
    //   </div>
    );
  };
  
  export default MediaPlayer;