import { SurahHome } from "@/components/Surah/home";
import { getAllSurah } from "@/lib/surah/data";
import { SurahItem } from "@/types/surah-type";
import { Metadata } from "next";
import meta from "@/metadata.json";

type Props = {
  params: { [lang: string]: string };
};

export const metadata: Metadata = {
  title: `${meta.title}`,
  description: `${meta.description}`,
  
};

export default async function Home({ params: { lang } }: Props) {
  const allSurah = await getAllSurah() as SurahItem[]
  return (
    <>
      <SurahHome surahs={allSurah} CurrentLang={lang} />
    </>
  );
}
