"use client"
import { Moon, MoonIcon, Sun, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeSwitcherSidebar = ({CurrentLang}:{CurrentLang:string}) => {

    const {systemTheme, theme, setTheme } = useTheme();
    const renderThemeChanger= () => {
      const currentTheme = theme === "system" ? systemTheme : theme ;
      if(currentTheme ==="dark"){
        return (
          <>
          <div onClick={() => setTheme('light')} className="p-1 bg-black text-white dark:text-gray-600 flex h-auto w-32 mx-auto justify-center rounded-lg  dark:bg-gray-100">
                <SunIcon size={20} className="text-white-900 mt-3 mr-2" role="button"/>
                <p className="p-2">{CurrentLang === "id" ? "Terang" : "Light"}</p>
          </div>
          </>
        )
      }
  
      else {
        return (
            <>
            <div onClick={() => setTheme('dark')} className="p-1 bg-black text-white dark:text-gray-600 flex h-auto w-32 mx-auto justify-center rounded-lg  darkbg-gray-100">
                <MoonIcon size={20} className="text-gray-900 mt-3 mr-2 fill-white" role="button"  />
                <p className="p-2">{CurrentLang === "id" ? "Gelap" : "Dark"} </p>
            </div>
            </>
        )
      }
   };
    return (
        <>
        <div className="flex">
            {renderThemeChanger()}
        </div>
        </>
    )
}

export default ThemeSwitcherSidebar