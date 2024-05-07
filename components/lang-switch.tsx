"use client"
import { ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import IndonesiaFlag from '@/public/assets/lang/flag_indonesia.png'
import EnglishFlag from '@/public/assets/lang/flag_us.png'
import Image from "next/image"

const LangSwitch = ({lang, currentUrl}:{lang:string, currentUrl:string}) => {
  const newCurrentUrl = currentUrl.split('/');
  let fixCurrentUrl = "";
  if (newCurrentUrl[0] !== "undefined" && newCurrentUrl[1] !== "undefined") {
    fixCurrentUrl = newCurrentUrl[0] + "/" + newCurrentUrl[1];
  } else if (newCurrentUrl[0] === "undefined") {
    fixCurrentUrl = "";
  } else if (newCurrentUrl[1] === "undefined") {
    fixCurrentUrl = newCurrentUrl[0];
  }
  
    return(
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="inline-flex justify-center gap-x-1.5 rounded-md bg-transparent px-2 py-3 font-semibold text-sm uppercase text-text-color">
          {/* <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> */}
          {lang} <ChevronDown className="h-[1.3rem] w-[1.3rem] " />
          <span className="sr-only">Toggle SwitchLang</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <span>
          <a href={"/id/" + fixCurrentUrl} className="inline-flex px-2 text-sm">
                {/* <IndonesiaFlag width={20} height={20}/> */}
                <Image src={IndonesiaFlag.src} width={20} height={20} alt="Indonesia Flag"/>
          </a>
          </span>
          <span className="ml-1">
          <a href={"/id/" + fixCurrentUrl}>
            Indonesia
          </a>
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem >
          <span>
          <a href={"/en/" + fixCurrentUrl} className="inline-flex px-2 py-1 text-sm">
            {/* <EnglishFlag width={20} height={20}/> */}
            <Image src={EnglishFlag.src} width={20} height={20} alt="English Flag"/>
          </a>
          </span>
          <span className="ml-1">
          <a href={"/en/" + fixCurrentUrl}>
            English
          </a>
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    )
}

export default LangSwitch