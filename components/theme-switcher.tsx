'use client'
import {Switch} from "@nextui-org/switch";
import { Moon, MoonIcon, Sun, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
const ThemeSwitcher = () => {

    const {systemTheme, theme, setTheme } = useTheme();

    const renderThemeChanger= () => {
   
      const currentTheme = theme === "system" ? systemTheme : theme ;
  
      if(currentTheme ==="dark"){
        return (
          <SunIcon size={20} className="text-white-900 mt-3 mr-2" role="button" onClick={() => 
            setTheme('light')} />
        )
      }
  
      else {
        return (
          <MoonIcon size={20} className="text-gray-900 mt-3 mr-2" role="button" onClick={() => 
            setTheme('dark')} />
        )
      }
   };
    return (
        <>
        <div className="hidden md:block">
            {renderThemeChanger()}
        </div>
        </>
    )
}

export default ThemeSwitcher