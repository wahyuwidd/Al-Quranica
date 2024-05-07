"use client"
import Link from 'next/link';
import { SearchToggle } from './search';
import Image from 'next/image';
import LangSwitch from './lang-switch';
import { Tally1, Menu, X } from 'lucide-react';
import Head from 'next/head';
import ThemeSwitcher from './theme-switcher';
import { Button } from './ui/button';
import Logo from '@/public/assets/logo/logo.png'
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ThemeSwitcherSidebar from './theme-switcher-sidebar';

export const Navbar = () => {
  const param = useParams();
  const CurrentLang = param.lang.toString();
  const asPath = usePathname().split('/');;
  const CurrentUrl = asPath[2] + '/' + asPath[3]

  //sidebar
  const [isOpen, setIsOpen] = useState(false);
  const handleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleEscKeyPress = (e: { keyCode: number }) => {
      if (e.keyCode === 27 && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.setProperty("overflow", "hidden");
    } else {
      document.body.style.removeProperty("overflow");
    }

    document.addEventListener("keydown", handleEscKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [isOpen]);
  
    return (
      <>
      <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </Head>
        <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed w-screen z-30 top-0 border-b dark:border-gray-600">
          <div className="max-w-screen-lg flex flex-wrap items-center justify-between mx-auto p-3">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Button onClick={handleDrawer} variant={'ghost'} className='rounded-md p-2 block md:hidden'>
              <Menu />
              </Button>
                <span className="self-center text-2x1 font-semibold whitespace-nowrap dark:text-white">
                <Link href={'/' + CurrentLang}>
                <Image src={Logo.src} alt="logo" width={130} height={130} />
                </Link>
                {/* AlQuranica */}
              </span>
            </div>
            <div style={{fontFamily: 'Inter', fontStyle: 'normal', }} className="flex mt-1 md:order-2 space-x-3 md:space-x-0">
              <SearchToggle />
              {/* <ModeToggle /> */}
              <LangSwitch lang={CurrentLang} currentUrl={CurrentUrl} />
              <Tally1 size={20} className="mt-3 hidden md:block" />
              <ThemeSwitcher />
            </div>
          </div>
          {isOpen && (
        <div className="z-10 fixed inset-0 transition-opacity">
          <div
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black opacity-50"
            // tabIndex="0"
          ></div>
        </div>
      )}

      <aside
        className={`transform top-0 left-0 w-[80%] bg-white dark:bg-black fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <span className="flex mt-3 p-4 border-b">
          <img
            src={Logo.src}
            alt="Logo"
            className="h-auto w-32"
          />
          <X size={20} className="ml-auto" onClick={() => setIsOpen(false)} />
        </span>
        <div className='mt-10'>
          <p className='text-center'>
            {CurrentLang === "id" ? "Pilih Mode" : "Select Mode"}
          </p>
          <ThemeSwitcherSidebar CurrentLang={CurrentLang} />
        </div>
        {/* {sideList.map(({ icon, title }, index) => {
          return (
            <span
              key={index}
              className="flex items-center p-4 hover:bg-pink-500 hover:text-white "
            >
              <span className="mr-2">{icon}</span> <span>{title}</span>
            </span>
          );
        })} */}
        {/* <div className="fixed bottom-0 w-full">
          <p>
            Web ini dibuat oleh El Wahyuu
          </p>
        </div> */}
      </aside>
        </nav>
      </>
    )
}